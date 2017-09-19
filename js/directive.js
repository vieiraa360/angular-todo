angular.module('TodoDirective',[]).directive('todoTable', function() {
  return {
    restrict: 'EA',    // EA -> element/attribute
    templateUrl: 'templates/directives/todo-table.html'
  };
})

angular.module('NavbarDirective').directive('my-navbar', function () {
   return {
     restrict: 'EA',
     templateUrl: 'templates/directives/navbar.html',
   };
});