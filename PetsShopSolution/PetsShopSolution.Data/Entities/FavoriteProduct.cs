using System;
using System.Collections.Generic;
using System.Text;

namespace PetsShopSolution.Data.Entities
{
    public class FavoriteProduct
    {
        public int Id { set; get; }
        public int ProductId { set; get; }
        public Guid UserId { get; set; }

        public Product Product { get; set; }
        public AppUser AppUser { get; set; }
    }
}
