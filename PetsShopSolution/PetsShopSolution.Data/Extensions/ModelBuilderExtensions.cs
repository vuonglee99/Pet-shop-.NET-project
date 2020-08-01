using PetsShopSolution.Data.Entities;
using PetsShopSolution.Data.Enums;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Text;

namespace eShopSolution.Data.Extensions
{
    public static class ModelBuilderExtensions
    {
        public static void Seed(this ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<AppConfig>().HasData(
               new AppConfig() { Key = "HomeTitle", Value = "This is home page of eShopSolution" },
               new AppConfig() { Key = "HomeKeyword", Value = "This is keyword of eShopSolution" },
               new AppConfig() { Key = "HomeDescription", Value = "This is description of eShopSolution" }
               );


            modelBuilder.Entity<Category>().HasData(
                new Category()
                {
                    ID = 1,
                    Name = "Chó",
                    SeoDescription = "Hãy lựa chọn những chú cún bạn yêu thích",
                    ParentID = 0,
                },
                 new Category()
                 {
                     ID = 2,
                     Name = "Mèo",
                     SeoDescription = "Hãy lựa chọn những chú mèo bạn yêu thích",
                     ParentID = 0,
                 },
                 new Category()
                 {
                     ID = 3,
                     Name = "Vật nuôi khác",
                     SeoDescription = "Các thú cưng khác",
                     ParentID = 0,
                 });


            modelBuilder.Entity<Product>().HasData(
           new Product()
           {
               ID = 1,
               Name = "Chó Husky lông đen 3 tháng tuổi",
               Details = "Chó Husky lông đen 3 tháng tuổi cực kỳ cute đáng yêu",
               DateCreated = "3/6/2020",
               Price = 6000000,
               Stock = 0,
               ViewCount = 0,
               CategoryId=1,
           },
            new Product()
            {
                ID = 2,
                Name = "Mèo Ai Cập lông trắng mắt xanh",
                Details = "Mèo Ai Cập lông trắng mắt xanh",
                DateCreated = "1/6/2020",
                Price = 2000000,
                Stock = 0,
                ViewCount = 0,
                CategoryId=2,
            });

        


            //any guid
            var roleId = new Guid("8D04DCE2-969A-435D-BBA4-DF3F325983DC");
            var adminId = new Guid("69BD714F-9576-45BA-B5B7-F00649BE00DE");
            var user1 = new Guid("69BD714F-9576-45BA-B5B8-F00649BE00DE");
            modelBuilder.Entity<AppRole>().HasData(new AppRole
            {
                Id = roleId,
                Name = "admin",
                NormalizedName = "admin",
                Description = "Administrator role"
            });

            var hasher = new PasswordHasher<AppUser>();
            modelBuilder.Entity<AppUser>().HasData(
                new AppUser
                {
                    Id = adminId,
                    UserName = "admin",
                    NormalizedUserName = "admin",
                    Email = "haanh0611@gmail.com",
                    NormalizedEmail = "haanh0611@gmail.com",
                    EmailConfirmed = true,
                    PasswordHash = hasher.HashPassword(null, "Admin1234$"),
                    SecurityStamp = string.Empty,
                    FirstName = "Anh",
                    LastName = "Ha",
                    Dob = "17/07/1999",
                    Role="admin"
                },
                new AppUser
                {
                    Id = user1,
                    UserName = "Vuonglee",
                    NormalizedUserName = "Vuonglee",
                    Email = "Vuonglee99@gmail.com",
                    NormalizedEmail = "Vuonglee99@gmail.com",
                    EmailConfirmed = true,
                    PasswordHash = hasher.HashPassword(null, "Vuong1234@"),
                    SecurityStamp = string.Empty,
                    FirstName = "Vuong",
                    LastName = "Le",
                    Dob = "11/11/1999",
                    Role = "user"
                });

            modelBuilder.Entity<IdentityUserRole<Guid>>().HasData(new IdentityUserRole<Guid>
            {
                RoleId = roleId,
                UserId = adminId
            });

            modelBuilder.Entity<Post>().HasData(new Post
            {
                Id = 1,
                Status = Status.InActive,
                Content = "Content post 1",
                Tittle = "Title post 1",
                CreatedTime = "5/6/2020",
                UserId = adminId,
                ViewCount = 0,
            }, new Post
            {
                Id = 2,
                Status = Status.Active,
                Content = "Content post 2",
                Tittle = "Title post 2",
                CreatedTime = "11/6/2020",
                UserId = adminId,
                ViewCount = 5,
            }, new Post
            {
                Id = 3,
                Status = Status.Active,
                Content = "Content post 3",
                Tittle = "Title post 3",
                CreatedTime = "8/6/2020",
                UserId = adminId,
                ViewCount = 3,
            });


            modelBuilder.Entity<Cart>().HasData(new Cart()
            {
                Id = 1,
                DateCreated = "10/6/2020",
                ProductId = 1,
                Quantity = 5,
                Total = 30000000,
                UserId = adminId,
            },
            new Cart()
            {
                Id = 2,
                DateCreated = "7/6/2020",
                ProductId = 2,
                Quantity = 1,
                Total = 2000000,
                UserId = adminId,
            });

        }
    }
}
