angular.module('ReservationStudio').controller('roomController', function ($location, roomService) {
    var roomList = this;

    roomList.rooms = function () {
        return roomService.getRooms()
    };

    roomList.addRoom = function () {
        roomList.rooms().push({ roomNumber: roomList.number, roomDescription: roomList.description, maxAmount: roomList.maxAmount });
        $('#confirmAddRoom').modal('hide');
        $('#confirmAddRoom').removeClass('modal-open');
        $('.modal-backdrop').remove();
        $location.path('/Room/');
        console.log(roomList.rooms());
    };
});