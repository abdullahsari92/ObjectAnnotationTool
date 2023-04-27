namespace ObjectAnnotationTool.DataAccess.Entity
{
    public class Sinif:IEntity
    {

        public int Id { get; set; }

        public  string Name { get; set; }

        public virtual ICollection<Etiket>? Etiketler { get; set; }

    }
}
