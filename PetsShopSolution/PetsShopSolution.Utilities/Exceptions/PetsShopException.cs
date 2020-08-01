using System;
using System.Collections.Generic;
using System.Text;

namespace PetsShopSolution.Utilities.Exceptions
{
    public class PetsShopException : Exception
    {
        public PetsShopException()
        {
        }

        public PetsShopException(string message)
            : base(message)
        {
        }

        public PetsShopException(string message, Exception inner)
            : base(message, inner)
        {
        }
    }
}
