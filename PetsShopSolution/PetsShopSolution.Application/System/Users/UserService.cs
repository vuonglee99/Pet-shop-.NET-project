using PetsShopSolution.Data.Entities;
using PetsShopSolution.ViewModel.System.Users;
using Microsoft.AspNetCore.Identity;
using System.Threading.Tasks;
using System.Linq;
using System;
using System.Security.Claims;
using Microsoft.Extensions.Configuration;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using Microsoft.AspNetCore.Hosting;
using System.IO;
using Microsoft.AspNetCore.Http;
using System.Net.Http.Headers;
using Firebase.Auth;
using PetsShopSolution.Utilities.Constants;
using System.Threading;
using Firebase.Storage;
using PetsShopSolution.Utilities.Exceptions;

namespace PetsShopSolution.Application.System.Users
{
    public class UserService : IUserService
    {
        
        private readonly UserManager<AppUser> _userManager;
        private readonly SignInManager<AppUser> _signInManager;
        private readonly RoleManager<AppRole> _roleManager;
        private readonly IConfiguration _config;

        private const string USER_CONTENT_FOLDER_NAME = "user-content";
        private readonly string _userContentFolder;

        public UserService(UserManager<AppUser> userManager,
            SignInManager<AppUser> signInManager,
            RoleManager<AppRole> roleManager,
            IConfiguration config,
            IWebHostEnvironment webHostEnvironment)
        {
            _userManager = userManager;
            _signInManager = signInManager;
            _roleManager = roleManager;
            _config = config;
            _userContentFolder = Path.Combine(webHostEnvironment.WebRootPath, USER_CONTENT_FOLDER_NAME);
        }

        public async Task<string> Authenticate(LoginRequest request)
        {
            var user = await _userManager.FindByNameAsync(request.Username);
            if (user == null) return "-1";

            var result = await _signInManager.PasswordSignInAsync(user, request.Password, request.RememberMe, true);
            if (!result.Succeeded)
            {
                return "-1";
            }
            return user.Id.ToString();
        }


        public async Task<bool> Delete(Guid id)
        {
            var user = await _userManager.FindByIdAsync(id.ToString());
            if (user == null)
            {
                return false;
            }
            var reult = await _userManager.DeleteAsync(user);
            if (reult.Succeeded)
                return true;

            return false;
        }

        public async Task<UserViewModel> GetById(Guid id)
        {
            var user = await _userManager.FindByIdAsync(id.ToString());
            if (user == null)
            {
                return null;
            }
            var roles = await _userManager.GetRolesAsync(user);
            var userVm = new UserViewModel()
            {
                Email = user.Email,
                PhoneNumber = user.PhoneNumber,
                FirstName = user.FirstName,
                Dob = user.Dob,
                Id = user.Id,
                LastName = user.LastName,
                UserName = user.UserName,
                Avartar = user.Avatar,
                Role=user.Role,
            };
            return userVm;
        }

        public async Task<List<UserViewModel>> GetAllUser(APPUSER request)
        {
            var query = _userManager.Users;
            if (!string.IsNullOrEmpty(request.UserName))
            {
                query = query.Where(x => x.UserName.Contains(request.UserName));
            }
            if (!string.IsNullOrEmpty(request.PhoneNumber))
            {
                query = query.Where(x => x.PhoneNumber==request.PhoneNumber);
            }
            if (!string.IsNullOrEmpty(request.Email))
            {
                query = query.Where(x => x.Email==request.Email);
            }
            if (!string.IsNullOrEmpty(request.Role))
            {
                query = query.Where(x =>x.Role==request.Role);
            }

            //3. Paging
            int totalRow = await query.CountAsync();

            var data = await query
                .Select(x => new UserViewModel()
                {
                    Email = x.Email,
                    PhoneNumber = x.PhoneNumber,
                    UserName = x.UserName,
                    FirstName = x.FirstName,
                    Id = x.Id,
                    LastName = x.LastName,
                    Avartar = x.Avatar,
                    Dob = x.Dob,
                    Role=x.Role,

                }).ToListAsync();

            //4. Select and projection

            return data;
        }

        public async Task<string> Register(APPUSER request)
        {
            var user = await _userManager.FindByNameAsync(request.UserName);
            if (user != null)
            {
                return "";
            }

            user = new AppUser()
            {
                Dob = request.Dob,
                Email = request.Email,
                FirstName = request.FirstName,
                LastName = request.LastName,
                UserName = request.UserName,
                PhoneNumber = request.PhoneNumber,
                Avatar = request.Avatar,
                Role=request.Role,
            };
            var result = await _userManager.CreateAsync(user, request.Password);
            if (result.Succeeded)
            {
                var x = await _userManager.FindByNameAsync(request.UserName);
                return x.Id.ToString();
            }
            return "";
        }


        public async Task<bool> Update(APPUSER request)
        {

            var user = await _userManager.FindByIdAsync(request.Id);
            if (user == null) return false;

            if (!string.IsNullOrEmpty(request.Dob))
                user.Dob =request.Dob.ToString();
            if (!string.IsNullOrEmpty(request.Email))
                user.Email = request.Email;
            if (!string.IsNullOrEmpty(request.FirstName))
                user.FirstName = request.FirstName;
            if (!string.IsNullOrEmpty(request.LastName))
                user.LastName = request.LastName;
            if (!string.IsNullOrEmpty(request.PhoneNumber))
                user.PhoneNumber = request.PhoneNumber;
            if (!string.IsNullOrEmpty(request.Avatar))
                user.Avatar = request.Avatar;
            if (!string.IsNullOrEmpty(request.Role))
                user.Role = request.Role;

            var result = await _userManager.UpdateAsync(user);
            if (result.Succeeded)
            {
                return true;
            }
            return false;
        }

        public async Task<bool> UploadAvatar(Guid id, IFormFile imageFile)
        {
            var originalFileName = ContentDispositionHeaderValue.Parse(imageFile.ContentDisposition).FileName.ToString().Trim('"');
            var fileName = $"{Guid.NewGuid()}{Path.GetExtension(originalFileName)}";
            var filePath = Path.Combine(_userContentFolder, fileName);


            FileStream ms = new FileStream(filePath, FileMode.Create);
            var output = ms;
            await imageFile.OpenReadStream().CopyToAsync(output);
            ms.Close();

            ms = new FileStream(filePath, FileMode.Open);
            var auth = new FirebaseAuthProvider(new FirebaseConfig(FireBaseConfig.ApiKey));
            var a = await auth.SignInWithEmailAndPasswordAsync(FireBaseConfig.AuthEmail, FireBaseConfig.AuthPassword);

            var cancellation = new CancellationTokenSource();

            var task = new FirebaseStorage(
                FireBaseConfig.Bucket,
                new FirebaseStorageOptions
                {
                    AuthTokenAsyncFactory = () => Task.FromResult(a.FirebaseToken),
                    ThrowOnCancel = true // when you cancel the upload, exception is thrown. By default no exception is thrown
                })
                .Child("avatars")
                .Child(fileName)
                .PutAsync(ms, cancellation.Token);

            var user = await _userManager.FindByIdAsync(id.ToString());
            user.Avatar = await task;
            var result = await _userManager.UpdateAsync(user);
            if (result.Succeeded)
            {
                return true;
            }
            return false;
        }

        public async Task<bool> ChangePassWord(Guid id, string newPass)
        {
            var hasher = new PasswordHasher<AppUser>();

            var user = await _userManager.FindByIdAsync(id.ToString());
            if (user == null) return false;

            user.PasswordHash = hasher.HashPassword(null, newPass);

            var result = await _userManager.UpdateAsync(user);
            if (result.Succeeded)
            {
                return true;
            }
            return false;
        }
    }
}
