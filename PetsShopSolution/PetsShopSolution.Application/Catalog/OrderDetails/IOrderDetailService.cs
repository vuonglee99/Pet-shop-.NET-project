using PetsShopSolution.ViewModel.Catalog.OrderDetails;
using PetsShopSolution.ViewModel.Catalog.Orders;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace PetsShopSolution.Application.Catalog.OrderDetails
{
    public interface IOrderDetailService
    {
        Task<int> CreateOrderDetailFromCart(int orderId, int cartId);
        Task<int> Delete(int orderDetailId);
        Task<int> DeleteByOrderId(int orderId);
        Task<List<OrderDetailViewModel>> GetOrderDetailPagingByOrderId( int orderId);
    }
}
