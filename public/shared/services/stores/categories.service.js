(function(){
    'use strict';

    angular
        .module('app')
        .factory('CategoriesService', CategoriesService);

    function CategoriesService($http){

        var service = {
            getAll: getAll,
            addNew: addNew,
            deleteCategory: deleteCategory,
            updateCategory: updateCategory
        };

        return service;

        function getAll(callback){
            $http.get('/get-categories').then(function(response){
               callback(response.data);
            });
        }

        function addNew(category, callback){
            $http.post('/add-categories', category).then(function(response){
               toastr.success("New category has been added successfully");
               callback(response.data);
            });
        }

        function deleteCategory(id, callback){
            $http.delete('/delete-categories/' + id).then(function(response){
                toastr.success("Category has been deleted successfully");
               callback(response.data);
            });
        }

        function updateCategory(category, callback){
            $http.put('/update-categories', category).then(function(response){
                toastr.success("Category has been updated successfully");
                callback(response.data);
            });
        }


    }
})();