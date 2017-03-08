angular.module('ReservationStudio').service('roomService', function ($q, $http, $location) {
    var rooms = [];
    function loadRooms() {
        $http.get(appSettings.reservationServer + "Room").then(function success(response) {
            rooms = response.data;
        });
    }
    loadRooms();

    function addRoom(room) {
        $http({
            method: "POST",
            url: appSettings.reservationServer + "Room",
            data: room
        })
        .then(function (response) {
            $location.path('/Room/');
            loadRooms();
        });
    }

    function changeRoom(room) {
        $http({
            method: "PUT",
            url: appSettings.reservationServer + "Room",
            data: room
        })
        .then(function (response) {
            $location.path('/Room/');
            loadRooms();
        });
    }

    function deleteRoom(id) {
        $http({
            method: "DELETE",
            url: appSettings.reservationServer + "Room",
            data: id
        })
        .then(function (response) {
            loadRooms();
        });
    };

    function clearRooms() {
        rooms = [];
    }
    return {
        getRooms: function () { return rooms },
        clearRooms: clearRooms,
        addRoom: addRoom
    }
})