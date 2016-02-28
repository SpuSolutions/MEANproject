
//ngRoute to use $routeProvider
var app = angular.module('Vidzy', ['ngResource','ngRoute']);


// Here, we have a dependency on $routeProvider, which is a service defined in the ngRoute module

app.config(['$routeProvider', function($routeProvider){
	$routeProvider
	.when('/', {
		templateUrl: 'partials/home.html',
		controller: 'HomeCtrl'
	})
	.when('/add-video', {
		templateUrl: 'partials/video-form.html',
		controller: 'AddVideoCtrl'
	})
	.otherwise({
		redirectTo: '/'
	});
}]);


//Here, we’re specifying a dependency to $scope and $resource. Both of these are built-in Angular services, 
//and that’s why they are prefixed with a $ sign. 
//We’ll use $scope to pass data to the view and 
//$resource to consume a RESTful API.

app.controller('HomeCtrl',['$scope','$resource', function($scope, $resource){
	var Videos = $resource('/api/videos');
	Videos.query(function(videos){
		$scope.videos = videos;
	})

}]);

app.controller('AddVideoCtrl',['$scope', '$resource', '$location', function($scope,$resource, $location){
	$scope.save = function(){
		var Videos = $resource('/api/videos');
		Videos.save($scope.video, function(){
			$location.path('/');
		});
	};
}]);