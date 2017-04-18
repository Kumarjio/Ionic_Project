angular.module('your_app_name.controllers', [])

.controller('AuthCtrl', function($scope, $ionicConfig) {

})

// APP
.controller('AppCtrl', function($scope, $ionicConfig) {

})

//LOGIN
.controller('LoginCtrl', function($scope, $state, $templateCache, $q, $rootScope) {
	Parse.initialize("fyqmax4vrwbtWzGtaVx2LFfqpBIfQLoIMmXCfseP", "t0A6APpX6jm6YFHEXq5vrQrZxeftmZBw5AufNvdt");
	console.log("initialize");
	$scope.user = {};
	$scope.doLogIn = function() {
		// console.log($scope.user.username);
		// console.log($scope.user.password);
		Parse.User.logIn($scope.user.username, $scope.user.password, {
		  success: function(user) {
		    $state.go('app.feeds-categories');
		  },
		  error: function(user, error) {
		    // The login failed. Check error to see why.
		    console.log("log in error");
		  }
		});
	}

	 
	// $scope.doLogIn = function(){
	// 	$state.go('app.feeds-categories');
	// };

	// // $scope.user = {};

	// // $scope.user.email = "";
	// // $scope.user.pin = "12345";

	// // We need this for the form validation
	// $scope.selected_tab = "";

	// $scope.$on('my-tabs-changed', function (event, data) {
	// 	$scope.selected_tab = data.title;
	// });

})

.controller('SignupCtrl', function($scope, $state, $ionicPopup) {
	// $scope.user = {};

	// $scope.user.email = "john@doe.com";

	// $scope.doSignUp = function(){
	// 	$state.go('app.feeds-categories');
	// };
	Parse.initialize("fyqmax4vrwbtWzGtaVx2LFfqpBIfQLoIMmXCfseP", "t0A6APpX6jm6YFHEXq5vrQrZxeftmZBw5AufNvdt");
	console.log("initialize");
	$scope.user = {};
	$scope.doSignUp = function() {

		if ($scope.user.password == $scope.user.confirmPassword) 
		{
			var user = new Parse.User();

			user.set("username", $scope.user.name);
			user.set("password", $scope.user.password);
			user.set("email", $scope.user.email);

			user.signUp(null, {
			  success: function(user) {
			    // Hooray! Let them use the app now.
			    console.log("signup successfully!");
			    $state.go('auth.login');
			  },
			  error: function(user, error) {
			  	console.log("signUp error!");
			    // Show the error message somewhere and let the user try again.
			    alert("Error: " + error.code + " " + error.message);
			  }
			});
		}
		else
		{
			var alertPopup = $ionicPopup.alert({
			 title: 'Password not match!',
			 template: 'Password not match!!!'
		   });

		   alertPopup.then(function(res) {
			 console.log('not match');
		   });
		}
	}

	
	// user.set("username", "my name");
	// user.set("password", "my pass");
	// user.set("email", "email@example.com");

	// other fields can be set just like with Parse.Object
	//user.set("phone", "415-392-0202");

	// user.signUp(null, {
	//   success: function(user) {
	//     // Hooray! Let them use the app now.
	//   },
	//   error: function(user, error) {
	//     // Show the error message somewhere and let the user try again.
	//     alert("Error: " + error.code + " " + error.message);
	//   }
	// });
})

.controller('ForgotPasswordCtrl', function($scope, $state) {
	$scope.recoverPassword = function(){
		$state.go('app.feeds-categories');
	};

	$scope.user = {};
})

.controller('RateApp', function($scope) {
	$scope.rateApp = function(){
		if(ionic.Platform.isIOS()){
			//you need to set your own ios app id
			AppRate.preferences.storeAppURL.ios = '1234555553>';
			AppRate.promptForRating(true);
		}else if(ionic.Platform.isAndroid()){
			//you need to set your own android app id
			AppRate.preferences.storeAppURL.android = 'market://details?id=ionFB';
			AppRate.promptForRating(true);
		}
	};
})

.controller('MapviewCtrl', function($scope, $ionicLoading) {

	$scope.posts = [{
    id: 0,
    title: 'Ben Sparrow',
    lat:"34",
    lng:'-81.1',
    price: '66'
  }, {
    id: 1,
    title: 'Max Lynx',
    lat:"34",
    lng:'-81.1',
    price: '88'
  }, {
    id: 2,
    title: 'Adam Bradleyson',
    lat:"34",
    lng:'-81.2',
    price: '89'
  }];

	$scope.info_position = {
		lat: 34.07493,
		lng: -81.381388
	};

	$scope.center_position = {
		lat: 34.07493,
		lng: -81.381388
	};

	$scope.my_location = "";

	$scope.$on('mapInitialized', function(event, map) {
		$scope.map = map;
	});


	$scope.searchMap=function(){
		alert("searching");
		

	};

	$scope.centerOnMe= function(){

		$scope.positions = [];

		$ionicLoading.show({
			template: 'Searching Nearby Posts...'
		});

		// with this function you can get the user’s current position
		// we use this plugin: https://github.com/apache/cordova-plugin-geolocation/
		navigator.geolocation.getCurrentPosition(function(position) {
			var pos = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
			$scope.current_position = {lat: pos.G,lng: pos.K};
			$scope.my_location = pos.G+", "+pos.K;
			$scope.map.setCenter(pos);
			$ionicLoading.hide();
		});
	};
})


.controller('SendMailCtrl', function($scope) {
	$scope.sendMail = function(){
		cordova.plugins.email.isAvailable(
			function (isAvailable) {
				// alert('Service is not available') unless isAvailable;
				cordova.plugins.email.open({
					to:      'envato@startapplabs.com',
					cc:      'hello@startapplabs.com',
					// bcc:     ['john@doe.com', 'jane@doe.com'],
					subject: 'Greetings',
					body:    'How are you? Nice greetings from IonFullApp'
				});
			}
		);
	};
})

.controller('MapsCtrl', function($scope, $ionicLoading) {

	$scope.info_position = {
		lat: 43.07493,
		lng: -89.381388
	};

	$scope.center_position = {
		lat: 43.07493,
		lng: -89.381388
	};

	$scope.my_location = "";

	$scope.$on('mapInitialized', function(event, map) {
		$scope.map = map;
	});

	$scope.centerOnMe= function(){

		$scope.positions = [];

		$ionicLoading.show({
			template: 'Loading...'
		});

		// with this function you can get the user’s current position
		// we use this plugin: https://github.com/apache/cordova-plugin-geolocation/
		navigator.geolocation.getCurrentPosition(function(position) {
			var pos = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
			$scope.current_position = {lat: pos.G,lng: pos.K};
			$scope.my_location = pos.G+", "+pos.K;
			$scope.map.setCenter(pos);
			$ionicLoading.hide();
		});
	};
})

.controller('AdsCtrl', function($scope, $ionicActionSheet, AdMob, iAd) {

	$scope.manageAdMob = function() {

		// Show the action sheet
		var hideSheet = $ionicActionSheet.show({
			//Here you can add some more buttons
			buttons: [
				{ text: 'Show Banner' },
				{ text: 'Show Interstitial' }
			],
			destructiveText: 'Remove Ads',
			titleText: 'Choose the ad to show',
			cancelText: 'Cancel',
			cancel: function() {
				// add cancel code..
			},
			destructiveButtonClicked: function() {
				console.log("removing ads");
				AdMob.removeAds();
				return true;
			},
			buttonClicked: function(index, button) {
				if(button.text == 'Show Banner')
				{
					console.log("show banner");
					AdMob.showBanner();
				}

				if(button.text == 'Show Interstitial')
				{
					console.log("show interstitial");
					AdMob.showInterstitial();
				}

				return true;
			}
		});
	};

	$scope.manageiAd = function() {

		// Show the action sheet
		var hideSheet = $ionicActionSheet.show({
			//Here you can add some more buttons
			buttons: [
			{ text: 'Show iAd Banner' },
			{ text: 'Show iAd Interstitial' }
			],
			destructiveText: 'Remove Ads',
			titleText: 'Choose the ad to show - Interstitial only works in iPad',
			cancelText: 'Cancel',
			cancel: function() {
				// add cancel code..
			},
			destructiveButtonClicked: function() {
				console.log("removing ads");
				iAd.removeAds();
				return true;
			},
			buttonClicked: function(index, button) {
				if(button.text == 'Show iAd Banner')
				{
					console.log("show iAd banner");
					iAd.showBanner();
				}
				if(button.text == 'Show iAd Interstitial')
				{
					console.log("show iAd interstitial");
					iAd.showInterstitial();
				}
				return true;
			}
		});
	};
})

// FEED
//brings all feed categories
.controller('FeedsCategoriesCtrl', function($scope, $http) {
	$scope.feeds_categories = [];

	$http.get('feeds-categories.json').success(function(response) {
		$scope.feeds_categories = response;
	});
})

//bring specific category providers
.controller('CategoryFeedsCtrl', function($scope, $http, $stateParams, $state) {
	$scope.category_sources = [];

	$scope.categoryId = $stateParams.categoryId;

	$http.get('feeds-categories.json').success(function(response) {
		console.log($scope.categoryId);
		var category = _.find(response, {id: $scope.categoryId});
		console.log(category);
		$scope.categoryTitle = category.title;
		$scope.category_sources = category.feed_sources;
	});
	$scope.add=function () {
    	console.log("save to new page ");
    	$state.go('app.newpost');
	}
})


.controller('NewPostCtrl', ['$scope', '$rootScope', '$ionicViewService', '$state', '$cordovaCamera', function($scope, $rootScope, $ionicViewService, $state $cordovaCamera) {
	Parse.initialize("fyqmax4vrwbtWzGtaVx2LFfqpBIfQLoIMmXCfseP", "t0A6APpX6jm6YFHEXq5vrQrZxeftmZBw5AufNvdt");

    $scope.ready = false;
    $scope.images = [];
    
    $rootScope.$watch('appReady.status', function() {
        console.log('watch fired '+$rootScope.appReady.status);
        if($rootScope.appReady.status) $scope.ready = true;
    });

    $scope.selImages = function() {
        
        window.imagePicker.getPictures(
            function(results) {
                for (var i = 0; i < results.length; i++) {
                    //alert.log('Image URI: ' + results[i]);
                    $scope.images.push(results[i]);
                }
                if(!$scope.$$phase) {
                    $scope.$apply();
                }
            }, function (error) {
                console.log('Error: ' + error);
            }
        );

    };

    $scope.formData = {};

    $scope.confirm = function() {
    	var currentUser = Parse.User.current();
		if (currentUser) {
			var post = new Parse.Object("Post");

			post.set("user", currentUser);
			post.set("title", $scope.formData.title);
			post.set("category", $scope.formData.category);
			post.set("description", $scope.formData.description);
			post.set("price", $scope.formData.price);

			// var path = $scope.images[0].getPath(); // "file:///mnt/sdcard/FileName.mp3"
			// var fileName = path.split("\\").pop();
			// if ($scope.images.length > 0)
			// {
			// 	var file = $scope.images[0];
			// 	var newFile = new Parse.File(fileName, file);
			// 	newFile.save({
			// 		success:function(){
			// 			console.log("success");
			// 		}, 
			// 		error:function(file, error){
			// 			console.log("fail");
			// 		}
			// 	}).then(function(theFile){
			// 		post.set("img", theFile);
			// 		post.save(null, {
			// 		  success: function(gameScore) {
			// 		    // Execute any logic that should take place after the object is saved.
			// 		    console.log('New object created with objectId: ' + post.id);
			// 		  },
			// 		  error: function(gameScore, error) {
			// 		    // Execute any logic that should take place if the save fails.
			// 		    // error is a Parse.Error with an error code and message.
			// 		    alert('Failed to create new object, with error code: ' + error.message);
			// 		  }
			// 		});
			// 	});
			// }
			//uploads images
			/*
			var pictures = [];
			for (var i=0; i<$scope.images.length; i++)
			{
				var file = $scope.images[i]; 
				var fileName = $scope.images[i].split("\\").pop();
				var newfile = new Parse.File(fileName, file);
				pictures.push(newfile);
			}
			*/
			
			//post.set("pictures", pictures);

			post.save(null, {
			  success: function(gameScore) {
			    // Execute any logic that should take place after the object is saved.
			    console.log('New object created with objectId: ' + post.id);
			    $ionicViewService.nextViewOptions({
				    disableBack: true
				});
			    $state.go('app.feeds-categories');
			  },
			  error: function(gameScore, error) {
			    // Execute any logic that should take place if the save fails.
			    // error is a Parse.Error with an error code and message.
			    alert('Failed to create new object, with error code: ' + error.message);
			  }
			});
		} else {
		    // show the signup or login page
		    $state.go('auth.walkthrough');
		}
    };
    
}])

//this method brings posts for a source provider
.controller('FeedEntriesCtrl', function($scope, $stateParams, $http, FeedList, $q, $ionicLoading, BookMarkService) {
	$scope.feed = [];

	var categoryId = $stateParams.categoryId,
			sourceId = $stateParams.sourceId;

	$scope.doRefresh = function() {

		$http.get('feeds-categories.json').success(function(response) {

			$ionicLoading.show({
				template: 'Loading entries...'
			});

			var category = _.find(response, {id: categoryId }),
					source = _.find(category.feed_sources, {id: sourceId });

			$scope.sourceTitle = source.title;

			FeedList.get(source.url)
			.then(function (result) {
				$scope.feed = result.feed;
				$ionicLoading.hide();
				$scope.$broadcast('scroll.refreshComplete');
			}, function (reason) {
				$ionicLoading.hide();
				$scope.$broadcast('scroll.refreshComplete');
			});
		});
	};

	$scope.doRefresh();

	$scope.bookmarkPost = function(post){
		$ionicLoading.show({ template: 'Post Saved!', noBackdrop: true, duration: 1000 });
		BookMarkService.bookmarkFeedPost(post);
	};
})

// SETTINGS
.controller('SettingsCtrl', function($scope, $ionicActionSheet, $state) {
	$scope.airplaneMode = true;
	$scope.wifi = false;
	$scope.bluetooth = true;
	$scope.personalHotspot = true;

	$scope.checkOpt1 = true;
	$scope.checkOpt2 = true;
	$scope.checkOpt3 = false;

	$scope.radioChoice = 'B';

	// Triggered on a the logOut button click
	$scope.showLogOutMenu = function() {

		// Show the action sheet
		var hideSheet = $ionicActionSheet.show({
			//Here you can add some more buttons
			// buttons: [
			// { text: '<b>Share</b> This' },
			// { text: 'Move' }
			// ],
			destructiveText: 'Logout',
			titleText: 'Are you sure you want to logout? This app is awsome so I recommend you to stay.',
			cancelText: 'Cancel',
			cancel: function() {
				// add cancel code..
			},
			buttonClicked: function(index) {
				//Called when one of the non-destructive buttons is clicked,
				//with the index of the button that was clicked and the button object.
				//Return true to close the action sheet, or false to keep it opened.
				return true;
			},
			destructiveButtonClicked: function(){
				//Called when the destructive button is clicked.
				//Return true to close the action sheet, or false to keep it opened.
				$state.go('auth.walkthrough');
			}
		});

	};
})

// TINDER CARDS
.controller('TinderCardsCtrl', function($scope, $http) {

	$scope.cards = [];


	$scope.addCard = function(img, name) {
		var newCard = {image: img, name: name};
		newCard.id = Math.random();
		$scope.cards.unshift(angular.extend({}, newCard));
	};

	$scope.addCards = function(count) {
		$http.get('http://api.randomuser.me/?results=' + count).then(function(value) {
			angular.forEach(value.data.results, function (v) {
				$scope.addCard(v.user.picture.large, v.user.name.first + " " + v.user.name.last);
			});
		});
	};

	$scope.addFirstCards = function() {
		$scope.addCard("https://dl.dropboxusercontent.com/u/30675090/envato/tinder-cards/left.png","Nope");
		$scope.addCard("https://dl.dropboxusercontent.com/u/30675090/envato/tinder-cards/right.png", "Yes");
	};

	$scope.addFirstCards();
	$scope.addCards(5);

	$scope.cardDestroyed = function(index) {
		$scope.cards.splice(index, 1);
		$scope.addCards(1);
	};

	$scope.transitionOut = function(card) {
		console.log('card transition out');
	};

	$scope.transitionRight = function(card) {
		console.log('card removed to the right');
		console.log(card);
	};

	$scope.transitionLeft = function(card) {
		console.log('card removed to the left');
		console.log(card);
	};
})


// BOOKMARKS
.controller('BookMarksCtrl', function($scope, $rootScope, BookMarkService, $state) {

	$scope.bookmarks = BookMarkService.getBookmarks();

	// When a new post is bookmarked, we should update bookmarks list
	$rootScope.$on("new-bookmark", function(event){
		$scope.bookmarks = BookMarkService.getBookmarks();
	});

	$scope.goToFeedPost = function(link){
		window.open(link, '_blank', 'location=yes');
	};
	$scope.goToWordpressPost = function(postId){
		$state.go('app.post', {postId: postId});
	};
})

// WORDPRESS
.controller('WordpressCtrl', function($scope, $http, $ionicLoading, PostService, BookMarkService) {
	$scope.posts = [];
	$scope.page = 1;
	$scope.totalPages = 1;

	$scope.doRefresh = function() {
		$ionicLoading.show({
			template: 'Loading posts...'
		});

		//Always bring me the latest posts => page=1
		PostService.getRecentPosts(1)
		.then(function(data){
			$scope.totalPages = data.pages;
			$scope.posts = PostService.shortenPosts(data.posts);

			$ionicLoading.hide();
			$scope.$broadcast('scroll.refreshComplete');
		});
	};

	$scope.loadMoreData = function(){
		$scope.page += 1;

		PostService.getRecentPosts($scope.page)
		.then(function(data){
			//We will update this value in every request because new posts can be created
			$scope.totalPages = data.pages;
			var new_posts = PostService.shortenPosts(data.posts);
			$scope.posts = $scope.posts.concat(new_posts);

			$scope.$broadcast('scroll.infiniteScrollComplete');
		});
	};

	$scope.moreDataCanBeLoaded = function(){
		return $scope.totalPages > $scope.page;
	};

	$scope.bookmarkPost = function(post){
		$ionicLoading.show({ template: 'Post Saved!', noBackdrop: true, duration: 1000 });
		BookMarkService.bookmarkWordpressPost(post);
	};

	$scope.doRefresh();
})

// WORDPRESS POST
.controller('WordpressPostCtrl', function($scope, post_data, $ionicLoading) {

	$scope.post = post_data.post;
	$ionicLoading.hide();

	$scope.sharePost = function(link){
		window.plugins.socialsharing.share('Check this post here: ', null, null, link);
	};
})


.controller('ImagePickerCtrl', function($scope, $rootScope, $cordovaCamera) {

	$scope.images = [];

	$scope.selImages = function() {

		window.imagePicker.getPictures(
			function(results) {
				for (var i = 0; i < results.length; i++) {
					console.log('Image URI: ' + results[i]);
					$scope.images.push(results[i]);
				}
				if(!$scope.$$phase) {
					$scope.$apply();
				}
			}, function (error) {
				console.log('Error: ' + error);
			}
		);
	};

	$scope.removeImage = function(image) {
		$scope.images = _.without($scope.images, image);
	};

	$scope.shareImage = function(image) {
		window.plugins.socialsharing.share(null, null, image);
	};

	$scope.shareAll = function() {
		window.plugins.socialsharing.share(null, null, $scope.images);
	};
})

;
