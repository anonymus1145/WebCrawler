import { JSDOM } from 'jsdom';


export const crawlPage = async (currentURL: string) => {
  console.log(`crawling: ${currentURL}`);

  const resp = await fetch(currentURL);

  console.log(await resp.text());

}

export const getURLsFromHTML = (htmlBody: string, baseURL: string) => {
  const urls: string[] = [];
  const dom = new JSDOM(htmlBody);
  const linkElements = dom.window.document.querySelectorAll('a');

  for (const element in linkElements) {
    const anchor = element as unknown as HTMLAnchorElement;
    if (anchor.href) {
      try {
        if (anchor.href.slice(0, 1) === '/') {
          // relative url
          const urlObj = new URL(`${baseURL}${anchor.href}`);
          urls.push(urlObj.href);
        } else {
          // absolute url
          const urlObj = new URL(anchor.href);
          urls.push(urlObj.href);
        }
      } catch (error) {
        console.error(`Invalid URL: ${anchor.href}`);
        console.error(error);
      }
    }
  }
  return urls;
}

export const normalizeURL = (urlString: string) => {
  const urlObj = new URL(urlString);
  const hostPath = `${urlObj.hostname}${urlObj.pathname}`;

  if (hostPath.length > 0 && hostPath.slice(-1) === '/') {
    return hostPath.slice(0, -1);
  }
  return hostPath;
}
