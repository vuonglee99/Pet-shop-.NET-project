using PetsShopSolution.Data.Enums;
using System.Collections.Generic;
using System.Text;

namespace PetsShopSolution.Data.Entities
{
   public class Category
    {
        public int ID { get; set; }
        public string Name { get; set; }
        public string SeoDescription { get; set; }
        public int? ParentID { get; set; }

    }
}
