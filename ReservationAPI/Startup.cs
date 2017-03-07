using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using MySQL.Data.EntityFrameworkCore.Extensions;
using Swashbuckle.AspNetCore.Swagger;
using Microsoft.Extensions.PlatformAbstractions;
using System.IO;

namespace ReservationAPI
{
    public class Startup
    {
        public Startup(IHostingEnvironment env)
        {
            var builder = new ConfigurationBuilder()
                .SetBasePath(env.ContentRootPath)
                .AddJsonFile("appsettings.json", optional: true, reloadOnChange: true)
                .AddJsonFile($"appsettings.{env.EnvironmentName}.json", optional: true)
                .AddEnvironmentVariables();
            Configuration = builder.Build();
        }

        public IConfigurationRoot Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
			// Add framework services.
			services.AddCors();

			services.AddDbContext<ReservationAPIDataContext>(options =>
			{
				var connectionString = Configuration["ConnectionStrings:Production"];
				options.UseMySQL(connectionString);
			});

			services.AddSwaggerGen(c =>
			{
				c.SwaggerDoc("v1", new Info
				{
					Title = "Reservation API",
					Version = "v1"
				});
				//var BasePath = PlatformServices.Default.Application.ApplicationBasePath;
				//var XmlPath = Path.Combine(BasePath, "ReservationAPI.xml");
				//c.IncludeXmlComments(XmlPath);
			});

			services.AddMvc();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env, ILoggerFactory loggerFactory)
        {
            loggerFactory.AddConsole(Configuration.GetSection("Logging"));
			if (env.IsDevelopment())
			{
				app.UseDeveloperExceptionPage();
			}

			app.UseCors(builder =>
			{
				builder.AllowAnyOrigin();
			});

			app.UseSwagger();

			app.UseSwaggerUi(c =>
			{
				c.SwaggerEndpoint("/swagger/v1/swagger.json", "Reservation API v1");
			});

			app.UseMvcWithDefaultRoute();
        }
    }
}
