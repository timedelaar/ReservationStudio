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
			templateUrl: rootUrl + 'Room/Index.html',
			controller: 'RoomController',
			controllerAs: 'ctrl'
		})
		.otherwise({
			redirectTo: '/'
		});
	}
})();
angular.module('ReservationStudio').controller('companyController', function ($location, companyService) {
    var companyList = this;

    companyList.companies = function () {
        return companyService.getCompanies()
    };

    companyList.addCompany = function () {
        companyList.companies().push({ name: companyList.name, employees: companyList.employees, location: companyList.location });
        $('#confirmAddCompany').modal('hide');
        $('#confirmAddCompany').removeClass('modal-open');
        $('.modal-backdrop').remove();
        $location.path('/Company/');
        console.log(companyList.companies());
    };
});
angular.module('ReservationStudio').service('companyService', function ($q, $http) {
    var companies = [];
    function loadCompanies() {
        $http.get("companies.json").then(function success(response) {
            companies = response.data.companies;
            console.log(companies);
        });
    }

    loadCompanies();

    function clearCompanies() {
        companies = [];
    }
    return {
        getCompanies: function () { return companies },
        clearCompanies: clearCompanies
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