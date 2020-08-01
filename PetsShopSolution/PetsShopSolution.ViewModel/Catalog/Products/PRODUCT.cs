using System;
using System.Collections.Generic;
using System.Text;

namespace PetsShopSolution.ViewModel.Catalog.Products
{
    public class PRODUCT
    {
        public int ID { get; set; } = 0;
        public int CategoryId { get; set; } = 0;
        public string Name { get; set; } = "";
        public decimal Price { get; set; } = 0;
        public int Stock { get; set; } = 0;
        public string DateCreated { get; set; } = "";
        public string Details { get; set; } = "";
        public int ViewCount { get; set; } = 0;
        public int RatedCount { get; set; } = 0;
        public float Star { get; set; } = 0;
        public string ImageURL { get; set; } = "";
    }
}
