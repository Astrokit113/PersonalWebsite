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

  // Tell 11ty to copy your CSS and Images to the public folder
  eleventyConfig.addPassthroughCopy({ "style.css": "style.css" });
  eleventyConfig.addPassthroughCopy({ "simplified-style.css": "simplified-style.css" });
  eleventyConfig.addPassthroughCopy({ "images": "images" });

  // Custom permalink structure
  eleventyConfig.addGlobalData("permalink", "{{ page.filePathStem }}.html");

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