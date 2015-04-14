# Resistor
Resist mass assignment vulnerabilities - map the important bits

## Installation

    npm install resistor --save

## Warning
This is work in progress. Really!

## Usage
Instead of validating input directly in your route handler resistor will generate a piece of middleware to do the heavy lifting:

```javascript

var validateSignup = resistor({
  email : { type : 'string', required : true },
  password : { type : 'string', required : true }
});

router.post('/signup', validateSignup, function(req, res, next) {
  // req.model is set and resistor ensures that req.model.email and req.model.password are set 
});

```

Out of the box resistor will send 400 JSON responses if a request is not valid. To modify this behaviour the errorHandler option comes
to rescue:

```javascript

function renderErrorView(req, res) {
  res
    .status(400)
    .render('error', req.model);
}

var validateSignup = resistor({
  email : { type : 'string', required : true },
  password : { type : 'string', required : true }
}, { errorHandler : renderErrorView });

router.post('/signup', validateSignup, function(req, res, next) {
  // req.model is set and resistor ensures that req.model.email and req.model.password are set 
});

```

Using resistor model binding outside of a middleware context:

```javascript

var binder = resistor.binder({ input : '=' });
var model = binder.bind({ input : 'value'});

console.log(model.input); // prints "value" to stdout 
      
```