using PetsShopSolution.ViewModel.Catalog.News;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace PetsShopSolution.Application.Catalog.News
{
    public interface INewsService
    {
        Task<int> Create(NEWS request);
        Task<int> Update(NEWS request);
        Task<int> Delete(int newsId);
        Task<NewsViewModel> GetById(int newsId);
        Task<List<NewsViewModel>> GetAll(NEWS request);
    }
}
