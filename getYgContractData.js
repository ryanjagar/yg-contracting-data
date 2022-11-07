const puppeteer = require("puppeteer");
const fs = require("fs");

(async () => {
  async function waitFile(filename) {
    return new Promise(async (resolve, reject) => {
      if (!fs.existsSync(filename)) {
        console.log("waiting for file");
        await delay(3000);
        await waitFile(filename);
        resolve();
      } else {
        console.log("Found file");
        resolve();
      }
    });
  }

  function delay(time) {
    return new Promise(function (resolve) {
      setTimeout(resolve, time);
    });
  }

  const browser = await puppeteer.launch({
    headless: false,
  });
  browser;
  const page = await browser.newPage();

  await page.goto("https://service.yukon.ca/apps/contract-registry/");

  await page.waitForSelector("button#B106150366531214971").then(() => {
    console.log("button found");
  });
  await page.click("button#B106150366531214971");



  await page.waitForNavigation();

  await page.click("button#B47528447156014705");
  await browser.targets()

  await browser.close();
})();
