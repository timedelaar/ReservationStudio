angular.module('ReservationStudio').service('roomService', function ($q, $http) {
    var rooms = [];
    function loadCompanies() {
        $http.get("rooms.json").then(function success(response) {
            rooms = response.data.rooms;
            console.log(rooms);
        });
    }

    loadCompanies();

    function clearCompanies() {
        rooms = [];
    }
    return {
        getCompanies: function () { return rooms },
        clearCompanies: clearCompanies
    }
})