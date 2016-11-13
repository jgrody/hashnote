/* !!! IMPORTANT: Rename "mymodule" below and add your module to Angular Modules above. */

angular.module('app.filters', [])


.filter('dateFilter', ['$filter', function($filter){
    return function(date, format) {
        if (format === "dateOnly") {
          return $filter('date')(date, "M/d/yy");
        } else {
          return $filter('date')(date, "MMM dd, yy 'at' h:mm a");
        }
    };
}]);