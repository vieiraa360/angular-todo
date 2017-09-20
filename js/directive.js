angular.module('TodoDirective',[]).directive('todoTable', function() {
  return {
    restrict: 'EA',    // EA -> element/attribute
    templateUrl: 'templates/directives/todo-table.html'
  };
})

angular.module('NavbarDirective', []).directive('myNavbar', function() {
   return {
     restrict: 'EA',
     templateUrl: 'templates/directives/my-navbar.html',
   };
})
 
angular.module('FooterDirective', []).directive('myFooter', function() {
	return {
	 restrict: 'EA',
	 templateUrl: 'templates/directives/my-footer.html',
  	};
});