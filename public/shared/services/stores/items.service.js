(function(){
    'use strict';

    angular
        .module('app')
        .factory('ItemsService', ItemsService);

    function ItemsService($http){

        var service = {
            getAll: getAll,
            getItem: getItem,
            addItem: addItem,
            updateItem: updateItem,
            deleteItem: deleteItem,
            getAllCategory: getAllCategory
        };

        return service;

        function getAll(callback){
         $http.get('/get-items').then(function(response){
               callback(response.data);
            });
        }

        function getAllCategory(category, callback){
            $http.get('/get-items/'+ category).then(function(response){
               callback(response.data);
            });
        }

        function getItem(id, callback){
            $http.get('/getOne-items/' + id).then(function(response){
               callback(response.data);
            });
        }

        function addItem(item, callback){
            $http.post('/add-items', item).then(function(response){
               toastr.success("New item has been added successfully");
               callback(response.data);
            });
        }

        function updateItem(item, callback){
            $http.put('/update-items', item).then(function(response){
                toastr.success("Item has been updated successfully");
                callback(response.data);
            });
        }

        function deleteItem(id, callback){
            $http.delete('/delete-items/' + id).then(function(response){
                toastr.success("Item has been deleted successfully");
                callback(response.data);
            });
        }
    }
})();