app
    .controller('MainCtrl', function($scope, $timeout, $log, $rootScope, $filter,
        apiUrl, $window) {


        console.log("MainCtrl");
        
        // set save dynamicTheme
        function getCookie(cname) {
            var name = cname + "=";
            var ca = document.cookie.split(';');
            for (var i = 0; i < ca.length; i++) {
                var c = ca[i];
                while (c.charAt(0) == ' ') {
                    c = c.substring(1);
                }
                if (c.indexOf(name) === 0) {
                    return c.substring(name.length, c.length);
                }
            }
            return "";
        }

        $scope.setTheme = function(theme) {
            document.cookie = "theme=" + theme;
            $scope.dynamicTheme = theme;
            //$scope.app.setting.theme = theme;
            console.log("cookie dynamicTheme=" + getCookie("theme"));
        };

        $scope.dynamicTheme = getCookie("theme");
        // /set save dynamicTheme

        //
        $scope.app = {
            name: 'AMP Demo',
            version: '1.0.1',
        };
        // 


    });


