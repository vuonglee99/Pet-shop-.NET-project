using PetsShopSolution.Data.Enums;
using System;
using System.Collections.Generic;
using System.Text;

namespace PetsShopSolution.ViewModel.Catalog.Posts
{
    public class PostViewModel
    {
        public int Id { get; set; }
        public Guid UserId { get; set; }
        public string UserName { get; set; }
        public string Avatar { get; set; }
        public string Tittle { get; set; }
        public string Content { get; set; }
        public int ViewCount { get; set; }
        public string CreatedTime { get; set; }
        public Status Status { set; get; }
        public string ImageURL { get; set; }

    }
}
