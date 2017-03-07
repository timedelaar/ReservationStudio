angular.module('ReservationStudio').service('companyService', function ($q, $http) {
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