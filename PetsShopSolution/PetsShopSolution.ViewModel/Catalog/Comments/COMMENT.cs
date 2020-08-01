using System;
using System.Collections.Generic;
using System.Text;

namespace PetsShopSolution.ViewModel.Catalog.Comments
{
    public class COMMENT
    {
        public int Id { get; set; } = 0;
        public int ProductId { get; set; } = 0;
        public string CreatedTime { get; set; } = "";
        public string UserId { get; set; } = "";
        public string Tittle { get; set; } = "";
        public string Content { get; set; } = "";
        public string Reply { get; set; } = "";
        public int Star { get; set; } = 0;

    }
}
