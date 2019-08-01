package Com.Fasoo.DBController;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

public class ImageFormLevelDAO {
    DBConnect dbConnect = null;
    String sql = "";

    public ImageFormLevelDAO(){
        dbConnect = new DBConnect();
    }

    public boolean insertFormLevel(String formName, String form_level){
        Connection con = dbConnect.getConeection();
        PreparedStatement pstmt = null;

        boolean check = false;

        try {
            sql = "INSERT INTO public.form_level(form_name, form_level) values (?, ?)";
            pstmt = con.prepareStatement(sql);

            pstmt.setString(1, formName);
            pstmt.setString(2, form_level);

            pstmt.executeUpdate();

            check = true;

        } catch (SQLException e) {
            e.printStackTrace();
        } finally {
            DBClose.close(con, pstmt);
        }

        return check;
    }

    public ImageFormLevelDTO getFormLevel(String formName){

        Connection con = dbConnect.getConeection();
        PreparedStatement pstmt = null;
        ResultSet rs = null;
        ImageFormLevelDTO imageFormLevelDTO = null;

        try{
            sql = "SELECT * FROM public.form_level WHERE form_name = ?";
            pstmt = con.prepareStatement(sql);
            pstmt.setString(1, formName);
            rs = pstmt.executeQuery();

            if(rs.next()){
                imageFormLevelDTO = new ImageFormLevelDTO();

                imageFormLevelDTO.setFormName(rs.getString("form_level"));
                imageFormLevelDTO.setFormLevel(rs.getString("form_name"));

            }else{
                imageFormLevelDTO = null;
            }
        }catch(Exception e){
            e.printStackTrace();
        }finally {
            DBClose.close(con, pstmt);
        }
        return imageFormLevelDTO;
    }
}
