package Com.Fasoo.Model;

public class ImageFormAttribute {
    private double[] formAttribute;
    //1private INDArray formAttribute;
    private String formName;

    public ImageFormAttribute(){}

    public ImageFormAttribute(double[] formAttribute, String formName){
        this.formAttribute = formAttribute;
        this.formName = formName;
    }

    public String getFormName() {
        return formName;
    }

    public double[] getFormAttribute() {
        return formAttribute;
    }


}
