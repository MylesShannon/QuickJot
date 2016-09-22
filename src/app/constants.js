app.constant('constants', {
	'host': (function() { return (window.location.origin.indexOf('mylesshannon') >= 0) ? 'https://jot.mylesshannon.me' : 'http://localhost:8080'; })(),
	'api': (function() { return (window.location.origin.indexOf('mylesshannon') >= 0) ? 'https://api.mylesshannon.me' : 'http://localhost:8001'; })(),
  'phpApi': (function() { return (window.location.origin.indexOf('mylesshannon') >= 0) ? 'https://api.mylesshannon.me:444' : 'http://localhost:8000'; })(),
  'nodeApi': (function() { return (window.location.origin.indexOf('mylesshannon') >= 0) ? 'https://api.mylesshannon.me:442' : 'http://localhost:8002/api/v1'; })(),
	'states': {'requireIn':['notes'], 'requireOut':[]},
});