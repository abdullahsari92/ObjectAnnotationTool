using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using MVC_PROJE.Helpers;
using ObjectAnnotationTool.DataAccess;
using ObjectAnnotationTool.DataAccess.Entity;
using ObjectAnnotationTool.Models;
using System.Web;

namespace ObjectAnnotationTool.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class DocumentController : ControllerBase
    {

      
        private IRepository<Document> _repositoryDocument;

        private  Microsoft.AspNetCore.Hosting.IHostingEnvironment _hostingEnvironment;


        private string _RootPath;

        public DocumentController(IRepository<Document> repositoryDocument, Microsoft.AspNetCore.Hosting.IHostingEnvironment hostingEnvironment)
        {
            _repositoryDocument = repositoryDocument;
            _hostingEnvironment = hostingEnvironment;

            _RootPath = _hostingEnvironment.WebRootPath;
        }


        // [HttpGet(Name = "GetAll")]
        public async Task<ListModel<Document>> GetAll()
        {
                     

            var model = new ListModel<Document>();

           var etiketler = await _repositoryDocument.GetAll();

            model.Items = etiketler.ToList();


            return model;

        }


        [HttpPost]
        public async Task<Document> Add([FromBody] Document document)
        {


            Document model = new Document();
            try
            {
                var fileName = document.Name ?? DateTime.Now.ToString("ddMMyyyy");
                fileName = fileName + FileHelper.GetExtensionBase64(document.Image);

                document.Path = FileHelper.GetRootPath() + fileName

                 model = await _repositoryDocument.InsertAsync(document) ?? new Document();
         

            
               var byteTo = FileHelper.Base64ToByte(document.Image);

                FileHelper.SaveFile(byteTo,_RootPath + fileName);
                return model;

            }
            catch (Exception ex)
            {
                return null;

            }

        }

           public void dosyadanOku()
        {
            string dosya_yolu = @"D:\metinbelgesi.txt";
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
           private void dosyayaYaz(string gelen)
      {
            string webRootPath = _hostingEnvironment.WebRootPath;
            string contentRootPath = _hostingEnvironment.ContentRootPath;

           
          string dosya_yolu = webRootPath + @"\Yazilan.txt";
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
