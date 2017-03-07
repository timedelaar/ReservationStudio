angular.module('ReservationStudio').controller('companyController', function ($location, companyService) {
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
        $('#confirmAddCompany').removeClass('modal-open');
        $('.modal-backdrop').remove();
        $location.path('/Company/');
    };

        //companyList.companies().push({ name: companyList.name, employees: companyList.employees, location: companyList.location });
});