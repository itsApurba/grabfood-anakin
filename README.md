# GrabFood - Anakin (Assignment)

This is a web scraper to extract the restaurants data from [grabfood.sg](https://food.grab.com/sg/en/restaurants). The scrapping is done using [PlaywrightCrawler](https://crawlee.dev/api/playwright-crawler/class/PlaywrightCrawler). The Proxy provider is [Bright Data](https://docs.brightdata.com/proxy-networks/data-center/introduction).

### Approach and methodology

- Here it's using a javascript library known as [Crawlee](https://crawlee.dev/). Crawlee handles the javascript rendered webpages. Using headless browser ([Playwright](https://playwright.dev) or [Puppeteer](https://pptr.dev/)) and [Cheerio](https://www.npmjs.com/package/cheerio) for scraping from html. Playwright is very similar like Selenium.
- Crawlee handles the user-agent and browser fingerprint rotation internally but it can be customized further, It has logger and error handlers as well.
- This scrapper is highly scalable and can be deployed as an individual actor on [Apify](https://apify.com).
- For proxy provider, [Bright Data](https://docs.brightdata.com/proxy-networks/data-center/introduction) is used. Apify also provides [proxy](https://apify.com/proxy) for free but it has some limitations.

### Challenges
- Error(403) when accessing the website.
- No Restaurant notice was visible.
- Not able to get the delevery fee properly.
- Not able to get the restaurant latitude and longitude.

###  Improvements or Optimizations
- To get the latitude and longitude Google map(SERP API) or duckduckgo map search can be used.
- Make he gzip at the simultaneously when the data is ready using the [getData()](https://crawlee.dev/api/browser-crawler/class/BrowserCrawler#getData) method.

### Quality Control Checklist
- **Environment Variables**: Ensure that `.env` file exists and contains `PROXY_USERNAME`, `PROXY_HOST`, and `PROXY_PASSWORD`.
- **Proxy URLs Generation**: Verify the logic for generating unique proxy session URLs and matches the expected format for the proxy service.
- **Error Handling**: Implement try-catch blocks around potential points of failure, such as network requests and file operations.
- **Resource Management**: Verify that the crawler's `headless` mode is intentionally set to `false` for debugging or visual monitoring purposes, as this may consume more resources.
- **Permissions**: Confirm that the website allows for automated control and interaction, especially for geolocation permissions.
- **Selector Accuracy**: Verify that all selectors used (`[aria-label="Change delivery address"]`, `input#location-input`, etc.) are current and match the elements on the webpage.
- **Error Handling**: Add error handling for asynchronous operations, especially web scraping and network requests, to manage timeouts, and missing elements gracefully.
- **Data Integrity**: Ensure the logic for extracting restaurant details (name, cuisine, rating, etc.) correctly handles null or undefined cases without causing the entire process to fail.
- **Infinite Scroll Handling**: Confirm that the `infiniteScroll` function efficiently loads all necessary data without causing excessive load times or hitting rate limits.
- **Dataset Usage**: Ensure data is being recorded and saved as expected.
- **Data Integrity**: After compressing and decompressing, verify that the data integrity is maintained, and no information is lost or corrupted.
- **Efficiency**: Compressing and then immediately decompressing the data within the same script for demonstration of the data corruption.
- **Code Organization**: Ensure that your code is well-organized and logically structured for readability and maintainability.

