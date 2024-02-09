const { createContext, useContext, useEffect, useState, useMemo } = require("react");
import detectEthereumProvider from '@metamask/detect-provider';
import Web3 from 'web3';

const Web3Context = createContext(null)

export default function Web3Provider({children} ){
    const [web3Api, setWeb3Api] = useState({
        provider: null,
        web3: null,
        contract: null,
        isLoading : true
    })

    useEffect(()=>{
        const loadProvider = async ()=>{
            const provider = await detectEthereumProvider();
            if(provider){
                const web3 = new Web3(provider)
                setWeb3Api({
                    provider,
                    web3,
                    contract: null,
                    isLoading: false
                })
                console.log(web3)
            }
            else{
                setWeb3Api(api=>({...api, isLoading: false}))
                console.log('Please install MetaMask!')
            }
        }
        loadProvider()
    },[])

    const _web3Api = useMemo(()=>{
        return {
            ...web3Api,
            isWeb3Loaded:!web3Api.isLoading && web3Api.web3,
            connect: web3Api.provider ? 
            async () =>{
                try{
                    await web3Api.provider.request({ method: 'eth_requestAccounts' });
                }catch{
                    console.log('Cannot retrive account')
                    location.reload()
                }
            }: 
            ()=>{
                console.log('Cannot connect to metamask!')
            }
        }
    },[web3Api])

    return (
        <Web3Context.Provider value={_web3Api}>
            {children}
        </Web3Context.Provider>
    )
}

export function useWeb3(){
    return useContext(Web3Context)
}