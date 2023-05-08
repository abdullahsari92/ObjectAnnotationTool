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

           var documents = await _repositoryDocument.GetAll();

            model.Items = documents.ToList();

            foreach (var document in model.Items) {

                document.Keyword = FileHelper.DosyadanOku(document.Id.ToString());
            }

            return model;

        }


        [HttpPost]
        public async Task<Document> Add([FromBody] Document document)
        {


            Document model = new Document();
            try
            {
                var fileName = document.Name ?? DateTime.Now.ToString("ddMMyyyy");
                fileName = fileName + FileHelper.GetExtensionBase64(document.ImageBase64);

                document.Path = "files/" + fileName;

                 model = await _repositoryDocument.InsertAsync(document) ?? new Document();

                FileHelper.DosyaYaz(document.Keyword, document.Id.ToString());

                 var byteTo = FileHelper.Base64ToByte(document.ImageBase64);

                FileHelper.SaveFile(byteTo,fileName);
                return model;

            }
            catch (Exception ex)
            {
                return null;

            }

        }

  
    }
}
