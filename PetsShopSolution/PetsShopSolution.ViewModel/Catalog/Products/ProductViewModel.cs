using System;

namespace PetsShopSolution.ViewModel.Catalog.Products
{
    public class ProductViewModel
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
    }
}
