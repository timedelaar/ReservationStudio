using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ReservationAPI.Models;

namespace ReservationAPI
{
    public class ReservationAPIDataContext : DbContext
    {
		public ReservationAPIDataContext(DbContextOptions<ReservationAPIDataContext> options) : base(options)
		{

		}

		public DbSet<Company> Companies { get; set; }

		public DbSet<Reservation> Reservations { get; set; }

		public DbSet<Room> Rooms { get; set; }
    }
}
