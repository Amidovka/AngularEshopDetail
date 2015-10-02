app.directive(
	'ngPhotogallery',
	function () {return {
		restrict: "E",
		templateUrl: "js/views/photogallery.html",
		controller: function ($scope) {

			// index aktualniho obrazku
			$scope.currentIndex = 0;
			
			// pole vsech src obrazku
			$scope.images = [];
			
			// ziskani vsech obrazku ze statickeho skryteho kodu
			angular.forEach(
				angular
					.element(document.getElementById('imgs'))
						.children('li'), 
				function(elm){
					var src = angular.element(elm)
						.children('img')
							.attr('src');
					$scope.images.push(src);
				}
			);
			
			$scope.isActive = function (index) {
				return $scope.currentIndex === index ? true : false;
			}
			
			$scope.prev = function () {
				$scope.currentIndex--;
				if ($scope.currentIndex < 0) {
					$scope.currentIndex = $scope.images.length - 1;
				}
				location.hash = '#photo-' + $scope.currentIndex;
			}
			
			
			$scope.next = function () {
				$scope.currentIndex++;
				if ($scope.currentIndex > $scope.images.length - 1) {
					$scope.currentIndex = 0;
				}
				location.hash = '#photo-' + $scope.currentIndex;
			}
			
			$scope.setIndex = function (i) {
				$scope.currentIndex = i;
				location.hash = '#photo-' + i;
			}
			
			window.onhashchange = function () {
				if(location.hash.indexOf('#photo-') === 0) {
					var indexStr = location.hash.replace(/[^0-9]/g, '');
					$scope.currentIndex = parseInt(indexStr, 10);
					$scope.$apply();
				}
			} 
			
			
		}
	}}
);