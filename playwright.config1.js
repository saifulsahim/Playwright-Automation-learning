import { defineConfig, devices, expect } from '@playwright/test';
import { TIMEOUT } from 'node:dns';

const config = ({
  testDir: './tests',
  timeout: 30 * 1000, // timeout for all tests
  expect: {
    timeout: 5000  // 5s timeout for all assertions
  },
  reporter: 'html',
  projects: [
    {
      name: 'firefox',
      use: {

        browserName: 'firefox',
        headless: false,
        screenshot: 'off',
        trace: 'on',
      },

    },
    {
      name : 'chrome',
      use: {

        browserName: 'chromium',
        headless: false,
        screenshot: 'on', 
        trace: 'on',
      },
    }


  ],





});

module.exports = config;