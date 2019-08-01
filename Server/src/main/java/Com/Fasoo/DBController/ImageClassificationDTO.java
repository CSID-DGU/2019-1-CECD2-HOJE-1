package Com.Fasoo.DBController;

public class ImageClassificationDTO {
    int id;
    String formName;
    String dhash;
    String manageDepart;
    String grantedDepart;

    public int getId() {
        return id;
    }

    public String getDhash() {
        return dhash;
    }

    public String getFormName() {
        return formName;
    }

    public String getManageDepart() {
        return manageDepart;
    }

    public void setDhash(String dhash) {
        this.dhash = dhash;
    }

    public String getGrantedDepart() {
        return grantedDepart;
    }

    public void setGrantedDepart(String grantedDepart){
        this.grantedDepart = grantedDepart;
    }

    public void setFormName(String formName) {
        this.formName = formName;
    }

    public void setId(int id) {
        this.id = id;
    }

    public void setManageDepart(String manageDepart) {
        this.manageDepart = manageDepart;
    }

    public String toString(){
        return " Data [id = "+ id + ", FormName = "+formName+", Dhash="+dhash+", manager="+ manageDepart +", toString()="+super.toString()+ "]";
    }
}
