const htmlmin = require("html-minifier-terser");

module.exports = async function (eleventyConfig) {
  const pluginRss = await import("@11ty/eleventy-plugin-rss");
  // Add plugins
  eleventyConfig.addPlugin(pluginRss.default);

  // Create a collection of blog posts
  eleventyConfig.addCollection("posts", function (collectionApi) {
    return collectionApi.getFilteredByTag("post");
  });

  // Add a readable date filter
  eleventyConfig.addFilter("readableDate", (dateObj) => {
    return new Date(dateObj).toDateString();
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

  // Return the folder configuration
  return {
    markdownTemplateEngine: "njk",
    dir: {
      input: "content",
      output: "../public/blog",
    },
  };
};