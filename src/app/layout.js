// app/layout.js

import { Roboto } from 'next/font/google'; // Import fonts if neededs

export default function RootLayout({ children }) {

  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>My App</title>
      </head>
      <body>
        <header>
          <nav>
            {/* Navigation Menu */}
          </nav>
        </header>
        <main>
          {children} {/* This is where your page content will be rendered */}
        </main>
        <footer>
          <p>&copy; {new Date().getFullYear()} My App. All rights reserved.</p>
        </footer>
      </body>
    </html>
  );
}
