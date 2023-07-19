package Com.Fasoo.DBController;

import java.sql.Timestamp;

public class OCRTrainImageDTO {
    private String folderPath;
    private String ip;
    private String depart;
    private Timestamp requestDate;
    private boolean isDownload;

    public void setDepart(String depart) {
        this.depart = depart;
    }

    public void setIp(String ip) {
        this.ip = ip;
    }

    public void setIsDownload(boolean download) {
        this.isDownload = download;
    }

    public void setFolderPath(String folderPath) {
        this.folderPath = folderPath;
    }

    public void setRequestDate(Timestamp requestDate) {
        this.requestDate = requestDate;
    }

    public String getDepart() {
        return depart;
    }

    public String getIp() {
        return ip;
    }

    public String getFolderPath() {
        return folderPath;
    }

    public Timestamp getRequestDate() {
        return requestDate;
    }

    public boolean getIsDownload() {
        return this.isDownload;
    }
}
