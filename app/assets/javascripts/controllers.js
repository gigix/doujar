function BookShelfCtrl($scope, $http) {
	$http.get('/bookshelf.json').success(function(data) {
		$scope.categories = data;
	});
}

function CollectionsCtrl($scope, $rootScope, $q) {
	function getBooks() {
		var deferred = $q.defer();
		DOUBAN.apikey = '00a4cdcd957a1d8901ee6968c06e589b'
		DOUBAN.getUserCollection({
		    uid: 'gigix',
			cat: 'book',
			startindex: 0,
			maxresults: 50,
		    callback: function(collections){
				var books = [];
				for(var i=0; i < collections.entry.length; i++) {
					var collection = collections.entry[i]
					var book = DOUBAN.parseSubject(collection['db:subject'])
					books.push({
						'douban_id': book.nid,
						'title': book.title,
						'isbn': book.attribute['isbn13'][0],
						'url': book.id,
						'cover_url': book.link.image
					});
				}
				deferred.resolve(books);
				$rootScope.$apply();
		    }
		});	
		return deferred.promise;
	};
	
	$scope.books = getBooks();	
}
