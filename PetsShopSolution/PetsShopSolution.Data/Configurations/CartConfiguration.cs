using PetsShopSolution.Data.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.Text;

namespace PetsShopSolution.Data.Configurations
{
    public class CartConfiguration : IEntityTypeConfiguration<Cart>
    {
        public void Configure(EntityTypeBuilder<Cart> builder)
        {
            builder.ToTable("Carts");
            builder.HasKey(x => x.Id);

            builder.Property(x => x.Id).UseIdentityColumn();
            builder.Property(x => x.DateCreated);

            //1 Product thuoc nhieu Cart, khoa ngoai PetID
            builder.HasOne(x => x.Product)
                .WithMany(x => x.Carts)
                .HasForeignKey(x => x.ProductId);

            //1 AppUser co nhieu Cart, khoa ngoai UserID
            builder.HasOne(x => x.AppUser)
                .WithMany(x => x.Carts)
                .HasForeignKey(x => x.UserId);
        }
    }
}
