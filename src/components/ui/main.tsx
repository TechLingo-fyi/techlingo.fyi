/**
 * v0 by Vercel.
 * @see https://v0.dev/t/jEJJfzoe3E7
 */
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { CardHeader, CardContent, Card } from "@/components/ui/card"
import * as React from "react"


const MainComponent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
<section className="container mx-auto py-8 px-4 md:px-6">
      <div className="flex flex-col md:flex-row items-center justify-between gap-6 md:gap-8">
        <h1 className="text-2xl md:text-4xl font-bold">TechLingo.fyi</h1>
        <div className="w-full md:w-auto flex items-center gap-4">
          <Input className="flex-grow" id="search" placeholder="Search for word" type="text" />
          <Button variant="contained">Search</Button>
        </div>
      </div>
      <div className="flex mt-12">
        <aside className="mr-8">
          <ul className="space-y-2">
            <li>
              <a className="text-lg" href="#">
                A
              </a>
            </li>
            <li>
              <a className="text-lg" href="#">
                B
              </a>
            </li>
            <li>
              <a className="text-lg" href="#">
                C
              </a>
            </li>
            <li>
              <a className="text-lg" href="#">
                D
              </a>
            </li>
            <li>
              <a className="text-lg" href="#">
                E
              </a>
            </li>
            <li>
              <a className="text-lg" href="#">
                F
              </a>
            </li>
          </ul>
        </aside>
        <main className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 flex-grow">
          <Card id="A">
            <CardHeader>
              <h2 className="text-lg font-semibold">Articulate</h2>
            </CardHeader>
            <CardContent>
              <p className="text-base text-gray-700">To express an idea or feeling fluently and coherently.</p>
            </CardContent>
          </Card>
          <Card id="B">
            <CardHeader>
              <h2 className="text-lg font-semibold">Benevolent</h2>
            </CardHeader>
            <CardContent>
              <p className="text-base text-gray-700">Well meaning and kindly.</p>
            </CardContent>
          </Card>
          <Card id="C">
            <CardHeader>
              <h2 className="text-lg font-semibold">Congruent</h2>
            </CardHeader>
            <CardContent>
              <p className="text-base text-gray-700">In agreement or harmony.</p>
            </CardContent>
          </Card>
          <Card id="D">
            <CardHeader>
              <h2 className="text-lg font-semibold">Diligent</h2>
            </CardHeader>
            <CardContent>
              <p className="text-base text-gray-700">
                Having or showing care and conscientiousness in one's work or duties.
              </p>
            </CardContent>
          </Card>
          <Card id="E">
            <CardHeader>
              <h2 className="text-lg font-semibold">Eloquent</h2>
            </CardHeader>
            <CardContent>
              <p className="text-base text-gray-700">Fluent or persuasive in speaking or writing.</p>
            </CardContent>
          </Card>
          <Card id="F">
            <CardHeader>
              <h2 className="text-lg font-semibold">Fortitude</h2>
            </CardHeader>
            <CardContent>
              <p className="text-base text-gray-700">Courage in pain or adversity.</p>
            </CardContent>
          </Card>
        </main>
      </div>
    </section>
))
// Card.displayName = "Card"


export {MainComponent }