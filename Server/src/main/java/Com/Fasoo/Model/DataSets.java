package Com.Fasoo.Model;


import Com.Fasoo.DBController.ImageClassificationDAO;
import Com.Fasoo.DBController.ImageClassificationDTO;

import Com.Fasoo.Utilization.Utilization;
import org.nd4j.linalg.api.ndarray.INDArray;
import org.nd4j.linalg.factory.Nd4j;

import java.util.ArrayList;
import java.util.List;

public class DataSets {
    private List<ImageClassificationDTO> dataSets;
    private List<INDArray> ndArray = new ArrayList<INDArray>();
    private List<String> label;
    final private int HASHLENGTH = 16;

    public DataSets() throws Exception{
        loadDataSets();
        hash2vec();
    }

    private void loadDataSets() throws Exception {
        //List<ImageClassificationDTO> dataSets;
        ImageClassificationDAO dao = new ImageClassificationDAO();
        this.dataSets = dao.getImageDataSetList();
    }

    //todo : refactor thread utilization code
    private void hash2vec(){

        for(int dataIndex = 0; dataIndex<dataSets.size(); dataIndex++){
            ImageClassificationDTO singleData = dataSets.get(dataIndex);
            String dhashValue = singleData.getDhash();

            float[] tempFloat = Utilization.hash2Array(dhashValue);

            ndArray.add(Nd4j.create(tempFloat));
        }

    }

    public List<INDArray> getNdArray() {
        return ndArray;
    }

    public List<ImageClassificationDTO> getDataSets() {
        return this.dataSets;
    }

    public List<String> getLabel(){
        label = new ArrayList<String>();

        for(int dataIndex = 0; dataIndex<dataSets.size(); dataIndex++){
            ImageClassificationDTO singleData = dataSets.get(dataIndex);
            label.add(singleData.getFormName());
        }

        return label;
    }
}
