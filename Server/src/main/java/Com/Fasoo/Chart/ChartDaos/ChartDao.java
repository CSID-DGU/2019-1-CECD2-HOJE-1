package Com.Fasoo.Chart.ChartDaos;

import java.util.List;
import java.util.Map;

public interface ChartDao {
    List<List<Map<Object, Object>>> getChartData();
}
