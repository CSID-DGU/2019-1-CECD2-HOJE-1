package Com.Fasoo.ViewModel;
import org.springframework.stereotype.Component;

import java.sql.Timestamp;
import java.util.List;

@Component
public class ImageInfoBean {

    private int index;
    private String imagePath;
    private String depart;
    private String ip;
    private String requestTime;
    private String formName;
    private String formLevel;
    private List<String> departCheck;

    public String getIp() {
        return ip;
    }

    public String getDepart() {
        return depart;
    }

    public String getFormLevel() {
        return formLevel;
    }

    public String getFormName() {
        return formName;
    }

    public int getIndex() {
        return index;
    }

    public String getImagePath() {
        return imagePath;
    }

    public String getRequestTime() {
        return requestTime;
    }

    public List<String> getDepartCheck() {
        return departCheck;
    }

    public void setRequestTime(String requestTime) {
        this.requestTime = requestTime;
    }

    public void setIp(String ip) {
        this.ip = ip;
    }

    public void setImagePath(String imagePath) {
        this.imagePath = imagePath;
    }

    public void setDepart(String depart) {
        this.depart = depart;
    }

    public void setFormName(String formName) {
        this.formName = formName;
    }

    public void setFormLevel(String formLevel) {
        this.formLevel = formLevel;
    }

    public void setIndex(int index) {
        this.index = index;
    }

    public void setDepartCheck(List<String> departCheck) {
        this.departCheck = departCheck;
    }
}
