import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";

export default function Header() {
  const [results, setResults] = React.useState([]);
  const searchRef = React.useRef();
  const { locale, locales } = useRouter();

  const q = searchRef.current?.value;

  const handleChange = () => {
    fetch(`/api/search?q=${q}`)
      .then((res) => res.json())
      .then((searchResults) => setResults(searchResults));
  };

  const restOfLocales = locales.filter((l) => l !== locale);

  return (
    <header className="flex justify-between items-center p-4 max-w-xl m-auto">
      <h1 className="font-bold">
        <Link
          href="/"
          className="hover:opacity-80"
        >
          next
          <span className="font-light">xkcd</span>
        </Link>
      </h1>
      <nav>
        <ul className="flex flex-row gap-2">
          <li className="text-sm font-bold">
            <Link href="/">Home</Link>
          </li>

          <li className="text-sm font-bold">
            <input
              className="px-2 rounded-3xl py-1 border border-gray-300 text-xs"
              ref={searchRef}
              type="search"
              onChange={handleChange}
            />
            <div className="relative z-10">
              {Boolean(results.length) && (
                <div className="absolute left-0 top-0">
                  {
                    <ul className="w-full border rounded-lg shadow-xl border-gray-50 bg-white overflow-hidden">
                      <li>
                        <Link
                          href={`/search?q=${q}`}
                          key="search-list"
                        >
                          <span className="block px-2 py-1 overflow-hidden text-ellipsis whitespace-nowrap text-sm font-semibold hover:bg-slate-200 italic text-gray-400">
                            Ver {results.length} resultados
                          </span>
                        </Link>
                      </li>
                      {results.map((result) => (
                        <li
                          key={result.id}
                          className=" px-2 py-1 m-0"
                        >
                          <Link href={`/comic/${result.id}`}>
                            <span className="block px-2 py-1 overflow-hidden text-ellipsis whitespace-nowrap text-sm font-semibold hover:bg-slate-200">
                              {result.title}
                            </span>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  }
                </div>
              )}
            </div>
          </li>
          <li className="text-sm font-bold">
            <Link
              href="/"
              locale={restOfLocales[0]}
            >
              {restOfLocales[0]}
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
