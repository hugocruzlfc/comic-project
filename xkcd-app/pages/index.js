import Head from "next/head";
import Image from "next/image";
import Header from "@/components/Header";
import { useI18N } from "../context/i18n";
import fs from "fs/promises";
import Link from "next/link";
import Layout from "@/components/Layout";

export default function Home({ latestComics }) {
  const { t } = useI18N();
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
        <h2 className="text-3xl font-bold text-center mb-10">
          {t("LATEST_COMICS")}
        </h2>
        <section className="grid grid-cols-2 gap-4 max-w-md m-auto sm:grid-cols-2 md:grid-cols-3">
          {latestComics.map((comic) => (
            <Link
              href={`/comic/${comic.id}`}
              key={comic.id}
              className="mb-4 pb-4"
            >
              <h3 className="font-bold text-sm text-center pb-3">
                {comic.title}
              </h3>
              <Image
                src={comic.img}
                alt={comic.alt}
                width={comic.width}
                height={comic.height}
              />
            </Link>
          ))}
        </section>
      </Layout>
    </>
  );
}

export async function getStaticProps(context) {
  const files = await fs.readdir("./comics");
  const latestComicsFiles = files.slice(-8, files.length);

  const promisesReadFiles = latestComicsFiles.map(async (file) => {
    const content = await fs.readFile(`./comics/${file}`, "utf8");
    return JSON.parse(content);
  });
  const latestComics = await Promise.all(promisesReadFiles);
  // console.log(latestComics);
  // Promise.all(fs.readFile(`./comics/${lastComics[0]}`));
  return {
    props: {
      latestComics,
    },
  };
}
