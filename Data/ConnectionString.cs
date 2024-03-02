namespace innovate2024
{
    public class ConnectionString
    {
        public string cs {get; set;}
        public ConnectionString(){
            string server = "lg7j30weuqckmw07.cbetxkdyhwsb.us-east-1.rds.amazonaws.com";
            string database = "qts2yugvn12rwnjr";
            string port = "3306";
            string userName = "o1p5bue8kf368z2g";
            string password = "y2i1ckeavreogx9e";

            cs = $@"server = {server};user = {userName};database = {database};port = {port};password = {password};"; 
        }
    }
}