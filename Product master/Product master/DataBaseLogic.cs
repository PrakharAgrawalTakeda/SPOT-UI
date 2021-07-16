
/// <summary>
/// Summary description for DBClass
/// </summary>
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;
using System.Data.SqlTypes;
using System.Globalization;


namespace Product_master
{
    public class DataBaseLogic: IDisposable
    {
        string AdoConStr = "";

        SqlConnection sqlConn;
        string ConnectionTimeout = ConfigurationSettings.AppSettings["ConnectionTimeout"].ToString();
        string CommandTimeout = ConfigurationSettings.AppSettings["CommandTimeout"].ToString();
       // static ConfigInfo objconfigInfo = null;
      Decryption en = new Decryption();
     
        public DataBaseLogic()
        {
            //objEncrypt = new AzureUTMService.EncryptionDecryption();
            //objconfigInfo = new AzureUTMService.ConfigInfo();

            // Get Reporting Database connection string.
            AdoConStr = "DATA SOURCE=" + ConfigurationSettings.AppSettings["SERVER"].ToString() + ";";
            AdoConStr += "INITIAL CATALOG=" + ConfigurationSettings.AppSettings["DATABASE"].ToString() + ";";

            //Use Windows credentials if Reporting database user name is not provided.
            if (string.IsNullOrEmpty(ConfigurationSettings.AppSettings["USERNAME"].ToString().Trim()))
            {
                AdoConStr += "Integrated Security=SSPI;";
            }
            else
            {
                ////Provide user name and password in connection string.
                AdoConStr += "USER ID=" + ConfigurationSettings.AppSettings["USERNAME"].ToString() + ";";
                //AdoConStr += "PASSWORD=" + ConfigurationSettings.AppSettings["PASSWORD"].ToString() + ";";
                AdoConStr += "PASSWORD=" + Decryption.DecryptValue(ConfigurationSettings.AppSettings["PASSWORD"].ToString(), ConfigurationSettings.AppSettings["KEY"].ToString(), ConfigurationSettings.AppSettings["IV"].ToString()) + ";";
                //AdoConStr += "PASSWORD= pass@word1;";
            }

            //if connection timeout is specified in web.config then add connection timeout in database connection string.
            if (!string.IsNullOrEmpty(ConnectionTimeout))
            {
                AdoConStr += "Connect Timeout=" + ConnectionTimeout + ";";

            }
        }

        /// <summary>
        /// this function initailize and opens the connection.
        /// </summary>
        /// <returns></returns>
        private bool OpenConnection()
        {
            try
            {
                sqlConn = new SqlConnection(AdoConStr);
                sqlConn.Open();
                if (sqlConn.State == ConnectionState.Open)
                    return true;
                else
                    return false;
            }
            catch (Exception ex)
            {
                Console.WriteLine();
                ErrorHandler.WriteErrorLog("OpenConnection", ex,"Not Able to open connection",1);
                return false;
            }
        }

        public DataSet ExecuteStoredProcedureWithParameter(string spName, List<Parameter> paramList)
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


        public DataSet ExecuteStoredProcedure(string spName, List<ParameterTbl> parameters)
        {
            DataSet resultDs = new DataSet();
            try
            {
                if (OpenConnection())
                {
                    SqlCommand sqlCmd = new SqlCommand();
                    sqlCmd.CommandText = spName;
                    sqlCmd.CommandType = CommandType.StoredProcedure;
                    sqlCmd.Connection = sqlConn;
                    sqlCmd.CommandTimeout = int.Parse(CommandTimeout, CultureInfo.InvariantCulture);
                    foreach (ParameterTbl param in parameters)
                    {
                        sqlCmd.Parameters.Add(new SqlParameter(param.ParameterName, param.ParameterDbType));
                        if (param.ParameterDbType == SqlDbType.Xml)
                            sqlCmd.Parameters[param.ParameterName].Value = param.XmlParameterValue;
                        else
                            sqlCmd.Parameters[param.ParameterName].Value = param.ParameterValue;

                    }
                    SqlDataAdapter sqlAdapter = new SqlDataAdapter(sqlCmd);
                    
                    sqlAdapter.Fill(resultDs);
                    sqlConn.Close();
                   
                }
                else
                {
                    Console.WriteLine();
                    Exception ex = new Exception ();
                    ErrorHandler.WriteErrorLog("ExecuteStoredProcedureWithParameter", ex,"Not able to execute SP",1);
                }
            }
            catch (Exception ex)
            {
                ErrorHandler.WriteErrorLog("ExecuteStoredProcedureWithParameter", ex, "Not able to execute SP", 1);
            }
            return resultDs;
        }
        /// <summary>
        /// Call this method when no parameter is to be passed to SP
        /// </summary>
        /// <param name="storedprocedureName"></param>
        /// <returns></returns>
        public DataSet ExecuteStoredProcedure(string storedprocedureName)
        {
            DataSet resultDs = new DataSet();
            resultDs.Locale = CultureInfo.InvariantCulture;
            try
            {
                if (OpenConnection())
                {
                    SqlCommand sqlCmd = new SqlCommand();
                    sqlCmd.CommandText = storedprocedureName;
                    sqlCmd.CommandType = CommandType.StoredProcedure;
                    sqlCmd.Connection = sqlConn;
                    sqlCmd.CommandTimeout = int.Parse(CommandTimeout, CultureInfo.InvariantCulture);
                    SqlDataAdapter sqlAdapter = new SqlDataAdapter(sqlCmd);
                 
                    sqlAdapter.Fill(resultDs);
                    sqlConn.Close();
                  
                }
                else
                {
                    Exception ex = new Exception();
                    ErrorHandler.WriteErrorLog("ExecuteStoredProcedureWithParameter", ex, "Not able to execute SP", 1);

                }

            }
            catch (Exception ex)
            {
                ErrorHandler.WriteErrorLog("ExecuteStoredProcedureWithParameter", ex, "Not able to execute SP", 1);

            }
            return resultDs;
        }


        /// <summary>
        /// This method will take table data in XML format for inserting it to the Database table
        /// </summary>
        /// <param name="spName"></param>
        /// <param name="xml"></param>
        /// <returns></returns>
        public string InsertXmlData(string spName, string xml)
        {
            string result = String.Empty;
            try
            {
                if (OpenConnection())
                {
                    SqlCommand sqlCmd = new SqlCommand();
                    sqlCmd.CommandText = spName;
                    sqlCmd.CommandType = CommandType.StoredProcedure;
                    sqlCmd.Connection = sqlConn;

                    SqlCommandBuilder.DeriveParameters(sqlCmd);
                    for (int paramCount = 1; paramCount < sqlCmd.Parameters.Count; paramCount++)
                    {
                        sqlCmd.Parameters[paramCount].Value = xml;
                    }
                    result = Convert.ToString(sqlCmd.ExecuteNonQuery(), CultureInfo.InvariantCulture);
                    sqlConn.Close();
                    
                }
                else
                {
                    sqlConn.Close();
                    Exception ex = new Exception();
                    ErrorHandler.WriteErrorLog("InsertXMLData", ex, "Not able to execute InsertXMLData", 1);
                }
            }
            catch (Exception ex)
            {
                ErrorHandler.WriteErrorLog("InsertXMLData", ex, "Not able to execute InsertXMLData", 1);
            }
            return result;
        }


      
        private string UnReplaceXmlSpecialCharacter(string str_1)
        {

            str_1 = str_1.Replace("$#38;", "&").Replace("$#60;", "<").Replace("$#62;", ">").Replace("$#39;", "\'").Replace("$#92;", "\\");
            str_1 = str_1.Replace("$#34;", "\""); str_1 = str_1.Replace("$#222;", "Þ");

            return str_1;
        }


        #region IDisposable Members

        public void Dispose()
        {
            GC.SuppressFinalize(this);
            sqlConn.Dispose();
        }

        #endregion
        //This method will return tasks details of given current and previous snapshot of  respective users, according to the given projectUIDs Lits.
        //No Consideration of Report ID will be taken into Account

     
    }
}
public class Parameter
{
    public string ParameterName { get; set; }
    public SqlDbType ParameterDbType { get; set; }
    public string ParameterValue { get; set; }
    public SqlXml XmlParameterValue { get; set; }
}

public class ParameterTbl
{
    public string ParameterName { get; set; }
    public SqlDbType ParameterDbType { get; set; }
    public DataTable ParameterValue { get; set; }
    public SqlXml XmlParameterValue { get; set; }
}
