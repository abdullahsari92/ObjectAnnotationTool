using Microsoft.AspNetCore.Mvc;
using ObjectAnnotationTool.DataAccess;
using ObjectAnnotationTool.DataAccess.Entity;
using ObjectAnnotationTool.Models;

namespace ObjectAnnotationTool.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class SinifController : ControllerBase
    {

      
        private IRepository<Sinif> _repositorySinif;

        public SinifController(IRepository<Sinif> repositorySinif)
        {
            _repositorySinif = repositorySinif;
        }


        // [HttpGet(Name = "GetAll")]
        public async Task<ListModel<Sinif>> GetAll()
        {
                     

            var model = new ListModel<Sinif>();

           var Sinifler = await _repositorySinif.GetAll();

            model.Items = Sinifler.ToList();


            return model;

        }


        [HttpPost]
        public async Task<Sinif> Add([FromBody] Sinif Sinif)
        {


            Sinif model = new Sinif();
            try
            {
                model = await _repositorySinif.InsertAsync(Sinif) ?? new Sinif();

                return model;

            }
            catch (Exception ex)
            {
                return null;

            }

        }



  
    }
}
