using System.Linq.Expressions;
using Microsoft.EntityFrameworkCore;
using ObjectAnnotationTool.DataAccess.Entity;

namespace ObjectAnnotationTool.DataAccess
{
    public class Repository<TEntity> : IRepository<TEntity> where TEntity : class, IEntity, new()
    {
        private bool _disposed;

        private readonly EfDbContext _context;
        private readonly DbSet<TEntity> _dbSet;

        public Repository(EfDbContext context)
        {
            _context = context;
            _dbSet = _context.Set<TEntity>();
        }

        public void Dispose()
        {
            Dispose(true);
            GC.SuppressFinalize(this);
        }

        protected virtual void Dispose(bool disposing)
        {
            if (!_disposed)
            {
                if (disposing)
                {
                    _context.Dispose();
                }
            }
            _disposed = true;
        }


        //public DbSet<TEntity> GetEntities()
        //{
        //    return _dbSet;
        //}


        public IQueryable<TEntity> GetSql(string sql)
        {
            return _dbSet.FromSqlRaw(sql);
        }

        public async Task<IQueryable<TEntity>> GetSqlAsync(string sql)
        {
            return await Task.FromResult(GetSql(sql));
        }

        public TEntity Get(Expression<Func<TEntity, bool>> filter, bool asNoTracking = false)
        {
            return asNoTracking ? _dbSet.AsNoTracking().FirstOrDefault(filter) : _dbSet.FirstOrDefault(filter);
        }

        public async Task<TEntity?> GetAsync(Expression<Func<TEntity, bool>> filter, bool asNoTracking = false)
        {
            return asNoTracking ?
              await _dbSet.AsNoTracking().FirstOrDefaultAsync(filter)
              : await _dbSet.FirstOrDefaultAsync(filter);
        }

        /// <summary>
        /// AsNoTracking kullanırsak yaptığımız select üzerinde herhangi bir update işlemi uygulayamıyoruz. 
        /// Yani değişikliği yaptıktan sonra entity.SaveChanges() diyerek update işlemi yapamayacağız.
        /// </summary>
        /// <param name="asNoTracking"></param>
        /// <returns></returns>
        public async Task<IQueryable<TEntity>> GetAll(bool asNoTracking = false)
        {
            return asNoTracking
                ? _dbSet.AsNoTracking()
                : _dbSet;
        }



        //public IIncludableJoin<TEntity, TProperty> Join<TProperty>(Expression<Func<TEntity, TProperty>> navigationProperty)
        //{
        //    var query = _dbSet.Join(navigationProperty);
        //    return query;
        //}

        public bool IsExist(Expression<Func<TEntity, bool>> filter)
        {
            return _context.Set<TEntity>().AsNoTracking().Any(filter);
        }

        public TEntity Insert(TEntity entity, bool autoSaveIsNotActive = false)
        {
            var entry = _dbSet.Add(entity);
            if (!autoSaveIsNotActive)
            {
                SaveChanges();
            }
            return entry.Entity;
        }

        public virtual void InsertRange(IEnumerable<TEntity> entities, bool autoSaveIsNotActive = false)
        {
            _dbSet.AddRange(entities);
            if (!autoSaveIsNotActive)
            {
                _context.SaveChanges();
            }
        }
        public async Task<TEntity> InsertAsync(TEntity entity, bool autoSaveIsNotActive = false)
        {
            var entry = await _dbSet.AddAsync(entity);
            if (!autoSaveIsNotActive)
            {
                await SaveChangesAsync();
            }
            return entry.Entity;
        }

        public TEntity Update(TEntity entity, bool autoSaveIsNotActive = false)
        {
            var entry = _dbSet.Update(entity);
            if (!autoSaveIsNotActive)
            {
                SaveChanges();
            }

            return entry.Entity;
        }



        public virtual void UpdateRange(IEnumerable<TEntity> entities, bool autoSaveIsNotActive = false)
        {
            _dbSet.UpdateRange(entities);
            if (!autoSaveIsNotActive)
            {
                _context.SaveChanges();
            }
        }

        public async Task<TEntity> UpdateAsync(TEntity entity, bool autoSaveIsNotActive = false)
        {
            var affectedEntity = Task.FromResult(Update(entity));
            if (!autoSaveIsNotActive)
            {
                await SaveChangesAsync();
            }
            return await affectedEntity;
        }

        public void Delete(int Id, bool autoSaveIsNotActive = false)
        {
            var entity = Get(p => p.Id == Id);
            _dbSet.Remove(entity);
            if (!autoSaveIsNotActive)
            {
                SaveChanges();
            }
        }

        public async Task DeleteAsync(TEntity entity, bool autoSaveIsNotActive = false)
        {
            _dbSet.Remove(entity);
            if (!autoSaveIsNotActive)
            {
                await SaveChangesAsync();
            }
        }
        public void DeleteRange(IEnumerable<TEntity> entities, bool autoSaveIsNotActive = false)
        {

            foreach (var entity in entities)
            {
                var deleteItem = _context.Entry(entity);
                deleteItem.State = EntityState.Deleted;
            }
            if (!autoSaveIsNotActive)
            {
                _context.SaveChanges();
            }
        }


        public int SaveChanges()
        {
            return _context.SaveChanges();
        }

        public async Task<int> SaveChangesAsync()
        {
            return await _context.SaveChangesAsync();
        }


        ~Repository()
        {
            Dispose(false);
        }

    }
}
