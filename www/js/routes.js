angular.module('app.routes', [])

.config(function($stateProvider, $urlRouterProvider) {

	// Ionic uses AngularUI Router which uses the concept of states
	// Learn more here: https://github.com/angular-ui/ui-router
	// Set up the various states which the app can be in.
	// Each state's controller can be found in controllers.js
	$stateProvider

		// Main search page...
		.state('search', {
			url: '/search',
			templateUrl: 'templates/search.html',
			controller: 'searchCtrl'
		})
		
		// Page for details on each book...
		.state('bookDetails', {
			url: '/bookDetails',
			params: { bookID: "" },
			templateUrl: 'templates/bookDetails.html',
			controller: 'bookDetailsCtrl'
		})
		
		.state('graph', {
			url: '/graph',
			templateUrl: 'templates/graph.html',
			controller: 'graphCtrl'
		})
		
		.state('about', {
			url: '/about',
			templateUrl: 'templates/about.html',
			controller: 'aboutCtrl'
		})

		$urlRouterProvider.otherwise('/search')
});