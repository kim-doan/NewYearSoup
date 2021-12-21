import React, { useState, useEffect } from "react";
import Layout from '../components/layout';
import { auth, database } from '../firebase';
import { onValue, ref } from '@firebase/database';

const IndexPage = () => {
  
  return (
    <Layout pageTitle="Home Page">
      <p>I'm making this by following the Gatsby Tutorial.</p>
    </Layout>
  )
}

export default IndexPage