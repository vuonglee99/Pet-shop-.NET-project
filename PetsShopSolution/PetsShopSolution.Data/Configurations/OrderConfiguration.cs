using PetsShopSolution.Data.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.Text;
using PetsShopSolution.Data.Enums;

namespace PetsShopSolution.Data.Configurations
{
    public class OrderConfiguration : IEntityTypeConfiguration<Order>
    {
        public void Configure(EntityTypeBuilder<Order> builder)
        {
            builder.ToTable("Orders");

            builder.HasKey(x => x.Id);

            builder.Property(x => x.Id).UseIdentityColumn();

            builder.Property(x => x.OrderDate);

            builder.Property(x => x.ShipEmail).IsRequired().IsUnicode(false).HasMaxLength(50).HasDefaultValue("");

            builder.Property(x => x.ShipAddress).IsRequired().HasMaxLength(200).HasDefaultValue("");


            builder.Property(x => x.ShipName).IsRequired().HasMaxLength(200).HasDefaultValue("");

            builder.Property(x => x.Status).IsRequired().HasMaxLength(200).HasDefaultValue("");

            builder.Property(x => x.ShipPhoneNumber).IsRequired().HasMaxLength(200).HasDefaultValue("");

            //1 AppUser co nhieu orders
            builder.HasOne(x => x.AppUser).WithMany(x => x.Orders).HasForeignKey(x => x.UserId);
        }
    }
}
