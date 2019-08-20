package Com.Fasoo.DBController;

import java.sql.Timestamp;

public class ImageRegistrationDTO {
    private int id;
    private String imagePath;
    private String requestDepart;
    private String status;
    private String ip;
    private Timestamp requestTime;
    private String comment;

    public int getId() {
        return id;
    }

    public String getImagePath() {
        return imagePath;
    }

    public String getRequestDepart() {
        return requestDepart;
    }

    public String getStatus() {
        return status;
    }

    public String getIp() {
        return ip;
    }

    public Timestamp getRequestTime() {
        return requestTime;
    }

    public String getComment() {
        return comment;
    }

    public void setId(int id) {
        this.id = id;
    }

    public void setImagePath(String imagePath) {
        this.imagePath = imagePath;
    }

    public void setRequestDepart(String requestDepart) {
        this.requestDepart = requestDepart;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public void setIp(String ip) {
        this.ip = ip;
    }

    public void setRequestTime(Timestamp requestTime) {
        this.requestTime = requestTime;
    }

    public void setComment(String comment) {
        this.comment = comment;
    }
}
