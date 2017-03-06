using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;

// For more information on enabling MVC for empty projects, visit http://go.microsoft.com/fwlink/?LinkID=397860

namespace ReservationManagementStudio.Controllers
{
    public class HomeController : Controller
    {
		private readonly AppSettings _appSettings;

		public HomeController(IOptions<AppSettings> appSettings)
		{
			_appSettings = appSettings.Value;
		}

        // GET: /Home/
        public IActionResult Index()
        {
			ViewBag.AppSettings = _appSettings;
            return View();
        }

		// GET: /Home/Error/
		public IActionResult Error()
		{
			return View();
		}
    }
}
