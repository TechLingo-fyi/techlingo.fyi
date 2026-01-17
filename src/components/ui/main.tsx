/**
 * v0 by Vercel.
 * @see https://v0.dev/t/jEJJfzoe3E7
 */
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { PoweredBy } from "react-instantsearch";
import { CardHeader, CardContent, Card } from "@/components/ui/card";
import * as React from "react";
import type { Lingo } from "@/TypeLingo";

import Masonry from "react-masonry-css";

export interface MainComponentProps
  extends React.ButtonHTMLAttributes<HTMLDivElement> {
  lingos: Lingo[];
}

const MainComponent = React.forwardRef<HTMLDivElement, MainComponentProps>(
  ({ className, lingos, ...props }, ref) => {
    const groupedLingos = new Map<string, Lingo[]>();
    lingos.forEach((lingo) => {
      let firstLetter = lingo.term[0].toUpperCase();
      if (firstLetter.match(/[0-9]/)) {
        firstLetter = "#";
      }
      const group = groupedLingos.get(firstLetter) ?? [];
      group.push(lingo);
      groupedLingos.set(firstLetter, group);
    });

    const sortedGroupedLingos = new Map(
      Array.from(groupedLingos.entries()).sort(),
    );

    const breakpointColumnsObj = {
      default: 3,
      1100: 3,
      700: 2,
      500: 1,
    };

    let currentLetter = "";

    return (
      <section className="container mx-auto pt-0 pb-8 px-4 md:px-6">
        <div className="flex mt-12">
            <aside className="mr-8 mt-2">
            <nav aria-label="Alphabetical navigation">
              <ul className="sticky top-2 space-y-1">
                {Array.from(sortedGroupedLingos.keys()).map((letter) => (
                  <li key={letter}>
                    <a className="text-sm" href={`#${letter}`} aria-label={`Jump to terms starting with ${letter}`}>
                      {letter}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </aside>
          <main>
            {/* ARIA live region for search announcements */}
            <div
              id="search-announcements"
              role="status"
              aria-live="polite"
              aria-atomic="true"
              className="sr-only"
            ></div>
            {/* Search Results Container */}
            <div
              id="search-results"
              className="w-full"
              style={{ display: 'none' }}
              role="region"
              aria-label="Search results"
            >
              {/* Search results will be dynamically inserted here */}
            </div>

            {/* Browse Content */}
            <div id="browse-content">
              <div
                id="noResults"
                className="hidden col-span-1 md:col-span-2 lg:col-span-3"
              >
                <h2 className="text-5xl font-semibold text-center py-8">
                  No results, why not{" "}
                  <a className="underline" href="/">
                    browse all the lingos
                  </a>
                  ?
                </h2>
              </div>
              <Masonry
              breakpointCols={breakpointColumnsObj}
              className="flex w-auto -ml-4"
              columnClassName="pl-4 bg-clip-padding"
            >
              {lingos.map((lingo, idx) => {
                const firstLetter = lingo.term[0].toUpperCase();
                const letterChanged = firstLetter !== currentLetter;

                if (letterChanged) {
                  currentLetter = firstLetter;
                }

                return (
                  <a
                    id={`card-${lingo.slug}`}
                    href={lingo.slug}
                    className="p-6 mb-4"
                    aria-label={`View definition for ${lingo.term}${lingo.definitions[0].expanded ? ` (${lingo.definitions[0].expanded})` : ''}`}
                  >
                    <Card
                      className="cursor-pointer hover:bg-gray-50 hover:shadow-lg transition-all duration-200"
                      id={lingo.term}
                    >
                      <CardHeader>
                        {letterChanged && <span id={currentLetter} aria-label={`Section: Terms starting with ${currentLetter}`}></span>}
                        <h2 className="text-lg font-semibold">
                          {lingo.term}{" "}
                          <small className="text-sm text-gray-400 font-normal">
                            {lingo.definitions[0].expanded}
                          </small>
                        </h2>
                      </CardHeader>
                      <CardContent>
                        <p className="text-base text-gray-700">
                          {lingo.definitions[0].definition}
                        </p>
                      </CardContent>
                    </Card>
                  </a>
                );
              })}
            </Masonry>

              <div
                id="poweredBy"
                className="hidden col-span-1 md:col-span-2 lg:col-span-3"
                style={{ display: 'none' }}
              >
                <div className="flex items-center justify-center">
                  <PoweredBy className="w-1/2 md:w-1/4 lg:w-1/5" />
                </div>
              </div>
            </div>
          </main>
        </div>
      </section>
    );
  },
);
// Card.displayName = "Card"

export { MainComponent };
