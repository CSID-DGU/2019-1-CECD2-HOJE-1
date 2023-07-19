package Com.Fasoo.Chart.ChartModel;

import Com.Fasoo.DBController.ImageClassificationDAO;
import Com.Fasoo.DBController.ImageClassificationDTO;


import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class ImageRegistrationChartData {

    private Map<Object,Object> map = null;
    private List<List<Map<Object,Object>>> list = new ArrayList<List<Map<Object,Object>>>();
    private List<Map<Object,Object>> dataPoints1 = new ArrayList<Map<Object,Object>>();

    public ImageRegistrationChartData(){

        HashMap<String, Integer> countMap = new HashMap<>();
        ImageClassificationDAO registrationDAO = new ImageClassificationDAO();
        List<ImageClassificationDTO> datalist = null;
        int totalCount = 0;

        try {
            datalist = registrationDAO.getImageDataSetList();
        }catch (Exception e){
            System.out.println("sql error during drawing chart!");
            datalist = null;
        }

        totalCount = datalist.size();

        for(int i=0; i< totalCount; i++){
            String key = datalist.get(i).getFormName();
            if(countMap.get(key) != null){
                countMap.put(key, countMap.get(key)+1);
            }else{
                countMap.put(key, 1);
            }
        }

        for(String key : countMap.keySet()){
            map = new HashMap<Object,Object>();
            map.put("label", key);
            map.put("y", (Float.valueOf((float) countMap.get(key) / (float) totalCount))*100);
            dataPoints1.add(map);
        }

        list.add(dataPoints1);
    }

    public List<List<Map<Object, Object>>> getImageRegistrationDataList() {
        return this.list;
    }
}