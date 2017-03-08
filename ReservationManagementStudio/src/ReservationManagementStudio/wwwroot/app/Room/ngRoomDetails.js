angular.module('ReservationStudio').directive("ngRoomDetails", function () {
    return {
        templateUrl: rootUrl + "Room/roomDetails.html",
        scope: {
        	room: "="
        },
        require: "^ngController",
        link: function (scope, element, attrs, ctrl) {
        	scope.changeRoom = ctrl.changeRoom;
        	scope.deleteRoom = ctrl.deleteRoom;
        }
    }
});