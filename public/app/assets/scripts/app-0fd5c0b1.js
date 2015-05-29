"use strict";angular.module("valueMash",["ngAnimate","ngCookies","ngTouch","ngSanitize","ui.router","ngStorage","toaster","angular-cache","ng-token-auth"]).config(["$httpProvider","$authProvider","$locationProvider","API_URL",function(e,a,s,t){s.html5Mode(!1),s.hashPrefix("!"),"#%21"===window.location.hash.substr(0,4)&&window.location.replace(window.location.href.split("#%21").join("#!")),e.defaults.withCredentials=!0,a.configure({apiUrl:t})}]).run(["$rootScope","Notifier","$state","ENV","API_URL",function(e,a,s,t,o){e.ENV=t,e.API_URL=o,e.$on("$stateChangeError",function(){a.show("Please log in"),s.go("layout_guest.login")})}]),angular.module("valueMash").controller("ValueShowCtrl",["$scope","API","$stateParams","Notifier",function(e,a,s,t){e.value={},a.values.get(s.valueId).then(function(a){console.log("resp",a),e.value=a.data.value}),e.updateValue=function(s){a.values.update(s.id,s).then(function(a){200===a.status&&(t.show("Success: Value updated"),e.value=a.data.value)})}}]),angular.module("valueMash").controller("ValueScoreCtrl",["$scope","API",function(e,a){var s=[],t=function(){e.left=s.shift(),e.right=s.shift(),console.log("stack size: "+s.length)},o=function(){s.length<2&&(console.log("getting more values!"),l())},l=function(){return a.values.getPlayers().then(function(e){200===e.status&&(s=s.concat(e.data.values),console.info("refreshed stack. size: "+s.length))})};l().then(t),e.left={},e.right={},e.score=function(e,s){t(),o(),a.values.score(e,s).then(function(e){200===e.status&&console.info("score succeeded")})}}]),angular.module("valueMash").controller("ValueCtrl",["$scope","API","Notifier",function(e,a,s){e.values=[],e.newValue={},a.values.all().then(function(a){e.values=a.data.values}),e.createValue=function(t){a.values.create(t).then(function(a){200===a.status&&(s.show("Success: Added new value"),e.newValue={},e.values.push(a.data.value))})},e.resetForm=function(e){e&&(e.$setPristine(),e.$setUntouched())}}]),angular.module("valueMash").controller("UserCtrl",["$scope","API",function(e,a){e.users={},a.users.all().then(function(a){console.log("resp",a),e.users=a.data.users})}]),angular.module("valueMash").controller("LayoutGuestCtrl",["$scope","$rootScope","$state",function(e,a,s){e.$state=s,e.layoutModel={}}]),angular.module("valueMash").controller("LayoutAppCtrl",["$scope","$rootScope","$state",function(e,a,s){e.$state=s,e.layoutModel={}}]),angular.module("valueMash").controller("MatchResultCtrl",["$scope","API",function(e,a){e.results={},a.match_results.all().then(function(a){console.log("resp",a),e.results=a.data.results})}]),angular.module("valueMash").controller("LoginCtrl",["$scope","API","Notifier",function(e,a,s){e.modalTest=function(){$("#change-pw-modal").openModal()},e.testNotices=function(e){s.show(e)}}]),angular.module("valueMash").controller("DashboardCtrl",["$scope",function(){}]),angular.module("valueMash").config(["$stateProvider","$urlRouterProvider",function(e,a){a.otherwise("/login"),e.state("layout_guest",{"abstract":!0,views:{root:{templateUrl:"modules/layout/layout_guest.html",controller:"LayoutGuestCtrl"}}}).state("layout_guest.login",{url:"/login",templateUrl:"modules/guest/login.html",controller:"LoginCtrl"}).state("layout_app",{"abstract":!0,views:{root:{templateUrl:"modules/layout/layout_app.html",controller:"LayoutAppCtrl"},"sidebar@layout_app":{templateUrl:"modules/layout/_layout_app_sidebar.html",controller:"LayoutAppCtrl"}},resolve:{auth:["$auth",function(e){return e.validateUser()}]}}).state("layout_app.dashboard",{url:"/dashboard",templateUrl:"modules/dashboard/dashboard.html",controller:"DashboardCtrl"}).state("layout_app.users",{url:"/users",templateUrl:"modules/user/user.html",controller:"UserCtrl"}).state("layout_app.values",{url:"/values",templateUrl:"modules/value/value.html",controller:"ValueCtrl"}).state("layout_app.values.show",{url:"/{valueId:[0-9]+}",templateUrl:"modules/value/value.show.html",controller:"ValueShowCtrl"}).state("layout_app.values.score",{url:"/score",templateUrl:"modules/value/value.score.html",controller:"ValueScoreCtrl"}).state("layout_app.match_results",{url:"/match_results",templateUrl:"modules/match_result/match_result.html",controller:"MatchResultCtrl"})}]),angular.module("valueMash").constant("ENV","production").constant("API_URL",""),angular.module("valueMash").run(["$rootScope","$state","Notifier",function(e,a,s){e.$on("auth:registration-email-success",function(){console.log("auth:registration-email-success")}),e.$on("auth:registration-email-error",function(){console.log("auth:registration-email-error")}),e.$on("auth:email-confirmation-success",function(e,a){console.log("auth:email-confirmation-success"),s.show("Welcome, "+a.email+". Your account has been verified.")}),e.$on("auth:email-confirmation-error",function(){console.log("auth:email-confirmation-error"),s.show("There was an error with your registration.")}),e.$on("auth:password-reset-request-success",function(e,a){console.log("auth:password-reset-request-success"),s.show("Password reset instructions were sent to "+a.email)}),e.$on("auth:password-reset-request-error",function(e,a){console.log("auth:password-reset-request-error"),s.show("Password reset request failed: "+a.errors[0])}),e.$on("auth:password-reset-confirm-error",function(){console.log("auth:password-reset-confirm-error"),s.show("Unable to verify your account. Please try again.")}),e.$on("auth:password-reset-confirm-success",function(){console.log("auth:password-reset-confirm-success"),$("change-pw-modal").openModal()}),e.$on("auth:password-change-success",function(){console.log("auth:password-change-success"),s.show("Your password has been successfully updated!")}),e.$on("auth:password-change-error",function(e,a){console.log("auth:password-change-error"),s.show("Registration failed: "+a.errors[0])}),e.$on("auth:logout-success",function(){console.log("auth:logout-success"),s.show("Goodbye"),a.go("layout_guest.login")}),e.$on("auth:logout-error",function(e,a){console.warn("auth:logout-error"),s.show("Logout failed: "+a.errors[0])}),e.$on("auth:account-update-success",function(){console.log("auth:account-update-success"),s.show("Your account has been successfully updated.")}),e.$on("auth:account-update-error",function(e,a){console.log("auth:account-update-error"),s.show("Update error: "+a.errors[0])}),e.$on("auth:account-destroy-success",function(){console.log("auth:account-destroy-success")}),e.$on("auth:account-destroy-error",function(){console.log("auth:account-destroy-error"),s.show("Your account has been destroyed.")}),e.$on("auth:session-expired",function(){console.log("auth:session-expired"),s.show("Session has expired")}),e.$on("auth:validation-success",function(){console.log("auth:validation-success")}),e.$on("auth:validation-error",function(){console.warn("auth:validation-error")}),e.$on("auth:invalid",function(){console.warn("auth:invalid")}),e.$on("auth:validation-expired",function(){console.log("auth:validation-expired")}),e.$on("auth:login-success",function(e,t){console.log("auth:login-success"),s.show("Welcome "+t.email),a.go("layout_app.dashboard")}),e.$on("auth:login-error",function(e,a){console.log("auth:login-error"),s.show("Authentication failed: "+a.errors[0])}),e.$on("auth:registration-email-success",function(e,a){console.log("auth:registration-email-success"),s.show("A registration email was sent to "+a.email)}),e.$on("auth:registration-email-error",function(e,a){console.log("auth:registration-email-error"),s.show("Registration failed: "+a.errors[0])})}]),angular.module("valueMash").service("User",function(){var e={};return e}),angular.module("valueMash").service("Notifier",function(){var e={show:function(e){Materialize.toast(e,1800)}};return e}),angular.module("valueMash").service("API",["$http","$auth","Notifier","API_URL",function(e,a,s,t){var o=function(a){a=angular.extend({auth:!0,method:"",url:""},a);var s={method:a.method,url:t+"/"+a.url,data:a.data||null};return e(s)},l={users:{all:function(){return o({method:"GET",url:"users.json"})}},values:{all:function(){return o({method:"GET",url:"values.json"})},create:function(e){return o({method:"POST",url:"values.json",data:e})},get:function(e){return o({method:"GET",url:"values/"+e+".json"})},update:function(e,a){return o({method:"PUT",url:"values/"+e+".json",data:a})},getPlayers:function(){return o({method:"GET",url:"values/players.json"})},score:function(e,a){return o({method:"POST",url:"values/score.json",data:{winner_id:e,loser_id:a}})}},match_results:{all:function(){return o({method:"GET",url:"match_results.json"})}}};return l}]),angular.module("valueMash").run(["$templateCache",function(e){e.put("modules/dashboard/dashboard.html",'<h4>Dashboard</h4><p>Not much going on here yet.</p><a ui-sref="layout_guest.login">Auth page</a>'),e.put("modules/layout/_layout_app_sidebar.html",'<div class="collection"><a ui-sref="layout_app.dashboard" class="collection-item">Dashboard</a><a ui-sref="layout_app.users" class="collection-item">Users</a><a ui-sref="layout_app.values" class="collection-item">Values</a><a ui-sref="layout_app.values.score" class="collection-item">Play</a><a ui-sref="layout_app.match_results" class="collection-item">Match results</a></div>'),e.put("modules/layout/layout_app.html",'<div class="row"><div ui-view="sidebar" class="col s3"></div><div ui-view="" class="col s9"></div></div>'),e.put("modules/layout/layout_guest.html",'<div class="row"><div ui-view="" class="col s12"></div></div>'),e.put("modules/guest/_change_password.modal.html",'<div id="modal1" class="modal modal-fixed-footer"><div class="modal-content"><h4>Set new password</h4><div class="row"><form name="resetPasswordForm" ng-submit="updatePassword(newPass)" novalidate="novalidate" class="col s12"><div class="row"><div class="input-field col s12"><input ng-model="newPass.password" type="password" required="required"> <label>Password</label></div></div><div class="row"><div class="input-field col s12"><input ng-model="newPass.password_confirmation" type="password" required="required"> <label>Password Confirmation</label></div></div><div class="row"><div class="input-field col s12"><button type="submit" ng-class="{disabled: resetPasswordForm.$invalid}" class="waves-effect waves-light btn">Submit</button></div></div></form></div></div><div class="modal-footer"><div href="#!" class="modal-action modal-close waves-effect waves-green btn-flata">Cancel</div></div></div>'),e.put("modules/guest/_change_password2.modal.html",'<div id="modal1" class="modal modal-fixed-footer"><div class="modal-content"><h4>Modal Header</h4><p>A bunch of text</p></div><div class="modal-footer"><div href="#!" class="modal-action modal-close waves-effect waves-green btn-flata">Agree</div></div></div>'),e.put("modules/guest/_change_password_modal.html",'<div id="change-pw-modal" class="modal"><div class="modal-content"><h5>Set new password</h5><div class="row"><form name="resetPasswordForm" ng-submit="updatePassword(newPass)" novalidate="novalidate" class="col s12"><div class="row"><div class="input-field col s6"><input ng-model="newPass.password" type="password" required="required"> <label>Password</label></div><div class="input-field col s6"><input ng-model="newPass.password_confirmation" type="password" required="required"> <label>Password Confirmation</label></div></div><div class="row"><div class="input-field col s12"><button type="submit" ng-class="{disabled: resetPasswordForm.$invalid}" class="waves-effect waves-light btn">Submit</button></div></div></form></div></div><div class="modal-footer"><a href="#!" class="modal-action modal-close waves-effect waves-green btn-flat">Cancel</a></div></div>'),e.put("modules/guest/login.html",'<div class="row"><a ui-sref="layout_app.dashboard" aria-label="Log in" class="waves-effect waves-light btn green lighten-1">Dashboard</a><a ng-click="modalTest($event)" class="waves-effect waves-light btn green lighten-1">Password change modal</a></div><div class="row"><form name="loginForm" ng-submit="submitLogin(credentials)" novalidate="novalidate" class="col s8"><div class="row"><div class="input-field col s6"><input ng-model="credentials.email" type="email" required="required" ng-minlength="8"> <label>Email</label></div><div class="input-field col s6"><input ng-model="credentials.password" type="password" required="required"> <label>Password</label></div></div><div class="row"><div class="input-field col s12"><button type="submit" ng-class="{disabled: loginForm.$invalid}" class="waves-effect waves-light btn">Log In</button></div></div></form></div><div class="row"><form name="signupForm" ng-submit="submitRegistration(signup)" novalidate="novalidate" class="col s8"><div class="row"><div class="input-field col s4"><input ng-model="signup.email" type="email" required="required"> <label>Email</label></div><div class="input-field col s4"><input ng-model="signup.password" type="password" required="required"> <label>Password</label></div><div class="input-field col s4"><input ng-model="signup.password_confirmation" type="password" required="required"> <label>Confirmation</label></div></div><div class="row"><div class="input-field col s6"><button type="submit" ng-class="{disabled: signupForm.$invalid}" class="waves-effect waves-light btn">Sign up</button></div></div></form></div><div class="row"><form name="resetPassForm" ng-submit="requestPasswordReset(reset)" novalidate="novalidate" class="col s8"><div class="row"><div class="input-field col s6"><input ng-model="reset.email" type="email" required="required"> <label>Email</label></div></div><div class="row"><div class="input-field col s6"><button type="submit" ng-class="{disabled: resetPassForm.$invalid}" class="waves-effect waves-light btn">Request password reset</button></div></div></form></div><pre>User: {{ user | json }}</pre><div id="change-pw-modal" class="modal"><div class="modal-content"><h5>Set new password</h5><div class="row"><form name="resetPasswordForm" ng-submit="updatePassword(newPass)" novalidate="novalidate" class="col s12"><div class="row"><div class="input-field col s6"><input ng-model="newPass.password" type="password" required="required"> <label>Password</label></div><div class="input-field col s6"><input ng-model="newPass.password_confirmation" type="password" required="required"> <label>Password Confirmation</label></div></div><div class="row"><div class="input-field col s12"><button type="submit" ng-class="{disabled: resetPasswordForm.$invalid}" class="waves-effect waves-light btn">Submit</button></div></div></form></div></div><div class="modal-footer"><a href="#!" class="modal-action modal-close waves-effect waves-green btn-flat">Cancel</a></div></div>'),e.put("modules/match_result/match_result.html",'<h4>Users</h4><table class="hoverable"><thead><tr><th>ID</th><th>User Id</th><th>Winner Id</th><th>Loser Id</th><th>Match Time</th></tr></thead><tbody><tr ng-repeat="result in results"><td>{{ result.id }}</td><th>{{ result.user_id }}</th><td>{{ result.winner_id }}</td><td>{{ result.loser_id }}</td><td>{{ result.created_at }}</td></tr></tbody></table>'),e.put("modules/user/user.html",'<h4>Users</h4><table class="hoverable"><thead><tr><th>ID</th><th></th><th>Email</th><th>Created</th></tr></thead><tbody><tr ng-repeat="user in users"><td>{{ user.id }}</td><th><i ng-if="user.admin" class="fa fa-star"></i></th><td>{{ user.email }}</td><td>{{ user.created_at }}</td></tr></tbody></table>'),e.put("modules/value/value.html",'<div ui-view=""><h4>Values</h4><table class="hoverable bordered"><tr class="header"><th width="20%">ID</th><th>Name</th><th>Description</th></tr><tr ng-repeat="value in values" class="body"><td>{{ value.id }}</td><td><a href="" ui-sref="layout_app.values.show({valueId: value.id})">{{ value.name }}</a></td><td>{{ value.description }}</td></tr></table><div ng-if="user.admin" class="row"><div class="col s12"><div class="card blue lighten-4"><div class="card-content"><span class="card-title black-text">Create new Value</span><form name="newValueForm" ng-submit="createValue(newValue);resetForm(newValueForm)" novalidate="novalidate" class="col s12"><div class="row"><div class="input-field col s6"><input ng-model="newValue.name" type="text" required="required"> <label>Name</label></div><div class="input-field col s6"><input ng-model="newValue.description" type="text" required="required"> <label>Description</label></div></div><div class="row"><div class="input-field col s12"><button type="submit" ng-class="{disabled: newValueForm.$invalid}" class="waves-effect waves-light blue ligthen-3 white-text btn">Create new Value</button></div></div></form></div></div></div></div></div>'),e.put("modules/value/value.score.html",'<h4>What do you value?</h4><div class="divider"></div><section><div class="row"><div class="col s6"><h4>{{ left.name }}</h4><h5>{{ left.description }}</h5><a ng-click="score(left.id,right.id)" class="waves-effect waves-light btn-large blue lighten-5 blue-text">Choose</a></div><div class="col s6"><h4>{{ right.name }}</h4><h5>{{ right.description }}</h5><a ng-click="score(right.id,left.id)" class="waves-effect waves-light btn-large blue lighten-5 blue-text">Choose</a></div></div></section>'),e.put("modules/value/value.show.html",'<h4><a href="" ui-sref="layout_app.values">Values</a>- {{ value.name }}</h4><div class="row"><form ng-if="user.admin" name="updateValueForm" ng-submit="updateValue(value)" novalidate="novalidate" class="col s12"><div class="row"><div class="input-field col s6"><input ng-model="value.name" type="text" required="required"> <label ng-class="{active: value.name}">Name</label></div><div class="input-field col s6"><input ng-model="value.description" type="text" required="required"> <label ng-class="{active: value.description}">Description</label></div></div><div class="row"><div class="input-field col s12"><button type="submit" ng-class="{disabled: updateValueForm.$invalid}" class="waves-effect waves-light red btn">Update Value</button></div></div></form></div>')}]);