(function () {
	angular.module('ReservationStudio').service('AgendaService', ['$http', '$q', AgendaService]);

	function AgendaService($http, $q) {
		return {
			get: get
		};

		function get(startDate, endDate) {
			return $http({
				method: 'GET',
				url: appSettings.reservationServer + 'Agenda'
			}).then(function success(response) {
				return response.data;
			});
		}
	}
})();