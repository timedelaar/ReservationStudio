using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ReservationAPI.Models
{
    public class Reservation
    {
        public int Id { get; set; }
        public Company Company { get; set; }
        public Room Room { get; set; }
        public string Status { get; set; }
    }

    public static class StatusConstants
    {
        public const string Pending = "Pending";
        public const string Confirmed = "Confirmed";
        public const string Canceled = "Canceled";
    }
}
