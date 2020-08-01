using PetsShopSolution.Data.EF;
using PetsShopSolution.ViewModel.Catalog.News;
using PetsShopSolution.Data.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore.Query.SqlExpressions;
using Microsoft.EntityFrameworkCore;

namespace PetsShopSolution.Application.Catalog.News
{
    public class NewsService : INewsService
    {
        private readonly PetsShopDbContext _context;
        public NewsService(PetsShopDbContext context)
        {
            _context = context;
        }
        public async Task<int> Create(NEWS request)
        {
            var news = new New()
            {
                Content = request.Content,
                DateCreated = request.DateCreated,
                ImageURL = request.ImageURL,
                Tittle = request.Tittle,
            };
            _context.News.Add(news);
           await _context.SaveChangesAsync();
            return news.Id;
            
        }

        public async Task<int> Delete(int newsId)
        {
            var news = await _context.News.FindAsync(newsId);
            if (news == null)
                return -1;
            _context.Remove(news);
            return await _context.SaveChangesAsync();
        }

        public async Task<List<NewsViewModel>> GetAll(NEWS request)
        {
            var query = from n in _context.News
                        select n;
            //if (!string.IsNullOrEmpty(request.Tittle))
            //    query = query.Where(x => x.Tittle.Contains(request.Tittle));
            if (!string.IsNullOrEmpty(request.DateCreated))
                query = query.Where(x => x.DateCreated == request.DateCreated);

            var data = await query
               .Select(x => new NewsViewModel()
               {
                  Id=x.Id,
                  DateCreated=x.DateCreated,
                  Content=x.Content,
                   ImageURL = x.ImageURL,
                  Tittle=x.Tittle,

               }).ToListAsync();

            return data;
        }

        public async Task<NewsViewModel> GetById(int newsId)
        {
            var x = await _context.News.FindAsync(newsId);
            if (x == null) return null;
            var newsViewModel = new NewsViewModel()
            {
                Id = x.Id,
                DateCreated = x.DateCreated,
                Content = x.Content,
                ImageURL = x.ImageURL,
                Tittle = x.Tittle,
            };
            return newsViewModel;
        }

        public async Task<int> Update(NEWS request)
        {
            var x = await _context.News.FindAsync(request.Id);
            if (x == null) return -1;
            if (!string.IsNullOrEmpty(request.Tittle))
                x.Tittle = request.Tittle;
            if (!string.IsNullOrEmpty(request.Content))
                x.Content = request.Content;
            if (!string.IsNullOrEmpty(request.ImageURL))
                x.ImageURL = request.ImageURL;
            return await _context.SaveChangesAsync();
        }
    }
}
