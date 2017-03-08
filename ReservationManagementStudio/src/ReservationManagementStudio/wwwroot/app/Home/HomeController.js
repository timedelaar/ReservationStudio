(function () {
    'use strict';
    angular.module('ReservationStudio').controller('HomeController', ['AgendaService', '$filter', HomeController]);

    function HomeController($agenda, $filter) {
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
            if (!controller.searchRoomNumber)
                return true;

            return value.room.roomNumber.indexOf(controller.searchRoomNumber) != -1;
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
                return date.toLocaleDateString() == value.date.toLocaleDateString();
            });
            if (filteredReservations.length < 3) {
                for (var i = 0, num = 3 - filteredReservations.length; i < num; i++) {
                    filteredReservations.push('');
                }
            }
            return filteredReservations;
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

        function viewReservation(reservation, time) {
            console.log('reservation', reservation);
            console.log('time:' + time);
        }
    }
})();