import * as crawl from "./services/crawl";
//import * as assert from 'assert';


const main = async () => {
  if (process.argv.length < 3 || process.argv.length > 3) {
    process.argv.length < 3 ? console.log("no website provided")
      : console.log("to many arguments");
    process.exit(1);
  }
  const baseURL = process.argv[2];

  console.log(`starting crawl of ${baseURL}`);
  const pages = await crawl.crawlPage(baseURL, baseURL, {});

  const pagesArr = Object.entries(pages);
  pagesArr.sort((a, b) => {
    return b[1] - a[1];
  });
  console.log("========================================================================================\n\n");
  console.log("\n REPORT \n");

  for (const sortedPage of pagesArr) {
    const url = sortedPage[0];
    const hits = sortedPage[1];
    console.log(`Found ${hits} links to page: ${url}`);
  }
  console.log("========================================================================================\n\n");
}

main();
