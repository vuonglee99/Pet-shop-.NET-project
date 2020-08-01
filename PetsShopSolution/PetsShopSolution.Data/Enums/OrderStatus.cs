using System;
using System.Collections.Generic;
using System.Text;

namespace PetsShopSolution.Data.Enums
{
    public enum OrderStatus
    {
        InProgress,  //0: đang chờ xác nhận
        Confirmed,   //1: đã xác nhận đơn hàng
        Shipping,    //2: Đang giao
        Success,     //3: đã nhận hàng
        Canceled     //4: đã hủy
    }
}
