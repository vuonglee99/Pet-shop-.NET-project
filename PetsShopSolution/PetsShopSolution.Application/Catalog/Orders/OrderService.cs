using Microsoft.AspNetCore.Server.IIS.Core;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Query.SqlExpressions;
using PetsShopSolution.Application.Catalog.Carts;
using PetsShopSolution.Application.Catalog.OrderDetails;
using PetsShopSolution.Data.EF;
using PetsShopSolution.Data.Entities;
using PetsShopSolution.Data.Enums;
using PetsShopSolution.ViewModel.Catalog.Orders;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PetsShopSolution.Application.Catalog.Orders
{
    public class OrderService : IOrderService
    {
        private readonly PetsShopDbContext _Context;
        private readonly IOrderDetailService _orderDetailService;
        private readonly ICartService _cartService;
        public OrderService(PetsShopDbContext context, IOrderDetailService orderDetailService, ICartService cartService)
        {
            _Context = context;
            _orderDetailService = orderDetailService;
            _cartService = cartService;
        }

      
        public async Task<int> Create(ORDER request)
        {
            //create order
            //create orderdetails from cart
            //add orderdetails to order
            //xoa cart

            var order = new Order()
            {
                UserId = Guid.Parse(request.UserId),
                ShipName = request.ShipName,
                ShipPhoneNumber = request.ShipPhoneNumber,
                ShipEmail = request.ShipEmail,
                ShipAddress = request.ShipAddress,
                Status = request.Status,
                OrderDate = request.OrderDate,
                Total = 0,
            };

            _Context.Orders.Add(order);
            await _Context.SaveChangesAsync();

            var orderId = order.Id;
            var data = _Context.Carts.Where(c => c.UserId == Guid.Parse(request.UserId)).ToList();
            foreach (var cart in data)
            {
                order.Total += cart.Total;
                await _orderDetailService.CreateOrderDetailFromCart(orderId, cart.Id);
            }

            return order.Id;
        }

        public async Task<int> Delete(int orderId)
        {
            var order = await _Context.Orders.FindAsync(orderId);
            if (order == null) return 0;
            _Context.Remove(order);

            await _orderDetailService.DeleteByOrderId(orderId);

            return await _Context.SaveChangesAsync();
        }

        public async Task<int> DeleteByUserId(Guid userId)
        {
            var data = _Context.Orders.Where(x => x.UserId == userId);
            if (data == null) return 0;
            foreach (var order in data)
            {
                _Context.Orders.Remove(order);
                await _orderDetailService.DeleteByOrderId(order.Id);
            }
            return await _Context.SaveChangesAsync();
        }

        public async Task<List<OrderViewModel>> GetAllOrder(ORDER request)
        {
            var query = from c in _Context.Orders
                        select c;
            //if (request.Status.HasValue && !string.IsNullOrEmpty(request.Status.ToString())) query = query.Where(x => x.Status == request.Status);
            if (!string.IsNullOrEmpty(request.Status))
                query = query.Where(x => x.Status == request.Status);

            if (!string.IsNullOrEmpty(request.OrderDate))

                query = query.Where(x => x.OrderDate == request.OrderDate);

            var data = await query
                .Select(x => new OrderViewModel()
                {
                    Id = x.Id,
                    OrderDate = x.OrderDate,
                    ShipAddress = x.ShipAddress,
                    ShipEmail = x.ShipEmail,
                    ShipName = x.ShipName,
                    ShipPhoneNumber = x.ShipPhoneNumber,
                    Status = x.Status,
                    Total = x.Total,
                    UserId = x.UserId,
                }).ToListAsync();

            return data;
        }

        public async Task<List<OrderViewModel>> GettByUserId(Guid userId)
        {
            var query = from c in _Context.Orders
                        where c.UserId == userId
                        select c;

            var data = await query
                .Select(x => new OrderViewModel()
                {
                    Id = x.Id,
                    OrderDate = x.OrderDate,
                    ShipAddress = x.ShipAddress,
                    ShipEmail = x.ShipEmail,
                    ShipName = x.ShipName,
                    ShipPhoneNumber = x.ShipPhoneNumber,
                    Status = x.Status,
                    Total = x.Total,
                    UserId = x.UserId,
                }).ToListAsync();

            return data;
        }

        public async Task<OrderViewModel> GetById(int orderId)
        {
            var order = await _Context.Orders.FindAsync(orderId);
            if (order == null) return null;
            var orderViewModel = new OrderViewModel()
            {
                Id = order.Id,
                OrderDate = order.OrderDate,
                ShipAddress = order.ShipAddress,
                ShipEmail = order.ShipEmail,
                ShipName = order.ShipName,
                ShipPhoneNumber = order.ShipPhoneNumber,
                Status = order.Status,
                Total = order.Total,
                UserId = order.UserId,
            };
            return orderViewModel;
        }

        public decimal GetToTal(int orderId)
        {
            var data = _Context.OrderDetails.Where(x => x.OrderId == orderId);
            if (data == null) return -1;
            decimal total = 0;
            foreach (var odt in data)
            {
                total += odt.Sum;
            }
            return total;
        }

        public async Task<int> UpdateStatus(ORDER request)
        {
            var order = await _Context.Orders.FindAsync(request.Id);
            if (order == null) return 0;
            if (request.Status != null)
                order.Status = request.Status;
            return await _Context.SaveChangesAsync();
        }
    }
}
