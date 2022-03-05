import * as nearAPI from "near-api-js";
import { WalletAccount } from "near-api-js";
const get_near = async () => {
  const { keyStores } = nearAPI;
  const keyStore = new keyStores.BrowserLocalStorageKeyStore();
  const config = {
    networkId: "testnet",
    keyStore, // optional if not signing transactions
    nodeUrl: "https://rpc.testnet.near.org",
    walletUrl: "https://wallet.testnet.near.org",
    helperUrl: "https://helper.testnet.near.org",
    explorerUrl: "https://explorer.testnet.near.org",
  };
  const near = await nearAPI.connect(config);
  return near;
};
const get_wallet = async() => {
    const near = await get_near();
    const wallet = new WalletAccount(near);
    return wallet;
}
export const check_signIn = async() => {
    const wallet = await get_wallet();
    if (wallet.isSignedIn()){
        return wallet.getAccountId();
    }else {
        return false;
    }
}

export const signIn = async() => {
    const wallet = await get_wallet();
    wallet.requestSignIn();
    return wallet.getAccountId();
}
export const get_state = async() => {
    const wallet = await get_wallet();
    const contract = new nearAPI.Contract(wallet.account(),"dev-1646464161743-60471218272406",{
        viewMethods:["read","get_list"],
        changeMethods:["increase"],
    });

    const list = await contract.get_list();
    console.log(list); 
    return await contract.read();
}
export const increment = async() => {
    const wallet = await get_wallet();
    const contract = new nearAPI.Contract(wallet.account(),"dev-1646464161743-60471218272406",{
        viewMethods:["read","get_list"],
        changeMethods:["increase"],
    });
    await contract.increase({});
    console.log(res); 
}
export const logout = async() => {
    const wallet = await get_wallet();
    wallet.signOut();
}