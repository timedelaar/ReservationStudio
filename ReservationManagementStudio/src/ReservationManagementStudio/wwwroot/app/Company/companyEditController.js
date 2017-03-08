(function () {
    angular.module("ReservationStudio").controller("companyEditController", ["companyService", "company", function (companyService, company) {
        var controller = this;

        controller.id = company.id;
        controller.name = company.name;
        controller.employees = company.employees;
        controller.location = company.location;

        controller.addCompany = addCompany;

        function addCompany () {
            var company = {
                id: controller.id,
                name: controller.name,
                employees: controller.employees,
                location: controller.location
            };
            companyService.changeCompany(company);

            $('#confirmAddCompany').modal('hide');
        };
    }]);
})();