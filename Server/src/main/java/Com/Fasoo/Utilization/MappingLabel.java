package Com.Fasoo.Utilization;

import java.util.ArrayList;
import java.util.HashMap;

public class MappingLabel {
    private HashMap<String, Object> mapping = new HashMap<String, Object>();

    public HashMap<String, Object> getMapping(){
        return mapping;
    }

    public Object getValue(String key){
        if(mapping.get(key)!=null)
            return mapping.get(key);
        else
            return null;
    }

    public void setListMapping(String keyName, Object object){
        if(mapping.get(keyName) != null){
            ((ArrayList<Object>) mapping.get(keyName)).add(object);
        }else {
            ArrayList<Object> objectList = new ArrayList<Object>();
            objectList.add(object);
            mapping.put(keyName, objectList);
        }
    }

    public void setValueMapping(String keyName, Object object){
        mapping.put(keyName, object);
    }

    public void printMappingList(){
        for(String key : mapping.keySet()){
            if(mapping.get(key) instanceof ArrayList){
                ArrayList<Object> objectList = (ArrayList<Object>)mapping.get(key);
                System.out.print( key + " : { ");
                for(int i  = 0; i<objectList.size(); i++){
                    System.out.print(objectList.get(i));
                    if(i != objectList.size()-1){
                        System.out.print(", ");
                    }
                }
                System.out.println(" }");
            }else if(mapping.get(key) instanceof String){
                System.out.println( key + " : "+ mapping.get(key));
            }
        }

    }

//    private HashMap<String, ArrayList<Object>> mapping = new HashMap<String, ArrayList<Object>>();
//
//    public HashMap<String, ArrayList<Object>> getMapping(){
//        return mapping;
//    }
//
//    public ArrayList<Object> getValue(String key){
//        if(mapping.get(key)!=null)
//            return mapping.get(key);
//        else
//            return null;
//    }
//
//    public void setMapping(String keyName, Object object){
//        if(mapping.get(keyName) != null){
//            mapping.get(keyName).add(object);
//        }else {
//            ArrayList<Object> objectList = new ArrayList<Object>();
//            objectList.add(object);
//            mapping.put(keyName, objectList);
//        }
//    }
//
//    public void printMappingList(){
//        for(String key : mapping.keySet()){
//            ArrayList<Object> objectList = mapping.get(key);
//            System.out.print( key + " : { ");
//            for(int i  = 0; i<objectList.size(); i++){
//                System.out.print(objectList.get(i));
//                if(i != objectList.size()-1){
//                    System.out.print(", ");
//                }
//            }
//            System.out.println(" }");
//        }
//    }
}
