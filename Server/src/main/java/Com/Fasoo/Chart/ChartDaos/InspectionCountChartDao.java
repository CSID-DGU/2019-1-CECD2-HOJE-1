package Com.Fasoo.Chart.ChartDaos;

import Com.Fasoo.Chart.ChartModel.ImageRegistrationChartData;
import Com.Fasoo.Chart.ChartModel.InspectionCountChartData;
import Com.Fasoo.DBController.InspectionLogDAO;

import java.util.List;
import java.util.Map;

public class InspectionCountChartDao implements ChartDao {

    @Override
    public List<List<Map<Object, Object>>> getChartData() {
        InspectionCountChartData data = new InspectionCountChartData();
        return data.getInspectionCountChartDataList();
    }
}
