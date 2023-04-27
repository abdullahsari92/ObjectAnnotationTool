namespace ObjectAnnotationTool.Models;

// <summary>
/// Detay i�lemlerinde kullan�lacak jenerik s�n�f
/// </summary>
public class ListModel<T> where T : class, new()
{

    public List<T>? Items { get; set; }

}
