const puppeteer = require("puppeteer");

async function getStoreMapsData(storeName) {
  const API_TOKEN = process.env.API_TOKEN;
  const IS_PRODUCTION = process.env.NODE_ENV === "production";

  const getBrowser = () =>
    IS_PRODUCTION
      ? puppeteer.connect({
          browserWSEndpoint: "wss://chrome.browserless.io?token=" + API_TOKEN,
        })
      : puppeteer.launch({ headless: true });

  let browser = null;
  try {
    browser = await getBrowser();

    const page = await browser.newPage();

    // Connect to remote endpoint
    await page.setViewport({ width: 1440, height: 789 });

    // Visit maps.google.com
    await page.goto("https://maps.google.com");

    await page.waitForSelector(
      "#yDmH0d > c-wiz > div > div > div > div.NIoIEf > div.G4njw > div.AIC7ge > div.CxJub > div.VtwTSb > form:nth-child(2) > div > div > button > div.VfPpkd-RLmnJb"
    );
    await page.click(
      "#yDmH0d > c-wiz > div > div > div > div.NIoIEf > div.G4njw > div.AIC7ge > div.CxJub > div.VtwTSb > form:nth-child(2) > div > div > button > div.VfPpkd-RLmnJb"
    );

    // Search bar
    await page.waitForSelector("#searchboxinput");

    // Search bar
    await page.click("#searchboxinput");

    // Search bar
    await page.type("#searchboxinput", storeName);

    // await page.keyboard.press("Enter");

    // Results list
    await page.waitForSelector("#ydp1wd-haAclf > div:nth-child(1)");

    // Results list
    await page.click("#ydp1wd-haAclf > div:nth-child(1)");

    // Image
    await page.waitForSelector(
      "#QA0Szd > div > div > div.w6VYqd > div:nth-child(2) > div > div.e07Vkf.kA9KIf > div > div > div.ZKCDEc > div.RZ66Rb.FgCUCc > button > img"
    );

    // Fetch the image URL and rating
    const storeMapsData = await page.evaluate(() => {
      const imageElement = document.querySelector(
        "#QA0Szd > div > div > div.w6VYqd > div:nth-child(2) > div > div.e07Vkf.kA9KIf > div > div > div.ZKCDEc > div.RZ66Rb.FgCUCc > button > img"
      );

      const ratingElement = document.querySelector(
        "#QA0Szd > div > div > div.w6VYqd > div:nth-child(2) > div > div.e07Vkf.kA9KIf > div > div > div.TIHn2 > div > div.lMbq3e > div.LBgpqf > div > div.fontBodyMedium.dmRWX > div.F7nice > span:nth-child(1) > span:nth-child(1)"
      );
      return {
        imageurl: imageElement ? imageElement.src : null,
        rating: ratingElement ? parseFloat(ratingElement.innerText) : null,
      };
    });
    console.log("Store Maps Data:", storeMapsData);

    browser.close();
    return storeMapsData;
  } catch (error) {
    console.log("Error scraping Google Maps:", error);
    if (browser) await browser.close();
    throw error;
  }
}

module.exports = getStoreMapsData;
