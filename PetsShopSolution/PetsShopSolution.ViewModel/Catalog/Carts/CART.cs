using System;
using System.Collections.Generic;
using System.Text;

namespace PetsShopSolution.ViewModel.Catalog.Carts
{
    public class CART
    {
        public int Id { set; get; } = 0;
        public int ProductId { set; get; } = 0;
        public int Quantity { set; get; } = 0;
        public decimal Total { set; get; } = 0;
        public string UserId { get; set; } = "";
        public string DateCreated { get; set; } = "";
       // public string ImageURL { get; set; } = "";
    }
}
