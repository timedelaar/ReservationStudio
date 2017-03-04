using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using ReservationAPI.Models;


namespace ReservationAPI.Controllers
{
    [Route("api/[controller]")]
    public class CompanyController : Controller
	{
		private ReservationAPIDataContext _DataContext;

		public CompanyController(ReservationAPIDataContext DataContext)
		{
			_DataContext = DataContext;
		}

		/// <summary>
		/// Gets a list of all companies.
		/// </summary>
		/// <returns>List of companies</returns>
		// GET: api/values
		[HttpGet]
        public IEnumerable<Company> Get()
        {
            return new List<Company>();
        }

		/// <summary>
		/// Gets a single company by id.
		/// </summary>
		/// <param name="id">The company id</param>
		/// <returns>The company corresponding to the id</returns>
        // GET api/values/5
        [HttpGet("{id}")]
        public string Get(int id)
        {
            return "value";
        }

		/// <summary>
		/// Creates a new company.
		/// </summary>
		/// <param name="company">The company to create</param>
        // POST api/values
        [HttpPost]
        public void Post([FromBody]Company company)
        {
        }

		/// <summary>
		/// Updates a company with new information.
		/// </summary>
		/// <param name="id">The company id</param>
		/// <param name="company">A company object containing the new information</param>
        // PUT api/values/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody]Company company)
        {
        }

		/// <summary>
		/// Deletes a company by id.
		/// </summary>
		/// <param name="id">The company id</param>
        // DELETE api/values/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
