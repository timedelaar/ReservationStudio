using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ReservationAPI.Models;

namespace ReservationAPI.ViewModels
{
    public class ReservationViewModel
	{
		public int Id { get; set; }
		public Company Company { get; set; }
		public Room Room { get; set; }
		public DateTime Date { get; set; }
		public DayPart DayPart { get; set; }
		public Status Status { get; set; }
	}
}
