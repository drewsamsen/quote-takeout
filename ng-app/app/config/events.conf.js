'use strict';

angular.module('quoteTakeout')

.run(function($rootScope, $state, Notifier) {

  $rootScope.$on('auth:registration-email-success', function(ev, data) {
    console.log('auth:registration-email-success');
  });

  $rootScope.$on('auth:registration-email-error', function(ev, data) {
    console.log('auth:registration-email-error');
  });

  $rootScope.$on('auth:email-confirmation-success', function(ev, user) {
    console.log('auth:email-confirmation-success');
    Notifier.show('Welcome, '+user.email+'. Your account has been verified.');
  });

  $rootScope.$on('auth:email-confirmation-error', function(ev, reason) {
    console.log('auth:email-confirmation-error');
    Notifier.show('There was an error with your registration.');
  });

  $rootScope.$on('auth:password-reset-request-success', function(ev, data) {
    console.log('auth:password-reset-request-success');
    Notifier.show('Password reset instructions were sent to '+data.email);
  });

  $rootScope.$on('auth:password-reset-request-error', function(ev, data) {
    console.log('auth:password-reset-request-error');
    Notifier.show('Password reset request failed: ' + data.errors[0]);
  });

  $rootScope.$on('auth:password-reset-confirm-error', function(ev, data) {
    console.log('auth:password-reset-confirm-error');
    Notifier.show('Unable to verify your account. Please try again.');
  });

  $rootScope.$on('auth:password-reset-confirm-success', function(ev, data) {
    console.log('auth:password-reset-confirm-success');
    $('#change-pw-modal').openModal();
  });

  $rootScope.$on('auth:password-change-success', function(ev, data) {
    console.log('auth:password-change-success');
    Notifier.show('Your password has been successfully updated!');
  });

  $rootScope.$on('auth:password-change-error', function(ev, data) {
    console.log('auth:password-change-error');
    Notifier.show('Registration failed: ' + data.errors[0]);
  });

  $rootScope.$on('auth:logout-success', function(ev, data) {
    console.log('auth:logout-success');
    Notifier.show('Goodbye');
    $state.go('layout_guest.login');
  });

  $rootScope.$on('auth:logout-error', function(ev, reason) {
    console.warn('auth:logout-error');
    Notifier.show('Logout failed: ' + reason.errors[0]);
  });

  $rootScope.$on('auth:account-update-success', function(ev, data) {
    console.log('auth:account-update-success');
    Notifier.show('Your account has been successfully updated.');
  });

  $rootScope.$on('auth:account-update-error', function(ev, data) {
    console.log('auth:account-update-error');
    Notifier.show('Update error: ' + data.errors[0]);
  });

  $rootScope.$on('auth:account-destroy-success', function(ev, data) {
    console.log('auth:account-destroy-success');
  });

  $rootScope.$on('auth:account-destroy-error', function(ev, data) {
    console.log('auth:account-destroy-error');
    Notifier.show('Your account has been destroyed.');
  });

  $rootScope.$on('auth:session-expired', function(ev, data) {
    console.log('auth:session-expired');
    Notifier.show('Session has expired');
  });

  $rootScope.$on('auth:validation-success', function(ev, data) {
    console.log('auth:validation-success');
  });

  $rootScope.$on('auth:validation-error', function(ev, data) {
    console.warn('auth:validation-error');
  });

  $rootScope.$on('auth:invalid', function(ev, data) {
    console.warn('auth:invalid');
  });

  $rootScope.$on('auth:validation-expired', function(ev, data) {
    console.log('auth:validation-expired');
  });

  $rootScope.$on('auth:login-success', function(ev, user) {
    console.log('auth:login-success');
    Notifier.show('Welcome ' + user.email);
    $state.go('layout_app.dashboard');
  });

  $rootScope.$on('auth:login-error', function(ev, reason) {
    console.log('auth:login-error');
    Notifier.show('Authentication failed: ' + reason.errors[0]);
  });

  $rootScope.$on('auth:registration-email-success', function(ev, message) {
    console.log('auth:registration-email-success');
    Notifier.show('A registration email was sent to ' + message.email);
  });

  $rootScope.$on('auth:registration-email-error', function(ev, reason) {
    console.log('auth:registration-email-error');
    Notifier.show('Registration failed: ' + reason.errors[0]);
  });

});