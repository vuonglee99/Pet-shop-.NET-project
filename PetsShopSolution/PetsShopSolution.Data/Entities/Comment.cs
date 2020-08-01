using System;
using System.Collections.Generic;
using System.Text;

namespace PetsShopSolution.Data.Entities
{
   public class Comment
    {
        public int Id { get; set; }
        public int ProductId { get; set; }
        public string CreatedTime { get; set; }
        public Guid UserId { get; set; }
        public string Tittle { get; set; }
        public string Content { get; set; }
        public string Reply { get; set; }
        public int Star { get; set; }
        public AppUser AppUser { get; set; }
        public Product Product { get; set; }
    }
}
