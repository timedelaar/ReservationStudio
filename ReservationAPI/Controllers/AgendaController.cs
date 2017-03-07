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

        // GET: api/values
        [HttpGet]
        public IEnumerable<AgendaViewModel> Get()
        {
			var query = from room in _DataContext.Rooms
						join reservation in _DataContext.Reservations on room.Id equals reservation.Id
						select new
						{
							ReservationId = reservation.Id,
							RoomId = room.Id
						};

			return null;
        }

        // GET api/values/5
        [HttpGet("{id}")]
        public string Get(int id)
        {
            return "value";
        }

        // POST api/values
        [HttpPost]
        public void Post([FromBody]string value)
        {
        }

        // PUT api/values/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE api/values/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
