package Com.Fasoo.Utilization;

import Com.Fasoo.DBController.ImageClassificationDTO;

import java.util.List;

public class HammingDistance implements StringMatching {

    public boolean isSimilarity(double threshold, String inputHash, List<ImageClassificationDTO>  dataSets) {

        boolean result = false;
        //System.out.println(inputHash);
        for(int i=0; i<dataSets.size(); i++){
            double distance = getDistance(dataSets.get(i).getDhash(), inputHash);
            if(distance < threshold){
                result = true;
                System.out.println("may be, it is similarity with " + dataSets.get(i).getFormName());
                break;
            }
        }

        return result;
    }

    private double getDistance(String s1, String s2){

        int distance = 0;

        for(int strIndex =0; strIndex < s1.length(); strIndex++){
            if (s1.charAt(strIndex) != s2.charAt(strIndex))
                distance++;
        }

        return (double) distance;
    }
}