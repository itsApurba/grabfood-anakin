import { PlaywrightCrawler, ProxyConfiguration } from "crawlee";
import { router } from "./routes.js";
import * as dotenv from "dotenv"
dotenv.config()

const startUrls = ["https://food.grab.com/sg/en/restaurants"];

const port = 22225;
const session_id = (1000000 * Math.random()) | 0;
const username = process.env.PROXY_USERNAME;
const host = process.env.PROXY_HOST;
const password = process.env.PROXY_PASSWORD;
const proxyUrls = [];
// Generating unique proxy session URLs.
for (let i = 0; i < 200; i++) {
  proxyUrls.push(`http://${username}-session-${session_id}${i}:${password}@${host}:${port}`);
}
const proxy = new ProxyConfiguration({
  proxyUrls,
});
// Creating a new instance of the PlaywrightCrawler.
const crawler = new PlaywrightCrawler({
  proxyConfiguration: proxy,
  requestHandler: router,
  headless: false, // Set this to false if you want to debug the crawler.
  requestHandlerTimeoutSecs: 60 * 60,
  // maxRequestsPerCrawl: 20, // Limits the number of requests per crawl.
});

await crawler.run(startUrls);

// console.log(await crawler.getData())