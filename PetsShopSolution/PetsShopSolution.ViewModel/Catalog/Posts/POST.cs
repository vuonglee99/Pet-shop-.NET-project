using PetsShopSolution.Data.Enums;
using System;
using System.Collections.Generic;
using System.Text;

namespace PetsShopSolution.ViewModel.Catalog.Posts
{
    public class POST
    {
        public int Id { get; set; } = 0;
        public string UserId { get; set; } = "";
        public string Tittle { get; set; } = "";
        public string CreatedTime { get; set; } = "";
        public string Content { get; set; } = "";
        public Status? Status { set; get; } = null;
        public int ViewCount { get; set; } = 0;
        public string ImageURL { get; set; } = "";
    }
}
