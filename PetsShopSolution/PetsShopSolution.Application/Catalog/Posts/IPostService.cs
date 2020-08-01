using Microsoft.AspNetCore.Http;
using PetsShopSolution.ViewModel.Catalog.Posts;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace PetsShopSolution.Application.Catalog.Posts
{
    public interface IPostService
    {
        Task<int> Create(POST request);
        Task<int> Update(POST request);
        Task<int> Delete(int PostId);
        Task<List<PostViewModel>> GetAllPost(POST request);
        Task<List<PostViewModel>> GetAllPostByUserId(Guid userId);
        Task<PostViewModel> GetById(int PostId);

        Task<bool> AddViewCount(int PostId);
        Task<bool> ActivePost(int PostId);
        Task<bool> UploadImage(int postId, IFormFile imageFile);

    }
}
