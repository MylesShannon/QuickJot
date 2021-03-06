app.controller('IndexCtrl', function($rootScope) {
  
})
.controller('NotesCtrl', function($http, $rootScope, toastr) {
	$rootScope.session.transitioning = false;
	self = this;
	this.disable = false;
	$http({url: $rootScope.session.api+'/note', method: 'GET'}).then(function(resp) {
		self.notes = resp.data;
	}).catch(function() {

	});
	this.noteSubmit = function() {
		self.disable = true;
		$http({url: $rootScope.session.api+'/note', method: 'POST', params: {'title': self.form.title, 'subtitle': self.form.subtitle, 'body': self.form.body}}).then(function(resp) {
      self.notes.push({'id': resp.id, 'title': self.form.title, 'subtitle': self.form.subtitle, 'body': self.form.body});
			self.form.title = null;
			self.form.body = null;
			self.form.subtitle = null;
			self.disable = false;
			toastr.success('Your note was saved.', 'Success');
		}).catch(function() {
			toastr.error('Problem with saving your note', 'Error');
			self.disable = false;
		});
	};
	this.removeNote = function(id) {
		$http({url: $rootScope.session.api+'/note/'+id, method: 'DELETE'}).then(function() {
			for(var i = 0; i < self.notes.length; i++) {
				if(self.notes[i].id === id) {
					self.notes.splice(i, 1);
				}
			}
			toastr.success('Your note was removed.', 'Success');
		}).catch(function() {
			toastr.error('Problem with removing your note', 'Error');
		});
	};
})
.controller('NavCtrl', function($scope, $rootScope, auth, apiSource, constants, auth, toastr, $http) {
	var self = this;
	$scope.$on('$routeChangeSuccess', function(event, next, last) {
		self.active = next.$$route.controllerAs;
	});

  this.sources = [{
    id: 1,
    label: 'Ruby on Rails',
    value: constants.api
  }, 
  {
    id: 2,
    label: 'Laravel PHP',
    value: constants.phpApi
  }, 
  {
    id: 2,
    label: 'Node + Express',
    value: constants.nodeApi
  }];

  this.apiSource = (function() {
    for(var i = 0; i < self.sources.length; i++) {
      if(self.sources[i].value === constants.api) {
        return self.sources[i];
      }
    }
  })()

  this.setApiSource = function() {
    if(self.apiSource.value !== apiSource.url) {
      $rootScope.session.transitioning = true;
      // Renew token with new API
      $http({
        url: self.apiSource.value,
        method: 'GET'
      }).then(function() {
        apiSource.url = self.apiSource.value;
        toastr.success('New API set', 'Success');
        if($rootScope.session.loggedIn === true) {
          auth.logout()
        }
        $rootScope.session.transitioning = false;
      }).error(function() {
        $rootScope.session.transitioning = false;
      })
    }
  }

	this.login = function(provider) {
		auth.login(provider);
	};

	this.logout = function() {
		auth.logout();
	};
})
.controller('FootCtrl', function() {

});