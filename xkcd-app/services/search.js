import algoliasearch from "algoliasearch/lite";

const client = algoliasearch(process.env.APP_ID, process.env.API_KEY);
const index = client.initIndex("prod_comics");

const CACHE = {};

export const search = async ({ query }) => {
  if (CACHE[query]) return { results: CACHE[query] };
  const { hits } = await index.search(query, {
    hitsPerPage: 10,
    attributesToRetrieve: ["id", "title", "alt", "img"],
  });
  CACHE[query] = hits;
  return { results: hits };
};
