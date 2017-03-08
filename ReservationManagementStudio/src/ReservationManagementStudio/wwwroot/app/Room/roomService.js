angular.module('ReservationStudio').service('roomService', function ($q, $http) {
    var rooms = [];
    function loadRooms() {
        $http.get("rooms.json").then(function success(response) {
            rooms = response.data.rooms;
            console.log(rooms);
        });
    }

    loadRooms();

    function clearRooms() {
        rooms = [];
    }
    return {
        getRooms: function () { return rooms },
        clearRooms: clearRooms
    }
})