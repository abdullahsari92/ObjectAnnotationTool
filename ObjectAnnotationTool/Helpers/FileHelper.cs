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
            return Directory.GetCurrentDirectory() + "/wwwroot/Files/";
        }


        public static string GetBase64ToString(string fullName)
        {

            var stream = File.OpenRead(fullName);

            byte[]  _byte = new byte[stream.ReadByte()];
                stream.Write(_byte, 0, _byte.Length);
               
                string base64Image = Convert.ToBase64String(_byte);

                return base64Image;
           

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
        public static string DosyadanOku(string fileName)
        {

            string dosya_yolu = GetRootPath() + @"\" + fileName + ".txt";


            //Okuma işlem yapacağımız dosyanın yolunu belirtiyoruz.
            FileStream fs = new FileStream(dosya_yolu, FileMode.Open, FileAccess.Read);
            //Bir file stream nesnesi oluşturuyoruz. 1.parametre dosya yolunu,
            //2.parametre dosyanın açılacağını,
            //3.parametre dosyaya erişimin veri okumak için olacağını gösterir.
            StreamReader sw = new StreamReader(fs);
            //Okuma işlemi için bir StreamReader nesnesi oluşturduk.
         


           var yazi = sw.ReadLine();
                    

            //Satır satır okuma işlemini gerçekleştirdik ve ekrana yazdırdık
            //Son satır okunduktan sonra okuma işlemini bitirdik
            sw.Close();
            fs.Close();
            return yazi;
        }


        public static void DosyadanOkuYaz(string fileName)
        {

            string dosya_yolu = GetRootPath() + @"\" + fileName + ".txt";

         
            //Okuma işlem yapacağımız dosyanın yolunu belirtiyoruz.
            FileStream fs = new FileStream(dosya_yolu, FileMode.Open, FileAccess.Read);
            //Bir file stream nesnesi oluşturuyoruz. 1.parametre dosya yolunu,
            //2.parametre dosyanın açılacağını,
            //3.parametre dosyaya erişimin veri okumak için olacağını gösterir.
            StreamReader sw = new StreamReader(fs);
            //Okuma işlemi için bir StreamReader nesnesi oluşturduk.
            string yazi = "";

            string dosya_yolu1 = @"D:\Yazilan.txt";
            FileStream fs2 = new FileStream(dosya_yolu1, FileMode.OpenOrCreate, FileAccess.Write);
            StreamWriter sw2 = new StreamWriter(fs2);

            while (yazi != null)
            {
                Console.WriteLine(yazi);
                yazi = sw.ReadLine();
                //İşlem yapacağımız dosyanın yolunu belirtiyoruz.

                if (yazi != null)
                {
                    var deger = yazi.Split(',');
                    if (!deger[0].Contains("\t"))
                    {
                        var sonuc = deger[0] + "," + deger[1];
                        sw2.WriteLine(sonuc);
                    }
                }
            }

            sw2.Flush();
            //Veriyi tampon bölgeden dosyaya aktardık.
            sw2.Close();
            fs2.Close();
            //Satır satır okuma işlemini gerçekleştirdik ve ekrana yazdırdık
            //Son satır okunduktan sonra okuma işlemini bitirdik
            sw.Close();
            fs.Close();
            //İşimiz bitince kullandığımız nesneleri iade ettik.
        }
        public static void DosyaYaz(string gelen, string fileName)
        {
          
            string dosya_yolu = GetRootPath() + @"\" + fileName + ".txt";
            //İşlem yapacağımız dosyanın yolunu belirtiyoruz.
            FileStream fs = new FileStream(dosya_yolu, FileMode.Append, FileAccess.Write);

            //   var deger = gelen.Split(',');

            //  var sonuc = "eposta: " + deger[0] + "; şifre: " + deger[1];
            StreamWriter sw = new StreamWriter(fs);
            sw.WriteLine(gelen);


            sw.Flush();
            //Veriyi tampon bölgeden dosyaya aktardık.
            sw.Close();
            fs.Close();
            //İşimiz bitince kullandığımız nesneleri iade ettik.
        }




    }
}
