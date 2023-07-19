package Com.Fasoo.Model;

public class Result {

    private double distance;
    private String formName;

    public Result(double distance, String formName){
        this.distance = distance;
        this.formName = formName;
    }

    public String getFormName() {
        return formName;
    }

    public double getDistance() {
        return distance;
    }
}
