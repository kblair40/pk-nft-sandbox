const networkConfig = {
    31337: {
        name: "localhost",
        // kovan testnet price feed
        ethUsdPriceFeed: "0x9326BFA02ADD2366b30bacB125260Af641031331",
        gasLane: "0xd89b2bf150e3b9e13446986e571fb9cab24b13cea0a43ea20a6049a85cc807cc", // 30 gwei
        // ^^ https://docs.chain.link/docs/vrf-contracts/

        mintFee: "10000000000000000", // 0.01 ETH
        callbackGasLimit: "500000", // 500,000 gas
    },
    // Price Feed Address, values can be obtained at https://docs.chain.link/docs/reference-contracts
    // Default one is ETH/USD contract on Kovan
    4: {
        name: "rinkeby",
        // rinkeby testnet price feed ETH / USD
        ethUsdPriceFeed: "0x8A753747A1Fa494EC906cE90E9f37563A8AF630e",
        gasLane: "0xd89b2bf150e3b9e13446986e571fb9cab24b13cea0a43ea20a6049a85cc807cc", // 30 gwei
        // ^^ https://docs.chain.link/docs/vrf-contracts/

        callbackGasLimit: "500000", // 500,000 gas
        mintFee: "10000000000000000", // 0.01 ETH
        // I don't think subscriptionId will be needed for this
        // subscriptionId: "8341",
    },
    1: {},
};

const DECIMALS = "18";
const INITIAL_PRICE = "200000000000000000000";
// the chains below are what will be used in development
// test scripts are prevented from running if contract is deployed on a development chain
const developmentChains = ["hardhat", "localhost"];

module.exports = {
    networkConfig,
    developmentChains,
    DECIMALS,
    INITIAL_PRICE,
};
