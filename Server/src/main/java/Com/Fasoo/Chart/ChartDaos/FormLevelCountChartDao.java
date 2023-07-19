package Com.Fasoo.Chart.ChartDaos;

import Com.Fasoo.Chart.ChartModel.FormLevelCountChartData;

import java.util.List;
import java.util.Map;


public class FormLevelCountChartDao implements ChartDao {
    @Override
    public List<List<Map<Object, Object>>> getChartData() {
        FormLevelCountChartData data = new FormLevelCountChartData();
        return data.getFormLevelCountChartDataList();
    }
}
