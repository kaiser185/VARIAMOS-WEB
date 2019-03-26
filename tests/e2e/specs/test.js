// For authoring Nightwatch tests, see
// http://nightwatchjs.org/guide#usage

module.exports = {
  'create a model structure': browser => {
    browser
      .maximizeWindow()
      .url(process.env.VUE_DEV_SERVER_URL)
      .waitForElementVisible('#app', 5000)
      .assert.elementPresent('[id="app"]')
      .click('[data-test="newprojectbutton"]')
      .waitForElementVisible('[data-test="newprojectmodal"]', 5000)
      .setValue('[data-test="newprojectmodalinput"]', 'nightwatch')
      .click('[data-test="newprojectmodal"] button:last-child')
      .waitForElementVisible('.naza-tree-row', 5000)
      .pause(300)
      .moveToElement('.naza-tree-row a i', 0, 0)
      .mouseButtonClick(0)
      .pause(300)
      .moveToElement('[data-test="modelFolder"]', 0, 0)
      .pause(100)
      .mouseButtonClick(0)
      .pause(300)
      .moveToElement('[title="Root Feature"]', 0, 0)
      .mouseButtonDown(0)
      .moveToElement('#graphContainer svg', 300, 200)
      .mouseButtonUp(0)
      .pause(9000)
      .end()
  }
}
