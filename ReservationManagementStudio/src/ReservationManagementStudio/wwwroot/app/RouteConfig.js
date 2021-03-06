﻿(function () {
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
        .when("/Company/CompanyEdit/:id", {
            templateUrl: rootUrl + "Company/companyAdd.html",
            controller: "companyEditController",
            controllerAs: "companyList",
            resolve: {
                company: ["companyService", "$route", function ($company, $route) {
                    var id = parseInt($route.current.params.id);
                    return $company.get(id);
                }]
            }
        })
		.when('/Reservation/', {
			templateUrl: rootUrl + 'Reservation/reservations.html',
			controller: 'reservationController',
			//controllerAs: "ctrlReservation",
			//resolve: {
			//    reservations: ['ReservationService', function ($reservation) {
			//        return $reservation.getList();
			//    }]
			//}
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
		.when("/Room/RoomEdit/:id", {
			templateUrl: rootUrl + "Room/roomAdd.html",
			controller: "RoomEditController",
			controllerAs: "roomList",
			resolve: {
				room: ["RoomService", "$route", function ($rooms, $route) {
					var id = parseInt($route.current.params.id);
					return $rooms.get(id);
				}]
			}
		})
		.otherwise({
			redirectTo: '/'
		});
	}
})();