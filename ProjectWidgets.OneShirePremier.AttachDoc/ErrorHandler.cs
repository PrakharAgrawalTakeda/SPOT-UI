using System;
using System.Data;
using System.Configuration;
using System.Web;
using System.Runtime.CompilerServices;
using System.IO;

/// <summary>
/// Summary description for ErrorHandler
/// </summary>
public class ErrorHandler
{
    static string _logFileName = ConfigurationManager.AppSettings["LogFileName"];
    static private int _logLevel = Convert.ToInt16(ConfigurationManager.AppSettings["LogLevel"]);

    [MethodImpl(MethodImplOptions.Synchronized)]
    public static void WriteErrorLog(string FunName, Exception Ex, string message, int level)
    {
        try
        {
            if (level > _logLevel)
            {
                string ErrorDetail = "";
                string ErrorLogFilePath = "";
                if (System.Configuration.ConfigurationManager.AppSettings["ErrorLogFilePath"].ToString() == "")
                {
                    ErrorLogFilePath = _logFileName;
                   // ErrorLogFilePath = HttpContext.Current.Server.MapPath("~") + "/" + _logFileName;
                }
                else
                {
                    ErrorLogFilePath = System.Configuration.ConfigurationManager.AppSettings["ErrorLogFilePath"].ToString() + "/" + _logFileName;
                }

                StreamWriter stWriter = File.AppendText(ErrorLogFilePath);
                if (message == null || message == "")
                {
                    stWriter.WriteLine("Error occur in Function : " + FunName + " at " + DateTime.Now.ToString());
                    stWriter.WriteLine("Details:-");
                    ErrorDetail += " Error Message   : " + Ex.Message;
                    ErrorDetail += "Inner Exception :" + Ex.InnerException;
                    ErrorDetail += "Strack Trace :" + Ex.StackTrace;
                    stWriter.WriteLine(ErrorDetail);
                    stWriter.WriteLine("--------------------------------------------------------------------------------");
                    stWriter.Flush();
                    stWriter.Close();
                }
                else
                {
                    stWriter.WriteLine("Function : " + FunName + " at " + DateTime.Now.ToString());
                    stWriter.WriteLine("Details:-");
                    stWriter.WriteLine(message);
                    stWriter.WriteLine("--------------------------------------------------------------------------------");
                    stWriter.Flush();
                    stWriter.Close();
                }
            }
        }
        catch (Exception outerEx)
        {
            throw new Exception(outerEx.Message);
        }

    }


    internal static void WriteErrorLog(string FunName, string message, int level)
    {
        try
        {
            if (level > _logLevel)
            {
                string ErrorDetail = "";
                string ErrorLogFilePath = "";
                if (System.Configuration.ConfigurationManager.AppSettings["ErrorLogFilePath"].ToString() == "")
                {
                    ErrorLogFilePath = System.IO.Path.GetDirectoryName(Environment.GetCommandLineArgs()[0]) + "/" + _logFileName; ;
                    //ErrorLogFilePath = HttpContext.Current.Server.MapPath("~") + "/" + _logFileName;
                }
                else
                {
                    ErrorLogFilePath = System.Configuration.ConfigurationManager.AppSettings["ErrorLogFilePath"].ToString() + "/" + _logFileName;
                }

                StreamWriter stWriter = File.AppendText(ErrorLogFilePath);

                    stWriter.WriteLine(System.DateTime.Now);
                    stWriter.WriteLine(FunName );
                    stWriter.WriteLine("Details:-");
                    stWriter.WriteLine(message);
                    stWriter.WriteLine("--------------------------------------------------------------------------------");
                    stWriter.Flush();
                    stWriter.Close();
                
            }
        }
        catch (Exception outerEx)
        {
            throw new Exception(outerEx.Message);
        }
    }



    internal static void WriteInfoLog(string FunName, string message, int level)
    {
        try
        {
            if (level > _logLevel)
            {
                string ErrorLogFilePath = "";
                if (System.Configuration.ConfigurationManager.AppSettings["ErrorLogFilePath"].ToString() == "")
                {
                    ErrorLogFilePath = System.IO.Path.GetDirectoryName(Environment.GetCommandLineArgs()[0]) + "/" + _logFileName; ;
                    //ErrorLogFilePath = HttpContext.Current.Server.MapPath("~") + "/" + _logFileName;
                }
                else
                {
                    ErrorLogFilePath = System.Configuration.ConfigurationManager.AppSettings["ErrorLogFilePath"].ToString() + "/" + _logFileName;
                }

                StreamWriter stWriter = File.AppendText(ErrorLogFilePath);
                stWriter.WriteLine("--------------------------------------------------------------------------------");
                stWriter.WriteLine(System.DateTime.Now  +  " Function Name: "  + FunName);
                stWriter.WriteLine("Information:-"   + message);
                stWriter.WriteLine("--------------------------------------------------------------------------------");

                stWriter.Flush();
                stWriter.Close();

            }
        }
        catch (Exception outerEx)
        {
            throw new Exception(outerEx.Message);
        }
    }
}
