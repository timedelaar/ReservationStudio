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

		public Reservation Morning { get; set; }

		public Reservation Afternoon { get; set; }

		public Reservation Evening { get; set; }
    }
}
