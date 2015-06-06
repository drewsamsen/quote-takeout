"use strict";angular.module("quoteTakeout",["ngAnimate","ngTouch","ngSanitize","ui.router","ngStorage","angular-cache","ng-token-auth","cfp.hotkeys"]).config(["$httpProvider","$authProvider","$locationProvider","API_URL",function(e,t,o,s){o.html5Mode(!1),o.hashPrefix("!"),"#%21"===window.location.hash.substr(0,4)&&window.location.replace(window.location.href.split("#%21").join("#!")),e.defaults.withCredentials=!0,t.configure({apiUrl:s})}]).run(["$rootScope","Notifier","$state","ENV","API_URL","Book","Quote",function(e,t,o,s,a,l,i){e.ENV=s,e.API_URL=a,e.Book=l,e.Quote=i,e.$on("$stateChangeError",function(){t.show("Please log in"),o.go("layout_guest.login")})}]),angular.module("quoteTakeout").controller("UserCtrl",["$scope","API",function(e,t){e.users={},t.users.all().then(function(t){console.log("resp",t),e.users=t.data.users})}]),angular.module("quoteTakeout").controller("LayoutGuestCtrl",["$scope","$rootScope","$state",function(e,t,o){e.$state=o,e.layoutModel={}}]),angular.module("quoteTakeout").controller("LayoutAppCtrl",["$scope","$rootScope","$state",function(e,t,o){e.$state=o,e.layoutModel={}}]),angular.module("quoteTakeout").controller("LoginCtrl",["$scope","API","Notifier",function(e,t,o){e.modalTest=function(){$("#change-pw-modal").openModal()},e.testNotices=function(e){o.show(e)},e.forgotPassword=function(){$("#forgot-pw-modal").openModal()}}]),angular.module("quoteTakeout").controller("DashboardCtrl",["$scope",function(){}]),angular.module("quoteTakeout").controller("BookShowCtrl",["$scope","Book","API","Quote","$stateParams","Notifier",function(e,t,o,s,a,l){e.newJsonPost={},e.selectedQuote={},e.bookQuotes=[],e.quotesCount=0,t.bootstrap(a.bookId,a.quoteId),e.updateBook=function(e){t.update(e.id,e)},e.deleteQuote=function(t,s){o.books.deleteQuote(t,s).then(function(t){if(200===t.status){l.show("Success: quote deleted"),e.quotesCount-=1,$("#show-quote-modal").closeModal();for(var o=0;o<e.bookQuotes.length;o++)if(e.bookQuotes[o].id===s){e.bookQuotes[o].is_deleted=!0;break}}})},e.addQuote=function(t,s){o.books.addQuote(t,s).then(function(t){200===t.status&&(l.show(t.data.summary.total+" total, "+t.data.summary.success+" quotes added, "+t.data.summary.duplicate+" duplicates ignored, "+t.data.summary.failure+" failures",7e3),e.newJsonPost={},e.bookQuotes=e.bookQuotes.concat(t.data.quotes))})},e.showQuote=function(e){s.quote=e,$("#show-quote-modal").openModal()},e.resetForm=function(e){e&&(e.$setPristine(),e.$setUntouched())}}]),angular.module("quoteTakeout").controller("BookCtrl",["$scope","API","Notifier","Book",function(e,t,o,s){e.newBook={},s.bootstrap(),e.createBook=function(a){t.books.create(a).then(function(t){200===t.status&&(o.show("Success: Added new book"),e.newBook={},s.books.push(t.data.book))})},e.resetForm=function(e){e&&(e.$setPristine(),e.$setUntouched())}}]),angular.module("quoteTakeout").config(["$stateProvider","$urlRouterProvider",function(e,t){t.otherwise("/login"),e.state("layout_guest",{"abstract":!0,views:{root:{templateUrl:"modules/layout/layout_guest.html",controller:"LayoutGuestCtrl"},header:{templateUrl:"modules/layout/_layout_app_header.html",controller:"LayoutAppCtrl"},footer:{templateUrl:"modules/layout/_layout_app_footer.html",controller:"LayoutAppCtrl"}}}).state("layout_guest.login",{url:"/login",templateUrl:"modules/guest/login.html",controller:"LoginCtrl"}).state("layout_app",{"abstract":!0,views:{root:{templateUrl:"modules/layout/layout_app.html",controller:"LayoutAppCtrl"},header:{templateUrl:"modules/layout/_layout_app_header.html",controller:"LayoutAppCtrl"},footer:{templateUrl:"modules/layout/_layout_app_footer.html",controller:"LayoutAppCtrl"}},resolve:{auth:["$auth",function(e){return e.validateUser()}]}}).state("layout_app.dashboard",{url:"/dashboard",templateUrl:"modules/dashboard/dashboard.html",controller:"DashboardCtrl"}).state("layout_app.users",{url:"/users",templateUrl:"modules/user/user.html",controller:"UserCtrl"}).state("layout_app.books",{url:"/books",templateUrl:"modules/book/book.html",controller:"BookCtrl"}).state("layout_app.books.show",{url:"/{bookId:[0-9]+}",templateUrl:"modules/book/book.show.html",controller:"BookShowCtrl"}).state("layout_app.books.show.quote",{url:"/quote/{quoteId:[0-9]+}",templateUrl:"modules/book/book.show.quote.html",controller:"BookShowCtrl"})}]),angular.module("quoteTakeout").constant("ENV","production").constant("API_URL",""),angular.module("quoteTakeout").run(["$rootScope","$state","Notifier",function(e,t,o){e.$on("auth:registration-email-success",function(){console.log("auth:registration-email-success")}),e.$on("auth:registration-email-error",function(){console.log("auth:registration-email-error")}),e.$on("auth:email-confirmation-success",function(e,t){console.log("auth:email-confirmation-success"),o.show("Welcome, "+t.email+". Your account has been verified.")}),e.$on("auth:email-confirmation-error",function(){console.log("auth:email-confirmation-error"),o.show("There was an error with your registration.")}),e.$on("auth:password-reset-request-success",function(e,t){console.log("auth:password-reset-request-success"),o.show("Password reset instructions were sent to "+t.email)}),e.$on("auth:password-reset-request-error",function(e,t){console.log("auth:password-reset-request-error"),o.show("Password reset request failed: "+t.errors[0])}),e.$on("auth:password-reset-confirm-error",function(){console.log("auth:password-reset-confirm-error"),o.show("Unable to verify your account. Please try again.")}),e.$on("auth:password-reset-confirm-success",function(){console.log("auth:password-reset-confirm-success"),$("change-pw-modal").openModal()}),e.$on("auth:password-change-success",function(){console.log("auth:password-change-success"),o.show("Your password has been successfully updated!")}),e.$on("auth:password-change-error",function(e,t){console.log("auth:password-change-error"),o.show("Registration failed: "+t.errors[0])}),e.$on("auth:logout-success",function(){console.log("auth:logout-success"),o.show("Goodbye"),t.go("layout_guest.login")}),e.$on("auth:logout-error",function(e,t){console.warn("auth:logout-error"),o.show("Logout failed: "+t.errors[0])}),e.$on("auth:account-update-success",function(){console.log("auth:account-update-success"),o.show("Your account has been successfully updated.")}),e.$on("auth:account-update-error",function(e,t){console.log("auth:account-update-error"),o.show("Update error: "+t.errors[0])}),e.$on("auth:account-destroy-success",function(){console.log("auth:account-destroy-success")}),e.$on("auth:account-destroy-error",function(){console.log("auth:account-destroy-error"),o.show("Your account has been destroyed.")}),e.$on("auth:session-expired",function(){console.log("auth:session-expired"),o.show("Session has expired")}),e.$on("auth:validation-success",function(){console.log("auth:validation-success")}),e.$on("auth:validation-error",function(){console.warn("auth:validation-error")}),e.$on("auth:invalid",function(){console.warn("auth:invalid")}),e.$on("auth:validation-expired",function(){console.log("auth:validation-expired")}),e.$on("auth:login-success",function(e,s){console.log("auth:login-success"),o.show("Welcome "+s.email),t.go("layout_app.dashboard")}),e.$on("auth:login-error",function(e,t){console.log("auth:login-error"),o.show("Authentication failed: "+t.errors[0])}),e.$on("auth:registration-email-success",function(e,t){console.log("auth:registration-email-success"),o.show("A registration email was sent to "+t.email)}),e.$on("auth:registration-email-error",function(e,t){console.log("auth:registration-email-error"),o.show("Registration failed: "+t.errors[0])})}]),angular.module("quoteTakeout").service("User",function(){var e={};return e}),angular.module("quoteTakeout").service("Quote",["API","Notifier",function(e){var t=function(e){return a.books[e]&&a.books[e].quotes&&angular.isArray(a.books[e].quotes)},o=function(e,t){if(console.log("fetchQuotes from collection in memory"),a.quotes=a.books[e].quotes,a.quotesCount=a.books[e].quotesCount,t)for(var o=0;o<a.quotes.length;o++)if(a.quotes[o].id==t){a.quote=a.quotes[o];break}},s=function(t,s){console.log("getQuotes from API"),e.books.getQuotes(t).then(function(e){a.books[t]={quotes:e.data.quotes,quotesCount:e.data.count},o(t,s)})},a={books:{},quotes:[],quotesCount:0,quote:{},bootstrapBook:function(e,a){var l=parseInt(e),i=parseInt(a);t(l)?o(l,i):s(l,i)}};return a}]),angular.module("quoteTakeout").service("Notifier",function(){var e={show:function(e,t){t=t||1800,Materialize.toast(e,t)}};return e}),angular.module("quoteTakeout").service("Book",["API","Notifier","Quote",function(e,t,o){var s=function(){r.filters.labels.length>0?angular.forEach(r.books,function(e,t){e.filteredOut=!0;for(var t=0;t<r.filters.labels.length;t++)if(-1!==e.labels.indexOf(r.filters.labels[t])){e.filteredOut=!1;break}}):angular.forEach(r.books,function(e){e.filteredOut=!1})},a=function(e){if(!(r.books&&r.books.length>0))return!1;for(var t=0;t<r.books.length;t++)if(r.books[t].id===parseInt(e))return!0},l=function(e){console.log("fetchBook from collection in memory");for(var t=0;t<r.books.length;t++)if(r.books[t].id===parseInt(e)){r.book=r.books[t];break}return!1},i=function(t){console.log("getBook from API"),e.books.get(t).then(function(e){r.book=e.data.book,r.book.labels=e.data.labels})},n=function(e){if(r.book.id==e.id&&(r.book=e),r.books&&r.books.length>0)for(var t=0;t<r.books.length;t++)if(r.books[t].id==e.id){r.books[t]=e;break}},r={books:[],book:{},labels:[],filters:{labels:[]},bootstrap:function(e,t){e?(a(e)?l(e):i(e),o.bootstrapBook(e,t)):(r.getBooks(),r.getLabels())},getBooks:function(){e.books.all().then(function(e){r.books=e.data.books})},update:function(o,s){e.books.update(o,s).then(function(e){200===e.status&&(t.show("Success: Book updated"),n(e.data.book))})},getLabels:function(){e.books.getAllLabels().then(function(e){200===e.status&&(r.labels=e.data.labels)})},toggleLabelFilter:function(e){var t=r.filters.labels.indexOf(e);-1===t?r.filters.labels.push(e):r.filters.labels.splice(t,1),s()}};return r}]),angular.module("quoteTakeout").service("API",["$http","$auth","Notifier","API_URL",function(e,t,o,s){var a=function(t){t=angular.extend({auth:!0,method:"",url:""},t);var o={method:t.method,url:s+"/"+t.url,data:t.data||null};return e(o)},l={users:{all:function(){return a({method:"GET",url:"users.json"})}},books:{all:function(){return a({method:"GET",url:"books.json"})},create:function(e){return a({method:"POST",url:"books.json",data:e})},get:function(e){return a({method:"GET",url:"books/"+e+".json"})},update:function(e,t){return a({method:"PUT",url:"books/"+e+".json",data:t})},getQuotes:function(e){return a({method:"GET",url:"books/"+e+"/quotes.json"})},addQuote:function(e,t){return a({method:"POST",url:"books/"+e+"/quotes.json",data:t})},deleteQuote:function(e,t){return a({method:"DELETE",url:"books/"+e+"/quotes/"+t+".json"})},getAllLabels:function(){return a({method:"GET",url:"books/labels.json"})}}};return l}]),angular.module("quoteTakeout").run(["$templateCache",function(e){e.put("modules/book/_quote_show_modal.html",'<div id="show-quote-modal" class="modal"><div class="modal-content"><section><h5><i class="fa fa-book">&nbsp;&nbsp;</i>{{ Book.book.name }}</h5></section><div class="divider"></div><section><p class="quote-body grey-text text-darken-1 flow-text"><i class="fa fa-quote-left grey-text text-lighten-2">&nbsp;</i>{{ Quote.quote.body }}&nbsp;<i class="fa fa-quote-right grey-text text-lighten-2"></i></p></section></div><div class="modal-footer"><a href="javascript:void(0)" class="modal-action modal-close waves-effect waves-green btn-flat">Close</a><a href="" ng-click="deleteQuote(Book.book.id, Quote.quote.id)" class="modal-action text-red waves-effect waves-red btn-flat red-text text-lighten-3"><i class="fa fa-trash">&nbsp;</i>Delete</a></div></div>'),e.put("modules/book/book.html",'<div ui-view=""><section><h4 class="grey-text text-darken-1">Books</h4></section><div ng-style="{\'margin-bottom\': \'20px\'}" class="divider"></div><section><p><span ng-repeat="label in Book.labels"><a href="" ng-click="Book.toggleLabelFilter(label)"><i ng-class="{\'fa-check-circle-o\': Book.filters.labels.indexOf(label) !== -1,\'fa-circle-o\': Book.filters.labels.indexOf(label) === -1}" class="fa">&nbsp;</i>{{ label }}</a><span ng-hide="$last" class="grey-text">,&nbsp;&nbsp;</span></span></p></section><div ng-style="{\'margin-bottom\': \'50px\'}" class="divider"></div><section><table class="hoverable bordered"><tr class="header grey-text text-lighten-1"><th>Book</th><th>Author</th><th>Labels</th><th>Quotes</th></tr><tr ng-repeat="book in Book.books" ng-hide="book.filteredOut" class="body"><td><a href="" ui-sref="layout_app.books.show({bookId: book.id})">{{ book.name }}</a></td><td>{{ book.author }}</td><td><span ng-repeat="label in book.labels">{{ label }}<span ng-hide="$last">, &nbsp;</span></span></td><td>{{ book.quote_count }}</td></tr></table></section><a href="" ng-click="addingNew = !addingNew" ng-style="{\'margin-top\': \'25px\'}" class="btn blue lighten-5 blue-text text-lighten-4">&nbsp;Add book&nbsp;<i class="fa fa-plus-circle right"></i></a><section ng-if="user.admin" ng-show="addingNew"><div class="row"><div class="col s12"><div class="card blue lighten-5"><div class="card-content"><span class="card-title blue-text">Create new book</span><form name="newBookForm" ng-submit="createBook(newBook);resetForm(newBookForm)" novalidate="novalidate" class="col s12"><div class="row"><div class="input-field col s4"><input ng-model="newBook.name" type="text" required="required"> <label>Name</label></div><div class="input-field col s4"><input ng-model="newBook.author" type="text" required="required"> <label>Author</label></div><div class="input-field col s4"><input ng-model="newBook.asin" type="text" required="required"> <label>ASIN</label></div></div><div class="row"><div class="input-field col s12"><button type="submit" ng-class="{disabled: newBookForm.$invalid}" class="waves-effect waves-light blue lighten-4 blue-text btn">Create new Book</button></div></div></form></div></div></div></div></section></div>'),e.put("modules/book/book.show.html",'<div ui-view=""><h4><a href="" ui-sref="layout_app.books">Books</a>- {{ Book.book.name }}</h4><div class="row"><form ng-if="user.admin" name="updateBookForm" ng-submit="updateBook(Book.book)" novalidate="novalidate" class="col s12"><div class="row"><div class="input-field col s4"><input ng-model="Book.book.name" type="text" required="required"> <label ng-class="{active: Book.book.name}">Name</label></div><div class="input-field col s4"><input ng-model="Book.book.author" type="text" required="required"> <label ng-class="{active: Book.book.author}">Author</label></div><div class="input-field col s4"><input ng-model="Book.book.asin" type="text" required="required"> <label ng-class="{active: Book.book.asin}">ASIN</label></div></div><div class="row"><div class="input-field col s12"><input ng-model="Book.book.labels" type="text" required="required"> <label ng-class="{active: Book.book.labels}">Labels</label></div></div><div class="row"><div class="input-field col s12"><button type="submit" ng-class="{disabled: updateBookForm.$invalid}" class="waves-effect waves-light blue btn">Update Book</button></div></div></form></div><a href="" ng-click="addingNew = !addingNew" class="btn blue">&nbsp;Add single quote&nbsp;<i class="fa fa-plus-circle right"></i></a><a href="" ng-click="addingJson = !addingJson" class="btn green">&nbsp;Post JSON&nbsp;<i class="fa fa-code right"></i></a><section ng-if="user.admin" ng-show="addingNew"><div class="row"><div class="col s12"><div class="card blue lighten-5"><div class="card-content"><span class="card-title blue-text">Add quote to book</span><form name="newQuoteForm" ng-submit="addQuote(Book.book.id, newQuote);resetForm(newQuoteForm)" novalidate="novalidate" class="col s12"><div class="row"><div class="input-field col s12"><textarea ng-model="newQuote.body" class="materialize-textarea"></textarea> <label>Body</label></div></div><div class="row"><div class="input-field col s12"><button type="submit" ng-class="{disabled: newQuoteForm.$invalid}" class="waves-effect waves-light blue lighten-4 blue-text btn">Add quote</button></div></div></form></div></div></div></div></section><section ng-if="user.admin" ng-show="addingJson"><div class="row"><div class="col s12"><div class="card blue lighten-5"><div class="card-content"><span class="card-title blue-text">Post some JSON</span><form name="newJsonPostForm" ng-submit="addQuote(Book.book.id, newJsonPost);resetForm(newJsonPostForm)" novalidate="novalidate" class="col s12"><div class="row"><div class="input-field col s12"><button type="submit" ng-class="{disabled: newJsonPostForm.$invalid}" class="waves-effect waves-light blue lighten-4 blue-text btn">Bulk add</button></div></div><div class="row"><div class="input-field col s12"><textarea ng-model="newJsonPost.body" class="materialize-textarea"></textarea> <label>JSON</label></div></div></form></div></div></div></div></section><section><h4>{{ Quote.quotesCount }} Quotes</h4><table class="hoverable bordered"><tr class="header grey-text text-lighten-1"><th>Quote</th><th></th></tr><tr ng-repeat="quote in Quote.quotes" ng-hide="quote.is_deleted" class="body"><td><p class="quote-body grey-text text-darken-1"><i class="fa fa-quote-left grey-text text-lighten-2">&nbsp;</i>{{ quote.body }}&nbsp;<i class="fa fa-quote-right grey-text text-lighten-2"></i></p></td><td><a href="javascript:void(0)" ng-click="showQuote(quote)" class="grey-text text-lighten-1"><i class="fa fa-external-link"></i></a><a href="" ui-sref="layout_app.books.show.quote({quoteId: quote.id})">| Permalink</a></td></tr></table></section><div id="show-quote-modal" class="modal"><div class="modal-content"><section><h5><i class="fa fa-book">&nbsp;&nbsp;</i>{{ Book.book.name }}</h5></section><div class="divider"></div><section><p class="quote-body grey-text text-darken-1 flow-text"><i class="fa fa-quote-left grey-text text-lighten-2">&nbsp;</i>{{ Quote.quote.body }}&nbsp;<i class="fa fa-quote-right grey-text text-lighten-2"></i></p></section></div><div class="modal-footer"><a href="javascript:void(0)" class="modal-action modal-close waves-effect waves-green btn-flat">Close</a><a href="" ng-click="deleteQuote(Book.book.id, Quote.quote.id)" class="modal-action text-red waves-effect waves-red btn-flat red-text text-lighten-3"><i class="fa fa-trash">&nbsp;</i>Delete</a></div></div></div>'),e.put("modules/book/book.show.quote.html",'<section><h4><a href="" ui-sref="layout_app.books">Books</a><span class="grey-text text-lighten-2">&nbsp;>&nbsp;</span><a href="" ui-sref="layout_app.books.show({bookId: Book.book.id})">{{ Book.book.name }}</a></h4></section><div class="divider"></div><section><p style="margin-top:95px;margin-bottom:170px;" class="quote-body grey-text text-darken-1 flow-text"><i class="fa fa-quote-left grey-text text-lighten-2">&nbsp;</i>{{ Quote.quote.body }}&nbsp;<i class="fa fa-quote-right grey-text text-lighten-2"></i></p></section>'),e.put("modules/dashboard/dashboard.html",'<section><h5 class="grey-text text-darken-1">Welcome!</h5><p>Books and quotes, yall.</p></section>'),e.put("modules/guest/_change_password_modal.html",'<div id="change-pw-modal" class="modal"><div class="modal-content"><h5>Set new password</h5><div class="row"><form name="resetPasswordForm" ng-submit="updatePassword(newPass)" novalidate="novalidate" class="col s12"><div class="row"><div class="input-field col s6"><input ng-model="newPass.password" type="password" required="required"> <label>Password</label></div><div class="input-field col s6"><input ng-model="newPass.password_confirmation" type="password" required="required"> <label>Password Confirmation</label></div></div><div class="row"><div class="input-field col s12"><button type="submit" ng-class="{disabled: resetPasswordForm.$invalid}" class="waves-effect waves-light btn">Submit</button></div></div></form></div></div><div class="modal-footer"><a href="#!" class="modal-action modal-close waves-effect waves-green btn-flat">Cancel</a></div></div>'),e.put("modules/guest/_forgot_password_modal.html",'<div id="forgot-pw-modal" class="modal"><div class="modal-content"><h5>Request password change</h5><p>You will be emailed instructions to change your password.</p><div class="row"><form name="resetPassForm" ng-submit="requestPasswordReset(reset)" novalidate="novalidate" class="col s12"><div class="row"><div class="input-field col s6"><input ng-model="reset.email" type="email" required="required"> <label>Email</label></div></div><div class="row"><div class="input-field col s6"><button type="submit" ng-class="{disabled: resetPassForm.$invalid}" class="waves-effect waves-light btn">Request password reset email</button></div></div></form></div></div><div class="modal-footer"><a href="#!" class="modal-action modal-close waves-effect waves-green btn-flat">Cancel</a></div></div>'),e.put("modules/guest/login.html",'<section><h5 class="grey-text text-darken-1">What is this?</h5><p>Books and quotes, yall</p></section><div ng-style="{\'margin-bottom\': \'15px\'}" class="divider"></div><section><div class="row"><div class="col s6"><div class="card amber lighten-5"><div class="card-content"><h5>Log in</h5><form name="loginForm" ng-submit="submitLogin(credentials)" novalidate="novalidate"><div class="row"><div class="input-field col s12"><input ng-model="credentials.email" type="email" required="required" ng-minlength="8"> <label>Email</label></div></div><div class="row"><div class="input-field col s12"><input ng-model="credentials.password" type="password" required="required"> <label>Password</label></div></div><div class="row"><div class="input-field col s12"><button type="submit" ng-class="{disabled: loginForm.$invalid}" class="waves-effect waves-light btn">Log In</button>&nbsp;&nbsp;&nbsp;<a href="" ng-click="forgotPassword()" class="blue-text text-lighten-3">Forgot your password?</a></div></div></form></div></div></div><div class="col s6"><div class="card amber lighten-5"><div class="card-content"><h5>Sign up</h5><form name="signupForm" ng-submit="submitRegistration(signup)" novalidate="novalidate"><div class="row"><div class="input-field col s12"><input ng-model="signup.email" type="email" required="required"> <label>Email</label></div></div><div class="row"><div class="input-field col s6"><input ng-model="signup.password" type="password" required="required"> <label>Password</label></div><div class="input-field col s6"><input ng-model="signup.password_confirmation" type="password" required="required"> <label>Confirmation</label></div></div><div class="row"><div class="input-field col s6"><button type="submit" ng-class="{disabled: signupForm.$invalid}" class="waves-effect waves-light btn">Sign up</button></div></div></form></div></div></div></div></section><div class="divider"></div><section><p class="grey-text"><i class="fa fa-code">&nbsp;</i>Want to help? drewsamsen@gmail.com</p></section><section class="white-text"><h6>Current User</h6><pre>User: {{ user | json }}</pre></section><section><p><a ng-click="modalTest($event)" class="white-text">Password change modal</a></p></section><div id="change-pw-modal" class="modal"><div class="modal-content"><h5>Set new password</h5><div class="row"><form name="resetPasswordForm" ng-submit="updatePassword(newPass)" novalidate="novalidate" class="col s12"><div class="row"><div class="input-field col s6"><input ng-model="newPass.password" type="password" required="required"> <label>Password</label></div><div class="input-field col s6"><input ng-model="newPass.password_confirmation" type="password" required="required"> <label>Password Confirmation</label></div></div><div class="row"><div class="input-field col s12"><button type="submit" ng-class="{disabled: resetPasswordForm.$invalid}" class="waves-effect waves-light btn">Submit</button></div></div></form></div></div><div class="modal-footer"><a href="#!" class="modal-action modal-close waves-effect waves-green btn-flat">Cancel</a></div></div><div id="forgot-pw-modal" class="modal"><div class="modal-content"><h5>Request password change</h5><p>You will be emailed instructions to change your password.</p><div class="row"><form name="resetPassForm" ng-submit="requestPasswordReset(reset)" novalidate="novalidate" class="col s12"><div class="row"><div class="input-field col s6"><input ng-model="reset.email" type="email" required="required"> <label>Email</label></div></div><div class="row"><div class="input-field col s6"><button type="submit" ng-class="{disabled: resetPassForm.$invalid}" class="waves-effect waves-light btn">Request password reset email</button></div></div></form></div></div><div class="modal-footer"><a href="#!" class="modal-action modal-close waves-effect waves-green btn-flat">Cancel</a></div></div>'),e.put("modules/layout/_layout_app_footer.html",'<div class="container"><div class="row"><div class="col l6 s12"><h5 class="blue-text text-lighten-4">Footer Content</h5><p class="blue-text text-lighten-4">You can use rows and columns here to organize your footer content.</p></div><div class="col l4 offset-l2 s12"><h5 class="blue-text text-lighten-4">Links</h5><ul><li ui-sref-active-eq="blue lighten-1" ng-show="user.admin"><a href="#" ui-sref="layout_app.users" class="blue-text text-lighten-4">Users</a></li><li><a href="#!" ng-hide="user.admin" class="blue-text text-lighten-4">Link 1</a></li><li><a href="#!" class="blue-text text-lighten-4">Link 2</a></li><li><a href="#!" class="blue-text text-lighten-4">Link 3</a></li><li><a href="#!" class="blue-text text-lighten-4">Link 4</a></li></ul></div></div></div><div class="footer-copyright"><div class="container blue-text text-lighten-3">&copy; 2020 Copyright or whatever<span class="blue-text text-lighten-4 right"><i class="fa fa-code">&nbsp;</i>Want to help? drewsamsen@gmail.com</span></div></div>'),e.put("modules/layout/_layout_app_header.html",'<div class="nav-wrapper"><ul class="left hide-on-med-and-down"><li ui-sref-active-eq="blue lighten-1" ng-show="user.email"><a href="#" ui-sref="layout_app.dashboard"><i class="fa fa-home blue-text text-lighten-5"></i></a></li><li ui-sref-active-eq="blue lighten-1" ng-show="user.email"><a ui-sref="layout_app.books"><i class="fa fa-book blue-text text-lighten-5"></i></a></li></ul><ul class="right hide-on-med-and-down"><li ng-hide="user.signedIn"><a href="#" ui-sref="layout_guest.login"><i class="fa fa-user right"></i> Login / Sign up</a></li><li ng-show="user.signedIn"><a href="#" ui-sref="layout_app.dashboard">{{ user.email }}</a></li><li ng-show="user.signedIn"><a href="#" ng-click="signOut()"><i class="fa fa-chain-broken right"></i> Sign out</a></li></ul></div>'),e.put("modules/layout/layout_app.html",'<div ui-view="" class="col s12"></div>'),e.put("modules/layout/layout_guest.html",'<div class="row"><div ui-view="" class="col s12"></div></div>'),e.put("modules/match_result/match_result.html",'<h4 class="grey-text text-darken-1">Recent matches</h4><table class="hoverable"><thead><tr><th>ID</th><th>User Id</th><th>Winner Id</th><th>Loser Id</th><th>Match Time</th></tr></thead><tbody><tr ng-repeat="result in results"><td>{{ result.id }}</td><th>{{ result.user_id }}</th><td>{{ result.winner_id }}</td><td>{{ result.loser_id }}</td><td>{{ result.created_at | date:\'medium\' }}</td></tr></tbody></table>'),e.put("modules/quote/_quote.show_modal.html",'<div id="show-quote-modal" class="modal"><div class="modal-content"><h5>Quote#show</h5><div class="row"><form name="resetPasswordForm" ng-submit="updatePassword(newPass)" novalidate="novalidate" class="col s12"><div class="row"><div class="input-field col s6"><input ng-model="newPass.password" type="password" required="required"> <label>Password</label></div><div class="input-field col s6"><input ng-model="newPass.password_confirmation" type="password" required="required"> <label>Password Confirmation</label></div></div><div class="row"><div class="input-field col s12"><button type="submit" ng-class="{disabled: resetPasswordForm.$invalid}" class="waves-effect waves-light btn">Submit</button></div></div></form></div></div><div class="modal-footer"><a href="#!" class="modal-action modal-close waves-effect waves-green btn-flat">Cancel</a></div></div>'),e.put("modules/quote/_quote_show_modal.html",'<div id="show-quote-modal" class="modal"><div class="modal-content"><h5>Quote#show</h5><div class="row"><form name="resetPasswordForm" ng-submit="updatePassword(newPass)" novalidate="novalidate" class="col s12"><div class="row"><div class="input-field col s6"><input ng-model="newPass.password" type="password" required="required"> <label>Password</label></div><div class="input-field col s6"><input ng-model="newPass.password_confirmation" type="password" required="required"> <label>Password Confirmation</label></div></div><div class="row"><div class="input-field col s12"><button type="submit" ng-class="{disabled: resetPasswordForm.$invalid}" class="waves-effect waves-light btn">Submit</button></div></div></form></div></div><div class="modal-footer"><a href="#!" class="modal-action modal-close waves-effect waves-green btn-flat">Cancel</a></div></div>'),e.put("modules/quote/quote.show.html",'<section><h4><a href="" ui-sref="layout_app.books">Books</a><span class="grey-text text-lighten-2">&nbsp;>&nbsp;</span><a href="" ui-sref="layout_app.books.show({bookId: Book.book.id})">{{ Book.book.name }}</a></h4></section><div class="divider"></div><section><p style="margin-top:95px;margin-bottom:170px;" class="quote-body grey-text text-darken-1 flow-text"><i class="fa fa-quote-left grey-text text-lighten-2">&nbsp;</i>{{ Quote.quote.body }}&nbsp;<i class="fa fa-quote-right grey-text text-lighten-2"></i></p></section>'),e.put("modules/user/user.html",'<h4 class="grey-text text-darken-1">Users</h4><table class="hoverable"><thead><tr><th>ID</th><th></th><th>Email</th><th>Created</th></tr></thead><tbody><tr ng-repeat="user in users"><td>{{ user.id }}</td><th><i ng-if="user.admin" class="fa fa-star"></i></th><td>{{ user.email }}</td><td>{{ user.created_at | date:\'medium\' }}</td></tr></tbody></table>'),e.put("modules/value/value.html",'<div ui-view=""><section><h4 class="grey-text text-darken-1">Results</h4><p><a href="#" ui-sref="layout_app.values.score">Play more</a>&nbsp;to get more interesting &amp; accurate scores.</p></section><div ng-style="{\'margin-bottom\': \'50px\'}" class="divider"></div><section><table class="hoverable bordered"><tr class="header grey-text text-lighten-1"><th>Value</th><th><a href="" ng-click="sortScore()" class="grey-text text-lighten-1"><span ng-style="{padding: \'4px 16px\'}" class="blue-text text-lighten-2 blue lighten-5">Score&nbsp;&nbsp;<i class="fa fa-sort"></i></span></a></th><th><a href="" ng-click="sortAverageDiff()" class="grey-text text-lighten-1"><span ng-style="{padding: \'4px 16px\'}" class="blue-text text-lighten-2 blue lighten-5">Versus site average&nbsp;&nbsp;<i class="fa fa-sort"></i></span></a></th><th>Description</th><th>ID</th></tr><tr ng-repeat="value in Value.values" ng-init="diff = value.score - value.average" class="body"><td><a href="" ui-sref="layout_app.values.show({valueId: value.id})">{{ value.name }}</a></td><td>{{ value.score }}</td><td><span ng-if="diff != 0" ng-class="{\'red-text\': diff &lt; 0, \'green-text\': diff &gt; 0}"><span ng-if="diff &gt; 0">+</span>{{ diff }}</span></td><td>{{ value.description }}</td><td>{{ value.id }}</td></tr></table></section><a href="" ng-click="addingNew = !addingNew" ng-style="{\'margin-top\': \'25px\'}" class="btn blue lighten-5 blue-text text-lighten-4">&nbsp;Add value&nbsp;<i class="fa fa-plus-circle right"></i></a><section ng-if="user.admin" ng-show="addingNew"><div class="row"><div class="col s12"><div class="card blue lighten-5"><div class="card-content"><span class="card-title blue-text">Create new value</span><form name="newValueForm" ng-submit="createValue(newValue);resetForm(newValueForm)" novalidate="novalidate" class="col s12"><div class="row"><div class="input-field col s6"><input ng-model="newValue.name" type="text" required="required"> <label>Name</label></div><div class="input-field col s6"><input ng-model="newValue.description" type="text" required="required"> <label>Description</label></div></div><div class="row"><div class="input-field col s12"><button type="submit" ng-class="{disabled: newValueForm.$invalid}" class="waves-effect waves-light blue lighten-4 blue-text btn">Create new Value</button></div></div></form></div></div></div></div></section></div>'),e.put("modules/value/value.score.html",'<section><h4 class="grey-text text-darken-1">Play</h4><p class="grey-text">Go faster with keyboard shortcuts: Press \'?\' for keymap.</p></section><div ng-style="{\'margin-bottom\': \'40px\'}" class="divider"></div><section><h5 class="grey-text text-lighten-2">Which do you value more:</h5><div class="row"><div class="col s6"><div class="card amber lighten-5"><div class="card-content"><h4>{{ left.name }}</h4><h6>{{ left.description }}</h6></div><div ng-click="score(left,right)" ng-class="{\'lighten-3\': hoverLeft}" ng-mouseenter="hoverLeft = true" ng-mouseleave="hoverLeft = false" class="card-action amber lighten-4 show-clickable right-align"><a class="blue-text">Select&nbsp;<i class="fa fa-check"></i></a></div></div></div><div class="col s6"><div class="card amber lighten-5"><div class="card-content"><h4>{{ right.name }}</h4><h6>{{ right.description }}</h6></div><div ng-click="score(right,left)" ng-class="{\'lighten-3\': hoverRight}" ng-mouseenter="hoverRight = true" ng-mouseleave="hoverRight = false" class="card-action amber lighten-4 show-clickable right-align"><a class="blue-text">Select&nbsp;<i class="fa fa-check"></i></a></div></div></div></div></section><div class="divider"></div><section class="grey-text"><p>Too close to call?&nbsp;&nbsp;&nbsp;<a ng-click="skipMatch()" class="waves-effect waves-teal btn-flat grey lighten-3">Skip both</a></p></section>'),e.put("modules/value/value.show.html",'<h4><a href="" ui-sref="layout_app.values">Values</a>- {{ value.name }}</h4><div class="row"><form ng-if="user.admin" name="updateValueForm" ng-submit="updateValue(value)" novalidate="novalidate" class="col s12"><div class="row"><div class="input-field col s6"><input ng-model="value.name" type="text" required="required"> <label ng-class="{active: value.name}">Name</label></div><div class="input-field col s6"><input ng-model="value.description" type="text" required="required"> <label ng-class="{active: value.description}">Description</label></div></div><div class="row"><div class="input-field col s12"><button type="submit" ng-class="{disabled: updateValueForm.$invalid}" class="waves-effect waves-light red btn">Update Value</button></div></div></form></div>')
}]);