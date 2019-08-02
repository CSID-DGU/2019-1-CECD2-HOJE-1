package Com.Fasoo.PredictModel;

import Com.Fasoo.Model.DistanceComparator;
import Com.Fasoo.Model.ImageFormAttribute;
import Com.Fasoo.Model.Result;
import Com.Fasoo.Utilization.MappingLabel;
import org.nd4j.linalg.api.ndarray.INDArray;

import java.util.*;

public class KNN implements Clustering {
    private double[][] instance;
    private int dataLength;
    private double[] predictData;
    List<String> labelList;
    private int k;

    public KNN(){}

    public void setInstance(INDArray instance) {
        this.instance = instance.toDoubleMatrix();
        this.dataLength = this.instance.length - 1;
        this.predictData = this.instance[dataLength];
    }

    public void setLabelList(List<String> labelList){
        this.labelList = labelList;
    }

    private static String findMajorityClass(String[] array){
        Set<String> h = new HashSet<String>(Arrays.asList(array));
        String[] uniqueValues = h.toArray(new String[0]);
        int[] counts = new int[uniqueValues.length];

        for(int i = 0; i<uniqueValues.length; i++){
            for(int j = 0; j< array.length; j++){
                if(array[j].equals(uniqueValues[i])){
                    counts[i]++;
                }
            }
        }

        for(int i = 0; i<uniqueValues.length; i++){
            System.out.println(uniqueValues[i]+":"+counts[i]);
        }

        int max = counts[0];
        for(int counter = 1; counter < counts.length; counter++){
            if(counts[counter] > max){
                max = counts[counter];
            }
        }

        int freq = 0;
        for(int counter = 0; counter<counts.length; counter++){
            if(counts[counter]==max){
                freq++;
            }
        }


        int index = -1;
        if(freq == 1){
            for(int counter = 0; counter < counts.length; counter++){
                if(counts[counter] == max){
                    index = counter;
                    break;
                }
            }

            return uniqueValues[index];
        }else{
            int[] ix = new int[freq]; //array of indices of modes
            System.out.println("multiple majority classes:"+freq+"classes");
            int ixi = 0;

            for(int counter = 0; counter < counts.length; counter++){
                if(counts[counter] == max){
                    ix[ixi] = counter; //save index of each max count values
                    ixi++; // increase index of ix array
                }
            }

            for(int counter = 0; counter<ix.length; counter++) {
                System.out.println("class index : " + ix[counter]);
            }


            //now choose one at random
            Random generator = new Random();

            //get random number 0 <= rIndex < size of ix
            int rIndex = generator.nextInt(ix.length);
            System.out.println("random index:" + rIndex);
            int nIndex = ix[rIndex];

            return uniqueValues[nIndex];
        }
    }

    public MappingLabel startClustering(int k){
        this.k = k;

        List<ImageFormAttribute> formList = new ArrayList<ImageFormAttribute>();
        List<Result> resultList = new ArrayList<Result>();

        for(int i = 0; i<dataLength; i++){
            formList.add(new ImageFormAttribute(instance[i], labelList.get(i)));

            //            System.out.print(labelList.get(i) +" : ");
            //            for(int j = 0; j<instance[i].length; j++)
            //                System.out.print(instance[i][j]);
            //
            //            System.out.println();
        }

        for(ImageFormAttribute form : formList){
            double dist = 0.0;

            for(int j = 0 ; j<form.getFormAttribute().length; j++){
                dist += Math.pow(form.getFormAttribute()[j]-predictData[j],2);
            }

            double distance = Math.sqrt(dist);
            resultList.add(new Result(distance, form.getFormName()));
        }

        Collections.sort(resultList, new DistanceComparator());
        String[] formNameInK = new String[k];

        MappingLabel mappingLabel = new MappingLabel();

        for(int i=0; i<k; i++){
            System.out.println(resultList.get(i).getFormName()+"...."+resultList.get(i).getDistance());;
            mappingLabel.setListMapping(resultList.get(i).getFormName(), resultList.get(i).getDistance());
            formNameInK[i] = resultList.get(i).getFormName();
        }

        String majorClass = findMajorityClass(formNameInK);
        mappingLabel.setValueMapping("majorClass", majorClass);
        System.out.println("Class of new instance is :" + majorClass);


        // 인접 이웃
        return mappingLabel;

    }

}
