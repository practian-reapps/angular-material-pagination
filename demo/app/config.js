app
//==================================
// Activar icones que se desactivaron en la versión de angular mayores a v1.0.9
//==================================
    .config(function($mdIconProvider, $$mdSvgRegistry) {
    // Add default icons from angular material para versiones no estables mayores a v1.0.9
    // la version v1.0.9 no necesita hacer esto
    $mdIconProvider
        .icon('md-close', $$mdSvgRegistry.mdClose)
        .icon('md-menu', $$mdSvgRegistry.mdMenu)
        .icon('md-toggle-arrow', $$mdSvgRegistry.mdToggleArrow);
})






//==================================
// routers de la app
//==================================
.config(function($stateProvider, $urlRouterProvider, $locationProvider, ROUTERS) {


    //====================================================
    // Routers dinámicos de la app, ver router.js
    //====================================================
    ROUTERS.forEach(function(collection) {
        for (var routeName in collection) {
            $stateProvider.state(routeName, collection[routeName]);
        }
    });
    $urlRouterProvider.otherwise('/home');

});



app
//====================================================
// Modelo lite para datos del usuario
//====================================================
    .service('userService', function() {
    return { userName: null };
});

app

//====================================================
// Permite acceder a $state and $stateParams desde cualquier parte de la pp
//====================================================
    .run(function($rootScope, $state, $stateParams, $window) {
    // It's very handy to add references to $state and $stateParams to the $rootScope
    // so that you can access them from any scope within your applications.For example,
    // <li ng-class="{ active: $state.includes('contacts.list') }"> will set the <li>
    // to active whenever 'contacts.list' or one of its decendents is active.
    $rootScope.$state = $state;
    $rootScope.$stateParams = $stateParams;


})

//====================================================
// Permite acceder a userService desde cualquier parte de la pp
//====================================================
.run(function($rootScope, userService) {
    $rootScope.userService = userService;
})










//====================================================
// 
//====================================================
.run(function($state, $rootScope, $location, $window, userService) {

    userService.userName = 'demo';

});
