package Com.Fasoo.ManageLog;

import Com.Fasoo.DBController.OCRTrainImageDAO;
import Com.Fasoo.DBController.OCRTrainImageDTO;
import Com.Fasoo.Utilization.Utilization;
import org.springframework.web.multipart.MultipartFile;

import javax.imageio.ImageIO;
import java.awt.image.BufferedImage;
import java.io.*;
import java.sql.Timestamp;
import java.text.SimpleDateFormat;

public class UploadOCRTrainImage {
    private final String path ="C:/Users/GIGABYTE/IdeaProjects/RestAPI_Test/out/artifacts/_/WEB-INF/resources/ManageTrainImageFile/";
    private OCRTrainImageDTO ocrTrainImageDTO = new OCRTrainImageDTO();
    private String folderName = null;

    public UploadOCRTrainImage(String ip, String depart, String originFileName) throws IOException {

        ocrTrainImageDTO.setIp(ip);
        ocrTrainImageDTO.setDepart(depart);
        ocrTrainImageDTO.setIsDownload(false);

        Timestamp nowDate = new Timestamp(System.currentTimeMillis());
        ocrTrainImageDTO.setRequestDate(nowDate);
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");

        int index = originFileName.lastIndexOf(".");
        String pureFileName = originFileName.substring(0, index);
        folderName = pureFileName+"_"+ Utilization.getMD5(ip+sdf.format(nowDate));
        ocrTrainImageDTO.setFolderPath("/resources/ManageTrainImageFile/" + folderName);

        File mkFolder = new File(path+folderName);

        if(!mkFolder.mkdirs()){//파일 생성 에러의 경우 IoException throw
            throw new IOException();
        }
    }

    public boolean saveFile(MultipartFile file, String text, String pureFileName, String textFileName) throws Exception{

        ByteArrayInputStream in = new ByteArrayInputStream(file.getBytes());
        BufferedImage bufferedImage = ImageIO.read(in);
        ImageIO.write(bufferedImage, "jpg", new File(path+folderName, pureFileName+".jpg"));

        in = new ByteArrayInputStream(file.getBytes());
        bufferedImage = ImageIO.read(in);
        ImageIO.write(bufferedImage, "tif", new File(path+folderName, pureFileName+".tif"));

        //인코딩 변경
        //FileWriter fileWriter = new FileWriter();
        BufferedWriter fileWriter = new BufferedWriter(
                                            new OutputStreamWriter(new FileOutputStream(path+folderName + "/" + textFileName), "UTF8"));
        fileWriter.write(text);
        fileWriter.close();

        return true;
    }

    public boolean insertUploadImageInfo(){
        OCRTrainImageDAO ocrTrainImageDAO = new OCRTrainImageDAO();
        return ocrTrainImageDAO.insertRequestImage(ocrTrainImageDTO);
    }
}
