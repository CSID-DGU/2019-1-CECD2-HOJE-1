package Com.Fasoo.DBController;

import java.sql.Connection;
import java.sql.DriverManager;

public class DBConnect {
    public DBConnect(){}

    public Connection getConeection(){
        String url = "jdbc:postgresql:imageClassification";
        String id = "postgres";
        String pw = "1234";

        Connection con = null;

        try{
            Class.forName("org.postgresql.Driver");
            con=DriverManager.getConnection(url,id,pw);
            System.out.println("postgre DB Complete");
        }catch(Exception e) {
            System.out.println(e);
        }

        return con;
    }
}
