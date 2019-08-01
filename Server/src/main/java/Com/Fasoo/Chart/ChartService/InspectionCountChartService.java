package Com.Fasoo.Chart.ChartService;

import Com.Fasoo.Chart.ChartDaos.ChartDao;
import Com.Fasoo.Chart.ChartDaos.InspectionCountChartDao;

import java.util.List;
import java.util.Map;

public class InspectionCountChartService implements ChartService {
    private ChartDao chartDao = new InspectionCountChartDao();

    public void setChartDao(ChartDao chartDao) {this.chartDao = chartDao;}

    @Override
    public List<List<Map<Object, Object>>> getChartData() {
        return chartDao.getChartData();
    }
}
