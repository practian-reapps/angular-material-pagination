/**
 * angular-material-pagination - Un cliente OAuth2
 * @author practian
 * @version v1.0.0
 * @link 
 * @license ISC
 */
(function() {
    angular.module("pi.appPagination", []);
    var appPagination = angular.module("pi.appPagination");
    appPagination.directive("appPagination", function() {
        return {
            scope: {
                fields: "@",
                query: "=",
                format: "@",
                display: "=",
                per: "=",
                page: "=",
                pages: "=",
                rango: "=",
                sort: "@",
                term: "@",
                accion: "&"
            },
            link: myLink2,
            templateUrl: "app/directives/pagination/pagination.tpls.html"
        };
        function myLink2(scope, el, attrs) {
            scope.$watchCollection("[per,page,pages, display, rango, format, fields, query]", function() {
                console.log("d-per=" + scope.per);
                console.log("d-page=" + scope.page);
                console.log("d-fields=" + scope.fields);
                console.log("d-query=" + scope.query);
                Algoritmo2(scope, attrs);
            });
        }
        function Algoritmo2(scope, attrs) {
            var rangeAlgorithms = {
                all: function(numPages, currentPage) {
                    var i, pagesInRange = [];
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
                    var i, min = Math.floor(currentPage / size) * size, max = Math.min(min + size - 1, numPages - 1), pagesInRange = [];
                    var cp = {};
                    cp.page = currentPage + 1;
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
                },
                sliding: function(numPages, currentPage, size) {
                    var i, stepMin = Math.floor((size - 1) / 2), stepMax = size - 1 - stepMin, min = Math.max(0, currentPage - stepMin), max = Math.min(currentPage + stepMax, numPages - 1), pagesInRange = [];
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
                return scope.pages;
            }
            var params = {};
            function setVariables(num) {
                if (!num) {
                    num = scope.page;
                }
                scope.nextParams = {};
                scope.nextParams.page = parseInt(num) + 1;
                angular.extend(scope.nextParams, params);
                scope.endParams = {};
                scope.endParams.page = scope.pages;
                angular.extend(scope.endParams, params);
                scope.prevParams = {};
                scope.prevParams.page = parseInt(num) - 1;
                angular.extend(scope.prevParams, params);
                scope.startParams = {};
                scope.startParams.page = 1;
                angular.extend(scope.startParams, params);
                scope.pagesInRange = calculatePagesInRange(parseInt(num));
                var firstPageInRange = scope.pagesInRange[0];
                var lastPageInRange = scope.pagesInRange[scope.pagesInRange.length - 1];
                scope.firstPageInRange = calculatePagesInRange(parseInt(firstPageInRange.page) - 1);
                scope.lastPageInRange = calculatePagesInRange(parseInt(lastPageInRange.page) + 1);
            }
            setVariables();
            scope.listpag = function(params, num) {
                params.fields = scope.fields;
                params.query = scope.query;
                if (scope.per == "0") {
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
})();