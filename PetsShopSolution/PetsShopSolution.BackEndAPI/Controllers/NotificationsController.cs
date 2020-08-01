using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using PetsShopSolution.Application.System.Notifications;
using PetsShopSolution.ViewModel.System.Notifications;

namespace PetsShopSolution.BackEndApi.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class NotificationsController : ControllerBase
    {
        private readonly INotiService _noticService;
        public NotificationsController(INotiService notiService)
        {
            _noticService = notiService;
        }

        [HttpPost]
        public async Task<List<NotiViewModel>> GetAll([FromBody] NOTIFICATION request)
        {
            return await _noticService.GetAll(request);
            
        }


        [HttpPost]
        public async Task<List<NotiViewModel>> GetAllByUserId(Guid userId)
        {
            return await _noticService.GetAllByUserId(userId);
        }

        [HttpPost]
        public async Task<NotiViewModel> GetById(int notiId)
        {
            return await _noticService.GetById(notiId);
            
        }

        [HttpPost]
        public async Task<int> Create([FromBody] NOTIFICATION request)
        {          
           return  await _noticService.Create(request);      
        }

        [HttpPost]
        public async Task<bool> Delete(int notiId)
        {
            return await _noticService.Delete(notiId);            
        }

        [HttpPost]
        public async Task<bool> Update([FromBody]NOTIFICATION noti)
        {
            return await _noticService.Update(noti);
        }

        [HttpPost]
        public async Task<bool> ActiveAll(Guid userId)
        {
           return await _noticService.ActiveAll(userId);
        }
    }
}