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