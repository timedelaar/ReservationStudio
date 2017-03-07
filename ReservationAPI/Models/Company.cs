using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ReservationAPI.Models
{
    public class Company
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public int Employees { get; set; }
        public string Location { get; set; }
    }
}
