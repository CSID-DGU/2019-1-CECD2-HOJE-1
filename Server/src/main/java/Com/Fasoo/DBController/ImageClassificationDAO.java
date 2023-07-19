package Com.Fasoo.DBController;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.List;
import java.util.ArrayList;
import java.util.Collections;

public class ImageClassificationDAO {
    DBConnect dbConnect = null;
    String sql = "";

    public ImageClassificationDAO(){
        dbConnect = new DBConnect();
    }

    public List<ImageClassificationDTO> getImageDataSetList()throws Exception{
        Connection con = dbConnect.getConeection();
        PreparedStatement pstmt = null;
        ResultSet rs = null;
        List<ImageClassificationDTO> dataSetList = null;

        try{
            sql = "SELECT * FROM public.imageforminfo ORDER BY id DESC";
            pstmt = con.prepareStatement(sql);

            rs = pstmt.executeQuery();

            if(rs.next()){
                dataSetList = new ArrayList<ImageClassificationDTO>();

                do{
                    ImageClassificationDTO singleDataSet = new ImageClassificationDTO();
                    singleDataSet.setId(rs.getInt("id"));
                    singleDataSet.setFormName(rs.getString("form_name"));
                    singleDataSet.setDhash(rs.getString("dhash"));
                    singleDataSet.setManageDepart(rs.getString("manage_depart"));
                    singleDataSet.setGrantedDepart(rs.getString("granted_depart"));
                    dataSetList.add(singleDataSet);

                }while(rs.next());
            }else{
                dataSetList = Collections.EMPTY_LIST;
            }
        }catch(Exception e){
            e.printStackTrace();
        }finally {
            DBClose.close(con, pstmt);
        }

        return dataSetList;
    }

    public boolean insertImageDhashAndDepart(String form, String dhash, String depart, String manageDepart) {
        Connection con = dbConnect.getConeection();
        PreparedStatement pstmt = null;

        boolean check = false;

        try {
            sql = "INSERT INTO public.imageforminfo(form_name, dhash, manage_depart, granted_depart) values (?, ?, ?, ?)";
            pstmt = con.prepareStatement(sql);

            pstmt.setString(1, form);
            pstmt.setString(2, dhash);
            pstmt.setString(3, depart);
            pstmt.setString(4, manageDepart);

            pstmt.executeUpdate();
            check = true;

        } catch (SQLException e) {
            e.printStackTrace();
        } finally {
            DBClose.close(con, pstmt);
        }

        return check;
    }

    public List<ImageClassificationDTO> getImageDataSetListByFormName(String formName)throws Exception {
        Connection con = dbConnect.getConeection();
        PreparedStatement pstmt = null;
        ResultSet rs = null;
        List<ImageClassificationDTO> dataSetList = null;

        try{
            sql = "SELECT * FROM public.imageforminfo WHERE form_name = ?";
            pstmt = con.prepareStatement(sql);
            pstmt.setString(1, formName);
            rs = pstmt.executeQuery();

            if(rs.next()){
                dataSetList = new ArrayList<ImageClassificationDTO>();

                do{
                    ImageClassificationDTO singleDataSet = new ImageClassificationDTO();
                    singleDataSet.setId(rs.getInt("id"));
                    singleDataSet.setFormName(rs.getString("form_name"));
                    singleDataSet.setDhash(rs.getString("dhash"));
                    singleDataSet.setManageDepart(rs.getString("manage_depart"));
                    singleDataSet.setGrantedDepart(rs.getString("granted_depart"));
                    dataSetList.add(singleDataSet);
                }while(rs.next());
            }else{
                dataSetList = Collections.EMPTY_LIST;
            }
        }catch(Exception e){
            e.printStackTrace();
        }finally {
            DBClose.close(con, pstmt);
        }

        return dataSetList;
    }

}
