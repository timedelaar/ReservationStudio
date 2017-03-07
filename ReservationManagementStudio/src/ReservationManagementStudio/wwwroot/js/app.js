var rootUrl = "/app/";

(function () {
	'use strict';

	angular.module('ReservationStudio', ['ngRoute']);
})();
(function () {
	'use strict';
	angular.module('ReservationStudio').config(['$routeProvider', routeConfig]);

	function routeConfig($routeProvider) {
		$routeProvider
		.when('/', {
			templateUrl: rootUrl + 'Home/Index.html',
			controller: 'HomeController',
			controllerAs: 'ctrl'
		})
		.when('/Company/', {
			templateUrl: rootUrl + 'Company/Index.html',
			controller: 'CompanyController',
			controllerAs: 'ctrl'
		})
		.when('/Reservation/', {
			templateUrl: rootUrl + 'Reservation/Index.html',
			controller: 'ReservationController',
			controllerAs: 'ctrl',
			resolve: {
				reservations: ['ReservationService', function ($reservation) {
					return $reservation.getList();
				}]
			}
		})
		.when('/Room/', {
			templateUrl: rootUrl + 'Room/Index.html',
			controller: 'RoomController',
			controllerAs: 'ctrl'
		})
		.otherwise({
			redirectTo: '/'
		});
	}
})();
(function () {
	angular.module('ReservationStudio').controller('CompanyController', [companyController]);

	function companyController() {

	}
})();
(function () {
	'use strict';
	angular.module('ReservationStudio').controller('HomeController', [HomeController]);

	function HomeController() {
	}
})();
(function () {
	angular.module('ReservationStudio').controller('ReservationController', ['reservations', reservationController]);

	function reservationController(reservations) {
		var controller = this;

		controller.reservations = reservations;
	}
})();
(function () {
	angular.module('ReservationStudio').service('ReservationService', ['$http', reservationService]);

	function reservationService($http) {
		function getList() {
			return $http({
				method: 'GET',
				url: appSettings.reservationServer + 'Reservation'
			}).then(function success(response) {
				return response.data;
			});
		}

		return {
			getList: getList
		};
	}
})();
(function () {
	angular.module('ReservationStudio').controller('RoomController', [roomController]);

	function roomController() {

	}
})();