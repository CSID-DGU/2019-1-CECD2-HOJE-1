package Com.Fasoo.Utilization;

import Com.Fasoo.DBController.ImageClassificationDTO;

import java.util.List;

public interface StringMatching {
    //threshold is magic number; => 테스트해서 가장 좋은 값을 선택
    public boolean isSimilarity(double threshold, String inputHash, List<ImageClassificationDTO> dataSets);
}
