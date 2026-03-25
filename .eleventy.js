const htmlmin = require("html-minifier-terser");

module.exports = function (eleventyConfig) {

  // 1. Tell 11ty to copy your CSS and Images to the public folder
  eleventyConfig.addPassthroughCopy("style.css");
  eleventyConfig.addPassthroughCopy("images");

  // 2. Custom permalink structure
  eleventyConfig.addGlobalData("permalink", "{{ page.filePathStem }}.html");

  // 3. Minify HTML (Moved above the return statement so it actually runs!)
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

  // 4. Return the folder configuration at the VERY END
  return {
    dir: {
      input: "content",
      output: "public/blog",
    },
  };
};