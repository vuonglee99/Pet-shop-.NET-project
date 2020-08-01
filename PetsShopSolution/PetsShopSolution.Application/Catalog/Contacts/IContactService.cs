using PetsShopSolution.ViewModel.Catalog.Contacts;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace PetsShopSolution.Application.Catalog.Contacts
{
    public interface IContactService
    {
        Task<int> Create(CONTACT request);
        Task<int> Delete(int ContactId);
        Task<ContactViewModel> GetById(int ContactId);
        Task<List<ContactViewModel>> GetAll(CONTACT request);
        Task<int> UpdateStatus(CONTACT request);
    }
}
