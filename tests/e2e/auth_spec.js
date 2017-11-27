describe('Auth', function() {
  var usernameField = element(by.model('auth.user.username'));
  var passwordField = element(by.model('auth.user.password'));
  var SignInButton = element(by.buttonText('Sign In'));
  var SignUpLink = element(by.linkText('Sign Up'));
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
    browser.get('http://localhost:8080/');
  });

  it('should redirect to login view', function() {
    expect(browser.getCurrentUrl())
      .toBe('http://localhost:8080/#!/login');
  });

  it('should login user', function() {
    login('buster', '12345678');

    expect(browser.getCurrentUrl())
      .toBe('http://localhost:8080/#!/');
  });

  it('should not login user with invalid username', function() {
    login('busterX', '12345678');

    expect(browser.getCurrentUrl())
      .toBe('http://localhost:8080/#!/login');

    expect(element(by.css('.alert-danger')).getText()).toEqual('Incorrect login or(and) password\n×');
  });
});
