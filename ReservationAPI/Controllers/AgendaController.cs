using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using ReservationAPI.Models;
using ReservationAPI.ViewModels;

// For more information on enabling Web API for empty projects, visit http://go.microsoft.com/fwlink/?LinkID=397860

namespace ReservationAPI.Controllers
{
    [Route("api/[controller]")]
    public class AgendaController : Controller
    {
		private ReservationAPIDataContext _DataContext;

		public AgendaController(ReservationAPIDataContext DataContext)
		{
			_DataContext = DataContext;
		}

        // GET: api/Agenda/
        [HttpGet]
        public IEnumerable<AgendaViewModel> Get()
        {
			var query = from room in _DataContext.Rooms
						join reservation in _DataContext.Reservations on room.Id equals reservation.RoomId into reservations
						select new AgendaViewModel
						{
							Room = room,
							Reservations = reservations
						};

			var result = query.ToList();

			return result;
        }
    }
}
