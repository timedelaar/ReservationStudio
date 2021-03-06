﻿angular.module('ReservationStudio')
    .controller('reservationController', ['$scope', '$window', 'reservationFactory', 'companyService', 'RoomService',
        function ($scope, $window, ReservationFactory, companyService, roomService) {
        	$scope.dayPartEnum = ["Morning", "Afternoon", "Evening"];
        	$scope.statusEnum = ["Pending", "Confirmed", "Canceled"];

            $scope.reservations;
            companyService.getList().then(function (companies) {
            	$scope.companies = companies;
            });
            roomService.getList().then(function (rooms) {
            	$scope.rooms = rooms;
            });

            function getReservations() {
                ReservationFactory.getReservations()
                    .then(function (response) {
                        $scope.reservations = response.data;
                    });
            }

            getReservations();

            //$scope.updateReservation = function (id) {
            //    var res;
            //    for (var i = 0; i < $scope.reservations.length; i++) {
            //        var currRes = $scope.reservations[i];
            //        if (currRes.ID === id) {
            //            res = currRes;
            //            break;
            //        }
            //    }

            //    ReservationFactory.updateReservation(res)
            //     .then(function (response) {
            //         $window.alert('Updated Reservation! Refreshing reservation list.');
            //     }, function (error) {
            //         $window.alert('Unable to update reservation: ' + error.message);
            //     });
            //};

            $scope.addReservation = function () {

                if($scope.newReservation.status !== 'Confirmed')

                ReservationFactory.addReservation($scope.newReservation)
                    .then(function (response) {
                        getReservations();
                    });
            };

            //$scope.deleteReservation = function (id) {
            //    ReservationFactory.deleteReservation(id)
            //    .then(function (response) {
            //        $scope.status = 'Deleted reservation! Refreshing reservation list.';
            //        for (var i = 0; i < $scope.reservations.length; i++) {
            //            var res = $scope.reservations[i];
            //            if (res.ID === id) {
            //                $scope.reservations.splice(i, 1);
            //                break;
            //            }
            //        }
            //    }, function (error) {
            //        $window.alert('Unable to delete reservation: ' + error.message);
            //    });
            //};

        }]);

