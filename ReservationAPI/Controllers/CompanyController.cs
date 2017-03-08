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
            var list = _DataContext.Companies.ToList<Company>();
            return list;
        }

		/// <summary>
		/// Gets a single company by id.
		/// </summary>
		/// <param name="id">The company id</param>
		/// <returns>The company corresponding to the id</returns>
        // GET api/values/5
        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            Company company = _DataContext.Companies.Find(id);

            if (company == null)
            {
                return NotFound();
            }

            return Ok(company);
        }

		/// <summary>
		/// Creates a new company.
		/// </summary>
		/// <param name="company">The company to create</param>
        // POST api/values
        [HttpPost]
        public IActionResult Post([FromBody]Company company)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);
            _DataContext.Companies.Add(company);
            try
            {
                _DataContext.SaveChanges();
            }
            catch
            {
                return StatusCode(StatusCodes.Status409Conflict);
            }

            return CreatedAtAction(
                nameof(CompanyController.Get),
                new { id = company.Id }, company
                );
        }

		/// <summary>
		/// Updates a company with new information.
		/// </summary>
		/// <param name="id">The company id</param>
		/// <param name="company">A company object containing the new information</param>
        // PUT api/values/5
        [HttpPut("{id}")]
        public IActionResult Put(int id, [FromBody]Company company)
        {
            if (company == null || company.Id != id)
            {
                return BadRequest();
            }

            var oldCompany = _DataContext.Companies.Find(id);
            if (oldCompany == null)
            {
                return NotFound();
            }

            oldCompany.Id = company.Id;
            oldCompany.Name = company.Name;
            oldCompany.Employees = company.Employees;
            oldCompany.Location = company.Location;

            _DataContext.Companies.Update(oldCompany);
            try
            {
                _DataContext.SaveChanges();
                return new NoContentResult();
            }
            catch
            {
                return StatusCode(StatusCodes.Status409Conflict);
            }
        }

		/// <summary>
		/// Deletes a company by id.
		/// </summary>
		/// <param name="id">The company id</param>
        // DELETE api/values/5
        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            Company company = _DataContext.Companies.Find(id);
            if (company == null)
                return NotFound();
            _DataContext.Companies.Remove(company);

            try
            {
                _DataContext.SaveChanges();
            }
            catch
            {
                return StatusCode(StatusCodes.Status304NotModified);
            }

            return Ok(company);
        }
    }
}
