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
    public class RoomController : Controller
    {
		private ReservationAPIDataContext _DataContext;

		public RoomController(ReservationAPIDataContext DataContext)
		{
			_DataContext = DataContext;
		}

		// GET: api/values
		[HttpGet]
        public IEnumerable<Room> Get()
        {
            var list = _DataContext.Rooms.ToList<Room>();
            return list;
        }

        // GET api/values/5
        [HttpGet("{id}")]
        public string Get(int id)
        {
             return "value";
        }

        // POST api/values
        // CREATE new room
        [HttpPost]
        public IActionResult Post([FromBody]Room room)
        {
            // wanneer niet geldig (wordt al afgehandeld en zou in principe niet kunnen voorkomen)
            if (!ModelState.IsValid)
                return BadRequest(ModelState);
            _DataContext.Rooms.Add(room);
            //Datacontext eerder gedefinieerd in ReservationAPIDataContext binnen room.
            try
            {
                _DataContext.SaveChanges();
            }
            catch
            {
                return StatusCode(StatusCodes.Status409Conflict);
            }

            return CreatedAtAction(
                nameof(RoomController.Get),
                new { id = room.Id }, room
                );
        }

        // PUT api/values/5
        // UPDATE room
        [HttpPut("{id}")]
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE api/values/5
        // DELETE room
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
