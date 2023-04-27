using ObjectAnnotationTool.DataAccess.Entity;
using System.Linq.Expressions;

namespace ObjectAnnotationTool.DataAccess
{
    /// <inheritdoc />
    /// <summary>
    ///  Veri tabanı sorgulama işlemlerinin bir merkezden yapılmasını sağlayan sınıf için arayüz
    /// </summary>
    /// <typeparam name="TEntity"></typeparam>
    public interface IRepository<TEntity> : IDisposable where TEntity : class, IEntity, new()
    {

        /// <summary>
        /// Verileri getirir.
        /// </summary>
        /// <returns></returns>
        Task<IQueryable<TEntity>> GetAll(bool asNoTracking = false);

        /// <summary>
        /// Sql cümlesi ile veri getirir.
        /// </summary>
        /// <param name="sql"></param>
        /// <returns></returns>
        IQueryable<TEntity> GetSql(string sql);

        /// <summary>
        /// Async olarak sql cümlesi ile veri getirir.
        /// </summary>
        /// <param name="sql"></param>
        /// <returns></returns>
        Task<IQueryable<TEntity>> GetSqlAsync(string sql);

        /// <summary>
        /// Tek bir veriyi koşula göre getirir.
        /// </summary>
        /// <param name="filter"></param>
        /// <returns></returns>
        TEntity Get(Expression<Func<TEntity, bool>> filter, bool asNoTracking = false);


        /// <summary>
        /// Async olarak tek bir veriyi koşula göre getirir.
        /// </summary>
        /// <param name="filter"></param>
        /// <returns></returns>
        Task<TEntity?> GetAsync(Expression<Func<TEntity, bool>> filter, bool asNoTracking = false);

        /// <summary>
        /// Yeni kayıt ekler. Eklenen kaydı geri döndürür.
        /// </summary>
        /// <param name="entity"></param>
        /// <param name="autoSaveIsNotActive"></param>
        /// <returns></returns>
        TEntity Insert(TEntity entity, bool autoSaveIsNotActive = false);


        /// <summary>
        /// toplu kaydetme 
        /// </summary>
        /// <param name="entities"></param>
        /// <param name="autoSaveIsNotActive"></param>
        void InsertRange(IEnumerable<TEntity> entities, bool autoSaveIsNotActive = false);


        /// <summary>
        ///  Async olarak yeni kayıt ekler. Eklenen kaydı geri döndürür.
        /// </summary>
        /// <param name="entity"></param>
        /// <param name="autoSaveIsNotActive"></param>
        /// <returns></returns>
        Task<TEntity> InsertAsync(TEntity entity, bool autoSaveIsNotActive = false);

        /// <summary>
        /// Veriyi günceller. Güncellenen kaydı geri döndürür.
        /// </summary>
        /// <param name="entity"></param>
        /// <param name="autoSaveIsNotActive"></param>
        /// <returns></returns>
        TEntity Update(TEntity entity, bool autoSaveIsNotActive = false);

        /// <summary>
        /// Async olarak veriyi günceller. Güncellenen kaydı geri döndürür.
        /// </summary>
        /// <param name="entity"></param>
        /// <param name="autoSaveIsNotActive"></param>
        /// <returns></returns>
        Task<TEntity> UpdateAsync(TEntity entity, bool autoSaveIsNotActive = false);

        /// <summary>
        /// Veriyi siler
        /// </summary>
        /// <param name="entity"></param>
        /// <param name="autoSaveIsNotActive"></param>
        void Delete(int Id, bool autoSaveIsNotActive = false);




        void UpdateRange(IEnumerable<TEntity> entities, bool autoSaveIsNotActive = false);

        /// <summary>
        /// toplu kayıt siler
        /// </summary>
        /// <param name="entities"></param>
        void DeleteRange(IEnumerable<TEntity> entities, bool autoSaveIsNotActive = false);
        /// <summary>
        /// Async olarak veriyi siler.
        /// </summary>
        /// <param name="entity"></param>
        /// <param name="autoSaveIsNotActive"></param>
        /// <returns></returns>
        Task DeleteAsync(TEntity entity, bool autoSaveIsNotActive = false);

        /// <summary>
        /// Değişiklikleri kaydeder.
        /// </summary>
        /// <returns></returns>
        int SaveChanges();

        /// <summary>
        /// Async olarak değişiklikleri kaydeder.
        /// </summary>
        /// <returns></returns>
        Task<int> SaveChangesAsync();
        /// <summary>
        /// Veri tabanından varmı diye bakıyor
        /// </summary>
        /// <param name="filter"></param>
        /// <returns></returns>
        bool IsExist(Expression<Func<TEntity, bool>> filter);

    }
}