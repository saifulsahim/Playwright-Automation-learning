import { defineConfig, devices, expect } from '@playwright/test';
import { TIMEOUT } from 'node:dns';

const config = ({
  testDir: './tests',
  retries : 1,
  workers : 3,
  timeout: 30 * 1000, // timeout for all tests
  expect: {
    timeout: 5000  // 5s timeout for all assertions
  },
  reporter: 'html',
  projects: [
    {
      name: 'safari',
      use: {

        browserName: 'webkit',
        headless: false,
        screenshot: 'off',
        trace: 'on',
        ...devices['iPhone 11 Pro Max'],
      },

    },
    {
      name : 'chrome',
      use: {

        browserName: 'chromium',
        headless: false,
        screenshot: 'on', 
        video : 'retain-on-failure',
        trace: 'on',
        ignoreHttpsErrors : true,
        permissions: ['geolocation'],
       // viewport : {width : 720, height : 720}
       //...devices['Galaxy Tab S4'],
      },
    }


  ],





});

module.exports = config;