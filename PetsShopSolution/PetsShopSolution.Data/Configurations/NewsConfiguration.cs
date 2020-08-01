using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using PetsShopSolution.Data.Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace PetsShopSolution.Data.Configurations
{
    public class NewsConfiguration : IEntityTypeConfiguration<New>
    {
        public void Configure(EntityTypeBuilder<New> builder)
        {
            builder.ToTable("News");
            builder.HasKey(x => x.Id);
            builder.Property(x => x.Id).UseIdentityColumn();
            builder.Property(x => x.DateCreated);
            builder.Property(x => x.Tittle).HasMaxLength(200);
            builder.Property(x => x.Content).HasMaxLength(4000);
            builder.Property(x => x.ImageURL).HasMaxLength(200);
        }
    }
}
