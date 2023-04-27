using Microsoft.AspNetCore.Mvc;
using ObjectAnnotationTool.DataAccess;
using ObjectAnnotationTool.DataAccess.Entity;
using ObjectAnnotationTool.Models;

namespace ObjectAnnotationTool.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class DocumentController : ControllerBase
    {

      
        private IRepository<Document> _repositoryDocument;

        public DocumentController(IRepository<Document> repositoryDocument)
        {
            _repositoryDocument = repositoryDocument;
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
        public async Task<Document> Add([FromBody] Document etiket)
        {


            Document model = new Document();
            try
            {
                model = await _repositoryDocument.InsertAsync(etiket) ?? new Document();

                return model;

            }
            catch (Exception ex)
            {
                return null;

            }

        }



  
    }
}
