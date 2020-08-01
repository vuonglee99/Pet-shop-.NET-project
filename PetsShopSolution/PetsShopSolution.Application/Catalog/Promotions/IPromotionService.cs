
using PetsShopSolution.ViewModel.Catalog.Promotions;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace PetsShopSolution.Application.Catalog.Promotions
{
    public interface IPromotionService
    {
        Task<int> Create(PromotionCreateRequest request);
        Task<int> Update(PromotionUpdateRequest request);
        Task<int> Delete(int PromotionId);

        Task<List<PromotionViewModel>> GetAll(GetPromotionPagingRequest request);
        Task<PromotionViewModel> GetById(int PromotionId);
        //Task<List<PromotionViewModel>> GetAll();

        
    }
}
