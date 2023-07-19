package Com.Fasoo.Chart.ChartDaos;

import Com.Fasoo.Chart.ChartModel.ImageRegistrationChartData;

import java.util.List;
import java.util.Map;

public class ImageRegistrationChartDao implements ChartDao {
    @Override
    public List<List<Map<Object, Object>>> getChartData() {
        ImageRegistrationChartData data = new ImageRegistrationChartData();
        return data.getImageRegistrationDataList();
    }
}
