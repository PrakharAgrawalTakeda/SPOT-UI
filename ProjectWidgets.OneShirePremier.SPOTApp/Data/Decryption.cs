using System;
using System.Data;
using System.Configuration;
using System.Web;
using System.Security.Cryptography;
using System.IO;
using System.Text;
using System.Runtime.CompilerServices;

/// <summary>
/// Summary description for Decryption
/// </summary>
public class Decryption
{
    [MethodImpl(MethodImplOptions.Synchronized)]
    public static string DecryptWebConfig(string keyValue)
    {
        string KEY = ConfigurationSettings.AppSettings["KEY"].ToString();
        string IV = ConfigurationSettings.AppSettings["IV"].ToString();

        ICryptoTransform ct;
        MemoryStream ms = null;
        CryptoStream cs;
        byte[] byt;
        SymmetricAlgorithm mCSP = new DESCryptoServiceProvider();
        byte[] key;
        byte[] iv;

        try
        {
            key = Encoding.UTF8.GetBytes(KEY);
            iv = Encoding.UTF8.GetBytes(IV);

            mCSP.Key = key;
            mCSP.IV = iv;
            ct = mCSP.CreateDecryptor(key, iv);

            byt = Convert.FromBase64String(keyValue);

            ms = new MemoryStream();
            cs = new CryptoStream(ms, ct, CryptoStreamMode.Write);
            cs.Write(byt, 0, byt.Length);
            cs.FlushFinalBlock();

            cs.Close();
            cs.Dispose();
        }
        catch (Exception ex)
        {
            throw ex;

        }

        return Encoding.UTF8.GetString(ms.ToArray());
    }


    public static string EncryptValue(string Value, string Encyptkey, string EncryptIV)
    {
        try
        {
            byte[] bytes = Encoding.UTF8.GetBytes(Encyptkey);
            byte[] buffer3 = Encoding.UTF8.GetBytes(EncryptIV);
            SymmetricAlgorithm algorithm = new DESCryptoServiceProvider(); //Create a new object of DESCryptoServiceProvider class
            algorithm.Key = bytes; //Assing the Key to algorithm.
            algorithm.IV = buffer3; //Assing the Initialization Vactor to algorithm.
            ICryptoTransform transform = algorithm.CreateEncryptor(algorithm.Key, algorithm.IV); //Creates the symmetric encryptor with given Key and IV.
            byte[] buffer = Encoding.UTF8.GetBytes(Value); //Get the bytes array of plain text.
            MemoryStream stream = new MemoryStream(); //Create new object of MemoryStream class.
            CryptoStream stream2 = new CryptoStream(stream, transform, CryptoStreamMode.Write); //Create new object of CryptoStream Class.
            stream2.Write(buffer, 0, buffer.Length);
            stream2.FlushFinalBlock();
            stream2.Close();
            return Convert.ToBase64String(stream.ToArray());
        }
        catch (Exception ex)
        {
            return "Error Occured.";
        }
    }

    public static string DecryptValue(string keyValue, string Decryptkey, string DecryptIV)
    {
        string KEY = Decryptkey;
        string IV = DecryptIV;

        ICryptoTransform ct;
        MemoryStream ms = null;
        CryptoStream cs;
        byte[] byt;
        SymmetricAlgorithm mCSP = new DESCryptoServiceProvider();
        byte[] key;
        byte[] iv;

        try
        {
            key = Encoding.UTF8.GetBytes(KEY);
            iv = Encoding.UTF8.GetBytes(IV);

            mCSP.Key = key;
            mCSP.IV = iv;
            ct = mCSP.CreateDecryptor(key, iv);

            byt = Convert.FromBase64String(keyValue);

            ms = new MemoryStream();
            cs = new CryptoStream(ms, ct, CryptoStreamMode.Write);
            cs.Write(byt, 0, byt.Length);
            cs.FlushFinalBlock();

            cs.Close();
            cs.Dispose();
        }
        catch (Exception ex)
        {
            throw ex;

        }

        return Encoding.UTF8.GetString(ms.ToArray());
    }

}
