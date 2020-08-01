using PetsShopSolution.Data.Enums;
using System;
using System.Collections.Generic;
using System.Text;

namespace PetsShopSolution.ViewModel.System.Notifications
{
   public class NOTIFICATION
    {
        public int Id { get; set; } = 0;
        public string From { get; set; } = "";
        public string To { get; set; } = "";
        public string Tittle { get; set; } = "";
        public string Message { get; set; } = "";
        public string DateCreated { get; set; } = "";
        public Status? Status { get; set; } = null;
    }
}
