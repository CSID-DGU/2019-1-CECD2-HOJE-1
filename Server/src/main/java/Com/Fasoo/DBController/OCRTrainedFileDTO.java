package Com.Fasoo.DBController;

import java.sql.Timestamp;

public class OCRTrainedFileDTO {
    private String fileName;
    private Timestamp updateTime;
    private String version;
    private String comment;

    public void setComment(String comment) {
        this.comment = comment;
    }

    public void setFileName(String fileName) {
        this.fileName = fileName;
    }

    public void setUpdateTime(Timestamp updateTime) {
        this.updateTime = updateTime;
    }

    public void setVersion(String version) {
        this.version = version;
    }

    public String getComment() {
        return comment;
    }

    public String getFileName() {
        return fileName;
    }

    public Timestamp getUpdateTime() {
        return updateTime;
    }

    public String getVersion() {
        return version;
    }
}
