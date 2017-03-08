angular.module('ReservationStudio').controller('RoomController', function (roomService) {
    var roomList = this;

    roomList.companies = function () {
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

    roomList.changeRoom = function () {
        var room = {
            id: roomList.room,
            roomNumber: roomList.roomNumber,
            roomDescription: roomList.roomDescription,
            maxAmount: roomList.maxAmount
        };
        roomService.changeRoom(room.id);
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
});
