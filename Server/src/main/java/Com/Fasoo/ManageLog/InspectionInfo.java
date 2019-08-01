package Com.Fasoo.ManageLog;

import java.util.List;

public class InspectionInfo {
    private String fileName;
    private String filePath;
    private String classification;
    private String fitness;
    private String formLevel;
    private int detectCount;
    private List<String> detectList;

    public void setFitness(String fitness) {
        this.fitness = fitness;
    }

    public void setFilePath(String filePath) {
        this.filePath = filePath;
    }

    public void setDetectCount(int detectCount) {
        this.detectCount = detectCount;
    }

    public void setClassification(String classification) {
        this.classification = classification;
    }

    public void setFormLevel(String formLevel) {
        this.formLevel = formLevel;
    }

    public void setFileName(String fileName) {
        this.fileName = fileName;
    }

    public void setDetectList(List<String> detectlist) {
        this.detectList = detectlist;
    }

    public String getFitness() {
        return fitness;
    }

    public String getFilePath() {
        return filePath;
    }

    public String getClassification() {
        return classification;
    }

    public int getDetectCount() {
        return detectCount;
    }

    public String getFormLevel() {
        return formLevel;
    }

    public String getFileName() {
        return fileName;
    }

    public List<String> getDetectList() {
        return detectList;
    }
}
