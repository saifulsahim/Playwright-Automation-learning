import { defineConfig, devices, expect } from '@playwright/test';
import { TIMEOUT } from 'node:dns';

const config = ({
  testDir: './tests',
  timeout : 30 * 1000, // timeout for all tests
  expect: {
    timeout: 5000  // 5s timeout for all assertions
  },
  reporter: 'html',
  use: {

    browserName: 'firefox',
    headless: false
  },

 

  
}); 

module.exports = config;