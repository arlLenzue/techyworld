(function(){
    'use strict';

    angular
        .module('app')
        .factory('CategoriesService', CategoriesService);

    function CategoriesService($http){

        var service = {
            getAll: getAll,
            addNew: addNew,
            deleteCategory: deleteCategory
        };

        return service;

        function getAll(callback){
            $http.get('/get-categories').then(function(response){
               callback(response.data);
            });
        }

        function addNew(category, callback){
            $http.post('/add-categories', category).then(function(response){
               callback(response.data);
               toastr.success("New category has been added successfully");
            });
        }

        function deleteCategory(id, callback){
            $http.delete('/delete-categories/' + id).then(function(response){
               callback(response.data);
            });
        }


    }
})();