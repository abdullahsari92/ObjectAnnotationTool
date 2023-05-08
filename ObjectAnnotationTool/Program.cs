using Microsoft.EntityFrameworkCore;
using ObjectAnnotationTool.DataAccess;
using ObjectAnnotationTool.DataAccess.Entity;
using System.Text.Json.Serialization;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddHealthChecks();


builder.Services.AddScoped<IRepository<Etiket>, Repository<Etiket>>();
builder.Services.AddScoped<IRepository<Document>, Repository<Document>>();
builder.Services.AddScoped<IRepository<Sinif>, Repository<Sinif>>();







builder.Services.AddHttpClient();


string configuration = builder.Configuration.GetConnectionString("MySqlConnection");
//builder.Services.AddDbContext<EfDbContext>(options => options.UseSqlServer(configuration));
var serverVersion = new MySqlServerVersion(new Version(8, 0, 33));

builder.Services.AddDbContext<EfDbContext>(options => options.UseMySql(configuration, serverVersion));



builder.Services.AddCors(options => options.AddDefaultPolicy(builder => builder.AllowAnyHeader().AllowAnyMethod().AllowAnyOrigin()));

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();


builder.Services.AddSingleton<IHttpContextAccessor, HttpContextAccessor>();


builder.Services.AddControllers().AddJsonOptions(p => { p.JsonSerializerOptions.ReferenceHandler = ReferenceHandler.IgnoreCycles; });


var app = builder.Build();


// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors();

app.UseRouting();

app.UseStaticFiles();


app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
