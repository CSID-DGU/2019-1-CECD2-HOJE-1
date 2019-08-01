package Com.Fasoo.Controller;

import java.util.List;
import java.util.Map;

import Com.Fasoo.Chart.ChartService.*;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@Controller
public class ChartController {

    @RequestMapping(value="/", method = RequestMethod.GET)
    public String testChart(ModelMap modelMap) {
        ChartService chartService = new ImageRegistrationChartService();

        List<List<Map<Object, Object>>> dataList = chartService.getChartData();
        modelMap.addAttribute("dataPointsList", dataList);

        return "chart";
    }

    @RequestMapping(value="/drawingTotalFormLevelChart", method = RequestMethod.GET)
    public String formLevelChart(ModelMap modelMap) {
        ChartService chartService = new FormLevelCountChartService();

        List<List<Map<Object, Object>>> dataList = chartService.getChartData();
        modelMap.addAttribute("dataPointsList", dataList);

        return "totalFormLevel";
    }

    @RequestMapping(value="/drawingFitnessChart", method = RequestMethod.GET)
    public String fitnessChart(ModelMap modelMap) {
        ChartService chartService = new FitnessCountChartService();

        List<List<Map<Object, Object>>> dataList = chartService.getChartData();
        modelMap.addAttribute("dataPointsList", dataList);

        return "fitnessChart";
    }

    @RequestMapping(value="/drawingInspectionCountChart", method = RequestMethod.GET)
    public String inspectionCountChart(ModelMap modelMap) {
        ChartService chartService = new InspectionCountChartService();

        List<List<Map<Object, Object>>> dataList = chartService.getChartData();
        modelMap.addAttribute("dataPointsList", dataList);

        return "inspectionCountChart";
    }

}     