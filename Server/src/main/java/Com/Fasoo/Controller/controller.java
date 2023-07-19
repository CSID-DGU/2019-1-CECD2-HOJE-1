package Com.Fasoo.Controller;
import Com.Fasoo.DBController.*;
import Com.Fasoo.ImageClassification.Classification;
import Com.Fasoo.ImageRegister.ImageRegistry;
import Com.Fasoo.ManageLog.DetectLog;
import Com.Fasoo.ManageLog.DownloadOCRTrainImage;
import Com.Fasoo.ManageLog.ManageOCRFile;
import Com.Fasoo.ManageLog.UploadOCRTrainImage;
import Com.Fasoo.PredictModel.KNN;
import Com.Fasoo.PredictModel.PrincipleComponentAnalysis;
import Com.Fasoo.Utilization.Utilization;
import Com.Fasoo.ViewModel.ImageInfoBean;
import Com.Fasoo.ViewModel.OcrTrainRequestView;
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

import javax.servlet.http.HttpServletRequest;
import java.io.*;

import java.sql.Timestamp;
import java.util.*;

@Controller
public class controller {

    @RequestMapping(value="/classificationRequest")
    public String indexPage(Model model){
        List<ImageRegistrationDTO> imageList = null;
        ImageRegistrationDAO imageRegistrationDAO = new ImageRegistrationDAO();
        try {
            imageList = imageRegistrationDAO.getImageRegistryList();
            model.addAttribute("imageInfoList", imageList);
        }catch(Exception e){
            e.printStackTrace();
            model.addAttribute("imageInfoList", null);
        }
        return "classificationRequest";
    }

    @RequestMapping(value="/test")//
    public  @ResponseBody String indexJson(@ModelAttribute("imageInfo") ImageInfoBean bean){
        System.out.println(bean.getImagePath());
        System.out.println(bean.getFormName());
        System.out.println(bean.getFormLevel());

        for(String value : bean.getDepartCheck()){
            System.out.println(value);
        }

        System.out.println(bean.getIndex());

        return "test";
    }

    @RequestMapping(value="/index")//@ModelAttribute("imageInfo") ImageInfoBean bean
    public String index(){
        return "etc/index";
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

    @GetMapping(value = "/classification") //, @RequestParam String filePath
    //public @ResponseBody HashMap<String, ArrayList<Object>> classification(@RequestParam String dhashValue, @RequestParam String depart) throws Exception
    public @ResponseBody HashMap<String, Object> classification(@RequestParam String dhashValue, @RequestParam String depart) throws Exception {

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
    public @ResponseBody String singleFileUpload(HttpServletRequest requestContext, @RequestParam("mediaFile") MultipartFile file, @RequestParam String request_depart, @RequestParam String comment){
        String ip = requestContext.getRemoteAddr();
        Calendar date = new GregorianCalendar(Locale.KOREA);

        date.set(Calendar.HOUR_OF_DAY, 0);
        date.set(Calendar.MINUTE, 0);
        date.set(Calendar.SECOND, 0);
        date.set(Calendar.MILLISECOND, 0);
        Timestamp reqTime = new Timestamp(date.getTimeInMillis());
        try{
            if(!file.getOriginalFilename().isEmpty()){
                //todo : replace path and save_file_name(부서+시간)

                String filePath = "/resources/ManageImageFile/" + file.getOriginalFilename();
                file.transferTo(new File("C:/Users/GIGABYTE/IdeaProjects/RestAPI_Test/out/artifacts/_/WEB-INF"+filePath));

                //todo: db에 저장
                ImageRegistrationDAO dao = new ImageRegistrationDAO();
                dao.insertImageRegistrationStatus(filePath, ip,request_depart,reqTime, comment,"Unapproved");

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
    public String dhashRegistration(@ModelAttribute("imageInfo") ImageInfoBean bean){
        try{
            ImageRegistry imageRegistry = new ImageRegistry(bean.getDepart(), bean.getDepartCheck());
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
            return "redirect:/classificationRequest";
        }
        return "redirect:/classificationRequest";
    }

    @RequestMapping(value="/imageRequestProcess", method= RequestMethod.GET)
    public String singleImageRequestView(@RequestParam int index, Model model){

        ImageRegistrationDAO dao = new ImageRegistrationDAO();

        try {
            ImageRegistrationDTO imageRegistrationInfo = dao.getImageRegistryInfo(index);
            model.addAttribute("viewData", imageRegistrationInfo);

            //관리자가 이미지 등록을 원활히 하기 위해 추천 리스트를 작성하기 위한 classification
            //todo: 상대 경로 변경
//            String imageFilePath = "C:/Users/GIGABYTE/IdeaProjects/RestAPI_Test/out/artifacts/_/WEB-INF" + imageRegistrationInfo.getImagePath();
//            ImageRegistry imageRegistry = new ImageRegistry(imageRegistrationInfo.getRequestDepart());
//            String[] hashList = imageRegistry.DhashCalcuate(imageFilePath);


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

            return "etc/requestImage";

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
        final String REX_FILE_PATH =  "C:/Users/GIGABYTE/IdeaProjects/RestAPI_Test/out/artifacts/_/WEB-INF" + "/resources/ManageRexFile/reg.json";

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

    @PostMapping("/multipleFileUpload")
    public @ResponseBody String multipleFileUploadTestConvert(HttpServletRequest requestContext, @RequestParam("mediaFile") MultipartFile[] files, String[] text, String originFileName, String depart){
        String ip = requestContext.getRemoteAddr();
        UploadOCRTrainImage uploadOCRTrainImage = null;

        // Save mediaFile on system
        if(files.length != 0) {
            try {
                uploadOCRTrainImage = new UploadOCRTrainImage(ip, depart, originFileName);
            }catch (Exception e){
                e.printStackTrace();
                return "directory create Error";
            }
        }

        for (int i =0; i<files.length; i++) {
            if (!files[i].getOriginalFilename().isEmpty()) {
                String fileName = files[i].getOriginalFilename();
                int index = fileName.lastIndexOf(".");
                String pureFileName = fileName.substring(0, index);
                String textFileName = fileName.substring(0, index) + ".gt.txt";

                try {
                    uploadOCRTrainImage.saveFile(files[i], text[i], pureFileName, textFileName);
                }catch (Exception e) {
                    e.printStackTrace();
                    return "file save Error";
                }
                //TODO: DB에 저장 경로 fileName, textFileName 저장
            } else {
                return "Please select at least one mediaFile";
            }
        }

        if(!uploadOCRTrainImage.insertUploadImageInfo()){
            return "sql Insert error";
        }

        return "Multiple files uploaded successfully.";
    }

    @RequestMapping(value="/OCRTrainImageList")
    public String OCRTrainImageList(@RequestParam int pageNum, Model model){
        final String absPath ="C:/Users/GIGABYTE/IdeaProjects/RestAPI_Test/out/artifacts/_/WEB-INF/";
        List<OCRTrainImageDTO> list = null;
        OCRTrainImageDAO ocrTrainImageDAO = new OCRTrainImageDAO();
        List<OcrTrainRequestView> requestViewList = new ArrayList<OcrTrainRequestView>();

        try {
            list = ocrTrainImageDAO.getDownloadImageList();

            for(OCRTrainImageDTO info : list) {
                OcrTrainRequestView ocrTrainRequestView = new OcrTrainRequestView();
                ocrTrainRequestView.setFolderPath(info.getFolderPath());
                ocrTrainRequestView.setIp(info.getIp());
                ocrTrainRequestView.setRequestTime(info.getRequestDate());

                File folder = new File(absPath + info.getFolderPath());

                List<String> thumbNailImagePath = new ArrayList<String>();

                for(final File fileEntry : folder.listFiles()){
                    String name = fileEntry.getName();
                    int index = name.lastIndexOf(".");
                    String ext = name.substring(index, name.length());
                    //System.out.println(ext);

                    if(ext.equals(".jpg")){
                        //경로 수정 필요....
                        thumbNailImagePath.add(fileEntry.getCanonicalPath().replace("C:\\Users\\GIGABYTE\\IdeaProjects\\RestAPI_Test\\out\\artifacts\\_\\WEB-INF",""));
                    }

                    if(thumbNailImagePath.size() > 3) //섬네일 이미지 4개
                        break;
                }
                ocrTrainRequestView.setImagePath(thumbNailImagePath);
                requestViewList.add(ocrTrainRequestView);
            }

        }catch (Exception e){
            e.printStackTrace();
            return "recognitionFault";
        }

        model.addAttribute("requestImageList", requestViewList);
        return "recognitionFault";
    }

    @RequestMapping(value="/singleOCRRequestView")
    public String test(@RequestParam String folderPath,@RequestParam String ip, @RequestParam String reqTime, Model model) {
        final String absPath ="C:/Users/GIGABYTE/IdeaProjects/RestAPI_Test/out/artifacts/_/WEB-INF/";
        List<String> textList = new ArrayList<String>();
        List<String> pathList = new ArrayList<String>();

        try {
            File folder = new File(absPath + folderPath);

            for(final File fileEntry : folder.listFiles()){
                String name = fileEntry.getName();
                int index = name.lastIndexOf(".");
                String ext = name.substring(index, name.length());
                switch(ext){
                    case ".txt":
                        //텍스트 파일 읽어와서 저장

                        BufferedReader br = new BufferedReader( new InputStreamReader(new FileInputStream(fileEntry.getPath()), "UTF8"));

                        try{
                            String result="";
                            String line;
                            while((line = br.readLine())!=null){
                                result += line;
                            }
                            textList.add(result);
                        }catch (Exception e){
                            e.printStackTrace();
                        }

                        br.close();

                        break;
                    case ".jpg":
                        pathList.add(fileEntry.getCanonicalPath().replace("C:\\Users\\GIGABYTE\\IdeaProjects\\RestAPI_Test\\out\\artifacts\\_\\WEB-INF",""));
                        break;

                    default:
                        //do nothing;
                }

            }
        }catch (Exception e){
            e.printStackTrace();
            return "recognitionFaultDetail";
        }

        model.addAttribute("ip", ip);
        model.addAttribute("reqTime", reqTime);
        model.addAttribute("textList", textList);
        model.addAttribute("pathList", pathList);
        return "recognitionFaultDetail";
    }


    @RequestMapping(value="/imageDownload")
    public @ResponseBody ResponseEntity<InputStreamResource> test() throws FileNotFoundException {
        DownloadOCRTrainImage downloadOCRTrainImage = new DownloadOCRTrainImage();
        String zipDir = downloadOCRTrainImage.zipDir();

        //System.out.println(zipDir);
        File file = new File(zipDir);

        InputStreamResource resource = new InputStreamResource(new FileInputStream(file));



        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment;filename=" + file.getName())
                .contentType(MediaType.APPLICATION_JSON).contentLength(file.length())
                .body(resource);
    }

    @RequestMapping(value="/getUpdateTime")
    public @ResponseBody String getUpdateTime() {
        ManageOCRFile manageOCRFile = new ManageOCRFile();
        String updateTime;

        try {
            updateTime = manageOCRFile.getRecentTime();
        }catch (Exception e){
            updateTime = "0000-00-00 00:00:00";
            e.printStackTrace();
        }

        return updateTime;
    }

}
