/* global angular */
(function () {
  if (window.angularOnce) {
    if (window.angularExample) {
      angular.bootstrap(document.getElementById('angularjs'), ['app'])
    }

    return
  }

  window.angularOnce = true

  const createScript = src => new Promise(resolve => {
    const script = document.createElement('script')
    script.setAttribute('src', src)
    script.addEventListener('load', resolve)
    document.body.appendChild(script)
  })

  const loadAngular = () => window.angular ? Promise.resolve() : Promise.resolve()
    .then(() => createScript('https://cdnjs.cloudflare.com/ajax/libs/angular.js/1.6.5/angular.min.js'))
    .then(() => createScript('https://cdnjs.cloudflare.com/ajax/libs/angular.js/1.6.5/angular-route.min.js'))

  const runApp = () => {
    const app = angular.module('app', ['ngRoute'])

    app
      .config(function ($locationProvider, $routeProvider) {
        $locationProvider.html5Mode({
          enabled: true,
          requireBase: false
        })

        $routeProvider
          .when('/angularjs/', {
            template: '<div><h1>Home Page</h1><p>{{ message }}</p></div>',
            controller: 'HomeController'
          })
          .when('/angularjs/about', {
            template: '<div><h1>About Page</h1><p>{{ message }}</p></div>',
            controller: 'AboutController'
          })
      })
      .controller('HomeController', function ($scope) {
        $scope.message = 'Home!'
      })
      .controller('AboutController', function ($scope) {
        $scope.message = 'About!'
      })

    window.angularExample = app
  }

  loadAngular().then(runApp)
})()
