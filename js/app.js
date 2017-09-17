angular.module('TodoApp', ['ngRoute', 'RouteControllers', 'UserService', 'angular-storage', 'TodoService', 'TodoDirective']);

angular.module('TodoApp').config(function($locationProvider, $routeProvider) {
    $locationProvider.html5Mode(true);
    $routeProvider.when('/', {
        templateUrl: 'templates/home.html',
        controller: 'HomeController'
    })
    .when('/accounts/register', {
        templateUrl: 'templates/register.html',
        controller: 'RegisterController'
    })
    .when('/accounts/login', {
        templateUrl: 'templates/login.html',
        controller: 'RegisterController'
    })

    .when('/accounts/logged-out', {
        templateUrl: 'templates/logged-out.html',
        controller: 'LogOutController'
    })

    .when('/todo', {
        templateUrl: 'templates/todo.html',
        controller: 'TodoController'
    })
    .when('/todo/edit/:id', {
        templateUrl:'templates/edit-todo.html',
        controller: 'EditTodoController'
    })
});