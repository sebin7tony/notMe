

angular.module('ionicView', ['ionic', 'ionicView.services','ionicView.controllers'])


.config(function($stateProvider, $urlRouterProvider) {
	
	$urlRouterProvider.otherwise('/app/home');
	
	$stateProvider.state('app', {
		url : '/app',
		abstract: true,
		templateUrl : 'templates/app.html'
	});
	
	$stateProvider.state('app.home', {
		url : '/home',
		views: {
	        'menuContent' :{
	          templateUrl: "templates/home.html"
	          //controller: 'categoryController'
	        }
	      }
	});
	
	$stateProvider.state('app.home-category', {
		url : '/home-category',
		views: {
	        'menuContent' :{
	          templateUrl: "templates/home-category.html"
	          //controller: 'categoryController'
	        }
	      }
	});
	
	$stateProvider.state('app.home-category-note', {
		url : '/home-category-note',
		views: {
	        'menuContent' :{
	          templateUrl: "templates/home-category-note.html"
	          //controller: 'categoryController'
	        }
	      }
	});
	
	$stateProvider.state('app.new-node', {
		url : '/new-node',
		views: {
	        'menuContent' :{
	          templateUrl: "templates/new-node.html"
	          //controller: 'categoryController'
	        }
	      }
	});
	
	
	$stateProvider.state('app.category', {
		url : '/category',
		views: {
	        'menuContent' :{
	          templateUrl: "templates/category-list.html"
	          //controller: 'categoryController'
	        }
	      }
	});
	
	$stateProvider.state('app.detail', {
		url : '/category/detail',
		views: {
	        'menuContent' :{
	          templateUrl: "templates/category-detail.html"
	          //controller: 'categoryController'
	        }
	      }
	});
	
});