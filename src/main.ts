import * as crawl from "./services/crawl";
import * as assert from 'assert';


const main = () => {
  if (process.argv.length < 3 || process.argv.length > 3) {
    process.argv.length < 3 ? console.log("no website provided")
      : console.log("to many arguments");
    process.exit(1);
  }
  const baseURL = process.argv[2];
  console.log(`starting crawl of ${baseURL}`);

  crawl.crawlPage(baseURL);

}

main();
