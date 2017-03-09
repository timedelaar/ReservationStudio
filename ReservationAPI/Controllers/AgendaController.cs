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
        public IEnumerable<AgendaViewModel> Get(DateTime startDate, DateTime endDate)
        {
			var start = startDate.Date;
			var end = endDate.Date;
			var query = from reservation in _DataContext.Reservations
						 join company in _DataContext.Companies on reservation.CompanyId equals company.Id
						where reservation.Date >= startDate && reservation.Date <= endDate
						 select new ReservationViewModel
						 {
							 Id = reservation.Id,
							 Date = reservation.Date,
							 DayPart = reservation.DayPart,
							 Status = reservation.Status,
							 Company = company,
							 Room = new Room
							 {
								 Id = reservation.RoomId
							 }
						 };

			var query2 = from room in _DataContext.Rooms
						join reservation in query on room.Id equals reservation.Room.Id into reservations
						select new AgendaViewModel
						{
							Room = room,
							Reservations = reservations
						};

			var result = query2.ToList();

			return result;
        }
    }
}
