using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;

namespace PetsShopSolution.Data.Entities
{
    public class AppUser : IdentityUser<Guid>
    {

        public string FirstName { get; set; }

        public string LastName { get; set; }

        public string Dob { get; set; }
        public string Avatar { get; set; }
        public string Role { get; set; }
        public List<Cart> Carts { get; set; }
        public List<FavoriteProduct> FavoriteProducts { get; set; }
        public List<Comment> Comments { get; set; }
        public List<Post> Posts { get; set; }
        public List<Order> Orders { get; set; }
    }
}
