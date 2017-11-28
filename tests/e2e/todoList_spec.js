var BASE_URL = 'http://localhost:8080/#!';
var PROJECT_NAME_PREFIX = Date.now();

var usernameField = element(by.model('auth.user.username'));
var passwordField = element(by.model('auth.user.password'));
var SignInButton = element(by.buttonText('Sign In'));

function login(username, password) {
  usernameField.sendKeys(username);
  passwordField.sendKeys(password);
  SignInButton.click();
}

describe('Projects', function() {
  var projectNameField = element(by.model('projects.newProject.name'));
  var createProjectButton = element(by.buttonText('Create Project'));

  function addProject(name) {
    projectNameField.sendKeys(name);
    createProjectButton.click();
  }

  beforeAll(function() {
    browser.get(BASE_URL + '/login');
    login('buster', '12345678');
  });

  afterAll(function() {
    browser.executeScript('window.sessionStorage.clear();');
    browser.executeScript('window.localStorage.clear();');
  });

  it('should create new project', function() {
    addProject('Test project' + PROJECT_NAME_PREFIX);

    //var list = element(by.css('.project'));

    //expect(1).toBe(1);
  });
});
