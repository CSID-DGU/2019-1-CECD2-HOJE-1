package Com.Fasoo.Chart.ChartService;

import Com.Fasoo.Chart.ChartDaos.ChartDao;
import Com.Fasoo.Chart.ChartDaos.FitnessCountChartDao;

import java.util.List;
import java.util.Map;

public class FitnessCountChartService implements ChartService {

    private ChartDao chartDao = new FitnessCountChartDao();

    public void setChartDao(ChartDao chartDao) {
        this.chartDao = chartDao;
    }
    @Override
    public List<List<Map<Object, Object>>> getChartData() {
        return chartDao.getChartData();
    }
}
