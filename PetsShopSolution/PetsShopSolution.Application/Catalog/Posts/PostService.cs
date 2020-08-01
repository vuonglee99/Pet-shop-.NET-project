//using Microsoft.AspNetCore.Http;
//using PetsShopSolution.Data.EF;
//using PetsShopSolution.Data.Entities;
//using PetsShopSolution.ViewModel.Catalog.Posts;
//using System;
//using System.Collections.Generic;
//using System.IO;
//using System.Net.Http.Headers;
//using System.Threading.Tasks;
//using Firebase;
//using PetsShopSolution.Utilities.Exceptions;
//using System.Linq;
//using Microsoft.EntityFrameworkCore;
//using PetsShopSolution.Data.Enums;
//using Firebase.Auth;
//using PetsShopSolution.Utilities.Constants;
//using System.Threading;
//using Firebase.Storage;
//using Microsoft.AspNetCore.Hosting;

//namespace PetsShopSolution.Application.Catalog.Posts
//{
//    public class PostService : IPostService
//    {

//        private readonly PetsShopDbContext _Context;
//        private const string USER_CONTENT_FOLDER_NAME = "user-content";
//        private readonly string _userContentFolder;
//        public PostService(PetsShopDbContext Context, IWebHostEnvironment webHostEnvironment)
//        {
//            _Context = Context;
//            _userContentFolder = Path.Combine(webHostEnvironment.WebRootPath, USER_CONTENT_FOLDER_NAME);
//        }

//        public async Task<int> Create(POST request)
//        {
//            var post = new Post()
//            {
//                UserId = Guid.Parse(request.UserId),
//                Tittle = request.Tittle,
//                Content = request.Content,
//                Status = Status.InActive,
//                CreatedTime = request.CreatedTime,
//                ViewCount = 0,
//                ImageURL = request.ImageURL,
//            };

//            //add post zo context
//            _Context.Posts.Add(post);
//            await _Context.SaveChangesAsync();
//            return post.Id;

//        }

//        public async Task<int> Delete(int PostId)
//        {
//            var post = await _Context.Posts.FindAsync(PostId);
//            if (post == null) return 0;

//            _Context.Remove(post);
//            return await _Context.SaveChangesAsync();
//        }


//        public async Task<PostViewModel> GetById(int PostId)
//        {
//            var post = await _Context.Posts.FindAsync(PostId);
//            if (post == null) return null;
//            var postViewModel = new PostViewModel()
//            {
//                Id = post.Id,
//                Tittle = post.Tittle,
//                UserId = post.UserId,
//                Content = post.Content,
//                ViewCount = post.ViewCount,
//                Status = post.Status,
//                CreatedTime = post.CreatedTime,
//                ImageURL = post.ImageURL,

//            };
//            return postViewModel;
//        }

//        public async Task<int> Update(POST request)
//        {
//            var post = await _Context.Posts.FindAsync(request.Id);
//            if (post == null) return 0;

//            if (!string.IsNullOrEmpty(request.Tittle))
//                post.Tittle = request.Tittle;
//            if (!string.IsNullOrEmpty(request.Content))
//                post.Content = request.Content;
//            if (!string.IsNullOrEmpty(request.ImageURL))
//                post.ImageURL = request.ImageURL;
//            if (!string.IsNullOrEmpty(request.CreatedTime))
//                post.CreatedTime = request.CreatedTime;
//            if (request.Status != null)
//                post.Status = (Status)request.Status;
//            if (request.ViewCount != 0)
//                post.ViewCount = request.ViewCount;

//            return await _Context.SaveChangesAsync();
//        }

//        public async Task<bool> AddViewCount(int PostId)
//        {
//            var post = await _Context.Posts.FindAsync(PostId);
//            post.ViewCount += 1;
//            return await _Context.SaveChangesAsync() > 0;
//        }

//        public async Task<bool> ActivePost(int PostId)
//        {
//            var post = await _Context.Posts.FindAsync(PostId);
//            post.Status = Status.Active;
//            return await _Context.SaveChangesAsync() > 0;

//        }


//        public async Task<List<PostViewModel>> GetAllPost(POST request)
//        {
//            var query = from p in _Context.Posts
//                        select p;
//            //2. Filter     
//            if (!string.IsNullOrEmpty(request.Tittle))
//                query = query.Where(x => x.Tittle.Contains(request.Tittle));

//            if (!string.IsNullOrEmpty(request.CreatedTime))
//                query = query.Where(x => x.CreatedTime == request.CreatedTime);


//            if (request.Status.HasValue && !string.IsNullOrEmpty(request.Status.ToString()))
//                query = query.Where(x => x.Status == request.Status);

//            //3. Paging
//            int TotalRows = await query.CountAsync();
//            var data = await query
//                .Select(x => new PostViewModel()
//                {
//                    Id = x.Id,
//                    Tittle = x.Tittle,
//                    Status = x.Status,
//                    UserId = x.UserId,
//                    ViewCount = x.ViewCount,
//                    Content = x.Content,
//                    CreatedTime = x.CreatedTime,
//                    ImageURL = x.ImageURL


//        }).ToListAsync();

//            //4. Select and projection
//            return data;
//        }

//        //public async Task<int> AddImage(int postId, ImageCreateRequest request)
//        //{
//        //    var postImage = new PostImage()
//        //    {
//        //        Caption = request.Caption,
//        //        DateCreated = DateTime.Now,
//        //        PostId = postId,
//        //    };

//        //    if (request.ImageFile != null)
//        //    {
//        //        postImage.ImagePath = await this.SaveFile(request.ImageFile);
//        //        postImage.FileSize = request.ImageFile.Length;
//        //    }
//        //    _Context.PostImages.Add(postImage);
//        //    await _Context.SaveChangesAsync();
//        //    return postImage.Id;
//        //}

//        //public async Task<int> UpdateImage(int imageId, ImageUpdateRequest request)
//        //{
//        //    var postImage = await _Context.PostImages.FindAsync(imageId);
//        //    if (postImage == null)
//        //        throw new PetsShopException($"Cannot find an image with id {imageId}");

//        //    if (request.ImageFile != null)
//        //    {
//        //        postImage.ImagePath = await this.SaveFile(request.ImageFile);
//        //        postImage.FileSize = request.ImageFile.Length;
//        //    }
//        //    _Context.PostImages.Update(postImage);
//        //    return await _Context.SaveChangesAsync();
//        //}

//        public async Task<List<PostViewModel>> GetAllPostByUserId(Guid userId)
//        {
//            var query = from p in _Context.Posts
//                        where p.UserId == userId
//                        select p;
//            //3. Paging
//            int TotalRows = await query.CountAsync();
//            var data = await query
//                .Select(x => new PostViewModel()
//                {
//                    Id = x.Id,
//                    Tittle = x.Tittle,
//                    Status = x.Status,
//                    UserId = x.UserId,
//                    ViewCount = x.ViewCount,
//                    Content = x.Content,
//                    CreatedTime = x.CreatedTime,
//                    ImageURL = x.ImageURL,

//                }).ToListAsync();

//            //4. Select and projection
//            return data;
//        }

//        public async Task<bool> UploadImage(int postId, IFormFile imageFile)
//        {
//            var originalFileName = ContentDispositionHeaderValue.Parse(imageFile.ContentDisposition).FileName.ToString().Trim('"');
//            var fileName = $"{Guid.NewGuid()}{Path.GetExtension(originalFileName)}";
//            var filePath = Path.Combine(_userContentFolder, fileName);


//            FileStream ms = new FileStream(filePath, FileMode.Create);
//            var output = ms;
//            await imageFile.OpenReadStream().CopyToAsync(output);
//            ms.Close();

//            ms = new FileStream(filePath, FileMode.Open);
//            var auth = new FirebaseAuthProvider(new FirebaseConfig(FireBaseConfig.ApiKey));
//            var a = await auth.SignInWithEmailAndPasswordAsync(FireBaseConfig.AuthEmail, FireBaseConfig.AuthPassword);

//            var cancellation = new CancellationTokenSource();

//            var task = new FirebaseStorage(
//                FireBaseConfig.Bucket,
//                new FirebaseStorageOptions
//                {
//                    AuthTokenAsyncFactory = () => Task.FromResult(a.FirebaseToken),
//                    ThrowOnCancel = true // when you cancel the upload, exception is thrown. By default no exception is thrown
//                })
//                .Child("posts")
//                .Child(fileName)
//                .PutAsync(ms, cancellation.Token);

//            var post = await _Context.Posts.FindAsync(postId);
//            post.ImageURL = await task;
//            return await _Context.SaveChangesAsync() > 0;
//        }
//    }
//}


using Microsoft.AspNetCore.Http;
using PetsShopSolution.Data.EF;
using PetsShopSolution.Data.Entities;
using PetsShopSolution.ViewModel.Catalog.Posts;
using System;
using System.Collections.Generic;
using System.IO;
using System.Net.Http.Headers;
using System.Threading.Tasks;
using Firebase;
using PetsShopSolution.Utilities.Exceptions;
using System.Linq;
using Microsoft.EntityFrameworkCore;
using PetsShopSolution.Data.Enums;
using Firebase.Auth;
using PetsShopSolution.Utilities.Constants;
using System.Threading;
using Firebase.Storage;
using Microsoft.AspNetCore.Hosting;

namespace PetsShopSolution.Application.Catalog.Posts
{
    public class PostService : IPostService
    {
        private readonly PetsShopDbContext _Context;
        private const string USER_CONTENT_FOLDER_NAME = "user-content";
        private readonly string _userContentFolder;
        public PostService(PetsShopDbContext Context, IWebHostEnvironment webHostEnvironment)
        {
            _Context = Context;
            _userContentFolder = Path.Combine(webHostEnvironment.WebRootPath, USER_CONTENT_FOLDER_NAME);
        }

        public async Task<int> Create(POST request)
        {
            var post = new Post()
            {
                UserId = Guid.Parse(request.UserId),
                Tittle = request.Tittle,
                Content = request.Content,
                Status = Status.InActive,
                CreatedTime = request.CreatedTime,
                ViewCount = 0,
                ImageURL = request.ImageURL,
            };

            //add post zo context
            _Context.Posts.Add(post);
            await _Context.SaveChangesAsync();
            return post.Id;

        }

        public async Task<int> Delete(int PostId)
        {
            var post = await _Context.Posts.FindAsync(PostId);
            if (post == null) return 0;

            _Context.Remove(post);
            return await _Context.SaveChangesAsync();
        }


        public async Task<PostViewModel> GetById(int PostId)
        {
            var post = await _Context.Posts.FindAsync(PostId);
            if (post == null) return null;
            var user = await _Context.AppUsers.FindAsync(post.UserId);
            var postViewModel = new PostViewModel()
            {
                Id = post.Id,
                Tittle = post.Tittle,
                UserId = post.UserId,
                Content = post.Content,
                ViewCount = post.ViewCount,
                Status = post.Status,
                CreatedTime = post.CreatedTime,
                ImageURL = post.ImageURL,
                UserName = user.UserName,
                Avatar = user.Avatar,
            };
            return postViewModel;
        }

        public async Task<int> Update(POST request)
        {
            var post = await _Context.Posts.FindAsync(request.Id);
            if (post == null) return 0;

            if (!string.IsNullOrEmpty(request.Tittle))
                post.Tittle = request.Tittle;
            if (!string.IsNullOrEmpty(request.Content))
                post.Content = request.Content;
            if (!string.IsNullOrEmpty(request.ImageURL))
                post.ImageURL = request.ImageURL;
            if (!string.IsNullOrEmpty(request.CreatedTime))
                post.CreatedTime = request.CreatedTime;
            if (request.Status != null)
                post.Status = (Status)request.Status;
            if (request.ViewCount != 0)
                post.ViewCount = request.ViewCount;

            return await _Context.SaveChangesAsync();
        }

        public async Task<bool> AddViewCount(int PostId)
        {
            var post = await _Context.Posts.FindAsync(PostId);
            post.ViewCount += 1;
            return await _Context.SaveChangesAsync() > 0;
        }

        public async Task<bool> ActivePost(int PostId)
        {
            var post = await _Context.Posts.FindAsync(PostId);
            post.Status = Status.Active;
            return await _Context.SaveChangesAsync() > 0;

        }


        public async Task<List<PostViewModel>> GetAllPost(POST request)
        {
            var query = from p in _Context.Posts
                        select p;
            //2. Filter
            if (!string.IsNullOrEmpty(request.Tittle))
                query = query.Where(x => x.Tittle.Contains(request.Tittle));

            if (!string.IsNullOrEmpty(request.CreatedTime))
                query = query.Where(x => x.CreatedTime == request.CreatedTime);


            if (request.Status.HasValue && !string.IsNullOrEmpty(request.Status.ToString()))
                query = query.Where(x => x.Status == request.Status);

            //3. Paging
            var data = await query
                .Select(x => new PostViewModel()
                {
                    Id = x.Id,
                    Tittle = x.Tittle,
                    Status = x.Status,
                    UserId = x.UserId,
                    ViewCount = x.ViewCount,
                    Content = x.Content,
                    CreatedTime = x.CreatedTime,
                    ImageURL = x.ImageURL,

                }).ToListAsync();


            foreach (var postvm in data)
            {
                var user = await _Context.AppUsers.FindAsync(postvm.UserId);
                postvm.UserName = user.UserName;
                postvm.Avatar = user.Avatar;
            }
            //4. Select and projection
            return data;
        }


        public async Task<List<PostViewModel>> GetAllPostByUserId(Guid userId)
        {
            var query = from p in _Context.Posts
                        where p.UserId == userId
                        select p;
            var user = await _Context.AppUsers.FindAsync(userId);
            //3. Paging
            int TotalRows = await query.CountAsync();
            var data = await query
                .Select(x => new PostViewModel()
                {
                    Id = x.Id,
                    Tittle = x.Tittle,
                    Status = x.Status,
                    UserId = x.UserId,
                    ViewCount = x.ViewCount,
                    Content = x.Content,
                    CreatedTime = x.CreatedTime,
                    ImageURL = x.ImageURL,
                    Avatar = user.Avatar,
                    UserName = user.UserName,
                }).ToListAsync();

            //4. Select and projection
            return data;
        }

        public async Task<bool> UploadImage(int postId, IFormFile imageFile)
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
                .Child("posts")
                .Child(fileName)
                .PutAsync(ms, cancellation.Token);

            var post = await _Context.Posts.FindAsync(postId);
            post.ImageURL = await task;
            return await _Context.SaveChangesAsync() > 0;
        }
    }
}
