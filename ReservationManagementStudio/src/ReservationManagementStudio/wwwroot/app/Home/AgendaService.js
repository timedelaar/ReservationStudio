(function () {
	angular.module('ReservationStudio').service('AgendaService', ['$http', AgendaService]);

	function AgendaService($http) {
		return {
			get: get
		};

		function get(startDate, endDate) {
			return $http({
				method: 'GET',
				url: appSettings.reservationServer + 'Agenda',
				params: { startDate: startDate, endDate: endDate }
			}).then(function success(response) {
				return response.data;
			});
		}
	}
})();