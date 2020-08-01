using Microsoft.AspNetCore.Mvc.Razor;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Query.SqlExpressions;
using Microsoft.VisualBasic.CompilerServices;
using PetsShopSolution.Data.EF;
using PetsShopSolution.Data.Entities;
using PetsShopSolution.Utilities.Exceptions;
using PetsShopSolution.ViewModel.Catalog.OrderDetails;
using PetsShopSolution.ViewModel.Catalog.Orders;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PetsShopSolution.Application.Catalog.OrderDetails
{
    public class OrderDetailService : IOrderDetailService
    {
        private readonly PetsShopDbContext _Context;

        public OrderDetailService(PetsShopDbContext context)
        {
            _Context = context;
        }


        public async Task<int> CreateOrderDetailFromCart(int orderId, int cartId)
        {
            var cart = await _Context.Carts.FindAsync(cartId);
            if (cart == null) throw new PetsShopException("Khong tim thay cart");
            var order = await _Context.Orders.FindAsync(orderId);
            if(order==null) throw new PetsShopException("Khong tim thay order");
            var product = await _Context.Products.FindAsync(cart.ProductId);
            var orderDeail = new OrderDetail()
            {
                OrderId = orderId,
                ProductId = cart.ProductId,
                Quantity = cart.Quantity,
                Sum = product.Price * cart.Quantity,               
            };
            _Context.OrderDetails.Add(orderDeail);

            _Context.Remove(cart);

            return await _Context.SaveChangesAsync();
        }

        public async Task<int> DeleteByOrderId(int orderId)
        {
            var data =  _Context.OrderDetails.Where(x => x.OrderId == orderId);
            foreach(var odt in data)
            {
                _Context.Remove(odt);
            }
            return await _Context.SaveChangesAsync();
        }

        public async Task<int> Delete(int orderDetailId)
        {
            var orderDetail = await _Context.OrderDetails.FindAsync(orderDetailId);
            if (orderDetail == null) throw new PetsShopException("khong tim thay order detail");
            _Context.Remove(orderDetail);
            return await _Context.SaveChangesAsync();
        }

        public async Task<List<OrderDetailViewModel>> GetOrderDetailPagingByOrderId(int orderId)
        {
            List<OrderDetailViewModel> data = new List<OrderDetailViewModel>();

            var odts = await _Context.OrderDetails.Where(x => x.OrderId == orderId).ToListAsync();
            foreach(var x in odts)
            {
                var product = await _Context.Products.FindAsync(x.ProductId);
                var oderDetailViewModel = new OrderDetailViewModel()
                {
                    OrderId = x.OrderId,
                    ProductId = x.ProductId,
                    Quantity = x.Quantity,
                    Sum = x.Sum,
                    ProductName = product.Name,
                    ProductPrice = product.Price,
                    ImageURL=product.ImageURL,
                };
                data.Add(oderDetailViewModel);
            }

            return data;
        }
    }
}
