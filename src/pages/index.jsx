import React from "react"

import Layout from "../components/layout"
import SEO from "../components/seo"
import SetpointApp from "../app"

const IndexPage = () => (
  <Layout>
    <SEO title="Bereken je setpoint" />
    <SetpointApp />
  </Layout>
)

export default IndexPage
