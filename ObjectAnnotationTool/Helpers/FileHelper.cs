using System.IO;
using System.IO.Compression;
using System.Text;
using static System.Net.Mime.MediaTypeNames;

namespace MVC_PROJE.Helpers
{
    public static class FileHelper
    {

        private static byte[] _byte;
        private static MemoryStream _memoryStream;


        private static string _path = Directory.GetCurrentDirectory();

        /// <summary>
        /// Full adresi verilen bir dosyadan uzantısını almaya yarar.
        /// </summary>
        /// <param name="fileName">Dosyanın tam adresini ifade eder.</param>
        /// <returns>string</returns>
        public static string GetExtension(string fileName)
        {
            return fileName.Substring(fileName.LastIndexOf('.') + 1);
        }
        public static string GetExtensionBase64(string base64)
        {
            return "."+ base64.Split(';')[0].Split('/')[1];
        }

        public static string GetRootPath()
        {
            return Directory.GetCurrentDirectory() + "/Files/";
        }

        /// <summary>
        /// Verilen bir Byte dizisini, dosyanın tam adresi ile kaydetmeye yarar.
        /// </summary>
        /// <param name="myByte">Girdi olarak verilen Byte dizisini ifade eder.</param>
        /// <param name="fullName">Kaydedilecek dosyanın tam adresini ifade eder.</param>
        public static void SaveFile(byte[] myByte, string fileName)
        {          

            if(fileName == null)
            {

                fileName = "/" + DateTime.Now.ToString("ddMMyyyy");


            }
       
                File.WriteAllBytes(GetRootPath() + fileName, myByte);
            

        }


        /// <summary>
        /// Tam adresi verilen bir dosyayı silmeye yarar.
        /// </summary>
        /// <param name="filePath">Dosyanın tam adresini ifade eder.</param>
        public static void DeleteFile(string filePath)
        {
            if (File.Exists(filePath))
            {
                File.Delete(filePath);
            }
            else
            {
                throw new FileNotFoundException("Silmek istediğiniz dosya bulunamadı.");
            }
        }

        public static byte[] Base64ToByte(string base64)
        {

          var splitBase64 =   base64.Split(',')[1]; 


            byte[] bytes = Convert.FromBase64String(splitBase64);
            return bytes;
        }
          
                 


        /// <summary>
        /// Dosyanın tam adresinden, klasör adını almaya yarar.
        /// </summary>
        /// <param name="fullName">Gönderilen dosyanın tam adresini ifade eder.</param>
        /// <returns>string</returns>
        public static string DetermineDirectoryName(string fullName)
        {
            return Path.GetDirectoryName(fullName);
        }

                


        /// <summary>
        /// Stream'i Byte dizisine çevirmek için kullanılır.
        /// </summary>
        /// <param name="stream">Stream olarak gönderilen veriyi ifade eder.</param>
        /// <returns></returns>
        public static byte[] StreamToByte(Stream stream)
        {

            _byte = new byte[stream.ReadByte()];
            stream.Write(_byte, 0, _byte.Length);

            return _byte;

        }
          

    }
}
