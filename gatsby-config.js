require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`,
})

module.exports = {
  siteMetadata: {
    siteUrl: "https://www.yourdomain.tld",
    title: "Notion-Mini",
  },
  plugins: [
    "gatsby-transformer-sharp",
    "gatsby-plugin-image",
    "gatsby-plugin-sharp",
    // {
    //   resolve: "gatsby-source-filesystem",
    //   options: {
    //     name: `blog`,
    //     path: `${__dirname}/blog`,
    //   },
    // },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: `images`,
        path: `${__dirname}/assets/icon`,
      },
    },
    {
      resolve: `gatsby-plugin-google-fonts`,
      options: {
        fonts: [
          `Noto+Serif+KR\:100,300,400,500,700,900`,
          'Jua\:100,300,400,500,700,900'
        ],
        display: "swap",
      },
    },
    "gatsby-plugin-mdx",
    //"gatsby-transformer-typescript-css-modules",
    `gatsby-plugin-typescript`,
  ],
};
