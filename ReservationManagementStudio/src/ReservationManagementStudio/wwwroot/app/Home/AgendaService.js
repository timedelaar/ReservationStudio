(function () {
	angular.module('ReservationStudio').service('AgendaService', ['$http', AgendaService]);

	function AgendaService($http) {
		return {
			get: get
		};

		function get() {
			return $http({
				method: 'GET',
				url: appSettings.reservationServer + 'Agenda'
			}).then(function success(response) {
				return response.data;
			});
		}
	}
})();