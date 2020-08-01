using PetsShopSolution.Data.Enums;
using System;
using System.Collections.Generic;
using System.Text;

namespace PetsShopSolution.ViewModel.Catalog.Orders
{
    public class ORDER
    {
        public int Id { set; get; } = 0;
        public string OrderDate { set; get; } = "";
        public string UserId { set; get; } = "";
        public string ShipName { set; get; } = "";
        public string ShipAddress { set; get; } = "";
        public string ShipEmail { set; get; } = "";
        public string ShipPhoneNumber { set; get; } = "";
        public decimal Total { get; set; } = 0;
        public string Status { set; get; } ="";
    }
}
