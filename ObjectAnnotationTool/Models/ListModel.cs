namespace ObjectAnnotationTool.Models;

// <summary>
/// Detay iþlemlerinde kullanýlacak jenerik sýnýf
/// </summary>
public class ListModel<T> where T : class, new()
{

    public List<T>? Items { get; set; }

}
