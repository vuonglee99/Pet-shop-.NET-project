using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using PetsShopSolution.Application.Catalog.Categories;
using PetsShopSolution.ViewModel.Catalog.Categories;
using PetsShopSolution.ViewModel.Catalog.ProductInCategory;

namespace PetsShopSolution.BackEndApi.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    // [Authorize]
    public class CategoriesController : ControllerBase
    {
        private readonly ICategoryService _categoryService;
        public CategoriesController(ICategoryService categoryService)
        {
            _categoryService = categoryService;
        }

        [HttpPost]
        public async Task<List<CategoryViewModel>> GetAllCategory([FromBody] CATEGORY request)
        {
            var categories = await _categoryService.GetAll(request);
            return categories;

        }


        [HttpPost]
        public async Task<CategoryViewModel> GetById(int categoryId)  
        {
            var category = await _categoryService.GetById(categoryId);
            if (category == null) return null;
            return category;
        }

        [HttpPost]
        public async Task<int> Create([FromBody] CATEGORY request)
        {
            return await _categoryService.Create(request);
        }

        [HttpPost]
        public async Task<bool> Update([FromBody]CATEGORY request)
        {          
            var affectedResult = await _categoryService.Update(request);
            if (affectedResult <= 0)
                return false;
            return true;
        }

        [HttpPost]
        public async Task<bool> Delete(int CategoryId)
        {
            var affectedResults = await _categoryService.Delete(CategoryId);
            if (affectedResults <= 0) return false;

            return true;
        }

    }

}