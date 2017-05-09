angular.module('app.controllers', [])

// TODO: services.js: Get a better testing framework and remove BookFactoryTest
// TODO: services.js: Should we cache the queries?
// TODO: controllers.js: Use loading spinners for async calls maybe
// TODO: controllers.js: Better error handling (rather than just logging to console)
// TODO: controllers.js: If you want, you can load the book details and image separately (could be a little faster)
// TODO: search.html: Animation is really slow
// TODO: search.html: Use the actual logo from the website
// TODO: bookDetails.html: Clean up UI
// TODO: templates: Use color-theme from website, logo, etc.
// TODO: resources/icon.png: Get an icon for mobile app
// TODO: resources/splash.png: Get a splash screen for mobile app

// Controller for search page...
.controller('searchCtrl', ['$scope', 'BookFactory', function ($scope, BookFactory) {
	// Setup variables...
	$scope.data = {};
	$scope.data.searchQuery = "";							// Default search query
	$scope.data.searchMode = BookFactory.SearchModes.Title;	// Default search mode
	$scope.data.searchOptions = { debounce: 20 };			// Delay (in ms) before calling $watch on searchQuery
	$scope.books = [];										// Array of book objects to display as search resutls
	
	// Sets the search mode and updates the search. Should be "title" or "author".
	$scope.setSearchMode = function(mode) { 
		$scope.data.searchMode = mode; 
		$scope.doSearch(); 
	};
	
	// When search result changes, update the search...
	$scope.$watch("data.searchQuery", function(value) {
		if (value) { $scope.doSearch(); }
	});
	
	// Searches for books based on the current query and the current search mode
	$scope.doSearch = function(query) {
		BookFactory.search($scope.data.searchQuery, $scope.data.searchMode).then(function(books) {
			$scope.books = books;			
		}, function(error) { console.log(error); });
	};
}])

// Controller for bookDetails page...
.controller('bookDetailsCtrl', ['$scope', '$stateParams', 'BookFactory', function ($scope, $stateParams, BookFactory) {
	// Initialize controller...
	$scope.init = function() {
		// Load the book and image...
		BookFactory.getBookWithImage($stateParams.bookID).then(function(response) {
			$scope.book = response.book;
			$scope.bookImage = response.imageURL;
		}, function(error) { console.log(error); });
		
		// Load neighbors...
		BookFactory.getNeighbors($stateParams.bookID).then(function(neighbors) {
			$scope.neighbors = neighbors;
		}, function(error) { console.log(error); });
	};
	
	// Initialize when view is entered...
	$scope.$on('$ionicView.afterEnter', function(event)  { $scope.init(); });
}])
   
.controller('graphCtrl', ['$scope', '$stateParams', function ($scope, $stateParams) {}])
 