package Com.Fasoo.DBController;

import java.sql.*;
import java.util.List;
import java.util.ArrayList;
import java.util.Collections;

public class OCRTrainedFileDAO {
    DBConnect dbConnect = null;
    String sql = "";

    public OCRTrainedFileDAO(){
        dbConnect = new DBConnect();
    }

    public List<OCRTrainedFileDTO> getUpdateLogList() throws  Exception{
       Connection con = dbConnect.getConeection();
       PreparedStatement pstmt = null;
       ResultSet rs = null;
       List<OCRTrainedFileDTO> logList = null;

       try{
           sql = "SELECT * FROM public.trained_file_update_log ORDER BY update_time DESC";
           pstmt = con.prepareStatement(sql);

           rs = pstmt.executeQuery();

           if(rs.next()){
               logList = new ArrayList<OCRTrainedFileDTO>();

               do{
                   OCRTrainedFileDTO log = new OCRTrainedFileDTO();
                   log.setFileName(rs.getString("file_name"));
                   log.setComment(rs.getString("comment"));
                   log.setUpdateTime(rs.getTimestamp("update_time"));
                   log.setVersion(rs.getString("version"));
                   logList.add(log);
               }while(rs.next());
           }else{
               logList = Collections.EMPTY_LIST;
           }
       }catch(Exception e){
           e.printStackTrace();
       }finally{
           DBClose.close(con, pstmt);
       }
       return logList;
    }

    public boolean insertUploadFile(String fileName, Timestamp updateTime, String comment, String version) {
        Connection con = dbConnect.getConeection();
        PreparedStatement pstmt = null;

        boolean check = false;

        try {
            sql = "INSERT INTO public.trained_file_update_log(file_name, update_time, comment, version)values (?, ?, ?, ?)";
            pstmt = con.prepareStatement(sql);

            pstmt.setString(1, fileName);
            pstmt.setTimestamp(2, updateTime);
            pstmt.setString(3, comment);
            pstmt.setString(4, version);


            pstmt.executeUpdate();
            check =true;
        } catch (SQLException e) {
            e.printStackTrace();
        } finally {
            DBClose.close(con, pstmt);
        }
        return check;
    }

    public Timestamp getRecentUpdateTime(){
        Connection con = dbConnect.getConeection();
        PreparedStatement pstmt = null;
        ResultSet rs = null;

        Timestamp updateTime = null;

        try {
            sql = "SELECT update_time FROM public.trained_file_update_log ORDER BY update_time DESC LIMIT 1";
            pstmt = con.prepareStatement(sql);

            rs = pstmt.executeQuery();

            if(rs.next()){
                updateTime = rs.getTimestamp("update_time");
            }else{
                updateTime = null;
            }
        }catch (Exception e){
            e.printStackTrace();
            updateTime = null;
        }finally {
            DBClose.close(con, pstmt);
        }

        return updateTime;
    }



}
