package Com.Fasoo.DBController;

public class InspectionInfoDTO {
    String fileCode;
    String inspectionKey;
    String fileName;
    String filePath;
    String classification;
    String formLevel;
    String fitness;
    int detectCount;
    String detectList;

    public void setFileName(String fileName) {
        this.fileName = fileName;
    }

    public void setFormLevel(String formLevel) {
        this.formLevel = formLevel;
    }

    public void setClassification(String classification) {
        this.classification = classification;
    }

    public void setFilePath(String filePath) {
        this.filePath = filePath;
    }

    public void setDetectCount(int detectCount) {
        this.detectCount = detectCount;
    }

    public void setFitness(String fitness) {
        this.fitness = fitness;
    }

    public void setDetectList(String detectList) {
        this.detectList = detectList;
    }

    public void setFileCode(String fileCode) {
        this.fileCode = fileCode;
    }

    public void setInspectionKey(String inspectionKey) {
        this.inspectionKey = inspectionKey;
    }

    public String getFileName() {
        return fileName;
    }

    public String getFormLevel() {
        return formLevel;
    }

    public String getClassification() {
        return classification;
    }

    public int getDetectCount() {
        return detectCount;
    }

    public String getFilePath() {
        return filePath;
    }

    public String getFitness() {
        return fitness;
    }

    public String getFileCode() {
        return fileCode;
    }

    public String getInspectionKey() {
        return inspectionKey;
    }

    public String getDetectList() {
        return detectList;
    }

}


