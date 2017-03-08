(function () {
	angular.module('ReservationStudio').service('AgendaService', ['$http', '$q', AgendaService]);

	function AgendaService($http, $q) {
		return {
			get: get
		};

		function get(startDate, endDate) {
			//return $http({
			//	method: 'GET',
			//	url: appSettings.reservationServer + 'Agenda'
			//}).then(function success(response) {
			//	return response.data;
			//});
			var reservations = [
				{
					room: {
						id: 1,
						roomNumber: '12'
					},
					reservations: [
						{
							id: 1,
							date: new Date('2017-03-7'),
							time: 0,
							company: {
								id: 12,
								name: 'Google is de pizza voor jou en mij'
							}
						},
						{
							id: 2,
							date: new Date('2017-03-7'),
							time: 1,
							company: {
								id: 12,
								name: 'Google'
							}
						},
						{
							id: 3,
							date: new Date('2017-03-7'),
							time: 2,
							company: {
								id: 12,
								name: 'Google'
							}
						}
					]
				},
				{
					room: {
						id: 2,
						roomNumber: '24'
					},
					reservations: [
						{
							id: 4,
							date: new Date('2017-03-7'),
							time: 0,
							company: {
								id: 12,
								name: 'Google'
							}
						},
						{
							id: 5,
							date: new Date('2017-03-7'),
							time: 2,
							company: {
								id: 12,
								name: 'Google'
							}
						},
					]
				}
			]

			return $q.when(reservations);
		}
	}
})();