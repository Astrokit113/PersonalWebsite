const htmlmin = require("html-minifier-terser");

function buildPostsByTag(collectionApi) {
  const posts = collectionApi.getFilteredByTag("post");
  const grouped = new Map();

  posts.forEach((post) => {
    const tags = Array.isArray(post.data.tags) ? post.data.tags : [];

    tags.forEach((tag) => {
      if (tag === "post") return;
      if (!grouped.has(tag)) grouped.set(tag, []);
      grouped.get(tag).push(post);
    });
  });

  return [...grouped.entries()]
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([tag, postsForTag]) => ({
      tag,
      posts: [...postsForTag].reverse(),
    }));
}

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
  // 1. Pass entire asset folders as-is
  eleventyConfig.addPassthroughCopy("blog-css");
  eleventyConfig.addPassthroughCopy("confession-css");
  eleventyConfig.addPassthroughCopy("images");
  eleventyConfig.addPassthroughCopy("fonts");
  eleventyConfig.addPassthroughCopy("js");
  eleventyConfig.addPassthroughCopy("gimmick");
  eleventyConfig.addPassthroughCopy("comment");

  // 2. Dump EVERYTHING inside static-pages directly into the root of the site
  eleventyConfig.addPassthroughCopy({ "static-pages": "/" });

  // 3. Move your RSS style to the root
  eleventyConfig.addPassthroughCopy({ "content/rss-style.xsl": "rss-style.xsl" });

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

  // Group posts by their real front matter tags so the UI can render them dynamically
  eleventyConfig.addCollection("postsByTag", function(collectionApi) {
    return buildPostsByTag(collectionApi);
  });

  // Create a safe, pre-reversed copy of your TTRPG posts
  eleventyConfig.addCollection("ttrpgPostsReversed", function(collectionApi) {
    return [...collectionApi.getFilteredByTag("ttrpg")].reverse();
  });

  eleventyConfig.addCollection("confessionsReversed", function(collectionApi) {
    return [...collectionApi.getFilteredByTag("confessions")].reverse();
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