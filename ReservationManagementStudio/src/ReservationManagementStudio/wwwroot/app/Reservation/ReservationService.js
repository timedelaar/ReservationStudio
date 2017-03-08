angular.module('ReservationStudio')
    .service('reservationService', function ($q, $http, $location) {

    	var reservations = [];

    	function loadReservations() {
    		$http.get(appSettings.reservationServer + "Reservation").then(function success(response) {
    			reservations = response.data;
    		});
    	}

    	function addReservation(reservation) {
    		$http({
    			method: "POST",
    			url: appSettings.reservationServer + "Reservation",
    			data: reservation
    		})
            .then(function (response) {
            	$location.path('/Reservation/');
            	loadReservations();
            });
    	}

    	function deleteReservation(id) {
    		$http({
    			method: "DELETE",
    			url: appSettings.reservationServer + "Reservation",
    			data: id
    		})
            .then(function (response) {
            	loadReservations();
            });
    	};

    	loadReservations();

    	function clearReservations() {
    		reservations = [];
    	}
    	return {
    		getReservations: function () { return reservations },
    		clearReservations: clearReservations,
    		addReservation: addReservation
    	}
    });