package Com.Fasoo.DBController;

import java.sql.*;
import java.util.List;
import java.util.ArrayList;
import java.util.Collections;


public class ImageRegistrationDAO {

    DBConnect dbConnect = null;
    String sql = "";

    public ImageRegistrationDAO(){
        dbConnect = new DBConnect();
    }

    public List<ImageRegistrationDTO> getImageRegistryList() throws Exception{
        Connection con = dbConnect.getConeection();
        PreparedStatement pstmt = null;
        ResultSet rs = null;
        List<ImageRegistrationDTO> imageRegistryList = null;

        try{
            sql = "SELECT * FROM public.image_registration_status WHERE status = 'Unapproved' ORDER BY id DESC";
            pstmt = con.prepareStatement(sql);

            rs = pstmt.executeQuery();

            if(rs.next()){
                imageRegistryList = new ArrayList<ImageRegistrationDTO>();

                do{
                    ImageRegistrationDTO singleData = new ImageRegistrationDTO();
                    singleData.setId(rs.getInt("id"));
                    singleData.setImagePath(rs.getString("image_path"));
                    singleData.setRequestDepart(rs.getString("request_depart"));
                    singleData.setStatus(rs.getString("status"));
                    singleData.setIp(rs.getString("ip"));
                    singleData.setRequestTime(rs.getTimestamp("request_time"));
                    singleData.setComment(rs.getString("comment"));
                    imageRegistryList.add(singleData);
                }while(rs.next());

            }else{
                imageRegistryList = Collections.EMPTY_LIST;
            }
        }catch(Exception e){
            e.printStackTrace();
        }finally {
            DBClose.close(con, pstmt);
        }
        return imageRegistryList;
    }


    public ImageRegistrationDTO getImageRegistryInfo(int index) throws Exception{
        Connection con = dbConnect.getConeection();
        PreparedStatement pstmt = null;
        ResultSet rs = null;
        ImageRegistrationDTO imageRegistryInfo = null;

        try{
            sql = "SELECT * FROM public.image_registration_status WHERE id = ?";
            pstmt = con.prepareStatement(sql);
            //System.out.println(index);
            pstmt.setInt(1, index);
            rs = pstmt.executeQuery();

            if(rs.next()){
                imageRegistryInfo = new ImageRegistrationDTO();

                imageRegistryInfo.setId(rs.getInt("id"));
                imageRegistryInfo.setImagePath(rs.getString("image_path"));
                imageRegistryInfo.setRequestDepart(rs.getString("request_depart"));
                imageRegistryInfo.setStatus(rs.getString("status"));
                imageRegistryInfo.setIp(rs.getString("ip"));
                imageRegistryInfo.setRequestTime(rs.getTimestamp("request_time"));
                imageRegistryInfo.setComment(rs.getString("comment"));

            }else{
                imageRegistryInfo = null;
            }
        }catch(Exception e){
            e.printStackTrace();
        }finally {
            DBClose.close(con, pstmt);
        }
        return imageRegistryInfo;
    }

    public boolean insertImageRegistrationStatus(String filePath, String ip, String depart, Timestamp requestTime, String comment ,String status){
        Connection con = dbConnect.getConeection();
        PreparedStatement pstmt = null;

        boolean check = false;

        try {
            sql = "INSERT INTO public.image_registration_status(image_path, request_depart, status, ip, request_time, comment) values (?, ?, ?, ?, ?, ?)";
            pstmt = con.prepareStatement(sql);

            pstmt.setString(1, filePath);
            pstmt.setString(2, depart);
            pstmt.setString(3, status);
            pstmt.setString(4, ip);
            pstmt.setTimestamp(5, requestTime);
            pstmt.setString(6,comment);

            pstmt.executeUpdate();

            check = true;

        } catch (SQLException e) {
            e.printStackTrace();
        } finally {
            DBClose.close(con, pstmt);
        }

        return check;
    }


    public boolean updateStatus(int index, String newStatus){
        Connection con = dbConnect.getConeection();
        PreparedStatement pstmt = null;

        boolean check = false;

        try {
            sql = "UPDATE public.image_registration_status SET status=? WHERE id = ?";
            pstmt = con.prepareStatement(sql);
            pstmt.setString(1, newStatus);
            pstmt.setInt(2, index);
            pstmt.executeUpdate();
            check = true;

        } catch (SQLException e) {
            e.printStackTrace();
        } finally {
            DBClose.close(con, pstmt);
        }

        return check;
    }

}
