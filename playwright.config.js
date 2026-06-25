import { defineConfig, devices, expect } from '@playwright/test';
import { TIMEOUT } from 'node:dns';

const config = ({
  testDir: './tests',
  retries : 2,
  timeout : 30 * 1000, // timeout for all tests
  expect: {
    timeout: 5000  // 5s timeout for all assertions
  },
  reporter: 'html',
  use: {

    browserName: 'chromium',
    headless: true,
    screenshot: 'on',
    trace: 'on',
  },

 

  
}); 

module.exports = config;