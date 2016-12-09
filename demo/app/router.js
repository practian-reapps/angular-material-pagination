app.constant('ROUTERS', [

    {
        "home": {
            "url": "/home",
            "views": {
                "": {
                    "templateUrl": "app/views/layouts/main_layout.html"
                }
            },
            "loginRequired": false
        }
    },


    {
        "home.dashboard": {
            "url": "/dashboard",
            "data": {
                "page": "dashboard"
            },
            "templateUrl": "app/views/dashboard.html",
            "loginRequired": false
        }
    },

    {
        "home.autores": {
            "url": "/autores",
            "data": {
                "section": "Catálogo",
                "page": "Autores"
            },
            "templateUrl": "app/views/autores/index.html"
        }

    },





]);
