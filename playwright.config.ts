import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "./tests",
  fullyParallel: false,
  forbidOnly: !!process.env.CI,
  workers: 1,
  retries: 0,
  reporter: [["html", { open: "never" }]],
  use: {
    baseURL: "http://127.0.0.1:3000",
    trace: "on-first-retry",
  },

  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },
    {
      name: "Mobile Safari",
      use: { ...devices["iPhone 14"] },
      testMatch: "ui/*.spec.ts",
    },
  ],

  webServer: {
    command: "yarn dev",
    url: "http://127.0.0.1:3000/whisper",
    reuseExistingServer: !process.env.CI,
  },
});
