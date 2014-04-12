var aeCommerce = angular.module('aeCommerce', ['ngCookies','ngResource','ui.bootstrap','ngSanitize','App.filters'])
	.config(aeCommerceRouter);

function aeCommerceRouter ($routeProvider,$locationProvider,$provide) {
	$routeProvider
		.when('/', {
			templateUrl: './partials/home.html',
			controller: '',
			title : 'Home'
		 })
		 .when('/collections', {
			templateUrl: './partials/collections.html',
			controller: 'CollectionCtrl',
			title : 'Collections'
		 })
		 .when('/collections/:CollectionName', {
			templateUrl: './partials/collections.html',
			controller: 'CollectionCtrl',
			title : 'Collections'
		 })
		 .when('/product/:ProductName', {
			templateUrl: './partials/product.html',
			controller: 'ProductCtrl',
			title : 'Product'
		 })
		 .when('/cart', {
			templateUrl: './partials/cart.html',
			controller: '',
			title : 'Products'
		 })
		 .when('/confirm', {
			templateUrl: './partials/confirm.html',
			controller: '',
			title : 'Confirm Order'
		 })
		 .when('/thankyou', {
			templateUrl: './partials/thankyou.html',
			controller: '',
			title : 'Thankyou'
		 })
		 .when('/login', {
			templateUrl: './partials/login.html',
			controller: '',
			title : 'Login'
		 })
		 .when('/signup', {
			templateUrl: './partials/signup.html',
			controller: '',
			title : 'Signup'
		 })
		 .when('/page/:any', {
			templateUrl: './partials/page.html',
			controller: 'PageCtrl',
			title : 'Page Any'
		 })
		 .when('/:any', {
			templateUrl: './partials/404.html',
			controller: '',
			title : 'Page Not Found'
		 });
		 $locationProvider.html5Mode(true).hashPrefix('navigate');		 
}

aeCommerce.run(['$location', '$rootScope', function($location, $rootScope) {
    $rootScope.$on('$routeChangeSuccess', function (event, current, previous) {
        $rootScope.title = current.$$route.title;
    });
	
}]);
aeCommerce.directive('tagInput', function() {
	return {
		restrict: 'A',
		link: function(scope, element, attrs) {
			scope.inputWidth = 20;

			// Watch for changes in text field
			scope.$watch(attrs.ngModel, function(value) {
				if (value != undefined) {
					var tempEl = $('<span>' + value + '</span>').appendTo('body');
					scope.inputWidth = tempEl.width() + 5;
					tempEl.remove();
				}
			});

			element.bind('keydown', function(e) {
			console.log(e.which);
				if (e.which == 9) {
					e.preventDefault();
				}

				if (e.which == 8) {
					scope.$apply(attrs.deleteTag);
				}
			});

			element.bind('keyup', function(e) {
				var key = e.which;

				// Tab or Enter pressed 
				if (key == 188) {
					e.preventDefault();
					scope.$apply(attrs.newTag);
				}
			});
		}
	}
});

