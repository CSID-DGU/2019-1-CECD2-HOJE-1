package Com.Fasoo.Controller;

import java.util.*;

import Com.Fasoo.Chart.ChartService.*;
import Com.Fasoo.DBController.InspectionLogDAO;
import Com.Fasoo.DBController.OCRTrainedFileDTO;
import Com.Fasoo.ManageLog.ManageOCRFile;
import Com.Fasoo.ViewModel.RecentDetectView;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
public class ChartController {

    //@RequestMapping(value="/mainDashBoard", method = RequestMethod.GET)
    @RequestMapping(value="/mainDashBoard", method = RequestMethod.GET)
    public String makeUpMainDashBoard(ModelMap modelMap) {

        ChartService chartService = new FitnessCountChartService();
        List<List<Map<Object, Object>>> fitnessDataList = chartService.getChartData();
        modelMap.addAttribute("fitnessDataPointsList", fitnessDataList);

        chartService = new InspectionCountChartService();
        List<List<Map<Object, Object>>> inspectionCountDataList = chartService.getChartData();
        modelMap.addAttribute("inspectionCountDataPointsList", inspectionCountDataList);

        chartService = new ImageRegistrationChartService();
        List<List<Map<Object, Object>>> imageRegistrationStatusDataList = chartService.getChartData();
        modelMap.addAttribute("imageRegistrationStatusDataPointsList", imageRegistrationStatusDataList);

        chartService = new FormLevelCountChartService();
        List<List<Map<Object, Object>>> formLevelCountDataList = chartService.getChartData();
        modelMap.addAttribute("formLevelCountDataPointsList", formLevelCountDataList);

        ManageOCRFile manageOCRFile = new ManageOCRFile();
        try {
            OCRTrainedFileDTO dto = manageOCRFile.maximumVersionFile();
            modelMap.addAttribute("trainedFileVersion", dto.getVersion());
        }catch(Exception e){
            e.printStackTrace();
            modelMap.addAttribute("trainedFileVersion", "0.0.0");
        }

        InspectionLogDAO inspectionLogDAO = new InspectionLogDAO();
        Calendar date = new GregorianCalendar(Locale.KOREA);

        List<RecentDetectView> recentDetectView = inspectionLogDAO.detectCountByDate(date);
        modelMap.addAttribute("detectCountList", recentDetectView);

        return "dashBoardMain_2";
    }

    @RequestMapping(value="/", method = RequestMethod.GET)
    public String test(ModelMap modelMap){
        InspectionLogDAO inspectionLogDAO = new InspectionLogDAO();
        Calendar date = new GregorianCalendar(Locale.KOREA);

        List<RecentDetectView> recentDetectView = inspectionLogDAO.detectCountByDate(date);
        modelMap.addAttribute("detectCountList", recentDetectView);

        return "dashBoardMain";
    }

    @RequestMapping(value="/getRegistrationChartData", method = RequestMethod.GET)
    public @ResponseBody List<List<Map<Object, Object>>> registrationChart(){
        ChartService chartService = new ImageRegistrationChartService();
        List<List<Map<Object, Object>>> imageRegistrationStatusDataList = chartService.getChartData();
        return imageRegistrationStatusDataList;
    }

    @RequestMapping(value="/getFitnessChartData", method = RequestMethod.GET)
    public @ResponseBody List<List<Map<Object, Object>>> fitnessChart() {
        ChartService chartService = new FitnessCountChartService();
        List<List<Map<Object, Object>>> fitnessDataList = chartService.getChartData();
        return fitnessDataList;
    }

    @RequestMapping(value="/getInspectionCountChartData", method = RequestMethod.GET)
    public @ResponseBody List<List<Map<Object, Object>>> inspectionCountChart() {
        ChartService chartService = new InspectionCountChartService();
        List<List<Map<Object, Object>>> inspectionCountDataList = chartService.getChartData();
        return inspectionCountDataList;
    }

    @RequestMapping(value="/getTotalFormLevelChartData", method = RequestMethod.GET)
    public @ResponseBody List<List<Map<Object, Object>>>  chartTest() {
        ChartService chartService = new FormLevelCountChartService();
        List<List<Map<Object, Object>>> formLevelCountDataList = chartService.getChartData();
        return formLevelCountDataList;
    }


}     