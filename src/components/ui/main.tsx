/**
 * v0 by Vercel.
 * @see https://v0.dev/t/jEJJfzoe3E7
 */
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { CardHeader, CardContent, Card } from "@/components/ui/card";
import * as React from "react";
import type { Lingo } from "@/TypeLingo";

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

    return (
      <section className="container mx-auto pt-0 pb-8 px-4 md:px-6">
        <div className="flex mt-12">
          <aside className="mr-8 mt-2">
            <ul className="sticky top-2 space-y-1">
              {Array.from(sortedGroupedLingos.keys()).map((letter) => (
                <li>
                  <a className="text-sm" href={`#${letter}`}>
                    {letter}
                  </a>
                </li>
              ))}
            </ul>
          </aside>
          <main className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 flex-grow overflow-auto">
            {Array.from(sortedGroupedLingos.entries()).map(
              ([letter, lingos]) => (
                <>
                  {lingos.map((lingo, idx) => (
                    <a href={lingo.slug}>
                      <Card
                        className="cursor-pointer hover:bg-gray-50 hover:shadow-lg transition-all duration-200"
                        id={lingo.term}
                      >
                        <CardHeader>
                          {idx === 0 && <span id={letter}></span>}
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
                  ))}
                </>
              ),
            )}
          </main>
        </div>
      </section>
    );
  },
);
// Card.displayName = "Card"

export { MainComponent };
