import pluginRss from "@11ty/eleventy-plugin-rss";

export default function (eleventyConfig) {
  eleventyConfig.addPlugin(pluginRss);

  eleventyConfig.addPassthroughCopy("assets/images");
  eleventyConfig.addPassthroughCopy("assets/js");
  eleventyConfig.addPassthroughCopy("assets/main.css");
  eleventyConfig.addPassthroughCopy("CNAME");

  eleventyConfig.addFilter("dateDisplay", (date) => {
    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      timeZone: "UTC",
    }).format(date);
  });

  eleventyConfig.addCollection("posts", (api) =>
    api.getFilteredByGlob("posts/*.md").sort((a, b) => b.date - a.date)
  );

  eleventyConfig.addCollection("postsByTitle", (api) =>
    api
      .getFilteredByGlob("posts/*.md")
      .sort((a, b) => a.data.title.localeCompare(b.data.title))
  );

  eleventyConfig.addCollection("tagList", (api) => {
    const tagSet = new Set();
    api.getFilteredByGlob("posts/*.md").forEach((item) => {
      (item.data.tags || []).forEach((tag) => tagSet.add(tag));
    });
    return [...tagSet].sort();
  });

  eleventyConfig.addCollection("navPages", (api) =>
    api
      .getAll()
      .filter((item) => item.data.nav === true)
      .sort((a, b) => a.data.title.localeCompare(b.data.title))
  );

  return {
    dir: {
      input: ".",
      output: "_site",
      includes: "_includes",
      data: "_data",
    },
    templateFormats: ["md", "njk", "html"],
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
  };
}
