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
        public DateTime Date { get; set; }
        public string DayPart { get; set; }
        public string Status { get; set; }

    }

    public static class StatusConstants
    {
        public const string Pending = "Pending";
        public const string Confirmed = "Confirmed";
        public const string Canceled = "Canceled";
    }

    public static class DayPartConstants
    {
        public const string Morning = "Morning";
        public const string Afternoon = "Afternoon";
        public const string Evening = "Evening";
    }
}
