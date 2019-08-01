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
                    if(fitnessMap.get("RED") != null)
                        map.put("y", fitnessMap.get("RED"));
                    else
                        map.put("y", 0);
                    dataPoints1.add(map);
                }

                {
                    map = new HashMap<Object, Object>();
                    map.put("x", ts.getTime());
                    if(fitnessMap.get("GREEN") != null)
                        map.put("y", fitnessMap.get("GREEN"));
                    else
                        map.put("y", 0);
                    dataPoints2.add(map);
                }

                {
                    map = new HashMap<Object, Object>();
                    map.put("x", ts.getTime());
                    if(fitnessMap.get("YELLOW")!=null)
                        map.put("y", fitnessMap.get("YELLOW"));
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
