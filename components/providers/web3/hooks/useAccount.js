

import { useEffect, useState } from 'react'
import useSWR from 'swr'

const adminAddresses = {
    "0x00cf4902111d68686415630599d61fe68b513f2fba552b0320bd39b63729e8a5": true
}

export const handler = (web3,provider) =>()=> {
    const {data, mutate, ...rest} = useSWR(()=>
     web3 ? "web3/accounts": null ,
       async ()=>{
            const accounts = await web3.eth.getAccounts()
            return accounts[0]
        }
    )


    useEffect(()=>{
       provider && provider.on('accountsChanged', accounts=> mutate(accounts[0] ?? null))
    },[provider])
    return {
        account:{
            data,
            isAdmin: (data && adminAddresses[web3.utils.keccak256(data)])??false,
            mutate,
            ...rest
        }
    }
}