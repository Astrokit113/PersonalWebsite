const htmlmin = require("html-minifier-terser");

// 1. Make the export an async function so we can use 'await' inside it
module.exports = async function (eleventyConfig) {
  const isProduction = process.env.ELEVENTY_ENV === 'production';
  eleventyConfig.addGlobalData("isProduction", isProduction);

  // 2. Dynamically import the ESM plugin inside the function block
  const pluginRss = await import("@11ty/eleventy-plugin-rss");
  eleventyConfig.addPlugin(pluginRss.default);

  // 3. Moved inside the function where 'eleventyConfig' is actually defined
  eleventyConfig.addCollection("posts", function (collectionApi) {
    return collectionApi.getFilteredByTag("post");
  });

  // Collection for TTRPG posts
  eleventyConfig.addCollection("ttrpgPosts", function (collectionApi) {
    return collectionApi.getFilteredByTag("ttrpg");
  });

  // Tell 11ty to copy your CSS and Images to the public folder
  eleventyConfig.addPassthroughCopy({ "static-pages/css/style.css": "static-pages/css/style.css" });
  eleventyConfig.addPassthroughCopy({ "static-pages/normalize.css": "static-pages/normalize.css" });
  eleventyConfig.addPassthroughCopy({ "blog-css/style.css": "blog-css/style.css" });
  eleventyConfig.addPassthroughCopy({ "blog-css/simplified-style.css": "blog-css/simplified-style.css" });
  eleventyConfig.addPassthroughCopy({ "images": "images" });
  eleventyConfig.addPassthroughCopy({ "fonts": "fonts" });
  eleventyConfig.addPassthroughCopy({ "js": "js" });
  eleventyConfig.addPassthroughCopy({ "gimmick": "gimmick" });
  eleventyConfig.addPassthroughCopy({ "static-pages/index.html": "index.html" });
  eleventyConfig.addPassthroughCopy({ "content/rss-style.xsl": "rss-style.xsl" });
  eleventyConfig.addPassthroughCopy({ "comment": "comment" });

  // Custom permalink structure
  eleventyConfig.addGlobalData("permalink", "{{ page.filePathStem }}.html");

  // 1. Filter for the machine-readable datetime attribute
  eleventyConfig.addFilter("isoDate", function(dateObj) {
    if (!dateObj) return "";
    return new Date(dateObj).toISOString();
  });

  // 2. Filter for the human-readable text on your site
  eleventyConfig.addFilter("displayDate", function(dateObj) {
    if (!dateObj) return "";
    return new Date(dateObj).toLocaleString('en-US', {
        timeZone: 'Asia/Jakarta', // Keeps your timestamps pinned to WIB
        dateStyle: 'medium',
        timeStyle: 'short'
    });
  });

  // RSS Date filter (RFC 822 format)
  eleventyConfig.addFilter("rssDate", function(dateObj) {
    if (!dateObj) return "";
    return new Date(dateObj).toUTCString();
  });

  // Create a safe, pre-reversed copy of your posts
  eleventyConfig.addCollection("postsReversed", function(collectionApi) {
    // The [...] creates a clone of the array so we don't mutate the original!
    return [...collectionApi.getFilteredByTag("post")].reverse();
  });

  // Create a safe, pre-reversed copy of your TTRPG posts
  eleventyConfig.addCollection("ttrpgPostsReversed", function(collectionApi) {
    return [...collectionApi.getFilteredByTag("ttrpg")].reverse();
  });

  // Minify HTML 
  eleventyConfig.addTransform("htmlmin", function (content) {
    if ((this.page.outputPath || "").endsWith(".html")) {
      let minified = htmlmin.minify(content, {
        useShortDoctype: true,
        removeComments: true,
        collapseWhitespace: true,
        minifyCSS: true,
        minifyJS: true,
      });
      return minified;
    }
    return content;
  });

  // Return the folder configuration at the VERY END
  return {
    dir: {
      input: "content",
      output: "public",
    },
  };
};