package Com.Fasoo.Chart.ChartDaos;

import Com.Fasoo.Chart.ChartModel.FitnessCountChartData;

import java.util.List;
import java.util.Map;

public class FitnessCountChartDao implements ChartDao {

    @Override
    public List<List<Map<Object, Object>>> getChartData() {
        FitnessCountChartData fitnessCountChartData = new FitnessCountChartData();

        return fitnessCountChartData.getFitnessCountChartDataList();
    }
}
