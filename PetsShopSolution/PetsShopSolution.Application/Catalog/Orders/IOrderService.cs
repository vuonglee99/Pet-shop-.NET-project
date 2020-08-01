using PetsShopSolution.ViewModel.Catalog.Orders;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace PetsShopSolution.Application.Catalog.Orders
{
    public interface IOrderService
    {
        Task<int> Create(ORDER request);
        Task<int> Delete(int orderId);
        Task<int> DeleteByUserId(Guid userId);
        decimal GetToTal(int orderId);
        Task<OrderViewModel> GetById(int orderId);
        Task<List<OrderViewModel>> GetAllOrder(ORDER request);
        Task<List<OrderViewModel>> GettByUserId(Guid userId);
        Task<int> UpdateStatus(ORDER request);

    }
}
