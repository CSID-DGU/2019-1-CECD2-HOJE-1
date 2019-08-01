package Com.Fasoo.DBController;

import java.sql.*;
import java.util.*;
import java.util.Date;

public class InspectionLogDAO {
    DBConnect dbConnect = null;
    String sql = "";

    public InspectionLogDAO(){
        dbConnect = new DBConnect();
    }

    public boolean insertInspectionDate(String inspectionKey, String ip, Timestamp inspectTime, String depart){
        Connection con = dbConnect.getConeection();
        PreparedStatement pstmt = null;

        boolean check = false;

        try{
            sql = "INSERT INTO public.inspection_date_log(inspection_key, ip, inspection_date, depart) values (?, ?, ?, ?)";
            pstmt = con.prepareStatement(sql);

            pstmt.setString(1, inspectionKey);
            pstmt.setString(2, ip);
            pstmt.setTimestamp(3, inspectTime);
            pstmt.setString(4, depart);

            pstmt.executeUpdate();
            check = true;
        } catch (SQLException e) {
            e.printStackTrace();
        }finally {
            DBClose.close(con, pstmt);
        }

        return check;
    }

    public boolean insertInspectionInfo(String fileCode, String inspectionKey, String fileName, String filePath,
                                        String classification, String formLevel, String fitness, int detectCount, String detectList) {

        Connection con = dbConnect.getConeection();
        PreparedStatement pstmt = null;

        boolean check = false;

        try{
            sql = "INSERT INTO public.inspection_info_log(file_code_key, inspection_key, file_name, file_path, classification, form_level, fitness, detect_count, detect_list) values (?, ?, ?, ?, ?, ?, ?, ?, ?)";
            pstmt = con.prepareStatement(sql);

            pstmt.setString(1,fileCode);
            pstmt.setString(2,inspectionKey);
            pstmt.setString(3,fileName);
            pstmt.setString(4,filePath);
            pstmt.setString(5,classification);
            pstmt.setString(6,formLevel);
            pstmt.setString(7,fitness);
            pstmt.setInt(8,detectCount);
            pstmt.setString(9,detectList);

            pstmt.executeUpdate();
            check=true;
        } catch (SQLException e) {
            e.printStackTrace();
        }finally {
            DBClose.close(con, pstmt);
        }

        return check;
    }

    public Map<String, Integer> totalFormLevelCountList() {
        Connection con = dbConnect.getConeection();
        PreparedStatement pstmt = null;
        ResultSet rs = null;
        boolean check = false;
        Map<String, Integer> map = new HashMap<String, Integer>();
        String[] formLevel = {"대외비", "사내한", "공개"};
        try{
            sql = "SELECT COUNT(*) FROM public.inspection_info_log WHERE form_level = ?";
            pstmt = con.prepareStatement(sql);

            pstmt.setString(1, formLevel[0]);
            rs = pstmt.executeQuery();
            if(rs.next()) {
                map.put(formLevel[0], rs.getInt(1));
            }else{
                map.put(formLevel[0], rs.getInt(1));
            }
            pstmt = con.prepareStatement(sql);
            pstmt.setString(1, formLevel[1]);
            rs = pstmt.executeQuery();
            if(rs.next()) {
                map.put(formLevel[1], rs.getInt(1));
            }else{
                map.put(formLevel[1], rs.getInt(1));
            }

            pstmt = con.prepareStatement(sql);
            pstmt.setString(1, formLevel[2]);
            rs = pstmt.executeQuery();
            if(rs.next()) {
                map.put(formLevel[2], rs.getInt(1));
            }else{
                map.put(formLevel[2], rs.getInt(1));
            }

        } catch (SQLException e) {
            e.printStackTrace();
            map = null;
        }finally {
            DBClose.close(con, pstmt);
        }

        return map;
    }

    public Map<String, Integer> formLevelStatusMap(Calendar calendar) {
        Connection con = dbConnect.getConeection();
        PreparedStatement pstmt = null;
        ResultSet rs = null;
        Map<String, Integer> map = new HashMap<String, Integer>();

        Timestamp startTime = this.getDateSetting(calendar, 0);
        Timestamp endTime= this.getDateSetting(calendar, 1);

        try{
            sql =  "SELECT form_level, count(form_level) " +
                    "FROM public.inspection_date_log " +
                    "LEFT JOIN public.inspection_info_log " +
                    "USING (inspection_key) " +
                    "WHERE public.inspection_date_log.inspection_date >= ? " +
                    "and public.inspection_date_log.inspection_date <= ? " +
                    "GROUP BY public.inspection_info_log.form_level";
            pstmt = con.prepareStatement(sql);

            pstmt.setTimestamp(1, startTime);
            pstmt.setTimestamp(2, endTime);
            rs = pstmt.executeQuery();

            if(rs.next()){
                do{
                    map.put(rs.getString("form_level"), rs.getInt("count"));
                }while(rs.next());
            }else{
                map = null;
            }

        }catch (Exception e){
            e.printStackTrace();
            map = null;
        }finally {
            DBClose.close(con, pstmt);
        }

        return map;
    }

    public Map<String, Integer> fitnessStatusMap(Calendar calendar) {
        Connection con = dbConnect.getConeection();
        PreparedStatement pstmt = null;
        ResultSet rs = null;
        Map<String, Integer> map = new HashMap<String, Integer>();


        Timestamp startTime = this.getDateSetting(calendar, 0);
        Timestamp endTime= this.getDateSetting(calendar, 1);

        try{
            sql =  "SELECT fitness, count(fitness) " +
                    "FROM public.inspection_date_log " +
                    "LEFT JOIN public.inspection_info_log " +
                    "USING (inspection_key) " +
                    "WHERE public.inspection_date_log.inspection_date >= ? " +
                    "and public.inspection_date_log.inspection_date <= ? " +
                    "GROUP BY public.inspection_info_log.fitness";
            pstmt = con.prepareStatement(sql);

            pstmt.setTimestamp(1, startTime);
            pstmt.setTimestamp(2, endTime);

            rs = pstmt.executeQuery();

            if(rs.next()){
                do{
                    map.put(rs.getString("fitness"), rs.getInt("count"));
                }while(rs.next());
            }else{
                map = null;
            }

        }catch (Exception e){
            e.printStackTrace();
            map = null;
        }finally {
            DBClose.close(con, pstmt);
        }

        return map;
    }

    //0:start time, 1:end time
    private Timestamp getDateSetting(Calendar calendar, int mode){

        Timestamp time = null;

        if(mode == 0) {
            calendar.set(Calendar.HOUR_OF_DAY, 0);
            calendar.set(Calendar.MINUTE, 0);
            calendar.set(Calendar.SECOND, 0);
            calendar.set(Calendar.MILLISECOND, 0);

            Date date = calendar.getTime();
            time = new Timestamp(date.getTime());
        }else{
            calendar.set(Calendar.HOUR_OF_DAY, 23);
            calendar.set(Calendar.MINUTE, 59);
            calendar.set(Calendar.SECOND, 59);
            calendar.set(Calendar.MILLISECOND, 0);

            Date date = calendar.getTime();
            time= new Timestamp(date.getTime());
        }
        return time;
    }


    public int inspectionCountbyDate(Calendar calendar) {
        Connection con = dbConnect.getConeection();
        PreparedStatement pstmt = null;
        ResultSet rs = null;
        int inspectionCount = 0;
        Timestamp startTime = this.getDateSetting(calendar, 0);
        Timestamp endTime= this.getDateSetting(calendar, 1);

        try{
            sql =  "SELECT COUNT(*) " +
                    "FROM inspection_date_log as t1, " +
                    "(SELECT ip, MAX(inspection_date) as MAX_DATE " +
                    "FROM inspection_date_log " +
                    "WHERE inspection_date >= ? and inspection_date <= ? " +
                    "group by ip) as t2 " +
                    "WHERE t1.inspection_date = t2.MAX_DATE " +
                    "and t1.ip = t2.ip";
            pstmt = con.prepareStatement(sql);

            pstmt.setTimestamp(1, startTime);
            pstmt.setTimestamp(2, endTime);
            rs = pstmt.executeQuery();

            if(rs.next()){
                inspectionCount = rs.getInt("count");
            }else{
                inspectionCount = 0;
            }

        }catch (Exception e){
            e.printStackTrace();
            inspectionCount=0;
        }finally {
            DBClose.close(con, pstmt);
        }

        return inspectionCount;
    }

}
