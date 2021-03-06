﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ReservationAPI.Models
{
    public class Reservation
    {
        public int Id { get; set; }
        public int CompanyId { get; set; }
        public int RoomId { get; set; }
        public DateTime Date { get; set; }
        public DayPart DayPart { get; set; }
        public Status Status { get; set; }

    }

	public enum Status { Pending, Confirmed, Canceled }

    public enum DayPart { Morning, Afternoon, Evening }
}
