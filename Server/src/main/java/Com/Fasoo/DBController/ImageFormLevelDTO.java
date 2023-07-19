package Com.Fasoo.DBController;

public class ImageFormLevelDTO {
    private String formName;
    private String formLevel;

    public void setFormLevel(String formLevel) {
        this.formLevel = formLevel;
    }

    public void setFormName(String formName) {
        this.formName = formName;
    }

    public String getFormLevel() {
        return formLevel;
    }

    public String getFormName() {
        return formName;
    }
}
