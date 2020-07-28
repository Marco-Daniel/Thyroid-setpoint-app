require("dotenv").config()

module.exports = {
  siteMetadata: {
    title: `Thyroid Setpoint Calculator`,
    description: `Gebruik deze app om uw schildklier setpoint te berekenen.`,
    author: `M.D. Leguijt, M.D. Design & Development`,
    version: `0.7-bèta`,
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-material-ui`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `thyroid-setpoint-calculator`,
        short_name: `Setpoint Calculator`,
        start_url: `/`,
        background_color: `#663399`,
        theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `src/images/icon.png`, // This path is relative to the root of the site.
      },
    },
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: process.env.GA_TRACKING_ID,
      },
    },
  ],
}
