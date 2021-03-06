﻿using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using ReservationAPI;
using ReservationAPI.Models;

namespace ReservationAPI.Migrations
{
    [DbContext(typeof(ReservationAPIDataContext))]
    partial class ReservationAPIDataContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
            modelBuilder
                .HasAnnotation("ProductVersion", "1.1.0-rtm-22752");

            modelBuilder.Entity("ReservationAPI.Models.Company", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<int>("Employees");

                    b.Property<string>("Location");

                    b.Property<string>("Name");

                    b.HasKey("Id");

                    b.ToTable("Company");
                });

            modelBuilder.Entity("ReservationAPI.Models.Reservation", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<int?>("CompanyId");

                    b.Property<DateTime>("Date");

                    b.Property<int>("DayPart");

                    b.Property<int?>("RoomId");

                    b.Property<int>("Status");

                    b.HasKey("Id");

                    b.HasIndex("CompanyId");

                    b.HasIndex("RoomId");

                    b.ToTable("Reservation");
                });

            modelBuilder.Entity("ReservationAPI.Models.Room", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<int>("MaxAmount");

                    b.Property<string>("RoomDescription");

                    b.Property<int>("RoomNumber");

                    b.HasKey("Id");

                    b.ToTable("Room");
                });

            modelBuilder.Entity("ReservationAPI.Models.Reservation", b =>
                {
                    b.HasOne("ReservationAPI.Models.Company", "Company")
                        .WithMany()
                        .HasForeignKey("CompanyId");

                    b.HasOne("ReservationAPI.Models.Room", "Room")
                        .WithMany()
                        .HasForeignKey("RoomId");
                });
        }
    }
}
