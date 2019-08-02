package Com.Fasoo.Chart.ChartModel;

import Com.Fasoo.DBController.InspectionLogDAO;

import java.sql.Timestamp;
import java.util.*;


public class FitnessCountChartData {

    private Map<Object,Object> map = null;
    private List<List<Map<Object,Object>>> list = new ArrayList<List<Map<Object,Object>>>();
    private List<Map<Object,Object>> dataPoints1 = new ArrayList<Map<Object,Object>>();
    private List<Map<Object,Object>> dataPoints2 = new ArrayList<Map<Object,Object>>();
    private List<Map<Object,Object>> dataPoints3 = new ArrayList<Map<Object,Object>>();

    public FitnessCountChartData(){
        InspectionLogDAO inspectionLogDAO = new InspectionLogDAO();

        for(int i = -7; i<=0; i++){
            Calendar date = new GregorianCalendar(Locale.KOREA);
            date.add(Calendar.DATE, i);

            Map<String, Integer> fitnessMap =  inspectionLogDAO.fitnessStatusMap(date);
            Timestamp ts = new Timestamp(date.getTimeInMillis());

            //System.out.println(fitnessMap);
            if(fitnessMap != null){
                {
                    map = new HashMap<Object, Object>();
                    map.put("x", ts.getTime());
                    if(fitnessMap.get("부적합") != null)
                        map.put("y", fitnessMap.get("부적합"));
                    else
                        map.put("y", 0);
                    dataPoints1.add(map);
                }

                {
                    map = new HashMap<Object, Object>();
                    map.put("x", ts.getTime());
                    if(fitnessMap.get("적합") != null)
                        map.put("y", fitnessMap.get("적합"));
                    else
                        map.put("y", 0);
                    dataPoints2.add(map);
                }

                {
                    map = new HashMap<Object, Object>();
                    map.put("x", ts.getTime());
                    if(fitnessMap.get("보통")!=null)
                        map.put("y", fitnessMap.get("보통"));
                    else
                        map.put("y", 0);
                    dataPoints3.add(map);
                }
            }else{
                {
                    map = new HashMap<Object, Object>();
                    map.put("x", ts.getTime());
                    map.put("y", 0);
                    dataPoints1.add(map);
                    dataPoints2.add(map);
                    dataPoints3.add(map);
                }
            }
        }

        list.add(dataPoints1);
        list.add(dataPoints2);
        list.add(dataPoints3);
    }

    public List<List<Map<Object, Object>>> getFitnessCountChartDataList() {
        return this.list;
    }
}
