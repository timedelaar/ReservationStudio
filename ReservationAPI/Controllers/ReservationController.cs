using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using ReservationAPI.Models;


namespace ReservationAPI.Controllers
{
    [Route("api/[controller]")]
    public class ReservationController : Controller
	{
		private ReservationAPIDataContext _DataContext;

		public ReservationController(ReservationAPIDataContext DataContext)
		{
			_DataContext = DataContext;
		}

        //Get a list of all reservations
        //GET: api/values
		[HttpGet]
        public IEnumerable<Reservation> Get()
        {
            return new List<Reservation>();
        }

        // Get a single reservation by Id
        // GET api/values/5
        [HttpGet("{id}")]
        public string Get(int id)
        {
            return "value";
        }

        // Create a new reservation
        // POST api/values
        [HttpPost]
        public void Post([FromBody]Reservation reservation)
        {
            
        }

        // Update the info of a reservation
        // PUT api/values/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody]Reservation reservation)
        {
        }

        // Delete a reservation by Id
        // DELETE api/values/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
