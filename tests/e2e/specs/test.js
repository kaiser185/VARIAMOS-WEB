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
      .moveToElement('[title="Leaf Feature"]', 0, 0)
      .mouseButtonDown(0)
      .moveToElement('#graphContainer svg', 500, 200)
      .mouseButtonUp(0)
      .pause(50)
      .useXpath()
      //https://stackoverflow.com/questions/2994198/xpath-to-return-only-elements-containing-the-text-and-not-its-parents
      //https://groups.google.com/forum/#!topic/nightwatchjs/JvA2QLPGVFU
      .moveToElement('//*/text()[normalize-space(.)="leaf"]/parent::*', 5, 5)
      .mouseButtonDown(0)
      .moveToElement('//*/text()[normalize-space(.)="root"]/parent::*', 5, 5)
      .mouseButtonUp(0)
      .useCss()
      .click('#buttonSAVE')
      .pause(100)
      .click('.modal-container button')
      .pause(100)
      .useXpath()
      .click('//div[@class="tabs"]//*/text()[normalize-space(.)="component"]/parent::*')
      .execute(function() {
        return window.localStorage.getItem('Domain - nightwatch');
      }, [], function(result) {
        this.assert.equal(result.status, 0)
        this.assert.notStrictEqual(result.value, '')
      })
      //.element('xpath', '//*/text()[normalize-space(.)="root"]/parent::*', result => {
      //  console.log(result)
      //})
      .pause(9000)
      .end()
  }
}
