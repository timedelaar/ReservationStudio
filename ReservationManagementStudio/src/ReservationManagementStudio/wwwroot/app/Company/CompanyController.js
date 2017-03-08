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

    companyList.deleteCompany = function () {
        var company = {
            id: companyList.company,
            name: companyList.name,
            employees: companyList.employees,
            location: companyList.location
        };
        companyService.deleteCompany(company.id);
    }
});