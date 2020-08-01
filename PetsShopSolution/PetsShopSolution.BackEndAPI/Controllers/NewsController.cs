using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using PetsShopSolution.Application.Catalog.News;
using PetsShopSolution.ViewModel.Catalog.News;

namespace PetsShopSolution.BackEndApi.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class NewsController : ControllerBase
    {
        private readonly INewsService _newsService;
        public NewsController(INewsService newsService)
        {
            _newsService = newsService;
        }


        [HttpPost]
        public async Task<NewsViewModel> GetById(int newsId)
        {
            var cart = await _newsService.GetById(newsId);
            if (cart == null) return null;
            return cart;
        }

        [HttpPost]
        public async Task<int> Create([FromBody] NEWS request)
        {
            return await _newsService.Create(request);
        }
        [HttpPost]
        public async Task<bool> Update([FromBody] NEWS request)
        {
            var affectedResult = await _newsService.Update(request);
            if (affectedResult <= 0)
                return false;
            return true;
        }
        [HttpPost]
        public async Task<bool> Delete(int newsId)
        {
            var affectedResults = await _newsService.Delete(newsId);
            if (affectedResults == 0) return false;

            return true;
        }

        [HttpPost]
        public async Task<List<NewsViewModel>> GetAll([FromBody] NEWS request) 
        {
            var posts = await _newsService.GetAll(request);
            return posts;
        }

    }
}