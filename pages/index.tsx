import type { NextPage, GetServerSideProps } from "next";
import Head from "next/head";
import { useAddress } from "@thirdweb-dev/react";
import { ConnectMetamaskButton } from "../components/ConnectMetamaskButton";
import {
  getServerPageGetTrendingCollections,
  ssrGetTrendingCollections,
} from "../types/generated/page";
import { GetTrendingCollectionsQuery } from "../types/generated/graphql";
import { withApollo } from "../libs/withApollo";

type HomeProps = {
  data: GetTrendingCollectionsQuery;
};

const Home: NextPage<HomeProps> = ({ data }) => {
  const metamaskAddress = useAddress();
  const trendingCollections = data?.trendingCollections?.edges;
  const isShowingNFTs = metamaskAddress && trendingCollections;
  return (
    <div className="p-4">
      <Head>
        <title>QuickNode Test</title>
        <meta
          name="description"
          content="Take home challenge for Rodrigo Cauduro"
        />
        <link rel="icon" href="/favicon.svg" />
      </Head>
      <main>
        <ConnectMetamaskButton metamaskAddress={metamaskAddress} />
        {metamaskAddress ? (
          <h3 className="my-5">See Trending NFTs below:</h3>
        ) : (
          <h3 className="my-5">Please connect Metamask to start</h3>
        )}
        {isShowingNFTs && (
          <div>
            {trendingCollections.map(
              ({
                node: {
                  name,
                  address,
                  unsafeOpenseaImageUrl,
                  unsafeOpenseaExternalUrl,
                },
              }) => (
                <div
                  key={address}
                  className="mt-4 bg-blue-200 p-4 rounded-xl block w-[600px]"
                >
                  <a
                    href={unsafeOpenseaExternalUrl}
                    className="hover:underline"
                  >
                    <h3 className="text-lg font-bold">{name}</h3>
                    <p className="mt-2 mb-4">NFT contract address: {address}</p>
                    <img
                      src={unsafeOpenseaImageUrl}
                      className="object-cover w-32 h-32 rounded-xl"
                    />
                  </a>
                </div>
              )
            )}
          </div>
        )}
      </main>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  return await getServerPageGetTrendingCollections({}, ctx);
};

export default withApollo(ssrGetTrendingCollections.withPage()(Home));
