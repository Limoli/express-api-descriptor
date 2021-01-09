# An experiment
The project was an experiment with the purpose to extend Express APIs in a hacky way in order to provide documentation 
during runtime without any generation.
Of course, it has a lot of limitations and is not suitable for real projects.

Please, consider to use the [Swagger](https://swagger.io/) library.

# Simple, fast and customizable
In descriptor, you can add the **object** representing the parameters that you need.
```sh
app.get('/books', function (req, res) {
    res.send("My fantastic book");
}).descriptor({
    name : 'Retrieve a fantastic book',
    errors : []
});
```

# Retrieve API list
**api.list()** : retrieve all the mapped Express APIs.
```sh
app.get('/apis', function (req, res) {
    res.send(api.list());
}).descriptor({
    name : 'Retrieve APIs documentation'
});
```

# Retrieve API list grouped by entities
**api.listByEntity()** : retrieve all the mapped Express APIs grouping by entity. There are 2 modes:
* **automatic** : entities are detected automatically according to restful api concepts

```sh
app.get('/api/gardens', function (req, res) {
    res.send(api.listByEntity());
}).descriptor({
    name : 'Welcome in my garden!',
    errors : []
});

app.post('/api/gardens', function (req, res) {
    res.send(api.listByEntity());
}).descriptor({
    name : 'I need a new garden',
    errors : []
});

app.get('/api/gardens/flowers', function (req, res) {
    res.send(api.listByEntity());
}).descriptor({
    name : 'Look my tulips!',
    errors : []
});
```

* **manual** : just add the parameter entity in your api
```sh
app.get('/api/gardens', function (req, res) {
    res.send(api.listByEntity());
}).descriptor({
    name : 'Welcome in my garden!',
    errors : [],
    entity : 'My Garden'
});

app.post('/api/gardens', function (req, res) {
    res.send(api.listByEntity());
}).descriptor({
    name : 'I need a new garden',
    errors : [],
    entity : 'My Garden'
});

app.get('/api/gardens/flowers', function (req, res) {
    res.send(api.listByEntity());
}).descriptor({
    name : 'Look my tulips!',
    errors : [],
    entity : 'My flowers'
});
```


# Usage
The express-api-descriptor module allows to create documentation for Express APIs.
```sh
var express = require('express');
var api = require('express-api-descriptor')(express);
var app = express();

app.get('/api', function (req, res) {
    res.send(api.list());
}).descriptor({
    name : 'My first API documentation'
});

app.listen(8080, function () {
    console.log('Example app listening on port 8080!');
});
```

# Installation
```sh
npm i express-api-descriptor
```

### Last updates

From Version 1.0.3
 - Possibility to group API by entity automatically

License
----

ISC
