using System;
using System.Collections.Generic;
using System.Text;

namespace PetsShopSolution.ViewModel.Catalog.Carts
{
   public class CartViewModel
    {
        public int Id { set; get; }
        public int ProductId { set; get; }
        public string ProductName { get; set; }
        public decimal Price { get; set; }
        public int Quantity { set; get; }
        public decimal Total { set; get; }
        public Guid UserId { get; set; }
        public string DateCreated { get; set; }
        public string ImageURL { get; set; }
    }
}
