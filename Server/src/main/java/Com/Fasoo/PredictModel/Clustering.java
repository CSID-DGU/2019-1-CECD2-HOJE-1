package Com.Fasoo.PredictModel;

import Com.Fasoo.Utilization.MappingLabel;
import org.nd4j.linalg.api.ndarray.INDArray;
import java.util.List;

public interface Clustering {

    public void setInstance(INDArray instance);
    public void setLabelList(List<String> labelList);
    public MappingLabel startClustering(int k);
}
