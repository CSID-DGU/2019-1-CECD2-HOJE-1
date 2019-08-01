package Com.Fasoo.DBController;

public class ImageRegistrationDTO {
    private int id;
    private String imagePath;
    private String requestDepart;
    private String status;

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
}
