using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using PetsShopSolution.Data.EF;
using PetsShopSolution.Data.Entities;
using PetsShopSolution.ViewModel.Catalog.Products;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using Microsoft.Net.Http.Headers;
using Microsoft.AspNetCore.Hosting;
using Firebase.Auth;
using PetsShopSolution.Utilities.Constants;
using System.Threading;
using Firebase.Storage;

namespace PetsShopSolution.Application.Catalog.Products
{
    public class ProductService : IProductService
    {
        private readonly PetsShopDbContext _Context;
        private const string USER_CONTENT_FOLDER_NAME = "user-content";
        private readonly string _userContentFolder;
        public ProductService(PetsShopDbContext Context, IWebHostEnvironment webHostEnvironment)
        {
            _Context = Context;
            _userContentFolder = Path.Combine(webHostEnvironment.WebRootPath, USER_CONTENT_FOLDER_NAME);
        }


        public async Task<bool> AddViewCount(int ProductID)
        {
            var product = await _Context.Products.FindAsync(ProductID);
            product.ViewCount += 1;
            return await _Context.SaveChangesAsync() > 0;
        }

        public async Task<int> Create(PRODUCT request)
        {
            var product = new Product()
            {
                Price = request.Price,
                Name = request.Name,
                ViewCount = 0,
                CategoryId = request.CategoryId,
                DateCreated = request.DateCreated,
                Stock = request.Stock,
                Details = request.Details,
                ImageURL = request.ImageURL,
                Star = 0,
                RatedCount = 0,
            };

            //add product zo context
            _Context.Products.Add(product);
            await _Context.SaveChangesAsync();
            return product.ID;
        }


        public async Task<bool> Delete(int productID)
        {
            var product = await _Context.Products.FindAsync(productID);
            if (product == null) return false;

            _Context.Remove(product);
            return await _Context.SaveChangesAsync() > 0;
        }



        public async Task<List<ProductViewModel>> GetAllProduct(PRODUCT request)
        {
            //1. Select join
            var query = from p in _Context.Products
                        select p;

            //2. Filter
            if (!string.IsNullOrEmpty(request.Name))
                query = query.Where(x => x.Name.Contains(request.Name));

            if (request.CategoryId != 0)
                query = query.Where(x => x.CategoryId == request.CategoryId);

            if (!string.IsNullOrEmpty(request.DateCreated))
                query = query.Where(x => x.DateCreated == request.DateCreated);

            if (request.ViewCount != -1)
            {
                query = query.Where(x => x.ViewCount >= request.ViewCount);
            }

            //3. Paging
            int TotalRows = await query.CountAsync();
            var data = await query
                .Select(x => new ProductViewModel()
                {
                    ID = x.ID,
                    Name = x.Name,
                    Price = x.Price,
                    Stock = x.Stock,
                    ViewCount = x.ViewCount,
                    DateCreated = x.DateCreated,
                    Details = x.Details,
                    ImageURL = x.ImageURL,
                    Star = x.Star,
                    RatedCount = x.RatedCount,
                    CategoryId = x.CategoryId,

                }).ToListAsync();

            //4. Select and projection

            return data;

        }

        public async Task<ProductViewModel> GetById(int ProductId)
        {
            var product = await _Context.Products.FindAsync(ProductId);
            if (product == null) return null;

            var productViewModel = new ProductViewModel()
            {
                ID = product.ID,
                DateCreated = product.DateCreated,
                CategoryId = product.CategoryId,
                Details = product.Details,
                Name = product.Name,
                Price = product.Price,
                Stock = product.Stock,
                ViewCount = product.ViewCount,
                ImageURL = product.ImageURL,
                Star = product.Star,
                RatedCount = product.RatedCount,
            };
            return productViewModel;
        }


        public async Task<bool> Update(PRODUCT request)
        {
            var product = await _Context.Products.FindAsync(request.ID);
            if (product == null) return false;

            if (!string.IsNullOrEmpty(request.Name))
                product.Name = request.Name;
            if (!string.IsNullOrEmpty(request.Details))
                product.Details = request.Details;
            if (!string.IsNullOrEmpty(request.DateCreated))
                product.DateCreated = request.DateCreated;
            if (request.Price != 0)
                product.Price = request.Price;
            if (request.ViewCount != 0)
                product.ViewCount = request.ViewCount;
            if (request.Stock != 0)
                product.Stock = request.Stock;
            if (request.CategoryId != 0)
                product.CategoryId = request.CategoryId;
            if (!string.IsNullOrEmpty(request.ImageURL))
                product.ImageURL = request.ImageURL;
            return await _Context.SaveChangesAsync() > 0;
        }

        public async Task<List<ProductViewModel>> GetAllByCategoryId(int categoryId)
        {
            //1. Select join
            var query = from p in _Context.Products
                        where p.CategoryId == categoryId
                        select  p;

            //3. Paging
            var data = await query
                .Select(x => new ProductViewModel()
                {
                    ID = x.ID,
                    CategoryId=x.CategoryId,
                    Name = x.Name,
                    Price = x.Price,
                    Stock = x.Stock,
                    ViewCount = x.ViewCount,
                    DateCreated = x.DateCreated,
                    Details = x.Details,
                    ImageURL = x.ImageURL,
                    Star = x.Star,
                    RatedCount = x.RatedCount,

                }).ToListAsync();

            //4. Select and projection
            return data;
        }

        public async Task<List<ProductViewModel>> GetProductByPrice(decimal fromPrice, decimal toPrice)
        {
            var query = from p in _Context.Products
                        select p;

            //2. Filter
            if (fromPrice != 0)
                query = query.Where(x => x.Price >= fromPrice);
            if (toPrice != 0)
                query = query.Where(x => x.Price <= toPrice);

            //3. Paging
            int TotalRows = await query.CountAsync();
            var data = await query
                .Select(x => new ProductViewModel()
                {
                    ID = x.ID,
                    Name = x.Name,
                    Price = x.Price,
                    Stock = x.Stock,
                    ViewCount = x.ViewCount,
                    DateCreated = x.DateCreated,
                    Details = x.Details,
                    ImageURL = x.ImageURL,
                    Star = x.Star,
                    RatedCount = x.RatedCount,
                    CategoryId = x.CategoryId,

                }).ToListAsync();

            //4. Select and projection
            //4. Select and projection
            return data;
        }
        public async Task<bool> UploadImage(int productId, IFormFile imageFile)
        {
            var originalFileName = ContentDispositionHeaderValue.Parse(imageFile.ContentDisposition).FileName.ToString().Trim('"');
            var fileName = $"{Guid.NewGuid()}{Path.GetExtension(originalFileName)}";
            var filePath = Path.Combine(_userContentFolder, fileName);


            FileStream ms = new FileStream(filePath, FileMode.Create);
            var output = ms;
            await imageFile.OpenReadStream().CopyToAsync(output);
            ms.Close();

            ms = new FileStream(filePath, FileMode.Open);
            var auth = new FirebaseAuthProvider(new FirebaseConfig(FireBaseConfig.ApiKey));
            var a = await auth.SignInWithEmailAndPasswordAsync(FireBaseConfig.AuthEmail, FireBaseConfig.AuthPassword);

            var cancellation = new CancellationTokenSource();

            var task = new FirebaseStorage(
                FireBaseConfig.Bucket,
                new FirebaseStorageOptions
                {
                    AuthTokenAsyncFactory = () => Task.FromResult(a.FirebaseToken),
                    ThrowOnCancel = true // when you cancel the upload, exception is thrown. By default no exception is thrown
                })
                .Child("products")
                .Child(fileName)
                .PutAsync(ms, cancellation.Token);

            var product = await _Context.Products.FindAsync(productId);
            product.ImageURL = await task;
            return await _Context.SaveChangesAsync() > 0;
        }
    }


}
