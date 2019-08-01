package Com.Fasoo.Model;

import java.util.Comparator;

public class DistanceComparator implements Comparator<Result>{

    public int compare(Result r1, Result r2) {
        return  r1.getDistance() < r2.getDistance() ? -1 :
                                (r1.getDistance() == r2.getDistance() ? 0 : 1);
    }

}
