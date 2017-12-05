var BASE_URL = 'http://localhost:8080/#!';
var USERNAME_PREFIX = Date.now();

describe('Register', function() {
  var usernameField = element(by.model('auth.user.username'));
  var passwordField = element(by.model('auth.user.password'));
  var passwordConfirmField = element(by.model('auth.user.password_confirmation'));
  var SignUpButton = element(by.buttonText('Sign Up'));
  var SignInLink = element(by.linkText('Sign In'));

  function register(username, password, passwordConfirm) {
    usernameField.sendKeys(username);
    passwordField.sendKeys(password);
    passwordConfirmField.sendKeys(passwordConfirm);
    SignUpButton.click();
  }

  afterEach(function() {
    browser.executeScript('window.sessionStorage.clear();');
    browser.executeScript('window.localStorage.clear();');
  });

  beforeEach(function() {
    browser.get(BASE_URL + '/register');
  });

  it('should register new user', function() {
    register('Buster' + USERNAME_PREFIX, '12345678', '12345678');

    expect(browser.getCurrentUrl()).toBe(BASE_URL + '/');
  });

  it('should not register duplicate user', function() {
    register('Buster' + USERNAME_PREFIX, '12345678', '12345678');

    expect(browser.getCurrentUrl()).toBe(BASE_URL + '/register');
    expect(element(by.css('.alert-danger')).getText())
      .toContain('This login already registered. Please, log in.');
  });

  it('should not register user without password confirmation', function() {
    register('BusterX', '12345678', '123');

    expect(browser.getCurrentUrl()).toBe(BASE_URL + '/register');
    expect(element(by.css('.alert-danger')).getText())
      .toContain('Password and Confirm password fields doesn\'t match');
  });

  it('should not register user with too short username', function() {
    register('Bu', '12345678', '123');

    expect(browser.getCurrentUrl()).toBe(BASE_URL + '/register');
    expect(element(by.css('.alert-danger')).getText())
      .toContain('Username is too short. Minimum 3 characters.');
  });

  it('should not register user with too long username', function() {
    var longUsername = new Array(55).join( 'x' );
    register(longUsername, '12345678', '12345678');

    expect(browser.getCurrentUrl()).toBe(BASE_URL + '/register');
    expect(element(by.css('.alert-danger')).getText())
      .toContain('Username is too long. Maximum 50 characters.');
  });

  it('should redirect to login page', function() {
    SignInLink.click();

    expect(browser.getCurrentUrl()).toBe(BASE_URL + '/login');
  });
});

describe('LogIn', function() {
  var usernameField = element(by.model('auth.user.username'));
  var passwordField = element(by.model('auth.user.password'));
  var SignInButton = element(by.buttonText('Sign In'));
  var SignUpLink = element(by.linkText('Sign Up'));

  function login(username, password) {
    usernameField.sendKeys(username);
    passwordField.sendKeys(password);
    SignInButton.click();
  }

  afterEach(function() {
    browser.executeScript('window.sessionStorage.clear();');
    browser.executeScript('window.localStorage.clear();');
  });

  beforeEach(function() {
    browser.get(BASE_URL + '/');
  });

  it('should redirect to login view', function() {
    expect(browser.getCurrentUrl()).toBe(BASE_URL + '/login');
  });

  it('should login user', function() {
    login('buster', '12345678');

    expect(browser.getCurrentUrl()).toBe(BASE_URL + '/');
  });

  it('should not login user with invalid username', function() {
    login('busterX', '12345678');

    expect(browser.getCurrentUrl()).toBe(BASE_URL + '/login');
    expect(element(by.css('.alert-danger')).getText()).toEqual('Incorrect login or(and) password\n×');
  });

  it('should not login user with invalid password', function() {
    login('buster', '12345678XXXX');

    expect(browser.getCurrentUrl()).toBe(BASE_URL + '/login');
    expect(element(by.css('.alert-danger')).getText()).toEqual('Incorrect login or(and) password\n×');
  });

  it('should redirect to register page', function() {
    SignUpLink.click();

    expect(browser.getCurrentUrl()).toBe(BASE_URL + '/register');
  });
});

describe('LogOut', function() {
  var usernameField = element(by.model('auth.user.username'));
  var passwordField = element(by.model('auth.user.password'));
  var SignInButton = element(by.buttonText('Sign In'));

  var LogOutLink = element(by.id('LogOut'));

  function login(username, password) {
    usernameField.sendKeys(username);
    passwordField.sendKeys(password);
    SignInButton.click();
  }

  afterEach(function() {
    browser.executeScript('window.sessionStorage.clear();');
    browser.executeScript('window.localStorage.clear();');
  });

  beforeEach(function() {
    browser.get(BASE_URL + '/login');
    login('buster', '12345678');
  });

  it('should be logged in', function() {
    expect(browser.getCurrentUrl()).toBe(BASE_URL + '/');
  });

  it('should log out user', function() {
    LogOutLink.click();

    expect(browser.getCurrentUrl()).toBe(BASE_URL + '/login');
  });
});
