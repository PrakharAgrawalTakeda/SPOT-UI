using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Data;
using System.Configuration;
using System.Data.SqlClient;
using System.Data.SqlTypes;
using System.IO;

namespace ProjectWidgets.OneShirePremier.SPOTConsoleApOfficeUsers.Data
{
    public class DataAccessClass
    {
        string AdoConStr;
        
        SqlConnection sqlConn;
        string ConnectionTimeout = System.Configuration.ConfigurationManager.AppSettings["ConnectionTimeout"].ToString();
        string CommandTimeout = System.Configuration.ConfigurationManager.AppSettings["CommandTimeout"].ToString();

        /// <summary>
        /// this function initailize and opens the connection.
        /// </summary>
        /// <returns></returns>
        /// 

        private bool OpenConnection()
        {
            try
            {
                // Get Reporting Database connection string.
                AdoConStr = "DATA SOURCE=" + System.Configuration.ConfigurationManager.AppSettings["SERVER"].ToString() + ";";
                AdoConStr += "INITIAL CATALOG=" + System.Configuration.ConfigurationManager.AppSettings["DATABASE"].ToString() + ";";

                //Use Windows credentials if Reporting database user name is not provided.
                if (System.Configuration.ConfigurationManager.AppSettings["USERNAME"].ToString().Trim() == "")
                {
                    AdoConStr += "Integrated Security=SSPI;";
                }
                else
                {
                    string password = Decryption.DecryptValue(System.Configuration.ConfigurationManager.AppSettings["PASSWORD"].ToString(), System.Configuration.ConfigurationManager.AppSettings["KEY"].ToString(), System.Configuration.ConfigurationManager.AppSettings["IV"].ToString());
                    //Provide user name and password in connection string.
                    AdoConStr += "USER ID=" + System.Configuration.ConfigurationManager.AppSettings["USERNAME"].ToString() + ";";
                    //  AdoConStr += "PASSWORD=" + Decryption.DecryptWebConfig(System.Configuration.ConfigurationManager.AppSettings["PASSWORD"].ToString()) + ";";
                    AdoConStr += "PASSWORD=" + password + ";";
                }

                if (ConnectionTimeout != "")
                {
                    AdoConStr += "Connect Timeout=" + ConnectionTimeout + ";";

                }
                Console.WriteLine("connection"+AdoConStr);
                sqlConn = new SqlConnection(AdoConStr);

                sqlConn.Open();
                if (sqlConn.State == ConnectionState.Open)
                    return true;
                else
                    return false;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

     

        public DataSet ExecuteStoredProcedure(string spName, List<Parameter> paramList)
        {
            try
            {
                if (OpenConnection())
                {
                    SqlCommand sqlCmd = new SqlCommand();
                    sqlCmd.CommandTimeout = int.Parse(CommandTimeout);
                    sqlCmd.CommandText = spName;
                    sqlCmd.CommandType = CommandType.StoredProcedure;
                    sqlCmd.Connection = sqlConn;
                    foreach (Parameter param in paramList)
                    {
                        sqlCmd.Parameters.Add(new SqlParameter(param.ParameterName, param.ParameterDbType));
                        if (param.ParameterDbType == SqlDbType.Xml)
                            sqlCmd.Parameters[param.ParameterName].Value = param.XmlParameterValue;
                        else
                            sqlCmd.Parameters[param.ParameterName].Value = param.ParameterValue;

                    }
                    SqlDataAdapter sqlAdapter = new SqlDataAdapter(sqlCmd);
                    DataSet resultDs = new DataSet();
                    sqlAdapter.Fill(resultDs);
                    sqlConn.Close();
                    return resultDs;
                }
                else
                {
                    throw new Exception("Cannot connect to database");
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public DataSet ExecuteStoredProcedure(string storedprocedureName)
        {
            try
            {
                if (OpenConnection())
                {
                    SqlCommand sqlCmd = new SqlCommand();
                    sqlCmd.CommandTimeout = int.Parse(CommandTimeout);
                    sqlCmd.CommandText = storedprocedureName;
                    sqlCmd.CommandType = CommandType.StoredProcedure;
                    sqlCmd.Connection = sqlConn;
                    SqlDataAdapter sqlAdapter = new SqlDataAdapter(sqlCmd);
                    DataSet resultDs = new DataSet();
                    sqlAdapter.Fill(resultDs);
                    sqlConn.Close();
                    return resultDs;
                }
                else
                {
                    throw new Exception("Cannot connect to database");
                }

            }
            catch (Exception ex)
            {
                throw ex;
            }
        }  
        private string UnReplaceXmlSpecialCharacter(string str_1)
        {

            str_1 = str_1.Replace("$#38;", "&").Replace("$#60;", "<").Replace("$#62;", ">").Replace("$#39;", "\'").Replace("$#92;", "\\");
            str_1 = str_1.Replace("$#34;", "\""); str_1 = str_1.Replace("$#222;", "Þ");

            return str_1;
        }

    }
    public class Parameter
    {
        public string ParameterName { get; set; }
        public SqlDbType ParameterDbType { get; set; }
        public string ParameterValue { get; set; }
        public SqlXml XmlParameterValue { get; set; }
    }

}