package Com.Fasoo.DBController;

import java.sql.*;
import java.util.List;
import java.util.ArrayList;
import java.util.Collections;

public class OCRTrainImageDAO {
    DBConnect dbConnect = null;
    String sql;

    public OCRTrainImageDAO(){
        dbConnect = new DBConnect();
    }

    public List<OCRTrainImageDTO> getTotalList() throws Exception{
        Connection con = dbConnect.getConeection();
        PreparedStatement pstmt = null;
        ResultSet rs = null;
        List<OCRTrainImageDTO> list = null;

        try{
            sql = "SELECT * FROM public.request_image_for_train_tesseract ORDER BY request_date DESC";
            pstmt = con.prepareStatement(sql);

            rs = pstmt.executeQuery();

            if(rs.next()){
                list = new ArrayList<OCRTrainImageDTO>();
                do{
                    OCRTrainImageDTO singleInfo = new OCRTrainImageDTO();
                    singleInfo.setFolderPath(rs.getString("folder_path"));
                    singleInfo.setIp(rs.getString("ip"));
                    singleInfo.setDepart(rs.getString("depart"));
                    singleInfo.setRequestDate(rs.getTimestamp("request_date"));
                    singleInfo.setIsDownload(rs.getBoolean("isdownload"));

                    list.add(singleInfo);
                }while(rs.next());

            }else{
                list = Collections.EMPTY_LIST;
            }
        }catch (Exception e){
            e.printStackTrace();
        }finally {
            DBClose.close(con, pstmt);
        }

        return list;
    }

    public boolean insertRequestImage(String filePath, String ip, String depart, Timestamp requestDate, String isDownload){
        Connection con = dbConnect.getConeection();
        PreparedStatement pstmt = null;

        boolean check = false;

        try{
            sql = "INSERT INTO public.request_image_for_train_tesseract(folder_path, ip, depart, request_date, isdownload) values (?, ?, ?, ?, ?)";
            pstmt = con.prepareStatement(sql);

            pstmt.setString(1, filePath);
            pstmt.setString(2, ip);
            pstmt.setString(3, depart);
            pstmt.setTimestamp(4, requestDate);
            pstmt.setBoolean(5,false);

            pstmt.executeUpdate();
            check = true;
        }catch (SQLException e){
            e.printStackTrace();
        }finally {
            DBClose.close(con, pstmt);
        }

        return check;

    }

    public boolean insertRequestImage(OCRTrainImageDTO ocrTrainImageDTO){
        Connection con = dbConnect.getConeection();
        PreparedStatement pstmt = null;

        boolean check = false;

        try{
            sql = "INSERT INTO public.request_image_for_train_tesseract(folder_path, ip, depart, request_date, isdownload) values (?, ?, ?, ?, ?)";
            pstmt = con.prepareStatement(sql);

            pstmt.setString(1, ocrTrainImageDTO.getFolderPath());
            pstmt.setString(2, ocrTrainImageDTO.getIp());
            pstmt.setString(3, ocrTrainImageDTO.getDepart());
            pstmt.setTimestamp(4, ocrTrainImageDTO.getRequestDate());
            pstmt.setBoolean(5,ocrTrainImageDTO.getIsDownload());

            pstmt.executeUpdate();
            check = true;
        }catch (SQLException e){
            e.printStackTrace();
        }finally {
            DBClose.close(con, pstmt);
        }

        return check;
    }

    public List<OCRTrainImageDTO> getDownloadImageList(){
        Connection con = dbConnect.getConeection();
        PreparedStatement pstmt = null;
        ResultSet rs = null;
        List<OCRTrainImageDTO> list = null;

        try{
            sql="SELECT * from public.request_image_for_train_tesseract where isdownload = 'false' ORDER BY request_date DESC";
            pstmt = con.prepareStatement(sql);

            rs = pstmt.executeQuery();
            if(rs.next()){
                list = new ArrayList<OCRTrainImageDTO>();

                do{
                    OCRTrainImageDTO singleInfo = new OCRTrainImageDTO();
                    singleInfo.setFolderPath(rs.getString("folder_path"));
                    singleInfo.setIp(rs.getString("ip"));
                    singleInfo.setDepart(rs.getString("depart"));
                    singleInfo.setRequestDate(rs.getTimestamp("request_date"));
                    singleInfo.setIsDownload(rs.getBoolean("isdownload"));

                    list.add(singleInfo);
                }while(rs.next());

            }else{
                list = Collections.EMPTY_LIST;
            }

        }catch (Exception e){
            e.printStackTrace();
        }finally {
            DBClose.close(con, pstmt);
        }

        return list;
    }

    public boolean setDownloadFlag(String folderPath) {
        Connection con = dbConnect.getConeection();
        PreparedStatement pstmt = null;

        boolean check = false;

        try{
            sql = "UPDATE public.request_image_for_train_tesseract SET isdownload = ? WHERE folder_path = ?";
            pstmt = con.prepareStatement(sql);
            pstmt.setBoolean(1, true);
            pstmt.setString(2, folderPath);

            pstmt.executeUpdate();
            check = true;
        }catch (SQLException e){
            e.printStackTrace();
        }finally {
            DBClose.close(con, pstmt);
        }

        return check;
    }

}
