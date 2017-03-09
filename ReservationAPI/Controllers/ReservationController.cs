using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using ReservationAPI.Models;
using ReservationAPI.ViewModels;
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
        public IEnumerable<ReservationViewModel> Get()
        {
			var query = from reservation in _DataContext.Reservations
								  join room in _DataContext.Rooms on reservation.RoomId equals room.Id
								  join company in _DataContext.Companies on reservation.CompanyId equals company.Id
								  select new ReservationViewModel
								  {
									  Id = reservation.Id,
									  Date = reservation.Date,
									  DayPart = reservation.DayPart,
									  Status = reservation.Status,
									  Company = company,
									  Room = room
								  };

            return query.ToList();
        }

        // Get a single reservation by Id
        // GET api/values/5
        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
			var query = from reservation in _DataContext.Reservations
									   join room in _DataContext.Rooms on reservation.RoomId equals room.Id
									   join company in _DataContext.Companies on reservation.CompanyId equals company.Id
									   where reservation.Id == id
									   select new ReservationViewModel
									   {
										   Id = reservation.Id,
										   Date = reservation.Date,
										   DayPart = reservation.DayPart,
										   Status = reservation.Status,
										   Company = company,
										   Room = room
									   };

			var result = query.First();


			if (result == null)
			{
				return NotFound();
			}

			return Ok(result);
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

			item.CompanyId = reservation.CompanyId;
			item.Date = reservation.Date;
			item.DayPart = reservation.DayPart;
			item.RoomId = reservation.RoomId;
			item.Status = reservation.Status;

            _DataContext.Reservations.Update(item);

			try
			{
				_DataContext.SaveChanges();
			}
			catch
			{
				return StatusCode(StatusCodes.Status409Conflict);
			}
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

			try
			{
				_DataContext.SaveChanges();
			}
			catch
			{
				return StatusCode(StatusCodes.Status410Gone);
			}
			return new NoContentResult();
        }
    }
}
