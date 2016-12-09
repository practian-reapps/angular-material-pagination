app
// =========================================================================
// Show View and Delete Autor 
// =========================================================================
    .controller("AutorCtrl", function($scope, $state, $stateParams, demoService, $window, $mdDialog, $log, $filter) {
    //Valores iniciales
    $scope.fields = 'nombre';
    var params = {};
    $scope.lista = [];
    $scope.autor = {};

    $scope.list = function(params) {
        $scope.isLoading = true;
        /*
        demoService.Autor(params, function(r) {
            $scope.lista = r.results;
            $scope.options = r.options;
            $scope.isLoading = false;
        }, function(err) {
            $log.log("Error in list:" + JSON.stringify(err));
        });*/

        demoService.Autor().then(function(r) {
                $log.log("list:" + JSON.stringify(r));
                $scope.lista = r.data.results;
                $scope.options = r.data.options;
                $scope.isLoading = false;
            },
            function(err) {
                $log.log("Error in list:" + JSON.stringify(err));
            });

    };
    $scope.list(params);

    $scope.buscar = function() {
        params.page = 1;
        params.fields = $scope.fields;
        params.query = $scope.query;
        $scope.list(params);
    };

    $scope.onReorder = function(order) { //TODO
        $log.log('Order: ' + order);
    };



});
