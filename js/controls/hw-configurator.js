app.directive(
	'ngHwConfigurator',
	function () {return {
		restrict: "E",
		templateUrl: "js/views/hw-configurator.html",
		controller: function ($scope, $http) {
			
			$scope.originPrice = 0;
			$scope.totalPrice = 0;
			
			$scope.hardware = {};
			
			$scope.form = document.getElementById("hardware");
			
			$scope.onDataHandler = function(response) {
				
				$scope.hardware = response.hardware;
				$scope.originPrice = response.price;
				$scope.totalPrice = response.price;
				$scope.productId = response.productId;
				
				angular.forEach(
					$scope.hardware, 
					$scope.initSelect
				)
			};
			
			$scope.initSelect = function(value, key) {
				$scope[key] = value[0].key;
				
				setTimeout(function(){
					$scope.form[key].value = value[0].key;
					$scope.$apply();
				});
				
				$scope.$watch(key, function(newVal, oldVal, $scope) {
					$scope.completePrice(
						key,
						newVal,
						oldVal
					);
				});
			};
			
			$scope.completePrice = function(key, newVal, oldVal) {
				
				// pricteni znovu vsech cen k puvodni cene od jeji puvodni hodnoty
				
				$scope.totalPrice = $scope.originPrice;
				
				for (var hwType in $scope.hardware) {
				
					// aktualni hodnota podle sablony ze selectu
					var currentHwKey = $scope[hwType];
					
					// $scope.hardware[hwType] -> pole vsech hodnot pro dany kus hardware
					$scope.hardware[hwType].map(function (item, hrdwrKey) {
						
						// item -> jeden radek nastaveni pro hardare
						if (item.key == currentHwKey) {
							$scope.totalPrice += item.price;
						}
					});
				}
			};
			
			$scope.submit = function ()
			{
				// poskladani hodnot
				var data = {
					productId: $scope.productId,
					hardwareKeys: ''
				};
				
				var hardwareKeys = [];
				for(var key in $scope.hardware) {
					hardwareKeys.push($scope[key]);
				}
				data.hardwareKeys = hardwareKeys.join(',');
				
				$http
					.post("?submit", data)
					.success(function (response, httpCode) {
						console.log(httpCode);
						if (httpCode) location.href = '.... routa pro košík';
					});
			}
			
			$http
				.get("data/configurations.js")
				.success($scope.onDataHandler)
				.error(function () {
					// pripad chyby ze serveru
				});
			
		}
	}}
);