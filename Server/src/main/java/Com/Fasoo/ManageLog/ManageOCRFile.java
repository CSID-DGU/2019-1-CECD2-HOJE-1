package Com.Fasoo.ManageLog;

import Com.Fasoo.DBController.OCRTrainedFileDAO;
import Com.Fasoo.DBController.OCRTrainedFileDTO;

import java.sql.Timestamp;

import java.util.List;

public class ManageOCRFile {
    private OCRTrainedFileDAO dao;

    public ManageOCRFile(){
        dao = new OCRTrainedFileDAO();
    }

    public void insertUpdateTraineddataLog(String fileName, String comment, String version){
        //Time time = new Time(new java.util.Date().getTime());
        Timestamp nowDate = new Timestamp(System.currentTimeMillis());
        dao.insertUploadFile(fileName, nowDate, comment, version);
    }

    public OCRTrainedFileDTO maximumVersionFile() throws  Exception {
        List<OCRTrainedFileDTO> list = dao.getUpdateLogList();

        if(list != null){

            OCRTrainedFileDTO result = list.get(0);
            String maxVersion = list.get(0).getVersion();

            for(int i=0; i< list.size(); i++){
                if(maxVersion.compareTo(list.get(i).getVersion()) < 0){
                    maxVersion = list.get(i).getVersion();
                    result = list.get(i);
                }
            }

            return result;
        }else{
            return null;
        }
    }
}
