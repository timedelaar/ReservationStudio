angular.module('ReservationStudio').directive("ngCompanyDetails", function () {
    return {
        templateUrl: rootUrl + "Company/companyDetails.html",
        scope: {
            company: "="
        }
    }
});