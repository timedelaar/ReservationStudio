(function () {
	angular.module('ReservationStudio').controller('ViewReservationController', ['$uibModalInstance', 'companies', 'rooms', 'reservation', 'roomId', 'date', 'dayPart', function ($uibModalInstance, companies, rooms, reservation, roomId, date, dayPart) {
		var controller = this;

		controller.companies = companies;
		controller.rooms = rooms;

		if (reservation) {
			controller.reservation = {
				id: reservation.id,
				companyId: reservation.company.id,
				roomId: reservation.room.id,
				date: reservation.date,
				dayPart: reservation.dayPart,
				status: reservation.status
			};
		}
		else {
			controller.reservation = {
				roomId: roomId,
				date: date,
				dayPart: dayPart
			};
		}

		controller.save = function () {
			$uibModalInstance.close(controller.reservation);
		};

		controller.cancel = function () {
			$uibModalInstance.dismiss('cancel');
		};
	}]);
})();