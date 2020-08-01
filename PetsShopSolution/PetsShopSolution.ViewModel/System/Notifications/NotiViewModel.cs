using PetsShopSolution.Data.Enums;
using System;
using System.Collections.Generic;
using System.Text;

namespace PetsShopSolution.ViewModel.System.Notifications
{
    public class NotiViewModel
    {
        public int Id { get; set; }
        public Guid From { get; set; }
        public Guid To { get; set; }
        public string Tittle { get; set; }
        public string Message { get; set; }
        public string DateCreated { get; set; }
        public Status Status { get; set; }
    }
}
