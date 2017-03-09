(function () {
    angular.module('ReservationStudio')
    .factory('reservationFactory', ['$http', function ($http) {

        var urlBase = appSettings.reservationServer + 'Reservation/';
        var reservationFactory = {};

        reservationFactory.getReservations = function () {
            return $http.get(urlBase);
        };

        reservationFactory.getReservation = function (id) {
            return $http.get(urlBase + id);
        };

        reservationFactory.addReservation = function (reservation) {
            return $http.post(urlBase, reservation);
        };

        reservationFactory.updateReservation = function (reservation) {
            return $http.put(urlBase + reservation.id, reservation)
        };

        reservationFactory.deleteReservation = function (id) {
            return $http.delete(urlBase + id);
        };

        return reservationFactory;
    }])
})();