package Com.Fasoo.ViewModel;

import org.springframework.stereotype.Component;

@Component
public class ImageInfoBean2 {
    private int index;
    private String depart;
    private String status;
    private String imagePath;
    private String formLevel;
    private String formName;

    public String getFormName() {
        return formName;
    }

    public String getStatus() {
        return status;
    }

    public String getImagePath() {
        return imagePath;
    }

    public String getDepart() {
        return depart;
    }

    public int getIndex() {
        return index;
    }

    public String getFormLevel() {
        return formLevel;
    }

    public void setFormName(String formName) {
        this.formName = formName;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public void setImagePath(String imagePath) {
        this.imagePath = imagePath;
    }

    public void setDepart(String depart) {
        this.depart = depart;
    }

    public void setIndex(int index) {
        this.index = index;
    }

    public void setFormLevel(String formLevel) {
        this.formLevel = formLevel;
    }
}

