########################################
angular-material-pagination
########################################

.. class:: no-web

    Paquete para la paginación en Angular con Material de a las API rest paginados 



    .. image:: https://github.com/.. .png
        :alt: angular-material-pagination
        :width: 100%
        :align: center



.. contents::

.. section-numbering::

.. raw:: pdf

   PageBreak oneColumn


============
Installation
============

-------------------
Dependencies
-------------------
- angular-material-icons (not part of the bundle)
- angular-material (not part of the bundle)
- angular-ui-router (not part of the bundle)
- angular (not part of the bundle)

-------------------
Development version
-------------------


The **latest development version** can be installed directly from github_:

.. code-block:: bash
    
    # Universal
    $ bower install https://github.com/practian-reapps/angular-material-pagination.git --production --save


Add to your **index.html** setting like this:

.. code-block:: html

    <link rel="stylesheet" href="bower_components/angular-material-pagination/dist/angular-material-pagination.css" type="text/css" />
    
    <script src="bower_components/angular-material-pagination/dist/angular-material-pagination.tpls.js"></script>


La API de los Resource Server debe personalizar las salidas en:

.. code-block:: js

    $scope.lista = r.data.results;
    $scope.options = r.data.options;

donde la API debe tener la siguiente forma:

.. code-block:: python
        
        """
        return Response({
            'options': {
                'count': self.page.paginator.count, # total de registros
                'next': self.get_next_link(),
                'previous': self.get_previous_link(),
                'pagination': self.page_size, # per page
                'page': self.page.number, # página actual
            },
            'results': data
        })
        """

ver `Django backend utils`_

Config module:

.. code-block:: js

    var app = angular.module("catalogo", [

    "pi.appPagination",

    'ui.router',
    'ngMaterial',
    'ngMdIcons',
]);

Usage:

.. code-block:: js

    <md-table-pagination>
        <app-pagination ng-if="options.pages>0" per="options.page_size" page="options.page" format="{{'jumping'}}" display="4" rango="options.range" accion="list(params)" pages="options.pages" query="query" fields="{{fields}}"></app-pagination>
    </md-table-pagination>


Finally, run ``gulp serve``.




====
Meta
====

-------
Authors
-------

- Angel Sullon Macalupu (asullom@gmail.com)



-------
Contributors
-------

See https://github.com/practian-reapps/angular-material-pagination/graphs/contributors

.. _github: https://github.com/practian-reapps/angular-material-pagination
.. _Django: https://www.djangoproject.com
.. _Django REST Framework: http://www.django-rest-framework.org
.. _Django OAuth Toolkit: https://django-oauth-toolkit.readthedocs.io
.. _oauth2_backend: https://github.com/practian-reapps/django-oauth2-backend
.. _Authorization server: https://github.com/practian-ioteca-project/oauth2_backend_service
.. _OAuth 2 Server Libraries: https://oauth.net/code
.. _Django backend utils: https://github.com/practian-reapps/django-backend-utils/blob/master/backend_utils/pagination.py







