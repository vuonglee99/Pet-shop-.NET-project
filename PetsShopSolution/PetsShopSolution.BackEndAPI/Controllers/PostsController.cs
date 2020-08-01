using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using PetsShopSolution.Application.Catalog.Posts;
using PetsShopSolution.ViewModel.Catalog.Posts;

namespace PetsShopSolution.BackEndApi.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class PostsController : ControllerBase
    {
        private readonly IPostService _PostService;
        public PostsController(IPostService postService)
        {
            _PostService = postService;
        }

        [HttpPost]
        public async Task<List<PostViewModel>> GetAllPostByUserId( Guid userId)  //[FromQuery] Tat ca cac tham so tu request deu lay tu query ra
        {
            var posts = await _PostService.GetAllPostByUserId(userId);
            return posts;
        }

        [HttpPost]
        public async Task<List<PostViewModel>> GetAllPost([FromBody] POST request)  //[FromQuery] Tat ca cac tham so tu request deu lay tu query ra
        {
            var posts = await _PostService.GetAllPost(request);
            return posts;
        }

        [HttpPost]
        public async Task<PostViewModel> GetById(int postId)
        {
            var post = await _PostService.GetById(postId);
            if (post == null) return null;
            return post;
        }

        [HttpPost]
        public async Task<int> Create([FromBody] POST request)
        {
             return await _PostService.Create(request);
        
        }

        [HttpPost]
        public async Task<bool> Update([FromBody]POST request)
        {

            var affectedResult = await _PostService.Update(request);
            if (affectedResult == 0)
                return false;
            return true;
        }

        [HttpPost]
        public async Task<bool> Delete(int postId)
        {
            var affectedResults = await _PostService.Delete(postId);
            if (affectedResults == 0) return false;

            return true;
        }

        [HttpPost]
        public async Task<bool> UploadImage(int postId, IFormFile imageFile)
        {
            var res = await _PostService.UploadImage(postId, imageFile);
            if (!res) return false;
            return true;

        }


        [HttpPost]
        public async Task<bool> AddViewCount(int postId)
        {
           return await _PostService.AddViewCount(postId);
        }

        [HttpPost]
        public async Task<bool> ActivePost(int postId)
        {
           return await _PostService.ActivePost(postId);
        }

    }
}