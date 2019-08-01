package Com.Fasoo.Utilization;

import Com.Fasoo.DBController.*;

import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

public class Utilization {
    public static float[] hash2Array(String dhashValue){
        //hash는 16자리
        float[] tempFloat = new float[16];

        for(int hashStrIndex = 0; hashStrIndex<dhashValue.length(); hashStrIndex++){
            char ch = dhashValue.charAt(hashStrIndex);
            int result = Integer.parseInt(Character.toString(ch), 16);

            tempFloat[hashStrIndex] = (float) result;
        }

        return tempFloat;
    }

    public static FITNESS fitnessCheck(String classificationResult, String depart)
    {
        FITNESS fitness = FITNESS.RED;
        ImageClassificationDAO imageClassificationDAO = new ImageClassificationDAO();

        List<ImageClassificationDTO> datas;

        try {
            datas = imageClassificationDAO.getImageDataSetListByFormName(classificationResult);
        }catch (Exception e){
            datas = null;
            e.printStackTrace();
        }

        int length = datas.size();

        //todo:majorClass인 대상들만을 구하고 거기서, 부서가 맞는지 체크해야할듯 수정
        for(int i = 0; i<length; i++){
            //System.out.println(datas.get(i).getManageDepart());
            if(depart.equals(datas.get(i).getManageDepart())){
                return FITNESS.GREEN;
            }
        }

//        for(int i = 0; i<length; i++){
//            String grantedDepart = datas.get(i).getGrantedDepart();
//
//            //todo: parsing grantedDepart
//
//            return fitness;
//
//        }

        return fitness;
    }

    public static LEVEL formLevelCheck(String majorClass)
    {
        ImageFormLevelDAO imageFormLevelDAO = new ImageFormLevelDAO();
        ImageFormLevelDTO imageFormLevelDTO = imageFormLevelDAO.getFormLevel(majorClass);

        LEVEL formLevel;
        String inputFormName = imageFormLevelDTO.getFormName();

        if(inputFormName.equals("public")){
            formLevel = LEVEL.PUBLIC;
        }else if(inputFormName.equals("companyOnly")){
            formLevel = LEVEL.COMPANY_ONLY;
        }else if(inputFormName.equals("confidentiality")){
            formLevel = LEVEL.CONFIDENTIALITY;
        }else{
            formLevel = LEVEL.NONE;
        }
        return formLevel;
    }

    public static String fileNameChange(){
        String nowTime = new SimpleDateFormat("yyyyMMddHmsS").format(new Date());
        String changeFileName = "kor_"+nowTime + ".trainneddata";

        return changeFileName;
    }

    public static String getMD5(String str){
        String MD5="";

        try{
            MessageDigest md = MessageDigest.getInstance("MD5");
            md.update(str.getBytes());
            byte byteData[] = md.digest();
            StringBuffer sb = new StringBuffer();
            for(int i = 0 ; i< byteData.length; i++){
                sb.append(Integer.toString((byteData[i]&0xff) + 0x100,16).substring(1));
            }
            MD5 = sb.toString();

        }catch(NoSuchAlgorithmException e){
            e.printStackTrace();
            MD5 = null;
        }

        return MD5;
    }


}
