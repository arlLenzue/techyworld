(function(){
    'use strict';

    angular
        .module('app')
        .service('UserService', UserService);

    function UserService($http){

    	var service = {
            getUser: getUser
        };

        return service;

        function getUser(callback){
            $http.get('/get-user').then(function(response){
                callback(response.data);
            }, function(err){
                callback(err);
            });
        }

    }

})();