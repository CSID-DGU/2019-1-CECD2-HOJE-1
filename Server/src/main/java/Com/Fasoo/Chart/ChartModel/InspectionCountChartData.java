package Com.Fasoo.Chart.ChartModel;

import Com.Fasoo.DBController.InspectionLogDAO;

import java.sql.Timestamp;
import java.util.*;

public class InspectionCountChartData {
    private Map<Object,Object> map = null;
    private List<List<Map<Object,Object>>> list = new ArrayList<List<Map<Object,Object>>>();
    private List<Map<Object,Object>> dataPoints1 = new ArrayList<Map<Object,Object>>();

    public InspectionCountChartData(){
        InspectionLogDAO inspectionLogDAO = new InspectionLogDAO();

        for(int i = -4; i<=0; i++){
            Calendar date = new GregorianCalendar(Locale.KOREA);
            date.add(Calendar.DATE, i);

            date.set(Calendar.HOUR_OF_DAY, 0);
            date.set(Calendar.MINUTE, 0);
            date.set(Calendar.SECOND, 0);
            date.set(Calendar.MILLISECOND, 0);

            Timestamp ts = new Timestamp(date.getTimeInMillis());

            int inspectionCount = inspectionLogDAO.inspectionCountbyDate(date);

            map = new HashMap<Object, Object>();
            map.put("x", ts.getTime());
            map.put("y", inspectionCount);
            dataPoints1.add(map);
        }

        list.add(dataPoints1);
    }

    public List<List<Map<Object, Object>>> getInspectionCountChartDataList() {
        return this.list;
    }
}
