import * as React from "react";

export interface NavbarProps extends React.HTMLAttributes<HTMLDivElement> {}

const Navbar = React.forwardRef<HTMLDivElement, NavbarProps>(
  ({ className, ...props }, ref) => {
    return (
      <nav className="bg-white">
        <div className="max-w-7xl mx-auto px-2 sm:px-2 lg:px-2 py-2">
          <div className="flex flex-col sm:flex-row items-center justify-between space-y-2 sm:space-y-0">
            <div className="flex-shrink-0">
              <h1 className="text-2xl md:text-4xl font-bold">
                <a href="/" aria-label="TechLingo.fyi homepage">TechLingo.fyi</a>
              </h1>
            </div>
            <form
              className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-4 w-full sm:w-auto"
              action="/"
              method="GET"
            >
              <a
                href="/new"
                className="inset-y-0 right-0 flex items-center px-4 font-bold text-black bg-white rounded-r-lg"
                aria-label="Submit a new tech term"
              >
                Add new
              </a>
              <div className="flex w-full sm:w-auto">
                <input
                  id="search"
                  name="search"
                  placeholder="Search for word"
                  className="w-full h-10 pl-3 pr-8 text-base placeholder-gray-600 border rounded-l-lg focus:shadow-outline"
                  aria-label="Search for tech terms"
                  aria-describedby="search-description"
                />
                <span id="search-description" className="sr-only">
                  Search through all available tech terms and definitions
                </span>
                <button
                  type="submit"
                  className="inset-y-0 right-0 flex items-center px-4 border font-bold text-black bg-white rounded-r-lg hover:text-white hover:bg-gray-500 focus:bg-gray-700"
                  aria-label="Submit search"
                >
                  Search
                </button>
              </div>
            </form>
          </div>
        </div>
      </nav>
    );
  },
);
Navbar.displayName = "Navbar";

export { Navbar };
