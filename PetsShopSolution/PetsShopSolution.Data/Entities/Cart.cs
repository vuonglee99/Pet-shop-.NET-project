using System;
using System.Collections.Generic;
using System.Text;

namespace PetsShopSolution.Data.Entities
{
    public class Cart
    {
        public int Id { set; get; }
        public int ProductId { set; get; }
        public int Quantity { set; get; }
        public decimal Total { set; get; }
       // public string ImageURL { get; set; }
        public Guid UserId { get; set; }
        public string DateCreated { get; set; }


        public Product Product { get; set; }
        public AppUser AppUser { get; set; }
    }
}
