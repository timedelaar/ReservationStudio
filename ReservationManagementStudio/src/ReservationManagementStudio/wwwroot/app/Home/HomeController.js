(function () {
    'use strict';
    angular.module('ReservationStudio').controller('HomeController', ['AgendaService', 'reservationFactory', '$filter', '$uibModal', '$route', HomeController]);

    function HomeController($agenda, $reservation, $filter, $uibModal, $route) {
        var controller = this;

        controller.date = new Date(Date.now());
        controller.dates = [];
        controller.pickerOpen = false;
        controller.visibleDays = 7;
        controller.reservations = [];
        controller.searchRoomNumber = '';

        controller.filterRooms = filterRooms;
        controller.getReservation = getReservation;
        controller.openDatepicker = openDatepicker;
        controller.updateAgenda = updateAgenda;
        controller.viewReservation = viewReservation;

        init();

        function init() {
            updateAgenda();
        }

        function filterRooms(value, index, array) {
            if (!controller.searchRoom)
                return true;

            return value.room.roomDescription.toLowerCase().indexOf(controller.searchRoom.toLowerCase()) != -1;
        }

        function getDates() {
            controller.dates = [];
            for (var i = 0, numberOfDays = controller.visibleDays; i < numberOfDays; i++) {
                var date = new Date(controller.date);
                date.setDate(controller.date.getDate() + i);
                controller.dates.push(date);
            }
        }

        function getReservation(reservations, date) {
            var filteredReservations = $filter('filter')(reservations, function (value, index, array) {
                return date.toLocaleDateString() == new Date(value.date).toLocaleDateString();
            });
            var filledReservations = ['', '', ''];
            for (var i = 0; i < filteredReservations.length; i++) {
            	var reservation = filteredReservations[i];
            	filledReservations.splice(reservation.dayPart, 1, reservation);
            }
            return filledReservations;
        }

        function openDatepicker() {
            controller.pickerOpen = !controller.pickerOpen;
        }

        function updateAgenda() {
            getDates();
            $agenda.get(controller.date, controller.dates[controller.dates.length - 1]).then(function (reservations) {
                controller.reservations = reservations;
            });
        }

        function viewReservation(reservation, roomId, date, dayPart) {
        	var modalInstance = $uibModal.open({
        		templateUrl: '/app/Reservation/viewReservation.html',
        		controller: 'ViewReservationController',
        		controllerAs: 'ctrl',
        		resolve: {
        			companies: ['companyService', function ($companies) {
        				return $companies.getList();
        			}],
        			rooms: ['RoomService', function ($rooms) {
        				return $rooms.getList();
        			}],
        			reservation: function () {
        				return reservation;
        			},
        			roomId: function () {
        				return roomId;
        			},
        			date: function () {
        				return date;
        			},
        			dayPart: function () {
        				return dayPart;
        			}
        		}
        	});

        	modalInstance.result.then(function save(reservation) {
        		if (typeof (reservation.date) === 'string')
        			reservation.date = new Date(reservation.date);

        		if (angular.isDefined(reservation.id) && reservation.id !== null) {
        			$reservation.updateReservation(reservation).then(function () {
        				$route.reload();
        			});
        		}
        		else {
        			$reservation.addReservation(reservation).then(function () {
        				$route.reload();
        			});
        		}
        	});
        }
    }
})();