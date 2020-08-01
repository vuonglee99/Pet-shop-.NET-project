using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using PetsShopSolution.Application.System.Users;
using PetsShopSolution.ViewModel.System.Users;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace PetsShopSolution.BackEndApi.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly IUserService _userService;
        public UsersController(IUserService userService)
        {
            _userService = userService;
        }


        [HttpPost]
        [AllowAnonymous]  //chua dang nhap van co the vao dc
        public async Task<string> Authenticate([FromBody]LoginRequest request)
        {
            return await _userService.Authenticate(request);
        }


        [HttpPost]
        [AllowAnonymous]  //chua dang nhap van co the vao dc
        public async Task<string> Register([FromBody]APPUSER request)
        {

            return await _userService.Register(request);

        }

    
        [HttpPost]
        public async Task<bool> Update([FromBody]APPUSER request)
        {

            return await _userService.Update(request);

        }


        [HttpPost]
        public async Task<List<UserViewModel>> GetAllUser([FromBody]APPUSER request)
        {
            return await _userService.GetAllUser(request);

        }

        [HttpPost]
        public async Task<UserViewModel> GetById(Guid id)
        {
            return await _userService.GetById(id);
        }

        [HttpPost]
        public async Task<bool> Delete(Guid id)
        {
            return await _userService.Delete(id);

        }

        [HttpPost]
        public async Task<bool> UploadAvatar(Guid id, IFormFile imageFile)
        {
            return await _userService.UploadAvatar(id, imageFile);      
        }

        [HttpPost]
        public async Task<bool> ChangePassWord(Guid id, string newPass)
        {
            return await _userService.ChangePassWord(id, newPass);      
        }


    }
}