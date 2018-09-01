(function(){
    'use strict';

    angular
        .module('app')
        .directive('secureImage', secureImage);

    function secureImage(){
        return {
            restrict: 'EA',
            controller: secureImageController
        };
    }

    function secureImageController($scope, $element, $attrs){

        $attrs.ngSrc = $attrs.ngSrc.replace("http", "https");
    }

})();