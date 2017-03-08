angular.module('ReservationStudio').controller('RoomController', ["RoomService", function (roomService) {
    var roomList = this;

    roomList.getRooms = function () {
        return roomService.getRooms();
    };
    
    roomList.addRoom = function () {
        var room = {
            roomNumber: roomList.roomNumber,
            roomDescription: roomList.roomDescription,
            maxAmount: roomList.maxAmount
        };
        roomService.addRoom(room);

        $('#confirmAddRoom').modal('hide');
    };

    roomList.changeRoom = function (room) {
        roomService.changeRoom(room);
    }

    roomList.deleteRoom = function () {
        var room = {
            id: roomList.room,
            roomNumber: roomList.roomNumber,
            roomDescription: roomList.roomDescription,
            maxAmount: roomList.maxAmount
        };
        roomService.deleteRoom(room.id);
    }
}]);
