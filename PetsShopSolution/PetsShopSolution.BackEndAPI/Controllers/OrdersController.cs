using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using PetsShopSolution.Application.Catalog.Carts;
using PetsShopSolution.Application.Catalog.OrderDetails;
using PetsShopSolution.Application.Catalog.Orders;
using PetsShopSolution.ViewModel.Catalog.OrderDetails;
using PetsShopSolution.ViewModel.Catalog.Orders;

namespace PetsShopSolution.BackEndApi.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class OrdersController : ControllerBase
    {
        private readonly IOrderService _OrderService;
        private readonly ICartService _cartService;
        private readonly IOrderDetailService _OrderDetailService;
        public OrdersController(IOrderService orderService, IOrderDetailService orderDetailService, ICartService cartService)
        {
            _OrderService = orderService;
            _OrderDetailService = orderDetailService;
            _cartService = cartService;
        }

        [HttpPost]
        public async Task<List<OrderViewModel>> GetAllOrder([FromBody] ORDER request)  //[FromQuery] Tat ca cac tham so tu request deu lay tu query ra
        {
            var orders = await _OrderService.GetAllOrder(request);

            return orders;
        }

        [HttpPost]
        public async Task<List<OrderViewModel>> GetAllByUserId(Guid userId)  //[FromQuery] Tat ca cac tham so tu request deu lay tu query ra
        {
            var orders = await _OrderService.GettByUserId(userId);

            return orders;
        }

        [HttpPost]
        public async Task<List<OrderDetailViewModel>> GetDetails(int orderId)
        {
            var orderdetails = await _OrderDetailService.GetOrderDetailPagingByOrderId(orderId);

            return orderdetails;
        }


        [HttpPost]
        public async Task<OrderViewModel> GetById(int orderId)
        {
            var order = await _OrderService.GetById(orderId);
            if (order == null) return null;
            return order;
        }



        [HttpPost]
        public async Task<int> Create([FromBody] ORDER request)
        {
            return await _OrderService.Create(request);
        }

        [HttpPost]
        public async Task<bool> Delete(int orderId)
        {
            var affectedResults = await _OrderService.Delete(orderId);
            if (affectedResults == 0) return false;

            return true;
        }

        [HttpPost]
        public async Task<bool> DeleteByUserId(Guid userId)
        {
            var affectedResults = await _OrderService.DeleteByUserId(userId);
            if (affectedResults == 0) return false;

            return true;
        }

        [HttpPost]  //HttpPatch: update mot phan ban ghi
        public async Task<bool> UpdateStatus(ORDER order)
        {
            var affectedResults = await _OrderService.UpdateStatus(order);
            if (affectedResults == 0) return false;

            return true;
        }

        [HttpPost]  //HttpPatch: update mot phan ban ghi
        public decimal getTotal(int orderId)
        {
            return _OrderService.GetToTal(orderId);
        }
    }
}