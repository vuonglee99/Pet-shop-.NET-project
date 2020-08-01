using System;
using System.Collections.Generic;
using System.Text;

namespace PetsShopSolution.ViewModel.Catalog.News
{
    public class NewsViewModel
    {
        public int Id { get; set; }
        public string DateCreated { get; set; }
        public string Tittle { get; set; }
        public string Content { get; set; }
        public string ImageURL { get; set; }
    }
}
