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

describe('ToDO List', function() {
  var projectNameField = element(by.model('projects.newProject.name'));
  var createProjectButton = element(by.buttonText('Create Project'));
  /*var cancelButton = element(by.buttonText('Cancel'));*/

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
    //browser.sleep(60000);
    addProject('Test project' + PROJECT_NAME_PREFIX);

    element.all(by.css('div .row .project')).then(function(items) {
      expect(items[items.length - 1].getText()).toBe('Test project' + PROJECT_NAME_PREFIX);
    });
  });

  it('should not create duplicate project', function() {
    addProject('Test project' + PROJECT_NAME_PREFIX);

    expect(element(by.css('.alert-danger')).getText())
      .toContain('The project with such name does already exist.');
    /*cancelButton.click();*/
  });

  it('should edit project', function() {
    element.all(by.css('div .row .project')).then(function(items) {
      browser.actions().
        mouseMove(items[items.length - 1]).
        perform();
    });

    element.all(by.css('.fa-pencil')).then(function(items) {
      items[items.length - 1].click();
    });
    browser.sleep(1000);
    var editProjectNameField = element(by.model('projectDetail.project.name'));
    var saveProjectButton = element(by.buttonText('Save'));

    editProjectNameField.clear();
    editProjectNameField.sendKeys('Test project EDITED' + PROJECT_NAME_PREFIX);
    saveProjectButton.click();

    element.all(by.css('div .row .project')).then(function(items) {
      expect(items[items.length - 1].getText()).toBe('Test project EDITED' + PROJECT_NAME_PREFIX);
    });
  });

  it('should add task to the project', function() {
    element.all(by.css('div .row .project')).then(function(items) {
      browser.actions().
        mouseMove(items[items.length - 1]).
        click().
        perform();
    });

    browser.sleep(1000);
    var addTaskField = element.all(by.model('tasks.newTask.name')).last();
    var addTaskButton = element(by.buttonText('Add task'));
    function addTask(name, n) {
      addTaskField.sendKeys(name + ' ' + n);
      addTaskButton.click();
    }

    addTask('Test task', 1);
    /*addTask('Test task', 2)
    addTask('Test task', 3)*/

    element.all(by.css('div .row .task')).then(function(tasks) {
      /*expect(tasks[tasks.length - 3].getText()).toBe('Test task 1');
      expect(tasks[tasks.length - 2].getText()).toBe('Test task 2');*/
      expect(tasks[tasks.length - 1].getText()).toBe('Test task 1');
    });

    /*editProjectNameField.clear();
    editProjectNameField.sendKeys('Test project EDITED' + PROJECT_NAME_PREFIX);
    saveProjectButton.click();

    element.all(by.css('div .row .project')).then(function(items) {
      expect(items[items.length - 1].getText()).toBe('Test project EDITED' + PROJECT_NAME_PREFIX);
    });*/
  });
});
