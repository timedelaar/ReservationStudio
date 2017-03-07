angular.module('ReservationStudio').directive("ngRoomDetails", function () {
    return {
        templateUrl: rootUrl + "Room/roomDetails.html",
        scope: {
            company: "="
        }
    }
});