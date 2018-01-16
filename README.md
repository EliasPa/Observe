# observationapp

> App for viewing and loggin weather data.
> The application can be found running on Heroku here: https://observation-app.herokuapp.com/ !

## Setup guide

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# the API requests will be sent to a server that also runs on Heroku.
```

<div>
This application's purpose is for people to be able to log
and view temperature data at five different observing points around the world.
</div>

<div>
Although the application currently supports only 5 locations,
and users can't dynamically add any locations, more locations can be added quite easily.
Support for dynamically adding locations wouldn't be difficult either, due to the loose coupling.
More information on the backend implementation can be found here: https://github.com/EliasPa/ObserveBackend
</div>

<h4>Technologies used</h4>

* VueJS and Webpack
* npm
* OpenStreetMap (leaflet)
* Material Design Lite

<h4>Other</h4>

* There's lots of room for scaling, for example adding automated logging!