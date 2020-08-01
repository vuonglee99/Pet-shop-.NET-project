using System;
using System.Collections.Generic;
using System.Text;

namespace PetsShopSolution.ViewModel.System.Users
{
    public class APPUSER
    {
        public string Id { get; set; } = "";
        public string FirstName { get; set; } = "";

        public string LastName { get; set; } = "";

        public string Dob { get; set; } = "";

        public string Email { get; set; } = "";

        public string PhoneNumber { get; set; } = "";

        public string UserName { get; set; } = "";

        public string Password { get; set; } = "";

        public string ConfirmPassword { get; set; } = "";
        public string Avatar { get; set; } = "";
        public string Role { get; set; } = "";
    }
}
