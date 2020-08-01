using PetsShopSolution.ViewModel.System.Notifications;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace PetsShopSolution.Application.System.Notifications
{
    public interface INotiService
    {
        Task<int> Create(NOTIFICATION request);
        Task<bool> Delete(int notiId);
        Task<List<NotiViewModel>> GetAllByUserId(Guid userId);
        Task<NotiViewModel> GetById(int notiId);
        Task<List<NotiViewModel>> GetAll(NOTIFICATION request);
        Task<bool> Update(NOTIFICATION request);

        Task<bool> ActiveAll(Guid userId);
    }
}
