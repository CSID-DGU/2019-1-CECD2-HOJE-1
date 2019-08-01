package Com.Fasoo.DBController;

import java.sql.Timestamp;

public class InspectionDateDTO {
    private String inspectionKey;
    private String ip;
    private Timestamp inspectionDate;
    private String depart;

    public void setInspectionKey(String inspectionKey) {
        this.inspectionKey = inspectionKey;
    }

    public void setInspectionDate(Timestamp inspectionDate) {
        this.inspectionDate = inspectionDate;
    }

    public void setIp(String ip) {
        this.ip = ip;
    }

    public void setDepart(String depart) {
        this.depart = depart;
    }

    public String getInspectionKey() {
        return inspectionKey;
    }

    public String getIp() {
        return ip;
    }

    public Timestamp getInspectionDate() {
        return inspectionDate;
    }

    public String getDepart() {
        return depart;
    }
}
