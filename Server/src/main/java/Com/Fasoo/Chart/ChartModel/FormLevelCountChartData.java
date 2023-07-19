package Com.Fasoo.Chart.ChartModel;

import Com.Fasoo.DBController.InspectionLogDAO;


import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class FormLevelCountChartData {

    private Map<Object,Object> map = null;
    private List<List<Map<Object,Object>>> list = new ArrayList<List<Map<Object,Object>>>();
    private List<Map<Object,Object>> dataPoints1 = new ArrayList<Map<Object,Object>>();

    public FormLevelCountChartData(){

        InspectionLogDAO inspectionLogDAO = new InspectionLogDAO();
        Map<String, Integer> formLevelMap = inspectionLogDAO.totalFormLevelCountList();

        int totalCount = formLevelMap.get("대외비") + formLevelMap.get("공개") + formLevelMap.get("사내한");

        for(String key : formLevelMap.keySet()){
            map = new HashMap<Object,Object>();
            map.put("label", key);
            map.put("y", formLevelMap.get(key));//(Float.valueOf((float) formLevelMap.get(key) / (float) totalCount))*100
            dataPoints1.add(map);
        }

        list.add(dataPoints1);
    }

    public List<List<Map<Object, Object>>> getFormLevelCountChartDataList() {
        return this.list;
    }
}
