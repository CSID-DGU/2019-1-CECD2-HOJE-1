package Com.Fasoo.ImageClassification;

import Com.Fasoo.Model.DataSets;
import Com.Fasoo.PredictModel.Clustering;
import Com.Fasoo.PredictModel.DimensionReduce;
import Com.Fasoo.PredictModel.PrincipleComponentAnalysis;
import Com.Fasoo.Utilization.*;
import org.nd4j.linalg.api.ndarray.INDArray;

import java.util.ArrayList;
import java.util.HashMap;

public class Classification {

    private String dhash;
    private String depart;

    private Clustering clustering;
    private DimensionReduce dimensionReduce;

    //private HashMap<String, ArrayList<Object>> classResult;
    private HashMap<String, Object> classResult;

    public Classification(){}

    public Classification(String dhash, String depart){
        this.dhash = dhash;
        this.depart = depart;
    }

    public void setClassificationAlgorithm(Clustering clustering, DimensionReduce dimensionReduce) {
        this.clustering = clustering;
        this.dimensionReduce = dimensionReduce;
    }

    public void classification() throws Exception {
        DataSets datas = new DataSets();

        // TODO:
        //  HammingDistance 기준 magicNumber 11으로 설정, LevenshteinDistance 기준 10으로 고려
        StringMatching strMatching = new HammingDistance();
        //StringMatching strMatching = new LevenshteinDistance(); // if you use Levenshtein Distance

        if(strMatching.isSimilarity(12, dhash, datas.getDataSets())){//if you use Levenshtein
            //Dimension reduce
            dimensionReduce = new PrincipleComponentAnalysis();
            dimensionReduce.setNdArray(datas.getNdArray());
            dimensionReduce.setNormalizationOpt(true); //false

            INDArray result = dimensionReduce.reduceDimension(dhash);

            //supervised clustering
            clustering.setInstance(result);
            clustering.setLabelList(datas.getLabel());
            MappingLabel map = clustering.startClustering(3);//return values;


            // 해당 이미지에 대한 부서를 확인하고, 아닐경우 red 반환
            // todo: 다른 부서에도 권한 부여
            //String classificationResult = (String)map.getValue("majorClass").get(0);
            String classificationResult = (String)map.getValue("majorClass");
            FITNESS fitness = Utilization.fitnessCheck(classificationResult, depart);

            map.setValueMapping("fitness", fitness);

            System.out.println(classificationResult);
            LEVEL formLevel = Utilization.formLevelCheck(classificationResult);

            map.setValueMapping("formLevel", formLevel);
            map.printMappingList();
            classResult = map.getMapping();

        }else{
            MappingLabel map = new MappingLabel();
            map.setValueMapping("majorClass", "Unregistered");
            map.setValueMapping("fitness", FITNESS.YELLOW);
            map.setValueMapping("formLevel", LEVEL.NONE);

            classResult = map.getMapping();
        }

    }

    public HashMap<String, Object>  getPredictResult() {
        return classResult;
    }
//    public HashMap<String, ArrayList<Object>>  getPredictResult() {
//        return classResult;
//    }
}
