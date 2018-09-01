(function(){
    'use strict';

    angular
        .module('app')
        .controller('UserController', UserController);

    function UserController(ItemsService, CategoriesService, UserService, $state){

        var vm = this;

       console.log("User area");

       function validateAccess(){
            UserService.isAdmin(function(auth){
                if(auth == "true"){
                    $state.go("admin");
                }
            });
        }

        validateAccess();

    }

})();
