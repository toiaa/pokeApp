import {
  ConnectWallet,
  useContract,
  useOwnedNFTs,
  useAddress,
  ThirdwebNftMedia,
  Web3Button,
} from "@thirdweb-dev/react";
import type { NextPage } from "next";
import styles from "../styles/Home.module.css";

const Home: NextPage = () => {
  const contractAddress = "0x33D9d03Ca845603eA33B7Ef8Fa92871837ab418B";
  const { contract } = useContract(contractAddress);
  const address = useAddress();

  const { data: nfts } = useOwnedNFTs(contract, address);
  return (
    <div className={styles.container}>
      <main>
        <div className={styles.connectContainer}>
          <ConnectWallet accentColor="#C95B0C" colorMode="light" />
        </div>
      </main>

      <section>
        <div className={styles.titleSection}>
          <h2>My Poke NFTs</h2>
          <p className={styles.networkTitle}>
            connect to mumbai to use this app
          </p>
        </div>
        <hr />
        <div className={styles.nftContainer}>
          {nfts?.map((nft) => {
            return (
              <div
                className={styles.singleNftContainer}
                key={nft.metadata.id.toString()}
              >
                <ThirdwebNftMedia metadata={nft.metadata} />
                <p className={styles.title}>{nft.metadata.name}</p>
              </div>
            );
          })}
        </div>
        <div className={styles.actions}>
          <Web3Button
            className={styles.actionButton}
            contractAddress={contractAddress}
            accentColor="white"
            action={(contract) => contract.erc1155.claim(0, 1)}
          >
            Claim a Charmander
          </Web3Button>

          {/* it allows u to call any action on any contract */}
          <Web3Button
            contractAddress={contractAddress}
            accentColor="#C95B0C"
            action={(contract) => contract.call("evolve")}
          >
            Evolve Charmander
          </Web3Button>
        </div>
      </section>
    </div>
  );
};

export default Home;
