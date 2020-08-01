using PetsShopSolution.Data.Entities;
using PetsShopSolution.Data.Enums;
using System;
using System.Collections.Generic;
using System.Text;

namespace PetsShopSolution.Data.Entities
{
    public class Order
    {
        public int Id { set; get; }
        public string OrderDate { set; get; }
        public Guid UserId { set; get; }
        public string ShipName { set; get; }
        public string ShipAddress { set; get; }
        public string ShipEmail { set; get; }
        public string ShipPhoneNumber { set; get; }
        public decimal Total { get; set; }
        public string Status { set; get; }
        public List<OrderDetail> OrderDetails { get; set; }
        public AppUser AppUser { get; set; }
    }
}
