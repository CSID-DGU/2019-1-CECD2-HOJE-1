package Com.Fasoo.PredictModel;

import org.nd4j.linalg.api.ndarray.INDArray;
import java.util.List;

public interface DimensionReduce {


    public void setNormalizationOpt(boolean normalizationOpt);
    public INDArray reduceDimension(String inputDhash);
    public void setNdArray(List<INDArray> ndArray);
}
