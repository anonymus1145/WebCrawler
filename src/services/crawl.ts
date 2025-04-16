import { JSDOM } from 'jsdom';


export const crawlPage = async (baseURL: string, currentURL: string, pages: { [key: string]: number }) => {

  const baseURLObj = new URL(baseURL);
  const currentURLObj = new URL(currentURL);
  if (baseURLObj.hostname !== currentURLObj.hostname) return pages;

  const normalizeCurrentURL = normalizeURL(currentURL);
  if (normalizeCurrentURL in pages) {
    pages[normalizeCurrentURL]++;
    return pages;
  }

  pages[normalizeCurrentURL] = 1;

  console.log(`crawling: ${currentURL}`, normalizeCurrentURL);

  try {
    const resp = await fetch(currentURL);
    const contentType = resp.headers.get("content-type");
    if (resp.status > 399 || !contentType?.includes("text/html")) {
      console.log(`error on crawlPage with status: ${resp.status} or content type is not html is : ${contentType}`);
      return pages;
    }

    const htmlBody = await resp.text();

    const nextURLs = getURLsFromHTML(htmlBody, baseURL);

    for (const nextURL of nextURLs) {
      await crawlPage(baseURL, nextURL, pages);
    }
  } catch (err) {
    console.error(err);
  }
  return pages;
}

export const getURLsFromHTML = (htmlBody: string, baseURL: string) => {
  const urls: string[] = [];
  const dom = new JSDOM(htmlBody);
  const linkElements = dom.window.document.querySelectorAll('a');

  for (const element of linkElements) {
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
