using Microsoft.EntityFrameworkCore;
using PetsShopSolution.Data.EF;
using PetsShopSolution.Data.Entities;
using PetsShopSolution.Utilities.Exceptions;
using PetsShopSolution.ViewModel.Catalog.Comments;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Reactive.Linq;
using System.Threading.Tasks;

namespace PetsShopSolution.Application.Catalog.Comments
{
    public class CommentService : ICommentService
    {
        private readonly PetsShopDbContext _Context;
        public CommentService(PetsShopDbContext petsShopDbContext)
        {
            _Context = petsShopDbContext;
        }

        public async Task<int> Create(COMMENT request)
        {
            var comment = new Comment()
            {
                ProductId = request.ProductId,
                CreatedTime = request.CreatedTime,
                UserId = Guid.Parse(request.UserId),
                Tittle = request.Tittle,
                Content = request.Content,
                Reply = "",
                Star = request.Star,
            };


            _Context.Comments.Add(comment);

            //update product
            var product = await _Context.Products.FindAsync(request.ProductId);
            int UpdateRatedCount = product.RatedCount + 1;
            float newStar = (product.Star * product.RatedCount + request.Star) / UpdateRatedCount;
            decimal decStar = (decimal)newStar;
            decimal roundStar = Math.Round(decStar, 1);
            product.Star = (float)roundStar;
            product.RatedCount = UpdateRatedCount;

            await _Context.SaveChangesAsync();
            return comment.Id;
        }

        public async Task<int> Delete(int commentId)
        {
            var com = await _Context.Comments.FindAsync(commentId);
            if (com == null) return 0;
            _Context.Remove(com);
            return await _Context.SaveChangesAsync();
        }

        public async Task<int> Update(COMMENT request)
        {
            var com = await _Context.Comments.FindAsync((int)request.Id);
            if (com == null) return 0;

            if (!string.IsNullOrEmpty(request.Tittle))
                com.Tittle = request.Tittle;

            if (!string.IsNullOrEmpty(com.Content))
                com.Content = request.Content;

            if (request.Star != 0)
            {
                com.Star = request.Star;

                //update product
                var product = await _Context.Products.FindAsync(request.ProductId);
                int UpdateRatedCount = product.RatedCount + 1;
                float newStar = (product.Star * product.RatedCount + request.Star) / UpdateRatedCount;
                decimal decStar = (decimal)newStar;
                decimal roundStar = Math.Round(decStar, 1);
                product.Star = (float)roundStar;
                product.RatedCount = UpdateRatedCount;
            }

            if (!string.IsNullOrEmpty(request.Reply))
                com.Reply = request.Reply;

            return await _Context.SaveChangesAsync();
        }
        public async Task<CommentViewModel> GetById(int comId)
        {
            var com = await _Context.Comments.FindAsync(comId);
            if (com == null) return null;
            var comViewModel = new CommentViewModel()
            {
                Id = com.Id,
                ProductId = com.ProductId,
                UserId = com.UserId,
                CreatedTime = com.CreatedTime,
                Content = com.Content,
                Tittle = com.Tittle,
                Star = com.Star,
                Reply = com.Reply,
            };
            return comViewModel;
        }

        public async Task<List<CommentViewModel>> GetAllByProductId(int productId)
        {
            var query = from c in _Context.Comments
                        where c.ProductId == productId
                        select c;

            int TotalRows = await query.CountAsync();
            var data = await query
             .Select(x => new CommentViewModel()
             {
                 Id = x.Id,
                 ProductId = x.ProductId,
                 UserId = x.UserId,
                 CreatedTime = x.CreatedTime,
                 Content = x.Content,
                 Tittle = x.Tittle,
                 Star = x.Star,
                 Reply = x.Reply,
             }).ToListAsync();
            return data;
        }

        public async Task<List<CommentViewModel>> GetAllByUserId(Guid userId)
        {
            var query = from c in _Context.Comments
                        where c.UserId == userId
                        select c;

            int TotalRows = await query.CountAsync();
            var data = await query
                .Select(x => new CommentViewModel()
                {
                    Id = x.Id,
                    ProductId = x.ProductId,
                    UserId = x.UserId,
                    CreatedTime = x.CreatedTime,
                    Content = x.Content,
                    Tittle = x.Tittle,
                    Star = x.Star,
                    Reply = x.Reply,
                }).ToListAsync();
            return data;
        }

        public async Task<int> Delete(Guid userId)
        {

            var comments = await _Context.Comments.Where(x => x.UserId == userId).ToListAsync();
            foreach (var com in comments)
                _Context.Remove(com);
            return await _Context.SaveChangesAsync();
        }
    }
}
