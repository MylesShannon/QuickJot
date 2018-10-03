app.constant('constants', {
	'host': (function() { return (window.location.origin.indexOf('mylesshannon') >= 0) ? 'http://jot.mylesshannon.me' : 'http://localhost:8080'; })(),
	'api': (function() { return (window.location.origin.indexOf('mylesshannon') >= 0) ? 'http://api.mylesshannon.me/api/v1' : 'http://localhost:8002/api/v1'; })(),
	'states': {'requireIn':['notes'], 'requireOut':[]},
});