# Practical functional patterns for async flow control with Puppeteer, Pt. 1

```
const async scrapePage = (browser: Browser, url: string) => {
  const page = browser.newPage()
  const tags = await page.evaluate(() => {
    return Array.from(document.querySelectorAll('.tags'))
      .map(el => el.innerHTML)
      .map(s => s.toLowerCase());
  });
  page.close();
  return tags;
}
```

```
const async scrapeTags = (page: Page) => {
  return page.evaluate(() => {
    return Array.from(document.querySelectorAll('.tags'))
      .map(el => el.innerHTML)
      .map(s => s.toLowerCase());
  });
});

const async scrapePage = (browser: Browser, url: string) => {
  const page = browser.newPage()
  const tags = await scrapeTags(page);
  page.close();
  return tags;
}
```

```
const scrapeTags = (page: Page) => page.evaluate(() => {
  return Array.from(document.querySelectorAll('.tags'))
    .map(el => el.innerHTML)
    .map(s => s.toLowerCase());
});

const async scrapePage = (browser: Browser, url: string) => {
  const page = browser.newPage()
  const tags = await scrapeTags(page);
  const title = await scrapeTitle(page);
  const author = await scrapeAuthor(page);
  page.close();
  return { tags, title, author };
}
```


```
const async scrapePage = (browser: Browser, url: string) => {
  const page = browser.newPage();
  const [tags, title, author] = await Promise.all([
    scrapeTags(page),
    scrapeTitle(page),
    scrapeAuthor(page)
  ]);
  page.close();
  return { tags, title, author };
}
```

```
await Promise.all([
  logInThreeSeconds(),
  logInThreeSeconds(),
  logInThreeSeconds()
]);

// result, 3 seconds later (not 9)
hihihi
```

```
await Promise.all([
    // ...scrape stuff w/ page.evaluate
]).catch(handleScrapingError);
```