(function () {
    angular.module("ReservationStudio").controller("companyEditController", ["companyService", "company", function (companyService, company) {
        var controller = this;

        controller.id = id;
        controller.name = company.name;
        controller.employees = company.employees;
        controller.location = company.location;
    }]);
})