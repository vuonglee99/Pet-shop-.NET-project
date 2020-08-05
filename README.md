# Pet shop online

Với sự tham gia đóng góp của các thành viên:
- 17521277 Lê Bá Vương
- 17520230 Hà Thị Anh

Tên dự án: Pet shop online

1. Giới thiệu
  - Kinh doanh mua bán online đang dần khẳng định vị thế của mình khi trở thành một trong những hình thức phổ biến nhất với nhiều ưu điểm: Nhanh, an toàn, đơn giản. Bên cạnh đó cùng với nhu cầu chăm sóc thú cưng của mọi người nhóm A3V đã cho ra mắt web site bán thú cưng online hy vọng hỗ trợ người dùng trong việc đáp ứng nhu cầu của mình.
  - Các tính năng chính:
    + Mua thú cưng các loại: Chó, mèo, chim, rùa,...
    + Mua thức ăn cho thú cưng các loại
    + Phụ kiện, thời trang, thuốc,..
    + Đăng bài chia sẻ kinh nghiệm
    + ...

2. Kiến thức/công cụ sử dụng
  - ASP.NET Core 3.1
  - Entity Framework Core 3.1
  - Angular 9.1.1
  - Installed tools
    + .NET Core SDK  3.1
    + Visual Studio 2019
    + SQL Server 2017
    
3. Cài đặt & Sử dụng<br>A. Front-end:
    - Chắc chắn máy bạn đã cài NodeJS, nếu chưa hãy tải [Tại đây](https://nodejs.org/en/download/) 
    - Chạy các lệnh sau trên màn hình command:
      1. npm install
      2. npm build
      3. ng serve<br>
      
B. Back-end:
   - Cài đặt .NET 3.1 [Tại đây](https://dotnet.microsoft.com/download)
   - Setup Visual Studio
     - Open the solution in VS 2017
     - Open Package Manager Console and navigate to Scheduler.API by typing cd path_to_Scheduler.API
     - Modify the connection string in appsettings.json to reflect your database environment
     - Run the following commands:
       + Add-Migration Initial
       + Update-Database
       + Build and run the Scheduler.API project
