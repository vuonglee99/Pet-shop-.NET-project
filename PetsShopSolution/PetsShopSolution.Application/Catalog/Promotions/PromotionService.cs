using Microsoft.AspNetCore.Rewrite;
using Microsoft.EntityFrameworkCore;
using PetsShopSolution.Data.EF;
using PetsShopSolution.Data.Entities;
using PetsShopSolution.Utilities.Exceptions;
using PetsShopSolution.ViewModel.Catalog.Promotions;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PetsShopSolution.Application.Catalog.Promotions
{
    public class PromotionService : IPromotionService
    {
        private readonly PetsShopDbContext _Context;
        public PromotionService(PetsShopDbContext context)
        {
            _Context = context;
        }
        public async Task<int> Create(PromotionCreateRequest request)
        {
            var promotion = new Promotion()
            {
                //Id = request.Id,
                Name = request.Name,
                FromDate = request.FromDate,
                ToDate = request.ToDate,
                ApplyForAll = request.ApplyForAll,
                DiscountAmount = request.DiscountAmount,
                MaxDiscountAmount = request.MaxDiscountAmount,
                ProductCategoryIds = request.ProductCategoryIds,
                ProductIds = request.ProductIds,
                Status = request.Status
            };
            _Context.Promotions.Add(promotion);
            await _Context.SaveChangesAsync();
            return promotion.Id;
        }

        public async Task<int> Delete(int PromotionId)
        {
            var promotion = await _Context.Promotions.FindAsync(PromotionId);
            if (promotion == null) throw new PetsShopException($"Không tìm thấy khuyến mãi" + PromotionId);
             _Context.Remove(promotion);
            return await _Context.SaveChangesAsync();
        }

        //public async Task<List<PromotionViewModel>> GetAll()
        //{
        //    var query = from p in _Context.Promotions
        //                select p;
        //    var data = await query.Select(x => new PromotionViewModel()
        //    {
        //        Id = x.Id,
        //        Name = x.Name,
        //        FromDate = x.FromDate,
        //        ToDate = x.ToDate,
        //        ApplyForAll = x.ApplyForAll,
        //        DiscountAmount = x.DiscountAmount,
        //        MaxDiscountAmount = x.MaxDiscountAmount,
        //        ProductCategoryIds = x.ProductCategoryIds,
        //        ProductIds = x.ProductIds,
        //        Status = x.Status
        //    }).ToListAsync();

        //    return data;
        //}

        public async Task<List<PromotionViewModel>> GetAll(GetPromotionPagingRequest request)
        {
            var query = from p in _Context.Promotions
                        select p;
            if (!string.IsNullOrEmpty(request.KeyWord))
                query = query.Where(x => x.Name.Contains(request.KeyWord));

            if (request.FromDate.HasValue) query = query.Where(x => x.FromDate.CompareTo(request.FromDate) >= 0);

            if (request.ToDate.HasValue) query = query.Where(x => x.FromDate.CompareTo(request.ToDate) <= 0);

            if (request.Status.HasValue) query = query.Where(x => x.Status == request.Status);

            int TotalRows = await query.CountAsync();
            var data = await query
                .Select(x => new PromotionViewModel()
                {
                    Id = x.Id,
                    Name = x.Name,
                    FromDate = x.FromDate,
                    ToDate = x.ToDate,
                    ApplyForAll = x.ApplyForAll,
                    DiscountAmount = x.DiscountAmount,
                    MaxDiscountAmount = x.MaxDiscountAmount,
                    ProductCategoryIds = x.ProductCategoryIds,
                    ProductIds = x.ProductIds,
                    Status = x.Status
                }).ToListAsync();
            return data;
        }

        public async Task<PromotionViewModel> GetById(int PromotionId)
        {
            var promotion = await _Context.Promotions.FindAsync(PromotionId);
            if (promotion == null) throw new PetsShopException($"Không tìm thấy khuyến mãi " + PromotionId);
            var promotionViewModel = new PromotionViewModel()
            {
                Id = promotion.Id,
                Name = promotion.Name,
                FromDate = promotion.FromDate,
                ToDate = promotion.ToDate,
                ApplyForAll = promotion.ApplyForAll,
                DiscountAmount = promotion.DiscountAmount,
                MaxDiscountAmount = promotion.MaxDiscountAmount,
                ProductCategoryIds = promotion.ProductCategoryIds,
                ProductIds = promotion.ProductIds,
                Status = promotion.Status
            };
            return promotionViewModel;
        }

        public async Task<int> Update(PromotionUpdateRequest request)
        {
            var promotion = await _Context.Promotions.FindAsync(request.Id);
            if (promotion == null) throw new PetsShopException($"Không tìm thấy khuyến mãi" + request.Id);
            promotion.Name = request.Name;
            promotion.FromDate = request.FromDate;
            promotion.ToDate = request.ToDate;
            promotion.ApplyForAll = request.ApplyForAll;
            promotion.DiscountAmount = request.DiscountAmount;
            promotion.MaxDiscountAmount = request.MaxDiscountAmount;
            promotion.ProductCategoryIds = request.ProductCategoryIds;
            promotion.ProductIds = request.ProductIds;
            promotion.Status = request.Status;

            return await _Context.SaveChangesAsync();
        }
    }
}
