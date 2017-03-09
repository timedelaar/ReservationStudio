var appSettings = {
	reservationServer: "localhost:52321/api/"
}

describe("Tests: RoomService", function () {
	var base = appSettings.reservationServer;

	var RoomService, httpBackend;

	beforeEach(function () {
		module("ReservationStudio");

		inject(function (_RoomService_, $httpBackend) {
			RoomService = _RoomService_;
			httpBackend = $httpBackend;

			httpBackend.when("GET", base + "Room").respond([{}, {}, {}]);
		});
	});

	it("gets all rooms", function () {
		var result;
		RoomService.getList().then(function (rooms) {
			result = rooms;
		});
		httpBackend.flush();
		expect(result.length).toBe(3);
	});
});

describe("Tests: ReservationService", function () {
	var base = appSettings.reservationServer;

	var CompanyService, httpBackend;
    
	beforeEach(function () {
		module("ReservationStudio");

		inject(function (_companyService_, $httpBackend) {
			CompanyService = _companyService_;
			httpBackend = $httpBackend;

			httpBackend.when("GET", base + "Company").respond([{}, {}, {}]);
		});
	});

	it("gets all reservations", function () {
		var result;
		CompanyService.getList().then(function (reservations) {
			result = reservations;
		});
		httpBackend.flush();
		expect(result.length).toBe(3);
	});
});