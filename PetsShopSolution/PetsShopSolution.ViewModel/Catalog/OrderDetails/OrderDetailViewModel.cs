using System;
using System.Collections.Generic;
using System.Text;

namespace PetsShopSolution.ViewModel.Catalog.OrderDetails
{
    public class OrderDetailViewModel
    {
        public int OrderId { set; get; }
        public int ProductId { set; get; }
        public string ProductName { get; set; }
        public decimal ProductPrice { get; set; }
        public int Quantity { set; get; }
        public decimal Sum { set; get; }
        public string ImageURL { get; set; }
    }
}
