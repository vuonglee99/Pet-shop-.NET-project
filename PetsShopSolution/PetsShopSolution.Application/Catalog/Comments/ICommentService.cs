using PetsShopSolution.ViewModel.Catalog.Comments;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace PetsShopSolution.Application.Catalog.Comments
{
    public interface ICommentService
    {
        Task<int> Create(COMMENT request);
        Task<int> Update(COMMENT request);
        Task<int> Delete(int commentId);

        Task<int> Delete(Guid userId);

        Task<List<CommentViewModel>> GetAllByProductId(int productId);

        Task<List<CommentViewModel>> GetAllByUserId(Guid userId);
        Task<CommentViewModel> GetById(int comId);
    }
}
