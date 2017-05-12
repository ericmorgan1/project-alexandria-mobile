angular.module('app.services', [])

.factory("BookFactory", ["$http", function($http){
	var __baseURL = "http://projectalexandria.net/api/v1";
	
	return {
		
		// Enum of reasons why two books are similar
		SimilarityReasons: {
			Topics: "topics",
			ExpertOpinions: "expert_opinions",
			Authors: "authors",
			Descriptions: "descriptions",
			WordChoice: "word_choice",
		},
		
		// Enum for the search mode you'd like to use
		SearchModes: {
			Author: "author",
			Title: "title"
		},
		
		// Search for books by title and/or author (returns 20 results). <mode> should be "title" or "author"
		// search: String query to search for
		// mode: SearchModes item for which search mode to use
		search: function(search, mode) {
			return (mode == this.SearchModes.Author) ? this.searchAuthor(search) : this.searchTitle(search);
		},
		
		// Search for books by author.
		// search: String query to search for
		searchAuthor: function(search) {
			var url = __baseURL + "/search?author=" + search;
			return $http.get(url).then(function(response) {
				return response.data.response;
			});
		},
		
		// Search for books by title.
		// search: String query to search for
		searchTitle: function(search) {
			var url = __baseURL + "/search?title=" + search;
			return $http.get(url).then(function(response) {
				return response.data.response;
			});
		},
		
		// Get information about a single book.
		// bookID: String id of the book.
		getBook: function(bookID) {
			var url = __baseURL + "/books/" + bookID;
			return $http.get(url).then(function(response) {
				return response.data;
			});
		},
		
		// Get information about a book's most similar "neighbors" (returns 5 neighbors).
		// bookID: String id of the book.
		getNeighbors: function(bookID) {
			var url = __baseURL + "/books/" + bookID + "/neighbors";
			return $http.get(url).then(function(response) {
				return response.data.response;
			});
		},

		// Returns an image for the book with the given ISBN.
		// isbn: String isbn of the book.
		getBookImage: function(isbn) {
			var url = "https://api.zo.la/v4/image/display?id=" + isbn;	//+ "&w=" + desiredWidth;	// TODO: Can request a certain width if you want
			return $http.get(url).then(function(response) {
				return response.config.url;
			});
		},
		
		// Returns an object with a "book" property from getBook() and an "image" property from "getBookImage()"
		// bookID: String id of the book.
		getBookWithImage: function(bookID) {
			var self = this;
			return this.getBook(bookID).then(function(book) {
				return self.getBookImage(book.isbn).then(function(imageURL) {
					return { "book": book, "imageURL": imageURL };
				});
			});
		},
		
		// Returns a displayable string for the given similarity reason
		getSimilarityReasonDisplayName: function(similarityReason) {
			switch(similarityReason) {
				case this.SimilarityReasons.Topics:				return "Topics";
				case this.SimilarityReasons.ExpertOpinions:		return "Expert Opinions";
				case this.SimilarityReasons.Authors:			return "Authors";
				case this.SimilarityReasons.Descriptions:		return "Descriptions";
				case this.SimilarityReasons.WordChoice:			return "Word Choice";
				default: 										return "";				
			}
		},
	};
}])








// Use this for testing. Results are hard-coded values from the API.
.factory('BookFactoryTest', ["$http", "$q", function($http, $q){
	
	var __baseURL = "";
	
	return {
		
		search: function(search) {
			// Return a hard-coded value from the actual API...
			var searchResults = JSON.parse("{\"response\": [{\"id\": \"a1d3aa80-3de2-4df1-a0d3-fd826c468764\", \"author\": \"Charles Dickens\", \"title\": \"The Pickwick Papers\"}, {\"id\": \"c5b78bdc-0259-4b3d-93d2-8831a67c9416\", \"author\": \"Victor Hugo, Charles Dickens, Victor Marie Hugo\", \"title\": \"The Hunchback of Notre-Dame\"}, {\"id\": \"02cb38f6-9119-4180-bb21-bcc05a4a5a22\", \"author\": \"Charles Dickens, Mizzou Media - University BookStores, Dickens, Robert Deas, Dwayne Hartford, Karen Kelly, Raintree Steck-Vaughn Staff\", \"title\": \"A Tale of Two Cities\"}, {\"id\": \"ac7de482-b0bf-4700-bfe3-76a81c5b2c9b\", \"author\": \"Charles Dickens, Harold Bloom, Dickens, Robert Douglas-Fairhurst, Tanika Gupta, Jan Fields, Kaplan, Kathy Acker, Lisa Mullarkey, V. A. Sharma, Barbara Field, Deborah Chiel, Frederick Davidson, Gavin Knight\", \"title\": \"Great Expectations\"}, {\"id\": \"19293164-9dce-4e13-8dee-10c36fe1e1f5\", \"author\": \"Charles Dickens\", \"title\": \"A Tale of Two Cities and Great Expectations (Oprah's Book Club)\"}, {\"id\": \"9a396996-e54d-4055-948f-bccca9fbf380\", \"author\": \"Charles Dickens\", \"title\": \"A Christmas Carol and Other Stories\"}, {\"id\": \"a26ca244-4dac-4653-b14f-894fc2e09d29\", \"author\": \"Charles Dickens\", \"title\": \"The Life and Adventures of Nicholas Nickleby\"}, {\"id\": \"9841dc17-8aa7-492b-8bfc-80d04509ee24\", \"author\": \"Charles Dickens\", \"title\": \"The Life of Our Lord\"}, {\"id\": \"73fbbdde-c9c0-42c2-87c0-1e935fe07ccf\", \"author\": \"Charles Dickens\", \"title\": \"The Old Curiosity Shop\"}, {\"id\": \"7044b66f-b81c-4f77-84e4-ec58cf29b09a\", \"author\": \"Charles Dickens\", \"title\": \"Little Dorrit\"}, {\"id\": \"e9887845-5124-40c3-b5a0-2401a4216cee\", \"author\": \"Charles Dickens\", \"title\": \"David Copperfield\"}, {\"id\": \"23890cf9-c548-46e0-bb65-87dce1eb4e7a\", \"author\": \"Charles Dickens, Morton D. Zabel\", \"title\": \"Bleak House\"}, {\"id\": \"a7fd2c4f-693d-41c9-be3b-a63abba8ece5\", \"author\": \"Charles Dickens, Sherri Browning Erwin\", \"title\": \"Grave Expectations\"}, {\"id\": \"e2c50fc7-6132-4806-ac6a-ad0e3fe6ddb9\", \"author\": \"Charles Dickens, Mizzou Media - University BookStores\", \"title\": \"The Mystery of Edwin Drood\"}, {\"id\": \"0e3464fa-657f-4814-8e74-b46288bd97ff\", \"author\": \"Charles Dickens, Anne De Graaf, S. N. Rizvi\", \"title\": \"Oliver Twist\"}, {\"id\": \"51abce66-1d21-49fc-8d2c-57ecc3000180\", \"author\": \"Charles Dickens, Andrew Sanders, Neil Bartlett, Chuck Fischer, Stephen Krensky\", \"title\": \"A Christmas Carol\"}, {\"id\": \"ac2d958d-83b4-4421-b655-9407de38b8f6\", \"author\": \"Charles Dickens, Paresh Saxena, Anne De Graaf, Jan Fields, Martin Jarvis, Jennifer Bassett\", \"title\": \"David Copperfield\"}, {\"id\": \"a1cee032-2992-4cde-9699-983a4db874d7\", \"author\": \"J.M. Barrie, Rod Espinosa, Roe Kendall, Alvin Granowsky, Lisa Mullarkey, Charles Dickens, Kenneth Grahame, J. M. Barrie, Michael Johnstone, Dalmatian Press\", \"title\": \"Peter Pan\"}, {\"id\": \"88cf6ef4-82f9-4ec3-b74f-6e60e9a338a5\", \"author\": \"Charles Dickens\", \"title\": \"A Tale of Two Cities and Great Expectations (Bantam Classics Editions)\"}, {\"id\": \"7b8c1f43-28eb-477f-b31c-fbcccd2c9c72\", \"author\": \"Charles Dickens\", \"title\": \"Sketches by Boz\"}]}");
			
			// Determine if you want a successful or failed promise...
			var deferred = $q.defer();
			(true) ? deferred.resolve(searchResults) : deferred.reject("Error in BookFactoryTest::search");
			return deferred.promise;
		},
		
		searchAuthor: function(search) {
			return this.search(search);
		},
		
		searchTitle: function(search) {
			return this.search(search);
		},
		
		getBook: function(bookID) {
			// Return hard-coded value from the actual API...
			var bookDetails = JSON.parse("{\"isbn\": \"9780099518884\", \"id\": \"a1d3aa80-3de2-4df1-a0d3-fd826c468764\", \"description\": \"<div>Tor Classics are affordably-priced editions designed to attract the young reader. Original dynamic cover art enthusiastically represents the excitement of each story. Appropriate reader friendly type sizes have been chosen for each title&#8212;offering clear, accurate, and readable text. All editions are complete and unabridged, and feature Introductions and Afterwords.<br><br>This edition of <i>The Pickwick Papers</i> includes a Foreword, Biographical Note, and Afterword by Nancy Springer. <br><br>The Pickwick Club was founded by the most learned minds in London for the purpose of making a scientific tour of the world. Its distinguished members include Mr. Samuel Pickwick, Esq., G.C.M.PC., <i>presiding;</i> Augustus Snodgrass; Nathaniel Winkle; and Tracy Tupman, Esq. Yet no sooner have these gentlemen begun their historic journey than they are set upon by a charming but notorious con man, Alfred Jingle. So begins a series of hilarious misadventures that takes the incorrigibly innocent Pickwicks wandering around England, coming in contact with some of the most colorful and comical characters in all fiction, including Dr. Slammer, Dismal Jemmy Hutley, Job Trotter, Wilkins Flasher, and Mr. Serjeant Buzfuz.<br><br>This was Dickens' first novel--and remains his funniest and most loved.<br></div>\", \"author\": \"Charles Dickens\", \"title\": \"The Pickwick Papers\"}");
			
			var deferred = $q.defer();
			deferred.resolve(bookDetails);
			return deferred.promise;
		},
		
		getNeighbors: function(bookID) {			
			// Return hard-coded value from the actual API...
			var neighbors = JSON.parse("{\"response\": [{\"id\": \"5d3845af-37ae-4779-8eee-1d795e9a562a\", \"top_similarity_reason\": \"word_choice\", \"similarity_explanation\": \"These books are connected due to similar topics and similar word choice.\", \"author\": \"Lautreamont\", \"title\": \"Maldoror and Poems\"}, {\"id\": \"7044b66f-b81c-4f77-84e4-ec58cf29b09a\", \"top_similarity_reason\": \"expert_opinions\", \"similarity_explanation\": \"These books are connected due to similar topics and expert opinions.\", \"author\": \"Charles Dickens\", \"title\": \"Little Dorrit\"}, {\"id\": \"9cb643e0-37ec-4a14-99d0-5361b782fcdc\", \"top_similarity_reason\": \"descriptions\", \"similarity_explanation\": \"These books are connected due to similar topics and similar book descriptions.\", \"author\": \"Edgar Allan Poe\", \"title\": \"A Collection of Stories\"}, {\"id\": \"a65e9758-960b-47ae-aef2-c7a15cb291d2\", \"top_similarity_reason\": \"expert_opinions\", \"similarity_explanation\": \"These books are connected due to expert opinions.\", \"author\": \"Arthur Conan Sir Doyle, Ralph Richardson, Arthur Conan Doyle, Orson Welles\", \"title\": \"Sherlock Holmes\"}, {\"id\": \"8471c1b7-8878-49ae-bfbe-497c68c86ea7\", \"top_similarity_reason\": \"expert_opinions\", \"similarity_explanation\": \"These books are connected due to expert opinions.\", \"author\": \"Haruki Murakami, Jay Rubin\", \"title\": \"After Dark\"}, {\"id\": \"65297de8-2fde-4f58-b464-a0c6f9e9610b\", \"top_similarity_reason\": \"descriptions\", \"similarity_explanation\": \"These books are connected due to similar book descriptions.\", \"author\": \"Arthur Conan Doyle\", \"title\": \"Sherlock: A Study in Scarlet\"}]}");
		
			// Get the promise...
			var deferred = $q.defer();
			deferred.resolve(neighbors);
			return deferred.promise;
		},
		
		getBookImage: function(isbn) {
			var url = "https://api.zo.la/v4/image/display?id=" + isbn;
				//+ "&w=" + desiredWidth;	// Can request a certain width
			return $http.get(url);
		},
		
		getBookWithImage: function(bookID) {
			var self = this;
			return this.getBook(bookID).then(function(book) {
				return self.getBookImage(book.isbn).then(function(image) {
					console.log("Obj");
					return { "book": book, "image": image };
				});
			});
		},
	};
}])