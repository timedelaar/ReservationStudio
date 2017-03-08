(function () {
	angular.module("ReservationStudio").controller("RoomEditController", ["RoomService", "room", function (RoomService, room) {
		var controller = this;

		controller.roomId = room.id;
		controller.roomNumber = room.roomNumber;
		controller.roomDescription = room.roomDescription;
		controller.maxAmount = room.maxAmount;

		controller.addRoom = addRoom;

		function addRoom() {
			var room = {
				id: controller.roomId,
				roomNumber: controller.roomNumber,
				roomDescription: controller.roomDescription,
				maxAmount: controller.maxAmount
			};
			RoomService.changeRoom(room);

			$('#confirmAddRoom').modal('hide');
		}
	}]);
})();