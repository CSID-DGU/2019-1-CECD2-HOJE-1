package Com.Fasoo.ImageRegister;

import org.apache.commons.exec.CommandLine;
import org.apache.commons.exec.DefaultExecutor;
import org.apache.commons.exec.PumpStreamHandler;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.util.List;

import Com.Fasoo.DBController.ImageClassificationDAO;

public class ImageRegistry {

    private String depart;
    private String manageDepartListString;
    private String filePath;
    private String[] dhashValues;

    public ImageRegistry(){}

    public ImageRegistry(String depart, List<String> granted_depart){
        this.depart = depart;

        String result = "";
        for(int i = 0 ; i<granted_depart.size(); i++){
            result+=granted_depart.get(i);
            if(i != granted_depart.size()-1){
                result+="|";
            }
        }
        manageDepartListString = result;
    }

    public String[] DhashCalcuate(String filePath) throws IOException {
        //todo : 경로 변경 상대경로
        String dhashExePath = "C:/Users/GIGABYTE/IdeaProjects/RestAPI_Test/src/main/java/Com/Fasoo/ImageRegister/ServerDhashModule/ServerDhashModule.exe";
        String config = dhashExePath + " " + filePath;

        ByteArrayOutputStream stdout = new ByteArrayOutputStream();
        PumpStreamHandler psh = new PumpStreamHandler(stdout);
        CommandLine cl = CommandLine.parse(config);
        DefaultExecutor exec = new DefaultExecutor();
        exec.setStreamHandler(psh);
        exec.execute(cl);

        String hashResult = stdout.toString().trim();

        String[] hashList = hashResult.split("\\n");

        this.dhashValues = hashList;

        return hashList;
    }

    public boolean insertDhash(String formName){
        ImageClassificationDAO dao = new ImageClassificationDAO();
        boolean isOk = false;
        for(int i = 0 ; i<dhashValues.length; i++){
            System.out.println(dhashValues[i].replaceAll("\\n|\\s", ""));//todo: 지우기
            isOk = dao.insertImageDhashAndDepart(formName, dhashValues[i].replaceAll("\\n|\\s", ""), this.depart, this.manageDepartListString);
        }

        return isOk;
    }

    public String getDepart() {
        return depart;
    }

    public String[] getDhashValues() {
        return dhashValues;
    }


}
