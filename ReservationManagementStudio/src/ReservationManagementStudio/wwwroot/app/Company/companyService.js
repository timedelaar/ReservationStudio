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
        $http({
            method: "DELETE",
            url: appSettings.reservationServer + "Company/" + company.id
        })
        .then(function (response) {
            loadCompanies();
        });
    }

    function get(id) {
        return $http({
            method: "GET",
            url: appSettings.reservationServer + "Company/" + id
        })
            .then(function success(response) {
                return response.data;
            });


    }

    function changeCompany(company) {
        $http({
            method: "PUT",
            url: appSettings.reservationServer + "Company/" + company.id,
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
        get: get,
        getCompanies: function () { return companies; },
        clearCompanies: clearCompanies,
        addCompany: addCompany,
        deleteCompany: deleteCompany,
        changeCompany: changeCompany
    };
});