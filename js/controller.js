angular.module('RouteControllers', [])
    .controller('HomeController', function($scope) {
        $scope.title = "Welcome To Angular Todo!";
    })
    .controller('RegisterController', function($scope, $location, UserAPIService, store) {

        $scope.registrationUser = {};
        var URL = "https://morning-castle-91468.herokuapp.com/";

        $scope.login = function() {
            UserAPIService.callAPI(URL + "accounts/api-token-auth/", $scope.data).then(function(results){
                $scope.token = results.data.token;
                store.set('username', $scope.registrationUser.username);
                store.set('authToken', $scope.token);
                $location.path("/todo");
            }).catch(function(err) {
                console.log(err.data);
            });
        }

        $scope.submitForm = function() {
            if ($scope.registrationForm.$valid) {
                $scope.registrationUser.username = $scope.user.username;
                $scope.registrationUser.password = $scope.user.password;

                UserAPIService.callAPI(URL + "accounts/register/", $scope.registrationUser).then(function(results) {
                    $scope.data = results.data;
                    alert("You have successfully registered to Angular Todo");
                    store.set('username', $scope.registrationUser.username);
                    store.set('authToken', $scope.token);
                    if ($scope.data.username == $scope.registrationUser.username 
                        && $scope.data.password == $scope.registrationUser.password) {
                        
                        $scope.login();
                    }
                }).catch(function(err) {
                    console.log(err)
                    alert("Oops! Something went wrong!");
                });
            }
        }
    })
    .controller('LoginController', function($scope, $location, UserAPIService, store) {
        $scope.loginUser = {};
        var URL = "https://morning-castle-91468.herokuapp.com/";
        
        
        $scope.submitForm = function() {
            if ($scope.loginForm.$valid) {
                $scope.loginUser.username = $scope.user.username;
                $scope.loginUser.password = $scope.user.password;
                
            UserAPIService.callAPI(URL + 'accounts/api-token-auth/', $scope.loginUser).then(function(results) {
                    $scope.token = results.data.token;
                    store.set('username', $scope.loginUser.username);
                    store.set('authToken', $scope.token);
                
                    alert("You have successfully logged in as " + $scope.loginUser.username + "!");
                    $location.path("/todo");
                }).catch(function(err) {
                    console.log(err.data);
                    alert("Incorrect username or password!");
                });
            }
        };
    })
    .controller('LogoutController', function($scope, store) {
        store.remove('username');
        store.remove('authToken');
        
        $scope.status = "You have been logged out!";
    })
    .controller('TodoController', function($scope, $route, $location, TodoAPIService, store) {
        if (!store.get('authToken')) {
           $location.path("/accounts/register");
           alert("Please create an account, or login, to access your todo list!");
}

        var URL = "https://morning-castle-91468.herokuapp.com/";

        $scope.authToken = store.get('authToken');
        $scope.username = store.get('username');

        $scope.todo = {};

        $scope.editTodo = function(id) {
            $location.path("/todo/edit/" + id);
        };

        $scope.deleteTodo = function(id) {
            TodoAPIService.deleteTodo(URL + "todo/" + id, $scope.username, $scope.authToken).then(function(results) {
                $scope.todos = results.data;
                console.log(results);
            }).catch(function(err) {
                console.log(err);
            });
        };

       $scope.todos = [];

        TodoAPIService.getTodos(URL + "todo/", $scope.username, $scope.authToken).then(function(results) {
            $scope.todos = results.data;
            console.log($scope.todos);
        }).catch(function(err) {
            console.log(err);
        });

        $scope.submitForm = function() {
            if ($scope.todoForm.$valid) {
                $scope.todo.title = $scope.todo.title;
                $scope.todo.description = $scope.todo.description;
                $scope.todo.status = $scope.todo.status;
                $scope.todo.username = $scope.username;

                console.log($scope.todo.username)

                TodoAPIService.createTodo(URL + "todo/", $scope.todo, $scope.authToken).then(function(results) {
                    
                    $scope.todos.push($scope.todo);

                    console.log(results)
                }).catch(function(err) {
                    console.log(err)
                })
            }
        }
    })



    //controller for the editForm

    .controller('EditTodoController', function($scope, $location, $routeParams, TodoAPIService, store) {
        var id = $routeParams.id;
        var URL = "https://morning-castle-91468.herokuapp.com/";

        $scope.todos = [];

        $scope.submitForm = function() {
            if ($scope.todoForm.$valid) {
                $scope.todo.title = $scope.todo.title;
                $scope.todo.description = $scope.todo.description;
                $scope.todo.status = $scope.todo.status;
                $scope.todo.username = $scope.username;

                console.log($scope.todo.username)

                console.log(URL + "todo/" + id);

                TodoAPIService.editTodo(URL + "todo/" + id, $scope.todo, $scope.authToken).then(function(results) {
                    $location.path("/todo");
                    console.log(results)
                }).catch(function(err) {
                    console.log(err)
                })
            }
        }
    });
