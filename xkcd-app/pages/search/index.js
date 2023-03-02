import React from "react";
import Head from "next/head";
import Layout from "@/components/Layout";
import { search } from "@/services/search";
import Image from "next/image";
import Link from "next/link";
import { useI18N } from "@/context/i18n";

export default function Search({ query, results }) {
  const { t } = useI18N();
  return (
    <>
      <Head>
        <title>xkcd - Results for {query}</title>
        <meta
          name="description"
          content={`Search results for ${query}`}
        />
      </Head>
      <Layout>
        <h1>{t("SEARCH_RESULTS_TITLE", results.length, query)}</h1>
        {results.map((result) => (
          <Link
            key={result.id}
            href={`/comic/${result.id}`}
            className="flex flex-row content-center justify-start bg-slate-300 hover:bg-slate-50"
          >
            <Image
              src={result.img}
              alt={result.alt}
              width="50"
              height="50"
              className="rounded-full"
            />
            <h2>{result.title}</h2>
          </Link>
        ))}
      </Layout>
      <style jsx>{``}</style>
    </>
  );
}

export const getServerSideProps = async (context) => {
  const { query } = context;
  const { q = "" } = query;

  const { results } = await search({ query: q });
  return {
    props: {
      query: q,
      results,
    },
  };
};
