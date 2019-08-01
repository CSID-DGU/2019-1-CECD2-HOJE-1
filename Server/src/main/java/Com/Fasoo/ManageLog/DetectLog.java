package Com.Fasoo.ManageLog;

import Com.Fasoo.DBController.InspectionLogDAO;
import Com.Fasoo.Utilization.Utilization;
import com.fasterxml.jackson.core.JsonGenerationException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.ObjectMapper;

import java.io.IOException;
import java.sql.Timestamp;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class DetectLog {

    private ObjectMapper mapper = new ObjectMapper();
    private Map<Object, Object> map = new HashMap<Object, Object>();

    private String jsonList;
    private List<InspectionInfo> list;
    private String ip;
    private String inspectionDate;
    private String depart;

    public DetectLog(){}

    public void jsonMapping(String body) throws JsonGenerationException, JsonMappingException, IOException {
        body = body.substring(1, body.length()-1);
        body = body.replaceAll("\\\\\\\\","/");
        body = body.replaceAll("\\\\","");

        this.map = this.mapper.readValue(body, new TypeReference<Map<Object, Object>>() {});

        this.ip = map.get("ip").toString();
        this.inspectionDate = map.get("date").toString();
        this.depart = map.get("depart").toString();
        this.jsonList = mapper.writerWithDefaultPrettyPrinter().writeValueAsString(map.get("list"));
        this.list = mapper.readValue(jsonList, new TypeReference<List<InspectionInfo>>() {});
    }

    public void insertLog(String body)  throws JsonGenerationException, JsonMappingException, IOException  {
        jsonMapping(body);

        try {
            SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd hh:mm:ss");
            Date paredDate = dateFormat.parse(this.inspectionDate);
            Timestamp inspectionTimestamp = new java.sql.Timestamp(paredDate.getTime());

            String inspectionCode = Utilization.getMD5(this.ip+this.inspectionDate);

            InspectionLogDAO inspectionLogDAO = new InspectionLogDAO();
            inspectionLogDAO.insertInspectionDate(inspectionCode, this.ip, inspectionTimestamp, this.depart);

            for(int i = 0; i<list.size(); i++){
                String fileName = list.get(i).getFileName();
                String filePath = list.get(i).getFilePath();
                String classification = list.get(i).getClassification();
                String formLevel = list.get(i).getFormLevel();
                String fitness = list.get(i).getFitness();
                int detectCount = list.get(i).getDetectCount();

                String fileCode = Utilization.getMD5(inspectionCode+filePath);
                List<String> detectList = list.get(i).getDetectList();
                String detectListString="";
                for(int j = 0 ; j<detectList.size(); j++){
                    detectListString+=detectList.get(j);
                    if(j != detectList.size()-1){
                        detectListString+="|";
                    }
                }
                inspectionLogDAO.insertInspectionInfo(fileCode, inspectionCode, fileName, filePath, classification, formLevel, fitness, detectCount, detectListString);
            }
        }catch (Exception e){
            e.printStackTrace();
        }
    }

}
