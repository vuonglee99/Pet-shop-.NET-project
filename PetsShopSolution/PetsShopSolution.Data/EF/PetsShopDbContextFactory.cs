using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.IO;
using System.Text;

namespace PetsShopSolution.Data.EF
{
    public class PetsShopDbContextFactory : IDesignTimeDbContextFactory<PetsShopDbContext>
    {
        public PetsShopDbContext CreateDbContext(string[] args)
        {
            IConfigurationRoot configuration = new ConfigurationBuilder()
                .SetBasePath(Directory.GetCurrentDirectory())
                .AddJsonFile("appsettings.json")
                .Build();
            var connectionString = configuration.GetConnectionString("PetsSolutionDb");
            var optionsBuilder = new DbContextOptionsBuilder<PetsShopDbContext>();
            optionsBuilder.UseSqlServer(connectionString);

            return new PetsShopDbContext(optionsBuilder.Options);
        }
    }
}
