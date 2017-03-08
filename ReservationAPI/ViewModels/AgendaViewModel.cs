using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ReservationAPI.Models;

namespace ReservationAPI.ViewModels
{
	public class AgendaViewModel
	{
		public Room Room { get; set; }

		public IEnumerable<Reservation> Reservations { get; set; }
    }
}
