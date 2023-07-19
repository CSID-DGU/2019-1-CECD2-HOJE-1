package Com.Fasoo.ViewModel;

import java.sql.Timestamp;
import java.util.List;

public class OcrTrainRequestView {
    private String folderPath;
    private List<String> imagePath;
    private String ip;
    private Timestamp requestTime;

    public void setFolderPath(String folderPath) {
        this.folderPath = folderPath;
    }

    public void setIp(String ip) {
        this.ip = ip;
    }

    public void setImagePath(List<String> imagePath) {
        this.imagePath = imagePath;
    }

    public void setRequestTime(Timestamp requestTime) {
        this.requestTime = requestTime;
    }

    public String getFolderPath() {
        return folderPath;
    }

    public String getIp() {
        return ip;
    }

    public List<String> getImagePath() {
        return imagePath;
    }

    public Timestamp getRequestTime() {
        return requestTime;
    }

}
