package Com.Fasoo.Controller;
import Com.Fasoo.DBController.*;
import Com.Fasoo.ImageClassification.Classification;
import Com.Fasoo.ImageRegister.ImageRegistry;
import Com.Fasoo.ManageLog.DetectLog;
import Com.Fasoo.ManageLog.ManageOCRFile;
import Com.Fasoo.PredictModel.KNN;
import Com.Fasoo.PredictModel.PrincipleComponentAnalysis;
import Com.Fasoo.Utilization.Utilization;
import Com.Fasoo.ViewModel.ImageInfoBean;
import com.fasterxml.jackson.core.JsonGenerationException;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.core.io.InputStreamResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.util.HashMap;
import java.util.List;

@Controller
public class controller {

    //todo:수정
//    @RequestMapping(value="/")
//    public String MonitoringPage(){
//        return "index";
//    }

    @RequestMapping(value="/index")
    public void indexPage(Model model){
        List<ImageRegistrationDTO> imageList = null;
        ImageRegistrationDAO imageRegistrationDAO = new ImageRegistrationDAO();
        try {
            imageList = imageRegistrationDAO.getImageRegistryList();
            model.addAttribute("imageInfoList", imageList);
        }catch(Exception e){
            e.printStackTrace();
        }
        //return "index";
    }

    @RequestMapping(value="/indexJson")
    public  @ResponseBody  List<ImageRegistrationDTO> indexJson(){
        List<ImageRegistrationDTO> imageList = null;
        ImageRegistrationDAO imageRegistrationDAO = new ImageRegistrationDAO();
        try {
            imageList = imageRegistrationDAO.getImageRegistryList();
        }catch(Exception e){
            e.printStackTrace();
        }
        return imageList;
    }

    @RequestMapping(value="/DBConnectTest")
    public @ResponseBody String DBtest(){
        List<ImageClassificationDTO> dataSets;
        ImageClassificationDAO dao = new ImageClassificationDAO();

        try {
            dataSets = dao.getImageDataSetList();
            ObjectMapper mapper = new ObjectMapper();
            String json = null;
            try{
                json  = mapper.writeValueAsString(dataSets);
            } catch (JsonProcessingException e) {
                e.printStackTrace();
                return "json fail";
            }

            return json; //success

        }catch (Exception e) {
            e.printStackTrace();
            return "DB fail";
        }
    }

    @RequestMapping(value="/test")
    public @ResponseBody String dbtest(){

        ImageRegistrationDAO dao = new ImageRegistrationDAO();
        try {
            ImageRegistrationDTO dto= dao.getImageRegistryInfo(6);
            System.out.println(dto.getId());
            System.out.println(dto.getImagePath());
            System.out.println(dto.getRequestDepart());
        }catch(Exception e){
            e.printStackTrace();
        }

        return "ok";
    }

    @GetMapping(value = "/classification") //, @RequestParam String filePath
    //public @ResponseBody HashMap<String, ArrayList<Object>> classification(@RequestParam String dhashValue, @RequestParam String depart) throws Exception
    public @ResponseBody HashMap<String, Object> classification(@RequestParam String dhashValue, @RequestParam String depart) throws Exception { //List<Animal>

        // todo : dhashValue or depart value null processing will need!
        Classification classification = new Classification(dhashValue, depart);

        classification.setClassificationAlgorithm(new KNN(), new PrincipleComponentAnalysis());
        classification.classification();

        //HashMap<String, ArrayList<Object>> predictResult = classification.getPredictResult();
        HashMap<String,Object> predictResult = classification.getPredictResult();

        System.out.println(predictResult.get("majorClass"));

        return predictResult;
    }

    @RequestMapping(value="/singleFileUpload")
    public @ResponseBody String singleFileUpload(@RequestParam("mediaFile") MultipartFile file, @RequestParam String request_depart){
        try{
            if(!file.getOriginalFilename().isEmpty()){
                //todo : replace path and save_file_name(부서+시간)

                String filePath = "/resources/ManageImageFile/" + file.getOriginalFilename();
                file.transferTo(new File("C:/Users/GIGABYTE/IdeaProjects/RestAPI_Test/out/artifacts/_/WEB-INF"+filePath));

                //todo: db에 저장
                ImageRegistrationDAO dao = new ImageRegistrationDAO();
                dao.insertImageRegistrationStatus(filePath, request_depart, "Unapproved");

                //todo : result json format
                return "Upload Success";
            }else{
                return "No file";
            }
        }catch(IOException e){
            return "Upload error";
        }
    }

    @RequestMapping(value="/dhashRegistration")
    public String dhashRegistration(@ModelAttribute("imageInfo")ImageInfoBean bean){
        try{
            ImageRegistry imageRegistry = new ImageRegistry(bean.getDepart());
            //todo: 상대경로로 변경필요
            String imageFilePath = "C:/Users/GIGABYTE/IdeaProjects/RestAPI_Test/out/artifacts/_/WEB-INF"+bean.getImagePath();
            imageRegistry.DhashCalcuate(imageFilePath);
            imageRegistry.insertDhash(bean.getFormName());

            ImageRegistrationDAO imageRegistrationDAO = new ImageRegistrationDAO();
            ImageFormLevelDAO imageFormLevelDAO = new ImageFormLevelDAO();

            imageRegistrationDAO.updateStatus(bean.getIndex(), "registrated");


            //todo : 이미 등록 되어있는 것도 바꿀지 여부를 한번 물어보고 바꿀 수 있도록 해야함.
            //todo : 경고창을 띄울 수 있도록 하는 것도 좋을듯.
            if(imageFormLevelDAO.getFormLevel(bean.getFormName()) == null){
                imageFormLevelDAO.insertFormLevel(bean.getFormName(), bean.getFormLevel());
            }else{
                //insert 대신 update로 변경
            }

        }catch(Exception e){
            e.printStackTrace();
            return "index";
        }
        return "index";
    }

    @RequestMapping(value="/imageRequestProcess", method= RequestMethod.GET)
    public String singleImageRequestView(@RequestParam int index, Model model){

        ImageRegistrationDAO dao = new ImageRegistrationDAO();

        try {
            ImageRegistrationDTO imageRegistrationInfo = dao.getImageRegistryInfo(index);
            model.addAttribute("viewData", imageRegistrationInfo);

            //todo: 상대 경로 변경
            String imageFilePath = "C:/Users/GIGABYTE/IdeaProjects/RestAPI_Test/out/artifacts/_/WEB-INF" + imageRegistrationInfo.getImagePath();
            ImageRegistry imageRegistry = new ImageRegistry(imageRegistrationInfo.getRequestDepart());
            String[] hashList = imageRegistry.DhashCalcuate(imageFilePath);

            //관리자가 이미지 등록을 원활히 하기 위해 추천 리스트를 작성하기 위한 classification
//            Classification classification = new Classification(hashList[0].replaceAll("\\n|\\s", ""), imageRegistrationInfo.getRequestDepart());
//
//            classification.setClassificationAlgorithm(new KNN(), new PrincipleComponentAnalysis());
//            classification.classification();
//
//            //HashMap<String, ArrayList<Object>> predictResult = classification.getPredictResult();
//            HashMap<String, Object> predictResult = classification.getPredictResult();
//
//            //String recommendFormName = (String)predictResult.get("majorClass").get(0);
//            String recommendFormName = (String)predictResult.get("majorClass");
//
//            //todo : 미분류된것을 찾으려고 하니 에러발생
//            if(!recommendFormName.equals("Unregistered")) {
//                ImageFormLevelDAO imageFormLevelDAO = new ImageFormLevelDAO();
//                String recommendFormLevel = imageFormLevelDAO.getFormLevel(recommendFormName).getFormName();
//
//                model.addAttribute("recommendFormName", recommendFormName);
//                model.addAttribute("recommendFormLevel", recommendFormLevel);
//
//                return "requestImage";
//            }else{
//                model.addAttribute("recommendFormName", "");
//                model.addAttribute("recommendFormLevel", "");
//
//                return "requestImage";
//            }

            return "requestImage";

        }catch (Exception e){
            e.printStackTrace();
            model.addAttribute("viewData", null);
            model.addAttribute("msg","error!");

            return "requestImage";
        }
    }

    //todo : 정규식 download restful
    @RequestMapping(value="/downloadRexFile")
    public @ResponseBody ResponseEntity<InputStreamResource> downloadRexFile() throws IOException{
        final String REX_FILE_PATH =  "C:/Users/GIGABYTE/IdeaProjects/RestAPI_Test/out/artifacts/_/WEB-INF" + "/resources/ManageRexFile/downloadTest.json";

        File file = new File(REX_FILE_PATH);
        InputStreamResource resource = new InputStreamResource(new FileInputStream(file));

        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment;filename=" + file.getName())
                .contentType(MediaType.APPLICATION_JSON).contentLength(file.length())
                .body(resource);
    }

    //todo : 정규식 최신 버전 체크


    //todo : 학습데이터 download restful
    @RequestMapping(value="/downloadTrainedFile")
    public @ResponseBody ResponseEntity<InputStreamResource> downloadTrainedFile() throws FileNotFoundException {
        ManageOCRFile manageOCRFile = new ManageOCRFile();

        //가장 최근 버전
        OCRTrainedFileDTO ocrFileDTO;
        try {
            ocrFileDTO = manageOCRFile.maximumVersionFile();
        }catch(Exception e){
            ocrFileDTO = null;
        }

        final String TRAINEDDATA_FILE_PATH =  "C:/Users/GIGABYTE/IdeaProjects/RestAPI_Test/out/artifacts/_/WEB-INF/resources/ManageOCRTrainedFile/" + ocrFileDTO.getFileName();

        File file = new File(TRAINEDDATA_FILE_PATH);
        InputStreamResource resource = new InputStreamResource(new FileInputStream(file));

        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment;filename=" + file.getName())
                .contentType(MediaType.APPLICATION_JSON).contentLength(file.length())
                .body(resource);

    }

    //학습데이터 업로드
    @RequestMapping(value="/uploadTrainedFile")
    public @ResponseBody String uploadTrainedFile(@RequestParam("mediaFile") MultipartFile file, @RequestParam String comment, @RequestParam String version){
        try{
            if(!file.getOriginalFilename().isEmpty()){
                //todo : replace path and save_file_name(부서+시간)
                String fileName = file.getOriginalFilename();
                int i = -1;
                i= fileName.lastIndexOf(".");
                String ext = fileName.substring(i, fileName.length());
                System.out.println(ext);

                if(!ext.equals(".traineddata")){
                    return "extension is wrong";
                }else{
                    String nowName = Utilization.fileNameChange();
                    String filePath = "/resources/ManageOCRTrainedFile/" + nowName;

                    file.transferTo(new File("C:/Users/GIGABYTE/IdeaProjects/RestAPI_Test/out/artifacts/_/WEB-INF" + filePath));

                    ManageOCRFile manageOCRFile = new ManageOCRFile();

                    try {
                        manageOCRFile.insertUpdateTraineddataLog(nowName, comment, version);
                    }catch (Exception e){
                        e.printStackTrace();
                        return "SQL INSERT ERROR";
                    }

                    return "Upload Success!!";
                }
            }else{
                return "No file";
            }
        }catch(IOException e){
            return "Upload error";
        }
    }

    //todo : 학습데이터 최신 버전 체크
    @RequestMapping(value="/trainFileRecentVersionCheck")
    public @ResponseBody String uploadTrainedFile(){
        ManageOCRFile manageOCRFile = new ManageOCRFile();
        try {
            OCRTrainedFileDTO dto = manageOCRFile.maximumVersionFile();
            return dto.getVersion();
        }catch(Exception e){
            e.printStackTrace();
            System.out.println("previous data is not founded");
            return "0.0.0";
        }
    }


    @RequestMapping(value="/logResultUpload")
    public @ResponseBody String logResultUpload(@RequestBody String body){
        try {
            DetectLog detectLog = new DetectLog();
            System.out.println(body);
            //detectLog.jsonMapping();
            detectLog.insertLog(body);

            return "test good";
        } catch (JsonGenerationException e){
            e.printStackTrace();
            return "Json Generation Error";
        } catch (JsonMappingException e){
            e.printStackTrace();
            return "Mapping error";
        }catch (IOException e){
            e.printStackTrace();
            return "ioException";
        }


    }

}
