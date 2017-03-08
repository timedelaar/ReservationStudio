using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using ReservationAPI.Models;
using Microsoft.AspNetCore.Http;

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
            var reservationList = _DataContext.Reservations.ToList<Reservation>();
            return reservationList;
        }

        // Get a single reservation by Id
        // GET api/values/5
        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
			Reservation reservation = _DataContext.Reservations.Find(id);

			if (reservation == null)
			{
				return NotFound();
			}

			return Ok(reservation);
		}

        // Create a new reservation
        // POST api/values
        [HttpPost]
        public IActionResult Post([FromBody]Reservation reservation)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);
            _DataContext.Reservations.Add(reservation);
            try
            {
                _DataContext.SaveChanges();
            }
            catch
            {
                return StatusCode(StatusCodes.Status409Conflict);
            }

            return CreatedAtAction(
                nameof(ReservationController.Get),
                new { id = reservation.Id }, reservation
                );

        }

        // Update the info of a reservation
        // PUT api/values/5
        [HttpPut("{id}")]
        public IActionResult Put(int id, [FromBody]Reservation reservation)
        {
            if (reservation == null || reservation.Id != id)
            {
                return BadRequest();
            }

            var item = _DataContext.Reservations.Find(id);
            if (item == null)
            {
                return NotFound();
            }

            _DataContext.Reservations.Update(item);
            return new NoContentResult();
        }

        // Delete a reservation by Id
        // DELETE api/values/5
        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            var item = _DataContext.Reservations.Find(id);
            if (item == null)
            {
                return NotFound();
            }

            _DataContext.Reservations.Remove(item);
            return new NoContentResult();
        }
    }
}
