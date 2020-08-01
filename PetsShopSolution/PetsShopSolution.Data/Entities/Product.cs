using System;
using System.Collections.Generic;
using System.Text;

namespace PetsShopSolution.Data.Entities
{
    public class Product
    {
        public int ID { get; set; }
        public int CategoryId { get; set; }
        public string Name { get; set; }
        public decimal Price { get; set; }
        public int Stock { get; set; }
        public int ViewCount { get; set; }
        public string DateCreated { get; set; }
        public string Details { get; set; }

        public int RatedCount { get; set; }
        public float Star { get; set; }
        public string ImageURL { get; set; }

        public List<OrderDetail> OrderDetails { get; set; }
        public List<Cart> Carts { get; set; }
        public List<FavoriteProduct> FavoriteProducts { get; set; }
        public List<Comment> Comments { get; set; }
        
    }
}
