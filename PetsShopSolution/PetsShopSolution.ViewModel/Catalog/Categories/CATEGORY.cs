using PetsShopSolution.Data.Enums;
using System;
using System.Collections.Generic;
using System.Text;

namespace PetsShopSolution.ViewModel.Catalog.Categories
{
    public class CATEGORY
    {
        public int ID { get; set; } = 0;
        public string Name { get; set; } = "";
        public string SeoDescription { get; set; } = "";
        public int ParentID { get; set; } = 0;
    }
}
