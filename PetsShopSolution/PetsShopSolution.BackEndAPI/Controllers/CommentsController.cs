using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using PetsShopSolution.Application.Catalog.Comments;
using PetsShopSolution.ViewModel.Catalog.Comments;

namespace PetsShopSolution.BackEndApi.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class CommentsController : ControllerBase
    {
        private readonly ICommentService _CommentService;
        public CommentsController(ICommentService commentService)
        {
            _CommentService = commentService;
        }

        [HttpPost]
        public async Task<List<CommentViewModel>> GetAllByProductId(int productId)  //[FromQuery] Tat ca cac tham so tu request deu lay tu query ra
        {
            var coms = await _CommentService.GetAllByProductId( productId);

            return coms;
        }


        [HttpPost]
        public async Task<List<CommentViewModel>> GetAllByUserId( Guid userId)  //[FromQuery] Tat ca cac tham so tu request deu lay tu query ra
        {
            var coms = await _CommentService.GetAllByUserId( userId);
            return coms;
        }

        [HttpPost]
        public async Task<CommentViewModel> GetById(int commentId)
        {
            var com = await _CommentService.GetById(commentId);
            if (com == null) return null;
            return com;
        }

        [HttpPost]
        public async Task<int> Create([FromBody] COMMENT request)
        {
            return await _CommentService.Create(request);
   
        }

        [HttpPost]
        public async Task<bool> Update([FromBody]COMMENT request)
        {
            
            var affectedResult = await _CommentService.Update(request);
            if (affectedResult <= 0)
                return false;
            return true;
        }

        [HttpPost]
        public async Task<bool> DeleteById(int commentId)
        {
            var affectedResults = await _CommentService.Delete(commentId);
            if (affectedResults <= 0) return false;

            return true;
        }

    }
}