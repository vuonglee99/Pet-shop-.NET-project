using PetsShopSolution.Data.EF;
using PetsShopSolution.Data.Entities;
using PetsShopSolution.Utilities.Exceptions;
using PetsShopSolution.ViewModel.Catalog.Categories;
using System;
using System.Linq;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Mvc;
using PetsShopSolution.ViewModel.Catalog.ProductInCategory;
using PetsShopSolution.Data.Enums;
using System.Runtime.InteropServices.WindowsRuntime;

namespace PetsShopSolution.Application.Catalog.Categories
{
    public class CategoryService : ICategoryService
    {
        private readonly PetsShopDbContext _Context;

        public CategoryService(PetsShopDbContext Context)
        {
            _Context = Context;
        }



        public async Task<int> Create(CATEGORY request)
        {
            var category = new Category()
            {
                Name = request.Name,
                SeoDescription = request.SeoDescription,
                ParentID = request.ParentID,
            };
            _Context.Categories.Add(category);
            await _Context.SaveChangesAsync();
            return category.ID;
        }

        public async Task<int> Delete(int CategoryId)
        {
            var category = await _Context.Categories.FindAsync(CategoryId);
            if (category == null)
                return 0;
            _Context.Remove(category);
            return await _Context.SaveChangesAsync();
        }

        public async Task<List<CategoryViewModel>> GetAll(CATEGORY request)
        {
            var query = from c in _Context.Categories
                        select c;

            if (request.ID != 0)
                query = query.Where(x => x.ID == (request.ID));

            if (!string.IsNullOrEmpty(request.Name))
                query = query.Where(x => x.Name.Contains(request.Name));

            if (request.ParentID != -1)
                query = query.Where(x => x.ParentID == request.ParentID);

            var data = await query
                .Select(x => new CategoryViewModel()
                {
                    ID = x.ID,
                    Name = x.Name,
                    SeoDescription = x.SeoDescription,
                    ParentID = x.ParentID,
                }).ToListAsync();
            return data;
        }


        public async Task<CategoryViewModel> GetById(int categoryId)
        {
            var category = await _Context.Categories.FindAsync(categoryId);
            if (category == null)
                return null;
            var CategoryViewModel = new CategoryViewModel()
            {
                ID = category.ID,
                Name = category.Name,
                SeoDescription = category.SeoDescription,
                ParentID = category.ParentID,
            };
            return CategoryViewModel;
        }

        public async Task<int> Update(CATEGORY request)
        {
            int id = request.ID;
            var category = await _Context.Categories.FindAsync(id);
            if (category == null)
                return 0;

            if (!string.IsNullOrEmpty(request.Name))
                category.Name = request.Name;

            if (!string.IsNullOrEmpty(request.SeoDescription))
                category.SeoDescription = request.SeoDescription;

            if (request.ParentID != 0)
                category.ParentID = request.ParentID;

            return await _Context.SaveChangesAsync();
        }
    }
}
