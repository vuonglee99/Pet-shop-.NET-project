using PetsShopSolution.Data.Enums;
using System;
using System.Collections.Generic;
using System.Text;

namespace PetsShopSolution.ViewModel.Catalog.Promotions
{
    public class GetPromotionPagingRequest
    {
        public string KeyWord { get; set; }
        public DateTime? FromDate { get; set; }
        public DateTime? ToDate { get; set; }
        public Status? Status { get; set; }


    }
}
