using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using PetsShopSolution.Data.Entities;

namespace PetsShopSolution.Data.Configurations
{
    public class AppConfigConfiguration : IEntityTypeConfiguration<AppConfig>
    {
        public void Configure(EntityTypeBuilder<AppConfig> builder)
        {
            builder.ToTable("AppConfigs"); //Ten bang duoc generate trong db la AppConfigs
            builder.HasKey(x => x.Key); //set primarykey cua bang la thuoc tinh key cua AppConfig
            builder.Property(x => x.Value).IsRequired();  //set property cua bang la thuoc tinh Value va bat buoc phai nhap
        }
    }
}
