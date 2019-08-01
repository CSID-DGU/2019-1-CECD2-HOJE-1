package Com.Fasoo.PredictModel;
import Com.Fasoo.Utilization.Utilization;
import org.nd4j.linalg.api.ndarray.INDArray;
import org.nd4j.linalg.dimensionalityreduction.PCA;
import org.nd4j.linalg.factory.Nd4j;

import java.util.List;

public class PrincipleComponentAnalysis implements DimensionReduce {

    private List<INDArray> ndArray;
    private boolean normalizationOpt = false;

    public PrincipleComponentAnalysis(){}

//    public PrincipleComponentAnalysis(List<INDArray> ndArray, boolean normalizationOpt){
//        this.ndArray = ndArray;
//        this.normalizationOpt = normalizationOpt;
//    }

    public void setNdArray(List<INDArray> ndArray) {
        this.ndArray = ndArray;
    }

    public void setNormalizationOpt(boolean normalizationOpt) {
        this.normalizationOpt = normalizationOpt;
    }


    public INDArray reduceDimension(String inputDhash){
        if(ndArray == null){
            System.out.println("input dataSets error!");
        }

        float[] dhashArray = Utilization.hash2Array(inputDhash);

        ndArray.add(Nd4j.create(dhashArray));

        //System.out.println(ndArray);
        //System.out.println(ndArray.size());


        INDArray matrix = Nd4j.create(ndArray, new int[] {ndArray.size(), 16});
        //System.out.println(matrix);
        INDArray result = PCA.pca(matrix, 3, true);

        return result;
    }
}
