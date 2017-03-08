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
        .when("/Company/CompanyEdit", {
            templateUrl: rootUrl + "Company/companyAdd.html",
            controller: "companyController",
            controllerAs: "companyList"
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

    companyList.deleteCompany = function (company) {
        debugger;
        var selectedCompany = company;
        companyService.deleteCompany(selectedCompany);

        $('#confirmDeleteCompany').modal('hide');
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

    function deleteCompany(company) {
        debugger;
        $http({
            method: "DELETE",
            url: appSettings.reservationServer + "Company",
            data: company
        })
        .then(function (response) {
            loadCompanies();
        });
    }

    loadCompanies();

    function clearCompanies() {
        companies = [];
    }
    return {
        getCompanies: function () { return companies; },
        clearCompanies: clearCompanies,
        addCompany: addCompany,
        deleteCompany: deleteCompany
    };
});
angular.module('ReservationStudio').directive("ngCompanyDetails", function () {
    return {
        templateUrl: rootUrl + "Company/companyDetails.html",
        scope: {
            company: "="
        }
    };
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
angular.module('ReservationStudio')
    .controller('reservationController', ['$scope', '$window', 'reservationFactory', 'companyService', 'roomService',
        function ($scope, $window, reservationFactory, companyService, rommService) {


            $scope.reservations;
            $scope.companies = companyService.getCompanies();
            $scope.rooms = roomService.getRooms();

            function getReservations() {
                ReservationFactory.getReservations()
                    .then(function (response) {
                        $scope.reservations = response.data;
                    }, function (error) {
                        $window.alert('Unable to load reservation data: ' + error.message);
                    });
            }

            getReservations();

            //$scope.updateReservation = function (id) {
            //    var res;
            //    for (var i = 0; i < $scope.reservations.length; i++) {
            //        var currRes = $scope.reservations[i];
            //        if (currRes.ID === id) {
            //            res = currRes;
            //            break;
            //        }
            //    }

            //    ReservationFactory.updateReservation(res)
            //     .then(function (response) {
            //         $window.alert('Updated Reservation! Refreshing reservation list.');
            //     }, function (error) {
            //         $window.alert('Unable to update reservation: ' + error.message);
            //     });
            //};

            $scope.addReservation = function () {

                if($scope.newReservation.status !== 'Confirmed')

                ReservationFactory.addReservation($scope.newReservation)
                    .then(function (response) {
                        $window.alert('Inserted reservation! Refreshing reservation list.');
                        $scope.reservations.push(response.data);
                    }, function (error) {
                        $window.alert('Unable to insert reservation: ' + error.message);
                    });
            };

            //$scope.deleteReservation = function (id) {
            //    ReservationFactory.deleteReservation(id)
            //    .then(function (response) {
            //        $scope.status = 'Deleted reservation! Refreshing reservation list.';
            //        for (var i = 0; i < $scope.reservations.length; i++) {
            //            var res = $scope.reservations[i];
            //            if (res.ID === id) {
            //                $scope.reservations.splice(i, 1);
            //                break;
            //            }
            //        }
            //    }, function (error) {
            //        $window.alert('Unable to delete reservation: ' + error.message);
            //    });
            //};

        }]);


(function () {
    angular.module('ReservationStudio')
    .factory('reservationFactory', ['$http', function ($http) {

        var urlBase = appSettings.reservationServer + 'Reservation';
        var reservationFactory = {};

        reservationFactory.getReservations = function () {
            return $http.get(urlBase);
        };

        reservationFactory.getReservation = function (id) {
            return $http.get(urlBase + '/' + id);
        };

        reservationFactory.addReservation = function (reservation) {
            return $http.post(urlBase, reservation);
        };

        reservationFactory.updateReservation = function (reservation) {
            return $http.put(urlBase + '/' + reservation.ID, reservation)
        };

        reservationFactory.deleteReservation = function (id) {
            return $http.delete(urlBase + '/' + id);
        };

        return reservationFactory;
    }])
});
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
    })
angular.module('ReservationStudio').directive("ngRoomDetails", function () {
    return {
        templateUrl: rootUrl + "Room/roomDetails.html",
        scope: {
            room: "="
        }
    }
});
angular.module('ReservationStudio').controller('RoomController', function (roomService) {
    var roomList = this;

    roomList.companies = function () {
        return roomService.getRooms();
    };
    
    roomList.addRoom = function () {
        var room = {
            roomNumber: roomList.roomNumber,
            roomDescription: roomList.roomDescription,
            maxAmount: roomList.maxAmount
        };
        roomService.addRoom(room);

        $('#confirmAddRoom').modal('hide');
    };

    roomList.changeRoom = function () {
        var room = {
            id: roomList.room,
            roomNumber: roomList.roomNumber,
            roomDescription: roomList.roomDescription,
            maxAmount: roomList.maxAmount
        };
        roomService.changeRoom(room.id);
    }

    roomList.deleteRoom = function () {
        var room = {
            id: roomList.room,
            roomNumber: roomList.roomNumber,
            roomDescription: roomList.roomDescription,
            maxAmount: roomList.maxAmount
        };
        roomService.deleteRoom(room.id);
    }
});

angular.module('ReservationStudio').service('roomService', function ($q, $http, $location) {
    var rooms = [];
    function loadRooms() {
        $http.get(appSettings.reservationServer + "Room").then(function success(response) {
            rooms = response.data;
        });
    }
    loadRooms();

    function addRoom(room) {
        $http({
            method: "POST",
            url: appSettings.reservationServer + "Room",
            data: room
        })
        .then(function (response) {
            $location.path('/Room/');
            loadRooms();
        });
    }

    function changeRoom(room) {
        $http({
            method: "PUT",
            url: appSettings.reservationServer + "Room",
            data: room
        })
        .then(function (response) {
            $location.path('/Room/');
            loadRooms();
        });
    }

    function deleteRoom(id) {
        $http({
            method: "DELETE",
            url: appSettings.reservationServer + "Room",
            data: id
        })
        .then(function (response) {
            loadRooms();
        });
    };

    function clearRooms() {
        rooms = [];
    }
    return {
        getRooms: function () { return rooms },
        clearRooms: clearRooms,
        addRoom: addRoom
    }
})