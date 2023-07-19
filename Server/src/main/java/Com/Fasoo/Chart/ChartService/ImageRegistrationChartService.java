package Com.Fasoo.Chart.ChartService;

import java.util.List;
import java.util.Map;

import Com.Fasoo.Chart.ChartDaos.ChartDao;

import Com.Fasoo.Chart.ChartDaos.ImageRegistrationChartDao;
public class ImageRegistrationChartService implements ChartService {

    private ChartDao chartDao = new ImageRegistrationChartDao();

    public void setChartDao(ChartDao chartDao) {
        this.chartDao = chartDao;
    }

    @Override
    public List<List<Map<Object, Object>>> getChartData() {
        return chartDao.getChartData();
    }

}