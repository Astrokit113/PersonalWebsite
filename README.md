# Roseline's Personal Website

Welcome to my personal corner of the internet! I built this static site to host my blog, art galleries, and TTRPG thoughts away from the modern web's noise. It's a cozy, handcrafted space filled with webrings, RSS feeds, and a lot of heart.

## Features

* **Personal Blog:** Fully Markdown-based posts located in `content/blog`.
* **Custom Templating:** Powered by Nunjucks, managed through `content/_includes/myTemplate.njk`.
* **Visuals & Media:** Image galleries showcasing my art and a built-in Webamp music player.
* **Old-Web Navigation:** Integrated old-school webring and rootring links.
* **Community:** Built-in comment widget for visitor interactions.
* **Syndication:** Automated RSS feeds for easy subscribing.
* **Optimized & Accessible:** Built with accessibility, proper favicons, and OG metadata in mind.

## Tech Stack

* **Core:** Eleventy (11ty) & Nunjucks
* **Plugins & Tools:** 
  * `@11ty/eleventy-plugin-rss`
  * `markdown-it-attrs`
  * `html-minifier-terser`
  * `webamp`

## Quick Start

To get this project running locally on your machine, use the following commands:

```bash
# Install dependencies
npm install

# Start the local development server
npm run serve

# Build the site
npm run build

# Build for production
npm run build:production

# Commit build
npm run build:commit
