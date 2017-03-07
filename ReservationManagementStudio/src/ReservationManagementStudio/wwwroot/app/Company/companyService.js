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