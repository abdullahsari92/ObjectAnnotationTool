using Microsoft.AspNetCore.Mvc;
using ObjectAnnotationTool.DataAccess;
using ObjectAnnotationTool.DataAccess.Entity;
using ObjectAnnotationTool.Models;

namespace ObjectAnnotationTool.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class EtiketController : ControllerBase
    {

      
        private IRepository<Etiket> _repositoryEtiket;

        public EtiketController(IRepository<Etiket> repositoryEtiket)
        {
            _repositoryEtiket = repositoryEtiket;
        }


        // [HttpGet(Name = "GetAll")]
        public async Task<ListModel<Etiket>> GetAll()
        {
                     

            var model = new ListModel<Etiket>();

           var etiketler = await _repositoryEtiket.GetAll();

            model.Items = etiketler.ToList();


            return model;

        }


        [HttpPost]
        public async Task<Etiket> Add([FromBody] Etiket etiket)
        {


            Etiket model = new Etiket();
            try
            {
                model = await _repositoryEtiket.InsertAsync(etiket) ?? new Etiket();

                return model;

            }
            catch (Exception ex)
            {
                return null;

            }

        }



  
    }
}
