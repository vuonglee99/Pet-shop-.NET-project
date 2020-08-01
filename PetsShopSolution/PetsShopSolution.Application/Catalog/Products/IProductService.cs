using Microsoft.AspNetCore.Http;
using PetsShopSolution.ViewModel.Catalog.Products;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace PetsShopSolution.Application.Catalog.Products
{
    public interface IProductService
    {
        Task<int> Create(PRODUCT request);
        Task<bool> Update(PRODUCT request);
        Task<bool> Delete(int productID);

        Task<bool> AddViewCount(int ProductID);

        Task<List<ProductViewModel>> GetAllProduct(PRODUCT request);
        Task<ProductViewModel> GetById(int ProductId);
        Task<List<ProductViewModel>> GetAllByCategoryId(int categoryId);

        Task<bool> UploadImage(int productId, IFormFile imageFile);
        Task<List<ProductViewModel>> GetProductByPrice( decimal fromPrice, decimal toPrice);
    }
}
