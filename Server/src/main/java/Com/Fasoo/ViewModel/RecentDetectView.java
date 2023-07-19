package Com.Fasoo.ViewModel;

import java.sql.Timestamp;

public class RecentDetectView {
    private String ip;
    private Timestamp inspectionDate;
    private int detectCount;

    public void setIp(String ip) {
        this.ip = ip;
    }

    public void setInspectionDate(Timestamp inspectionDate) {
        this.inspectionDate = inspectionDate;
    }

    public void setDetectCount(int detectCount) {
        this.detectCount = detectCount;
    }

    public String getIp() {
        return ip;
    }

    public Timestamp getInspectionDate() {
        return inspectionDate;
    }

    public int getDetectCount() {
        return detectCount;
    }
}
