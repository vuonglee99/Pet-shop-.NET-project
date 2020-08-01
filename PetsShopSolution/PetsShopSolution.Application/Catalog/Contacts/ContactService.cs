using PetsShopSolution.Data.EF;
using PetsShopSolution.Data.Entities;
using PetsShopSolution.ViewModel.Catalog.Contacts;
using System;
using System.Collections.Generic;
using System.Text;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using System.Security.Cryptography.X509Certificates;
using PetsShopSolution.Data.Enums;

namespace PetsShopSolution.Application.Catalog.Contacts
{
    public class ContactService : IContactService
    {

        private readonly PetsShopDbContext _Context;

        public ContactService(PetsShopDbContext Context)
        {
            _Context = Context;
        }

        public async Task<int> Create(CONTACT request)
        {
            var contact = new Contact()
            {
                Name = request.Name,
                Email = request.Email,
                PhoneNumber = request.PhoneNumber,
                Message = request.Message,
                CreatedTime = request.CreatedTime,
            };
            _Context.Contacts.Add(contact);
            await _Context.SaveChangesAsync();
            return contact.Id;
        }

        public async Task<int> Delete(int ContactId)
        {
            var contact = await _Context.Contacts.FindAsync(ContactId);
            if (contact == null) return 0;
            _Context.Remove(contact);
            return await _Context.SaveChangesAsync();
        }


        public async Task<List<ContactViewModel>> GetAll(CONTACT request)
        {
            var query = from c in _Context.Contacts
                        select c;

            if (!string.IsNullOrEmpty(request.Name))
                query = query.Where(x => x.Name.Contains(request.Name));

            if (!string.IsNullOrEmpty(request.CreatedTime))
                query = query.Where(x => x.CreatedTime == request.CreatedTime);


            if (request.Status != null) query = query.Where(x => x.Status == request.Status);

            if (!string.IsNullOrEmpty(request.Email)) query = query.Where(x => x.Email == request.Email);

            if (!string.IsNullOrEmpty(request.PhoneNumber)) query = query.Where(x => x.PhoneNumber == request.PhoneNumber);

            var data = await query
                .Select(x => new ContactViewModel()
                {
                    Id = x.Id,
                    Name = x.Name,
                    Email = x.Email,
                    PhoneNumber = x.PhoneNumber,
                    Message = x.Message,
                    Status = x.Status,
                    CreatedTime = x.CreatedTime
                }).ToListAsync();
            return data;
        }


        public async Task<ContactViewModel> GetById(int ContactId)
        {
            var contact = await _Context.Contacts.FindAsync(ContactId);
            if (contact == null) return null;
            var contactViewModel = new ContactViewModel()
            {
                Id = contact.Id,
                Name = contact.Name,
                Email = contact.Email,
                PhoneNumber = contact.PhoneNumber,
                Message = contact.Message,
                Status = contact.Status,
                CreatedTime = contact.CreatedTime

            };
            return contactViewModel;
        }

        public async Task<int> UpdateStatus(CONTACT request)
        {
            var contact = await _Context.Contacts.FindAsync(request.Id);
            if (contact == null) return 0;
            if (request.Status != null)
                contact.Status = (Status)request.Status;
            return await _Context.SaveChangesAsync();
        }
    }
}
