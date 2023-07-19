package Com.Fasoo.ManageLog;

import Com.Fasoo.DBController.OCRTrainImageDAO;
import Com.Fasoo.DBController.OCRTrainImageDTO;
import Com.Fasoo.Utilization.Utilization;
import net.lingala.zip4j.core.ZipFile;
import net.lingala.zip4j.model.ZipParameters;
import net.lingala.zip4j.util.Zip4jConstants;

import java.sql.Timestamp;
import java.text.SimpleDateFormat;
import java.util.List;

public class DownloadOCRTrainImage {
    private final String path ="C:/Users/GIGABYTE/IdeaProjects/RestAPI_Test/out/artifacts/_/WEB-INF";
    private List<OCRTrainImageDTO> downloadList;
    OCRTrainImageDAO ocrTrainImageDAO;

    public DownloadOCRTrainImage(){
        this.ocrTrainImageDAO = new OCRTrainImageDAO();
        downloadList = ocrTrainImageDAO.getDownloadImageList();
    }

    public String zipDir(){

        Timestamp nowDate = new Timestamp(System.currentTimeMillis());
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");

        String zipFileName = path+"/resources/ManageTrainImageFile/"+ Utilization.getMD5(sdf.format(nowDate))+".zip";

        try{
            ZipFile zipfile = new ZipFile(zipFileName);
            ZipParameters parameters = new ZipParameters();
            parameters.setCompressionMethod(Zip4jConstants.COMP_DEFLATE);
            parameters.setCompressionLevel(Zip4jConstants.DEFLATE_LEVEL_NORMAL);
            System.out.println(downloadList.size());
            for(int i = 0; i<downloadList.size(); i++){
                zipfile.addFolder(path+downloadList.get(i).getFolderPath(), parameters);
            }
            System.out.println("zip complete");
        }catch (Exception e){
            e.printStackTrace();
        }

        for(int i =0; i<downloadList.size(); i++){
            ocrTrainImageDAO.setDownloadFlag(downloadList.get(i).getFolderPath());
        }

        return zipFileName;
    }

}
