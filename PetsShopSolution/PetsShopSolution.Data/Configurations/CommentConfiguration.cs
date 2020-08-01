using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using PetsShopSolution.Data.Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace PetsShopSolution.Data.Configurations
{
    public class CommentConfiguration : IEntityTypeConfiguration<Comment>
    {
        public void Configure(EntityTypeBuilder<Comment> builder)
        {
            builder.ToTable("Comments");
            builder.HasKey(x => x.Id);

            builder.Property(x => x.Id).UseIdentityColumn();
            builder.Property(x => x.Tittle).HasMaxLength(50);
            builder.Property(x => x.Content).HasMaxLength(400);
            builder.Property(x => x.CreatedTime);
            builder.Property(x => x.Reply).HasMaxLength(400);
            builder.Property(x => x.Star).IsRequired();

            //1 Product thuoc nhieu Ccomment, khoa ngoai PetID
            builder.HasOne(x => x.Product)
                .WithMany(x => x.Comments)
                .HasForeignKey(x => x.ProductId);

            //1 AppUser co nhieu comment, khoa ngoai UserID
            builder.HasOne(x => x.AppUser)
                .WithMany(x => x.Comments)
                .HasForeignKey(x => x.UserId);
        }
    }
}
