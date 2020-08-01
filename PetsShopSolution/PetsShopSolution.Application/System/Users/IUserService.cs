using Microsoft.AspNetCore.Http;
using PetsShopSolution.ViewModel.System.Users;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace PetsShopSolution.Application.System.Users
{
    public interface IUserService
    {
        Task<string> Authenticate(LoginRequest request);

        Task<string> Register(APPUSER request);

        Task<bool> Update( APPUSER request);

        Task<List<UserViewModel>> GetAllUser(APPUSER request);

        Task<UserViewModel> GetById(Guid id);

        Task<bool> Delete(Guid id);

        Task<bool>UploadAvatar(Guid id, IFormFile imageFile);

        Task<bool> ChangePassWord(Guid id, string newPass);

    }
}
