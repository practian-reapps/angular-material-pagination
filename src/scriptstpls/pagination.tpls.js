(function() {

    angular.module("pi.appPagination", []);

    var appPagination = angular.module("pi.appPagination");


    appPagination
        .directive('appPagination', function() {
            return {
                scope: {
                    fields: '@',
                    query: '=',
                    format: '@',
                    display: '=',
                    per: '=',
                    page: '=',
                    pages: '=',
                    rango: '=',
                    sort: '@',
                    term: '@',
                    accion: '&'
                },
                link: myLink2,
                templateUrl: 'app/directives/pagination/pagination.tpls.html',

            };

            function myLink2(scope, el, attrs) {
                scope.$watchCollection('[per,page,pages, display, rango, format, fields, query]', function() {
                    console.log('d-per=' + scope.per);
                    console.log('d-page=' + scope.page);
                    console.log('d-fields=' + scope.fields);
                    console.log('d-query=' + scope.query);
                    Algoritmo2(scope, attrs);
                });
            }

            function Algoritmo2(scope, attrs) {
                var rangeAlgorithms = {
                    all: function(numPages, currentPage) {
                        var i,
                            pagesInRange = [];
                        var cp = {};
                        cp.page = currentPage + 1;
                        for (i = 1; i <= numPages; i++) {
                            var params = {};
                            params.page = i;
                            pagesInRange.push({
                                page: i,
                                params: params,
                                cp: cp
                            });
                        }
                        return pagesInRange;
                    },
                    jumping: function(numPages, currentPage, size) {
                        var i,
                            min = Math.floor(currentPage / size) * size,
                            max = Math.min(min + size - 1, numPages - 1),
                            pagesInRange = [];
                        var cp = {};
                        cp.page = currentPage + 1;
                        //cp.query = scope.query;
                        for (i = min + 1; i <= max + 1; i++) {
                            var params = {};
                            params.page = i;
                            //params.query = scope.query;
                            //params.page_size = scope.per;
                            pagesInRange.push({
                                page: i,
                                params: params,
                                cp: cp
                            });
                        }
                        return pagesInRange;
                    },
                    sliding: function(numPages, currentPage, size) {
                        var i,
                            stepMin = Math.floor((size - 1) / 2),
                            stepMax = size - 1 - stepMin,
                            min = Math.max(0, currentPage - stepMin),
                            max = Math.min(currentPage + stepMax, numPages - 1),
                            pagesInRange = [];
                        var cp = {};
                        cp.page = currentPage + 1;
                        while (min > 0 && max - min < size - 1) {
                            min--;
                        }
                        while (max < numPages - 1 && max - min < size - 1) {
                            max++;
                        }
                        for (i = min + 1; i <= max + 1; i++) {
                            var params = {};
                            params.page = i;
                            pagesInRange.push({
                                page: i,
                                params: params,
                                cp: cp
                            });
                        }
                        return pagesInRange;
                    }
                };

                function calculatePagesInRange(vl) {
                    vl--;
                    var currentPage = Math.max(1, Math.min(vl, numPages()));
                    return rangeAlgorithms[scope.format](parseInt(numPages()), currentPage, parseInt(scope.display));
                }

                function numPages() {
                    // return Math.ceil(scope.count / scope.per);
                    return scope.pages;
                }

                var params = {};


                function setVariables(num) {
                    if (!num) {
                        num = scope.page;
                    }
                    scope.nextParams = {};
                    scope.nextParams.page = (parseInt(num) + 1);
                    angular.extend(scope.nextParams, params);

                    scope.endParams = {};
                    scope.endParams.page = scope.pages; //numPages();
                    angular.extend(scope.endParams, params);

                    scope.prevParams = {};
                    scope.prevParams.page = (parseInt(num) - 1);
                    angular.extend(scope.prevParams, params);

                    scope.startParams = {};
                    scope.startParams.page = 1;
                    angular.extend(scope.startParams, params);

                    //scope.count = parseInt(scope.count);
                    //scope.per = parseInt(scope.per);

                    scope.pagesInRange = calculatePagesInRange(parseInt(num));

                    var firstPageInRange = scope.pagesInRange[0];
                    var lastPageInRange = scope.pagesInRange[scope.pagesInRange.length - 1];

                    scope.firstPageInRange = calculatePagesInRange(parseInt(firstPageInRange.page) - 1);
                    scope.lastPageInRange = calculatePagesInRange(parseInt(lastPageInRange.page) + 1);
                    //scope.$state = $state;
                    //scope.currentPage = num;
                    //scope.pages = scope.pages; //numPages();
                    //scope.rango = scope.rango;

                    //scope.per=5;
                }

                setVariables();
                scope.listpag = function(params, num) {
                    params.fields = scope.fields;
                    params.query = scope.query;
                    if (scope.per == '0') {
                        params.all = true;
                    }
                    params.page_size = scope.per;

                    scope.accion({
                        params: params
                    });
                    setVariables(num);
                };


            }

        });

    appPagination
        .run(["$templateCache", function($templateCache) {
            $templateCache.put("app/directives/pagination/pagination.tpls.html", '' +
                '' +
                '' +
                '    <section layout="row"  layout-align="center center" layout-wrap class="pagination">' +
                '        <md-button aria-label="Settings" ng-disabled="prevParams.page == 0" data-ng-click="listpag(startParams,startParams.page)">' +
                '            <ng-md-icon icon="first_page" size="24"></ng-md-icon>' +
                '        </md-button>' +
                '        <md-button  aria-label="Settings" ng-disabled="prevParams.page == 0" data-ng-click="listpag(prevParams,prevParams.page)">' +
                '            <ng-md-icon icon="navigate_before" size="24"></ng-md-icon>' +
                '        </md-button>' +
                '' +
                '' +
                '        <md-button  aria-label="Settings" ng-show="pagesInRange[0].page != 1" data-ng-click="listpag(firstPageInRange[0].cp,firstPageInRange[0].cp.page)">' +
                '            ...' +
                '        </md-button>' +
                '        <div ng-repeat="p in pagesInRange">' +
                '            <md-button  ng-class="{\'md-raised md-primary\': p.page == page}" data-ng-click="listpag(p.params,p.page)">' +
                '                {{p.page}}' +
                '            </md-button>' +
                '        </div>' +
                '       <md-button  aria-label="Settings" ng-show="pagesInRange[pagesInRange.length-1].page != pages" data-ng-click="listpag(lastPageInRange[0].cp,lastPageInRange[0].cp.page)">' +
                '            ...' +
                '        </md-button>' +
                '' +
                '        ' +
                '        <md-button  aria-label="Settings" data-ng-click="listpag(nextParams,nextParams.page)" ng-disabled="nextParams.page > pages">' +
                '            <ng-md-icon icon="navigate_next" size="24"></ng-md-icon>' +
                '        </md-button>' +
                '        <md-button  aria-label="Settings" data-ng-click="listpag(endParams,endParams.page)" ng-disabled="nextParams.page > pages">' +
                '            <ng-md-icon icon="last_page" size="24"></ng-md-icon>' +
                '        </md-button>' +
                '        ' +
                '        <md-select aria-label="items per page" ng-model="per" ng-change="listpag(startParams,startParams.page)"  class="md-table-select">' +
                '' +
                '            <md-option value="0">All</md-option>' +
                '            <md-option value="2">2</md-option>' +
                '            <md-option value="5">5</md-option>' +
                '            <md-option value="20">20</md-option>' +
                '        </md-select> items per page' +
                '        <span flex></span>' +
                '        <span ng-bind="rango"></span>' +
                '' +
                '    </section>' +
                '' +
                '');

        }]);



})();
