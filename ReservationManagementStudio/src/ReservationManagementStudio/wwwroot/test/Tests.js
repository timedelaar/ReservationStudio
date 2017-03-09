var appSettings = {
	reservationServer: "localhost:53231/api/"
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

describe("Tests: CompanyService", function () {
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

	it("gets all companies", function () {
		var result;
		CompanyService.getList().then(function (companies) {
			result = companies;
		});
		httpBackend.flush();
		expect(result.length).toBe(3);
	});
});