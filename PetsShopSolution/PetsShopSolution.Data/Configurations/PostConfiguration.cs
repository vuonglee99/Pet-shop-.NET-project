using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using PetsShopSolution.Data.Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace PetsShopSolution.Data.Configurations
{
    public class PostConfiguration : IEntityTypeConfiguration<Post>
    {
        public void Configure(EntityTypeBuilder<Post> builder)
        {
            builder.ToTable("Posts");
            builder.HasKey(x => x.Id);

            builder.Property(x => x.Id).UseIdentityColumn();
            builder.Property(x => x.Tittle).HasMaxLength(100);
            builder.Property(x => x.Content).HasMaxLength(4000);
            builder.Property(x => x.ViewCount).HasDefaultValue(0);
            builder.Property(x => x.CreatedTime);
            builder.Property(x => x.ImageURL).HasMaxLength(200);

            //1 user co nhieu post
            builder.HasOne(x => x.AppUser)
                .WithMany(x => x.Posts)
                .HasForeignKey(x => x.UserId);

        }
    }
}
