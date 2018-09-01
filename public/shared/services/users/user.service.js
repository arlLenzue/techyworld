(function(){
    'use strict';

    angular
        .module('app')
        .service('UserService', UserService);

    function UserService($http){

    	var service = {
            getUser: getUser,
            isAdmin: isAdmin
        };

        return service;

        function getUser(callback){
            $http.get('/get-user').then(function(response){
                callback(response.data);
            }, function(err){
                callback(err);
            });
        }

        function isAdmin(callback){
            $http.get('/admin-role').then(function(response){
                callback(response.data);
            }, function(err){
                callback(err);
            });
        }

    }

})();