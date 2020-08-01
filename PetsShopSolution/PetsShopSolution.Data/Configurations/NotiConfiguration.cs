using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using PetsShopSolution.Data.Entities;
using PetsShopSolution.Data.Enums;
using System;
using System.Collections.Generic;
using System.Text;

namespace PetsShopSolution.Data.Configurations
{
   public class NotiConfiguration : IEntityTypeConfiguration<Notification>
    {
        public void Configure(EntityTypeBuilder<Notification> builder)
        {
            builder.ToTable("Notifications");
            builder.HasKey(x => x.Id);

            builder.Property(x => x.Id).UseIdentityColumn();
            builder.Property(x => x.Tittle).HasMaxLength(100);
            builder.Property(x => x.Message).HasMaxLength(500);
            builder.Property(x => x.DateCreated); ;
            builder.Property(x => x.Status).HasDefaultValue(Status.InActive);
            builder.Property(x => x.From).IsRequired();
            builder.Property(x => x.To).IsRequired();
         
        }
    }
}
