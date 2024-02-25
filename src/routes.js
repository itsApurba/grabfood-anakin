import { Dataset, createPlaywrightRouter, sleep } from "crawlee";

export const router = createPlaywrightRouter();

router.addDefaultHandler(async ({ page, request, log, infiniteScroll, proxyInfo }) => {
  const context = page.context();
  // Allow location access
  await context.grantPermissions(["geolocation"]);
  const title = await page.title();
  log.info(`${title}`, { url: request.loadedUrl });
  console.log(proxyInfo)
  await page.click('[aria-label="Change delivery address"]');
  await page.fill("input#location-input", "56 Choa Chu Kang North 6, Yew Mei Green Condominium - 56 Choa Chu Kang North 6, Singapore, 689577");
  await page.click('ul[role="listbox"] li:nth-child(1)');
  await sleep(2000);
  await page.waitForEvent("load");

  const restaurantListContainer = page.locator(".RestaurantListRow___1SbZY>div");
  // const restaurants = await restaurantListContainer.count();
  console.log(await restaurantListContainer.count());
  await infiniteScroll({
    scrollDownAndUp: true,
    waitForSecs: 10
  });

  for (let restaurant of await restaurantListContainer.all()) {
    const restaurantName = await restaurant
      .locator("p.name___2epcT")
      .textContent({ timeout: 500 })
      .catch((e) => null);
    const restaurantCuisine = await restaurant
      .locator("div.cuisine___T2tCh")
      .textContent({ timeout: 500 })
      .catch((e) => null);
    const restaurantRating = await restaurant
      .locator("div.numbersChild___2qKMV", { has: page.locator(".ratingStar") })
      .textContent({ timeout: 500 })
      .catch((e) => null);
    const [estimateTimeOfDelivery, distance] = await restaurant
      .locator("div.numbersChild___2qKMV", { has: page.locator(".deliveryClock") })
      .textContent({ timeout: 500 })
      .then((text) =>
        text
          .trim()
          .split("•")
          .map((x) => x.trim())
      )
      .catch((e) => null);
    const promotionalText = await restaurant
      .locator(".discountText___GQCkj")
      .textContent({ timeout: 500 })
      .catch((e) => null);
    const imageLink = await restaurant
      .locator("img")
      .getAttribute("src", { timeout: 10000 })
      .catch((e) => null);
    const isPromoAvailable = promotionalText && promotionalText.length > 0 ? true : false;
    const restaurantID = await restaurant
      .locator("a")
      .getAttribute("href")
      .then((url) => url.split("/").pop());
    // const restaurantNotice = await restaurant.locator("")
    await Dataset.pushData({
      restaurantName,
      restaurantCuisine,
      restaurantRating,
      estimateTimeOfDelivery,
      distance,
      promotionalText,
      imageLink,
      isPromoAvailable,
      restaurantID,
    });
  }

  await Dataset.exportToJSON("data");

});
