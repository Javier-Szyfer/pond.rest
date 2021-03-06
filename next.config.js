const path = require("path");
const frontmatterPlugin = require("./lib/frontmatter");
const withMDX = require("@next/mdx")({
  extension: /\.mdx?$/,
  options: {
    remarkPlugins: [frontmatterPlugin],
  },
});

module.exports = withMDX({
  pageExtensions: ["js", "jsx", "mdx"],
  target: "serverless",

  images: {
    domains: ["firebasestorage.googleapis.com"],
  },
  sassOptions: {
    includePaths: [path.join(__dirname, "styles")],
  },
  eslint: {
    dirs: ["pages", "utils"], // Only run ESLint on the 'pages' and 'utils' directories during production builds (next build)
  },
});
