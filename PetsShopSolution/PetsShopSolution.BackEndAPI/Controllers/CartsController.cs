using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using PetsShopSolution.Application.Catalog.Carts;
using PetsShopSolution.ViewModel.Catalog.Carts;

namespace PetsShopSolution.BackEndApi.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class CartsController : ControllerBase
    {
        private readonly ICartService _CartService;
        public CartsController(ICartService cartService)
        {
            _CartService = cartService;
        }


        [HttpPost]
        //get all cart by userID
        public async Task<List<CartViewModel>> GetAllByUserId (Guid userId)
        {
            return await _CartService.GetAllByUserId(userId);
           
        }

        [HttpPost]
        public async Task<CartViewModel> GetById (int cartId )
        {
            var cart = await _CartService.GetById(cartId);
            if (cart == null) return null;
            return cart;
        }

        [HttpPost]
        public async Task<int> Create([FromBody] CART request)
        {
            return await _CartService.Create(request);
        }

        [HttpPost]
        public async Task<bool> UpdateQuantity([FromBody] CART request)
        {          
            var affectedResult = await _CartService.Update( request);
            if (affectedResult <= 0)
                return false;
            return true;
        }
        [HttpPost]
        public async Task<bool> DeleteByCartId(int cartId)
        {
            var affectedResults = await _CartService.Delete(cartId);
            if (affectedResults <= 0) return false;

            return true;
        }

        [HttpPost]
        public async Task<bool> DeleteByUserId(Guid userId)
        {
            var affectedResults = await _CartService.DeleteByUserId(userId);
            if (affectedResults <= 0) return false;

            return true;
        }
    }
}