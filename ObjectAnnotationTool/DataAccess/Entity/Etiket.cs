using System.ComponentModel.DataAnnotations;

namespace ObjectAnnotationTool.DataAccess.Entity
{
    public class Etiket:IEntity
    {

        public int Id { get; set; }
        [Required]

        public string Name { get; set; }
        public string Description { get; set; }
        [Required]

        public int SinifId { get; set; }

        public Sinif? Sinif { get; set; }


    }
}
