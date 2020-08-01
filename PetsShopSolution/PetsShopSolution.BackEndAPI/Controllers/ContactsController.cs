using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using PetsShopSolution.Application.Catalog.Contacts;
using PetsShopSolution.ViewModel.Catalog.Contacts;

namespace PetsShopSolution.BackEndApi.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class ContactsController : ControllerBase
    {
        private readonly IContactService _ContactSerive;
        public ContactsController(IContactService contactService)
        {
            _ContactSerive = contactService;
        }

        //http://loaclhost:port/product/public-paging
        [HttpPost]
        public async Task<List<ContactViewModel>> GetAllContact([FromBody] CONTACT request)  //[FromQuery] Tat ca cac tham so tu request deu lay tu query ra
        {
            var contacts = await _ContactSerive.GetAll(request);

            return contacts;
        }

        [HttpPost]
        public async Task<ContactViewModel> GetById(int contactId)
        {
            var contact = await _ContactSerive.GetById(contactId);
            if (contact == null) return null;
            return contact;
        }


        [HttpPost]
        public async Task<int> Create([FromBody] CONTACT request)
        {

          return await _ContactSerive.Create(request);
        }



        [HttpPost]
        public async Task<bool> Delete(int contactId)
        {
            var affectedResults = await _ContactSerive.Delete(contactId);
            if (affectedResults == 0) return false;

            return true;
        }

        [HttpPost]
        public async Task<bool> UpdateStatus([FromBody] CONTACT con)
        {
            var affectedResults = await _ContactSerive.UpdateStatus(con);
            if (affectedResults == 0) return false;
            return false;
        }

    }
}