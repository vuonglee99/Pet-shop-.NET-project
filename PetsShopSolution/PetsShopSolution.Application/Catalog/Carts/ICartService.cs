using PetsShopSolution.Data.Entities;
using PetsShopSolution.ViewModel.Catalog.Carts;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace PetsShopSolution.Application.Catalog.Carts
{
    public interface ICartService
    {
        Task<int> Create(CART request);
        Task<int> Update(CART request);
        Task<int> Delete(int CartId);
        Task<int> DeleteByUserId(Guid userId);
        Task<CartViewModel> GetById(int cartId);
        Task<List<CartViewModel>> GetAllByUserId(Guid userId);

    }
}
