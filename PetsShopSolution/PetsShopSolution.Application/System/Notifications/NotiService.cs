using Microsoft.EntityFrameworkCore;
using PetsShopSolution.Data.EF;
using PetsShopSolution.Data.Entities;
using PetsShopSolution.Utilities.Exceptions;
using PetsShopSolution.ViewModel.System.Notifications;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PetsShopSolution.Application.System.Notifications
{
    public class NotiService : INotiService
    {
        private readonly PetsShopDbContext _Context;
        public NotiService(PetsShopDbContext context)
        {
            _Context = context;
        }
        public async Task<int> Create(NOTIFICATION request)
        {
            var noti = new Notification()
            {
                DateCreated = request.DateCreated,
                From = Guid.Parse(request.From),
                To = Guid.Parse(request.To),
                Message = request.Message,
                Tittle = request.Tittle,
                Status = Data.Enums.Status.InActive,
            };

            _Context.Notifications.Add(noti);
            await _Context.SaveChangesAsync();
            return noti.Id;
        }

        public async Task<bool> Delete(int notiId)
        {
            var noti = await _Context.Notifications.FindAsync(notiId);
            if (noti == null) return false;
            _Context.Remove(noti);
            return await _Context.SaveChangesAsync() > 0;

        }

        public async Task<List<NotiViewModel>> GetAll(NOTIFICATION request)
        {
            var query = from noti in _Context.Notifications
                        select noti;

            if (!string.IsNullOrEmpty(request.From))
                query = query.Where(x => x.From == Guid.Parse(request.From));

            if (!string.IsNullOrEmpty(request.To))
                query = query.Where(x => x.To == Guid.Parse(request.To));

            if (!string.IsNullOrEmpty(request.DateCreated))
                query = query.Where(x => x.DateCreated == request.DateCreated);
            

            if ((request.Status.HasValue && !string.IsNullOrEmpty(request.Status.ToString())))
                query = query.Where(x => x.Status == request.Status);

            var data = await query.Select(x => new NotiViewModel()
            {
                Id = x.Id,
                DateCreated = x.DateCreated,
                From = x.From,
                Message = x.Message,
                Status = x.Status,
                Tittle = x.Tittle,
                To = x.To,
            }).ToListAsync();

            return data;
        }

        public async Task<List<NotiViewModel>> GetAllByUserId(Guid userId)
        {
            var query = from noti in _Context.Notifications
                        where noti.To == userId
                        select noti;

            var data = await query.Select(x => new NotiViewModel()
            {
                Id = x.Id,
                DateCreated = x.DateCreated,
                From = x.From,
                Message = x.Message,
                Status = x.Status,
                Tittle = x.Tittle,
                To = x.To,
            }).ToListAsync();

            return data;
        }


        public async Task<NotiViewModel> GetById(int notiId)
        {
            var noti = await _Context.Notifications.FindAsync(notiId);
            if (noti == null) return null;
            var notiViewModel = new NotiViewModel()
            {
                Id = noti.Id,
                DateCreated = noti.DateCreated,
                From = noti.From,
                Message = noti.Message,
                Status = noti.Status,
                Tittle = noti.Tittle,
                To = noti.To,
            };
            return notiViewModel;
        }

        public async Task<bool> Update(NOTIFICATION request)
        {
            var noti = await _Context.Notifications.FindAsync(request.Id);
            if (noti == null) return false;

            if (!string.IsNullOrEmpty(request.Tittle))
                noti.Tittle = request.Tittle;
            if (!string.IsNullOrEmpty(request.Message))
                noti.Tittle = request.Message;
            if (!string.IsNullOrEmpty(request.To))
                noti.Tittle = request.To;
            if (!string.IsNullOrEmpty(request.From))
                noti.Tittle = request.From;
            if (request.Status != null)
                noti.Status = Data.Enums.Status.Active;
            if (!string.IsNullOrEmpty(request.DateCreated))
                noti.DateCreated = request.DateCreated;

            return await _Context.SaveChangesAsync() > 0;
        }

        public async Task<bool> ActiveAll(Guid userId)
        {
            var notis = await _Context.Notifications.Where(x => x.To == userId).ToListAsync();
            foreach (var noti in notis)
            {
                noti.Status = Data.Enums.Status.Active;
            }
            return await _Context.SaveChangesAsync() > 0;
        }
    }
}
