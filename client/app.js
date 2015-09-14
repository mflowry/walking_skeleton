//the control center for the server

//Create an Anglular module; app references how we define it in the html declaration; there can only be one app
var app = angular.module('app', []);//app is an obj

//Create a new controller, set the scope of the controller to the div "IndexController"; controller is a method of the app obj
//in [] pass in scope and http metadata as a string for minification
//pass $scope and $http into the callback function
app.controller("IndexController", ['$scope', '$http', function($scope, $http){
    $scope.cat = {};//initialize the cat object
    $scope.cats = [];//iniitalize the cats array

    //function to fetch list of cats from database; response will be saved in fetchCats
    //function declared without scope b/c it is only available to the JS, not Angular html
    var fetchCats = function(){
        //return the result of an AJAX call to the /cats route
        return $http.get('/cats').then(function(response){
            //if status is not okay(200) throw an error in client console
            if (response.status !== 200){
                throw new Error ('Failed to fetch cats from the API');
            }
            //re-initialize the cat object to empty
            $scope.cat = {};
            //set cats array = the response from the database
            $scope.cats = response.data;
            //make the response data available to fetchCats
            return response.data;
        });
    };
    //Angular function to add a new cat to db; a method of the controller
    $scope.add = function(cat){
        //use AJAX to post to the /add route
        return $http.post('/add', cat).then(function() {
                //console.log to show add was completed
                console.log('Added');
                //call fetchCats to refesh the page
                fetchCats();
            }
        );
    };
    //calls fetchCats when page loads
    fetchCats();
}]);