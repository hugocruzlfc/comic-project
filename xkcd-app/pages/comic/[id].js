import React from "react";
import Head from "next/head";
import Image from "next/image";
import Header from "@/components/Header";
import { readFile, stat, readdir } from "fs/promises";
import { basename } from "path";
import Link from "next/link";
import Layout from "@/components/Layout";

export default function Comic({
  img,
  alt,
  title,
  width,
  height,
  hasPrevious,
  hasNext,
  prevId,
  nextId,
}) {
  return (
    <>
      <Head>
        <title>xkcd - Comics for developers</title>
        <meta
          name="description"
          content="Comics for developers"
        />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1"
        />
      </Head>
      <Layout>
        <section className="max-w-lg m-auto">
          <h1 className="font-bold text-xl text-center mb-4">{title}</h1>
          <div className="max-w-sm m-auto mb-4">
            <Image
              src={img}
              alt={alt}
              width={width}
              height={height}
            />
          </div>

          <p>{alt}</p>
          <div className="flex flex-wrap justify-between mt-4 font-bold">
            {hasPrevious && (
              <Link
                href={`/comic/${prevId}`}
                className="text-gray-600 hover:text-gray-900"
              >
                ←Previous
              </Link>
            )}
            {hasNext && (
              <Link
                href={`/comic/${nextId}`}
                className="text-gray-600 hover:text-gray-900"
              >
                Next →
              </Link>
            )}
          </div>
        </section>
      </Layout>
    </>
  );
}

export async function getStaticPaths({ locales }) {
  const files = await readdir("./comics");
  let paths = [];
  //locales=> ["en", "es"]
  locales.forEach((locale) => {
    paths = paths.concat(
      files.map((file) => {
        const id = basename(file, ".json");
        return { params: { id }, locale };
      })
    );
  });
  // const paths = files.map((file) => {
  //   const id = basename(file, ".json");
  //   return { params: { id } };
  // });

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const { id } = params;
  const content = await readFile(`./comics/${id}.json`, "utf8");
  const comic = JSON.parse(content);
  const idNumber = +id;
  const prevId = idNumber - 1;
  const nextId = idNumber + 1;

  const [prevResult, nexResult] = await Promise.allSettled([
    stat(`./comics/${prevId}.json`),
    stat(`./comics/${nextId}.json`),
  ]);

  const hasPrevious = prevResult.status === "fulfilled";
  const hasNext = nexResult.status === "fulfilled";

  return {
    props: {
      ...comic,
      hasPrevious,
      hasNext,
      prevId,
      nextId,
    },
  };
}
