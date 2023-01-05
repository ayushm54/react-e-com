import React, { useEffect } from "react";

import { HeroBanner, Product, FooterBanner } from "../components";
import { client } from "../lib/sanity-client";

const Home = ({ products, bannerData }) => {
  return (
    <>
      <HeroBanner heroBanner={bannerData.length && bannerData[0]} />
      <div className="products-heading">
        <h2>Best Selling Products</h2>
        <p>Speakers of many variations</p>
      </div>
      <div className="products-container">
        {products?.map((product) => (
          <Product key={product._id} product={product} />
        ))}
      </div>
      <FooterBanner footerBanner={bannerData.length && bannerData[0]} />
    </>
  );
};

// in Next.js what ever getServerSideProps returns gets populated in the component's render
export const getServerSideProps = async () => {
  let query = `*[_type=="product"]`;
  const products = await client.fetch(query);

  query = `*[_type=="banner"]`;
  const bannerData = await client.fetch(query);

  return {
    props: {
      products,
      bannerData,
    },
  };
};

export default Home;
