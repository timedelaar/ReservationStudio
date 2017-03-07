using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ReservationAPI.Models
{
    public class Room
    {
        public int RoomNumber { get; set; }
        public string RoomDescription { get; set; }
        public int MaxAmount { get; set; }
    }
}
