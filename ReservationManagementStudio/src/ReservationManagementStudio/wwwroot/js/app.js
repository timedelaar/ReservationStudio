var rootUrl = "/app/";

(function () {
	'use strict';

	angular.module('ReservationStudio', ['ngRoute', 'ui.bootstrap']);
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
			templateUrl: rootUrl + 'Company/company.html',
			controller: 'companyController',
			controllerAs: 'companyList'
		})
        .when("/Company/CompanyAdd", {
            templateUrl: rootUrl + "Company/companyAdd.html",
            controller: "companyController",
            controllerAs: "companyList"
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
			templateUrl: rootUrl + 'Room/room.html',
			controller: 'RoomController',
			controllerAs: 'roomList'
		})
		.when("/Room/RoomAdd", {
		    templateUrl: rootUrl + "Room/roomAdd.html",
		    controller: "RoomController",
		    controllerAs: "roomList"
		})
		.otherwise({
			redirectTo: '/'
		});
	}
})();
angular.module('ReservationStudio').controller('companyController', function (companyService) {
    var companyList = this;

    companyList.companies = function () {
        return companyService.getCompanies();
    };
    
    companyList.addCompany = function () {
        var company = {
            name: companyList.name,
            employees: companyList.employees,
            location: companyList.location
        };
        companyService.addCompany(company);

        $('#confirmAddCompany').modal('hide');
    };
});
angular.module('ReservationStudio').service('companyService', function ($q, $http, $location) {
    var companies = [];
    function loadCompanies() {
        $http.get(appSettings.reservationServer + "Company").then(function success(response) {
            companies = response.data;
        });
    }

    function addCompany(company) {
        $http({
            method: "POST",
            url: appSettings.reservationServer + "Company",
            data: company
        })
        .then(function (response) {
            $location.path('/Company/');
            loadCompanies();
        });
    }

    loadCompanies();

    function clearCompanies() {
        companies = [];
    }
    return {
        getCompanies: function () { return companies },
        clearCompanies: clearCompanies,
        addCompany: addCompany
    }
})
angular.module('ReservationStudio').directive("ngCompanyDetails", function () {
    return {
        templateUrl: rootUrl + "Company/companyDetails.html",
        scope: {
            company: "="
        }
    }
});
(function () {
	angular.module('ReservationStudio').service('AgendaService', ['$http', '$q', AgendaService]);

	function AgendaService($http, $q) {
		return {
			get: get
		};

		function get(startDate, endDate) {
			//return $http({
			//	method: 'GET',
			//	url: appSettings.reservationServer + 'Agenda'
			//}).then(function success(response) {
			//	return response.data;
			//});
			var reservations = [
				{
					room: {
						id: 1,
						roomNumber: '12'
					},
					reservations: [
						{
							id: 1,
							date: new Date('2017-03-7'),
							time: 0,
							company: {
								id: 12,
								name: 'Google is de pizza voor jou en mij'
							}
						},
						{
							id: 2,
							date: new Date('2017-03-7'),
							time: 1,
							company: {
								id: 12,
								name: 'Google'
							}
						},
						{
							id: 3,
							date: new Date('2017-03-7'),
							time: 2,
							company: {
								id: 12,
								name: 'Google'
							}
						}
					]
				},
				{
					room: {
						id: 2,
						roomNumber: '24'
					},
					reservations: [
						{
							id: 4,
							date: new Date('2017-03-7'),
							time: 0,
							company: {
								id: 12,
								name: 'Google'
							}
						},
						{
							id: 5,
							date: new Date('2017-03-7'),
							time: 2,
							company: {
								id: 12,
								name: 'Google'
							}
						},
					]
				}
			]

			return $q.when(reservations);
		}
	}
})();
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
angular.module('ReservationStudio').directive("ngRoomDetails", function () {
    return {
        templateUrl: rootUrl + "Room/roomDetails.html",
        scope: {
            company: "="
        }
    }
});
angular.module('ReservationStudio').controller('RoomController', function ($location, roomService) {
    var roomList = this;

    roomList.rooms = function () {
        return roomService.getRooms();
    };

    roomList.addRoom = function () {
        roomList.rooms().push({ roomNumber: roomList.number, roomDescription: roomList.description, maxAmount: roomList.maxAmount });
        $('#confirmAddRoom').modal('hide');
        $('#confirmAddRoom').removeClass('modal-open');
        $('.modal-backdrop').remove();
        $location.path('/Room/');
    };
});
angular.module('ReservationStudio').service('roomService', function ($q, $http) {
    var rooms = [];
    function loadRooms() {
        $http.get("rooms.json").then(function success(response) {
            rooms = response.data.rooms;
            console.log(rooms);
        });
    }

    loadRooms();

    function clearRooms() {
        rooms = [];
    }
    return {
        getRooms: function () { return rooms },
        clearRooms: clearRooms
    }
})