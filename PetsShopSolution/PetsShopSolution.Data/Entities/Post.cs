using Microsoft.AspNetCore.Http;
using PetsShopSolution.Data.Enums;
using System;
using System.Collections.Generic;
using System.Diagnostics.Contracts;
using System.Text;

namespace PetsShopSolution.Data.Entities
{
    public class Post
    {
        public int Id { get; set; }
        public Guid UserId { get; set; }
        public int ViewCount { get; set; }
        public string Tittle { get; set; }
        public string CreatedTime { get; set; }
        public string Content { get; set; }
        public Status Status { set; get; }
        
        public string ImageURL { get; set; }

        public AppUser AppUser { get; set; }

    }
}
