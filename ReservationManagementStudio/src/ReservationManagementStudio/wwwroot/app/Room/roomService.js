angular.module('ReservationStudio').service('RoomService', function ($q, $http, $location) {
    var rooms = [];
    function loadRooms() {
        $http.get(appSettings.reservationServer + "Room").then(function success(response) {
            rooms = response.data;
        });
    }
    loadRooms();

    function get(id) {
    	return $http({
    		method: "GET",
    		url: appSettings.reservationServer + "Room/" + id
    	}).then(function success(response) {
    		return response.data;
    	});
    }

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
            url: appSettings.reservationServer + "Room/" + room.id,
            data: { room: room }
        })
        .then(function (response) {
            $location.path('/Room/');
            loadRooms();
        });
    }

    function deleteRoom(id) {
        $http({
            method: "DELETE",
            url: appSettings.reservationServer + "Room/" + id
        })
        .then(function (response) {
            loadRooms();
        });
    };

    function clearRooms() {
        rooms = [];
    }

    return {
		get: get,
        getRooms: function () { return rooms },
        clearRooms: clearRooms,
        addRoom: addRoom,
        changeRoom: changeRoom,
		deleteRoom: deleteRoom
    }
})