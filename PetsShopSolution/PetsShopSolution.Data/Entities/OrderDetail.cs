using System;
using System.Collections.Generic;
using System.Text;

namespace PetsShopSolution.Data.Entities
{
    public class OrderDetail
    {
        public int OrderId { set; get; }
        public int ProductId { set; get; }
        public int Quantity { set; get; }
        public decimal Sum { set; get; }
       // public string ImageURL { get; set; }
        public Order Order { get; set; }
        public Product Product { get; set; }

    }
}
