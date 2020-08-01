using System.Threading.Tasks;
using PetsShopSolution.Application.Catalog.Products;
using PetsShopSolution.ViewModel.Catalog.Products;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using NSwag.Annotations;
using Newtonsoft.Json;
using System.Collections.Generic;

namespace PetsShopSolution.BackEndApi.Controllers
{
    [Produces("application/json")]
    [Route("api/[controller]/[action]")]
    [ApiController]
   // [Authorize] //Phai dang nhap moi zo dc
    public class ProductsController : ControllerBase
    {
     
        private readonly IProductService _ProductService;
        public ProductsController( IProductService ProductService)
        {
            _ProductService = ProductService;
        }
     
        [HttpPost]
        public async Task<List<ProductViewModel>> GetAllByCategoryId(int categoryId) 
        {
            return await _ProductService.GetAllByCategoryId(categoryId);         
        }

        [HttpPost]
        public async Task< List<ProductViewModel>> GetAllProduct([FromBody] PRODUCT request) 
        {
           return await _ProductService.GetAllProduct(request);
        }


        [HttpPost]
        public async Task<ProductViewModel> GetById(int productID)
        {
            return await _ProductService.GetById(productID);
        }

        [HttpPost]
        public async Task<int> Create([FromBody] PRODUCT request)
        {
            return await _ProductService.Create(request);

        }

        [HttpPost]
        public async Task<bool> Update([FromBody]PRODUCT request)
        {
           
            return await _ProductService.Update(request);
          
        }

        [HttpPost]
        public async Task<bool> Delete(int productId)
        {
           return await _ProductService.Delete(productId);       
        }

        //[HttpPost] 
        //public async Task<bool> UpdatePrice(int ProductID, decimal NewPrice)
        //{
        //    return await _ProductService.UpdatePrice(ProductID, NewPrice);
        //}
        //[HttpPost]
        //public async Task<bool> UpdateStock(int ProductID, int AddedQuantity)
        //{
        //    return await _ProductService.UpdateStock(ProductID, AddedQuantity);

        //}


        [HttpPost]
        public async Task<bool> UploadImage(int productId, IFormFile imageFile)
        {
           return await _ProductService.UploadImage(productId, imageFile);

        }


        [HttpPost]
        public async Task<bool> AddViewCount(int productId)
        {
          return await _ProductService.AddViewCount(productId);
        }

        [HttpPost]
        public async Task<List<ProductViewModel>> GetProductByPrice(decimal fromPrice, decimal toPrice)
        {
            return await _ProductService.GetProductByPrice(fromPrice, toPrice);
        }
    }
}