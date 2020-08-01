using PetsShopSolution.Data.Enums;
using System;
using System.Collections.Generic;
using System.Text;

namespace PetsShopSolution.ViewModel.Catalog.Contacts
{
   public class CONTACT
    {
        public int Id { get; set; } = 0;
        public string CreatedTime { get; set; } = "";
        public string Name { set; get; } = "";
        public string Email { set; get; } = "";
        public string PhoneNumber { set; get; } = "";
        public string Message { set; get; } = "";
        public Status? Status { get; set; } = null;
    }
}
