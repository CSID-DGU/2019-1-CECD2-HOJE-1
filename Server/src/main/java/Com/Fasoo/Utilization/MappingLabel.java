package Com.Fasoo.Utilization;

import java.util.ArrayList;
import java.util.HashMap;

public class MappingLabel {
    private HashMap<String, ArrayList<Object>> mapping = new HashMap<String, ArrayList<Object>>();

    public HashMap<String, ArrayList<Object>> getMapping(){
        return mapping;
    }

    public ArrayList<Object> getValue(String key){
        if(mapping.get(key)!=null)
            return mapping.get(key);
        else
            return null;
    }

    public void setMapping(String keyName, Object object){
        if(mapping.get(keyName) != null){
            mapping.get(keyName).add(object);
        }else {
            ArrayList<Object> objectList = new ArrayList<Object>();
            objectList.add(object);
            mapping.put(keyName, objectList);
        }
    }

    public void printMappingList(){
        for(String key : mapping.keySet()){
            ArrayList<Object> objectList = mapping.get(key);
            System.out.print( key + " : { ");
            for(int i  = 0; i<objectList.size(); i++){
                System.out.print(objectList.get(i));
                if(i != objectList.size()-1){
                    System.out.print(", ");
                }
            }
            System.out.println(" }");
        }
    }

}
