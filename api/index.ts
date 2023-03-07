import { Network, Alchemy } from "alchemy-sdk";

const settings = {
    apiKey: process.env.NEXT_PUBLIC_ALCHEMY_API_KEY,
    network: Network.ETH_MAINNET,
};

const alchemyAPI = new Alchemy(settings);

export default alchemyAPI;