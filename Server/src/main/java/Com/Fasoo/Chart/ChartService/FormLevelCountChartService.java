package Com.Fasoo.Chart.ChartService;

import Com.Fasoo.Chart.ChartDaos.ChartDao;
import Com.Fasoo.Chart.ChartDaos.FormLevelCountChartDao;

import java.util.List;
import java.util.Map;

public class FormLevelCountChartService implements  ChartService {

    private ChartDao chartDao = new FormLevelCountChartDao();

    public void setChartDao(ChartDao chartDao) {
        this.chartDao = chartDao;
    }

    @Override
    public List<List<Map<Object, Object>>> getChartData() {
        return chartDao.getChartData();
    }
}
