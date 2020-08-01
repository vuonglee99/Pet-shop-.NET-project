using PetsShopSolution.ViewModel.Catalog.Categories;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace PetsShopSolution.Application.Catalog.Categories
{
    public interface ICategoryService
    {
        Task<int> Create(CATEGORY request);
        Task<int> Update(CATEGORY request);
        Task<int> Delete(int CategoryId);

        Task<CategoryViewModel> GetById(int categoryId);
        Task <List<CategoryViewModel>> GetAll(CATEGORY request);

        ////Task<int> AddProductToCategory(int categoryID, int productID);

        ////Task<int> RemoveProductFromCategory(int categoryID, int productID);
    }
}
