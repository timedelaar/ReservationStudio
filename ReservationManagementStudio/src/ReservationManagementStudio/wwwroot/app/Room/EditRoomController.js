(function () {
	angular.module("ReservationStudio").controller("RoomEditController", ["RoomService", "room", function (RoomService, room) {
		var controller = this;

		controller.roomId = room.id;
		controller.roomNumber = room.roomNumber;
		controller.roomDescription = room.roomDescription;
		controller.maxAmount = room.maxAmount;

		controller.addRoom = addRoom;

		function addRoom() {

		}
	}]);
})();