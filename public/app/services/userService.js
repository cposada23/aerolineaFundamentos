(function(){
    "use strict";
    angular
        .module('aerolinea').factory('UserService', UserService);

    function UserService($rootScope, $auth ,notificationService) {
        var userData = $auth.getPayload();

        return {
            isAuthenticated: function(){
                return $auth.isAuthenticated();
            },

            login: function (user) {
                $auth.login(user).then(this.successAuth).catch(this.failedAuth);
            },
            signup: function (user) {
                $auth.signup(user).then(this.successSingup).catch(this.failedSingup);
            },
            authenticate: function(provider) {
                $auth
                    .authenticate(provider)
                    .then(this.successAuth)
                    .catch(this.failedAuth);
            },
            logOut: function() {
                $auth.logout();
                userData = undefined;
                $rootScope.$emit('userLoggedOut');
            },
            getUser: function(){
                return userData;
            },
            successAuth: function() {
                userData = $auth.getPayload();
                $rootScope.$emit('userLoggedIn', {data: userData});
            },
            successSingup: function (response) {
                $auth.setToken(response);
                userData = $auth.getPayload();
                notificationService.success('Autenticado');
                $rootScope.$emit('userSingUp', {data: userData});
            },
            failedAuth: function(error) {
                userData = undefined;
                $rootScope.$emit('userFailedLogin' ,{error:error.data});
            },
            failedSingup: function (response) {
                userData = undefined;
                $rootScope.$emit('userFailedSingUp', {error: response.data});
            },
        }
    }
})();
