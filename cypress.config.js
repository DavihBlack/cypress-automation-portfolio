const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://www.saucedemo.com/',
    
    setupNodeEvents(on, config) {
      on("before:browser:launch", (browser, launchOptions) => {
        if (browser.family === "chromium" && browser.name !== 'electron') {

          launchOptions.preferences.default.credentials_enable_service = false

          launchOptions.preferences.default.profile = {
            ...(launchOptions.preferences.default.profile || {}),
            password_manager_enabled: false,
            password_manager_leak_detection: false,
          }

          launchOptions.args.push(
            '--disable-features=PasswordLeakDetection'
          )
        }

        return launchOptions
      })
    },
  },
})