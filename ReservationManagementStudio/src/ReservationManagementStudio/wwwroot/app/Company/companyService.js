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