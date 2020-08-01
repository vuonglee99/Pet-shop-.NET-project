using PetsShopSolution.Application.Catalog.Carts;
using PetsShopSolution.Data.EF;
using PetsShopSolution.Data.Entities;
using PetsShopSolution.Utilities.Exceptions;
using PetsShopSolution.ViewModel.Catalog.Carts;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using System.Linq;
using Microsoft.EntityFrameworkCore;

namespace PetsShopSolution.Application.Catalog.Carts
{
    public class CartService : ICartService
    {
        private readonly PetsShopDbContext _Context;
        public CartService(PetsShopDbContext Context)
        {
            _Context = Context;
        }
        public async Task<int> Create(CART request)
        {

            var product = await _Context.Products.FindAsync(request.ProductId);
            if (product == null)
                return -1;
            int quantity = request.Quantity;

            Guid userId = Guid.Parse(request.UserId);
            if (quantity > product.Stock) return -1;
            var cart = new Cart();
            
            var x = await _Context.Carts.Where(x => x.ProductId == request.ProductId && x.UserId.ToString() == request.UserId).ToListAsync();
            if (x.Count == 0)
            {
                cart.ProductId = request.ProductId;
                cart.Quantity = quantity;
                cart.Total = product.Price * quantity;
                cart.UserId = userId;
                cart.DateCreated = request.DateCreated;
                product.Stock = product.Stock - quantity;
                _Context.Carts.Add(cart);
            }
            else
            {
                cart = await _Context.Carts.FindAsync(x[0].Id);
                cart.Quantity += request.Quantity;
                product.Stock = product.Stock - request.Quantity;

            }
            await _Context.SaveChangesAsync();
            return cart.Id;
        }

        public async Task<int> Delete(int CartId)
        {
            var cart = await _Context.Carts.FindAsync(CartId);
            if (cart == null) return -1;
            var product = await _Context.Products.FindAsync(cart.ProductId);
            product.Stock += cart.Quantity;
            _Context.Remove(cart);
            return await _Context.SaveChangesAsync();
        }

        public async Task<int> DeleteByUserId(Guid userId)
        {
            var data = _Context.Carts.Where(x => x.UserId == userId);
            foreach (var cart in data)
            {
                _Context.Carts.Remove(cart);
            }
            return await _Context.SaveChangesAsync();
        }

        public async Task<List<CartViewModel>> GetAllByUserId(Guid userId)
        {
            var query = from c in _Context.Carts
                        join p in _Context.Products on c.ProductId equals p.ID
                        where c.UserId == userId
                        select new { c, p };
            var data = await query
                .Select(x => new CartViewModel()
                {
                    Id = x.c.Id,
                    ProductId = x.c.ProductId,
                    ProductName = x.p.Name,
                    Price = x.p.Price,
                    Quantity = x.c.Quantity,
                    Total = x.c.Quantity * x.p.Price,
                    DateCreated = x.c.DateCreated,
                    UserId = x.c.UserId,
                    ImageURL = x.p.ImageURL,
                }).ToListAsync();

            return data;
        }

        public async Task<CartViewModel> GetById(int cartId)
        {
            var c = await _Context.Carts.FindAsync(cartId);
            if (c == null) return null;
            var p = await _Context.Products.FindAsync(c.ProductId);
            if (p == null) return null;
            var cartViewModel = new CartViewModel()
            {
                Id = c.Id,
                ProductId = c.ProductId,
                ProductName = p.Name,
                Price = p.Price,
                Quantity = c.Quantity,
                Total = c.Quantity * p.Price,
                DateCreated = c.DateCreated,
                UserId = c.UserId,
                ImageURL = p.ImageURL,
            };
            return cartViewModel;
        }

        public async Task<int> Update(CART request)
        {
            var cart = await _Context.Carts.FindAsync(request.Id);
            if (cart == null) return -1;

            if (request.Quantity == 0)
            {
                await this.Delete(cart.Id);
            }

            else
            {
                var product = await _Context.Products.FindAsync(cart.ProductId);

                product.Stock = product.Stock + cart.Quantity - request.Quantity;

                cart.Quantity = request.Quantity;

                cart.Total = product.Price * cart.Quantity;
            }
            return await _Context.SaveChangesAsync();
        }
    }
}
