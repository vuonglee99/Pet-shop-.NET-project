using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using PetsShopSolution.Data.Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace PetsShopSolution.Data.Configurations
{
    public class FavoriteProductConfiguration : IEntityTypeConfiguration<FavoriteProduct>
    {
        public void Configure(EntityTypeBuilder<FavoriteProduct> builder)
        {
            builder.ToTable("FavoriteProducts");

            builder.HasKey(x => x.Id);

            builder.Property(x => x.Id).UseIdentityColumn();

            //1 Pet thuoc nhieu FavoritePet, khoa ngoai PetID
            builder.HasOne(x => x.Product)
                .WithMany(x => x.FavoriteProducts)
                .HasForeignKey(x => x.ProductId);

            //1 AppUser co nhieu FavoritePet, khoa ngoai UserID
            builder.HasOne(x => x.AppUser)
                .WithMany(x => x.FavoriteProducts)
                .HasForeignKey(x => x.UserId);
        }
    }
}
