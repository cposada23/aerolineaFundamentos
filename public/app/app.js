(function () {
    angular
        .module('aerolinea',['ui.router','jlareau.pnotify', 'satellizer' , 'angularSpinner', 'ui.bootstrap'])
        .config(config);

    /**
     * -------------------------Configuración de la app
     *
     */
    config.$inject = ['$stateProvider','$urlRouterProvider', '$authProvider'];
    function config($stateProvider,$urlRouterProvider, $authProvider) {
        $urlRouterProvider.otherwise('home');
        $stateProvider
            .state('Home',{
                url:'/home',
                templateUrl:'public/app/home/home.html',
                controller:'homeCtrl as home'
            })
            .state('SingUp',{
                url:'/singUp',
                templateUrl:'public/app/auth/singup/singup.html',
                controller: 'singupCtrl as singup'
            })
            .state('Forgot',{
                url:'/forgot',
                templateUrl:'public/app/auth/forgot/forgot.html',
                controller: 'forgotCtrl as forgot'
            })
            .state('Reset',{
                url:'/reset/:token',
                templateUrl:'public/app/auth/reset/reset.html',
                controller:'resetCtrl as reset'
            });

        var commonConfig = {
            popupOptions: {
                location: 'no',
                toolbar: 'yes',
            }
        };

        commonConfig.redirectUri = window.location.origin + '/';
        $authProvider.singupUrl = '/auth/signup';
       
    }
}());