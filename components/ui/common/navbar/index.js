


import Link from 'next/link'
import { useWeb3 } from '@components/providers'
import Button from '../button'
import { useAccount } from '@components/hooks/web3/useAccount'
import { useRouter } from 'next/dist/client/router'

export default function Footer() {

  const {connect ,isLoading, isWeb3Loaded}= useWeb3()
  const { account } = useAccount()
  const {pathname}= useRouter()

  return (
    <section>

      <div className="relative pt-6 px-4 sm:px-6 lg:px-8">
        <nav className="relative" aria-label="Global">
          <div className="flex justify-between items-center">
            <div>
              <Link href="/"  legacyBehavior>
              <a className="font-medium mr-8 text-gray-500 hover:text-gray-900">Home</a>
              </Link>
              <Link href="/marketplace"  legacyBehavior>
              <a className="font-medium mr-8 text-gray-500 hover:text-gray-900">Marketplace</a>
              </Link>
              <Link href="/"  legacyBehavior>
              <a className="font-medium mr-8 text-gray-500 hover:text-gray-900">Blogs</a>
              </Link>
            </div>
            <div>
            <Link href="/"  legacyBehavior>
              <a className="font-medium mr-8 text-gray-500 hover:text-gray-900">Wishlist</a>
              </Link>
                {
                 isLoading ? 
                 <Button
                 disabled={true}
                 onClick={connect} 
                 >
                  Loading...
                   </Button> :
                   isWeb3Loaded ?
                   account.data ? 
                      <Button
                      variant='red'
                      hoverable={false}
                  className='cursor-default'  >
                    Hi There :) {account.isAdmin && "Admin"}
                     </Button> :
                  <Button
                  onClick={connect} >
                    Connect
                    </Button> 
                    : 
                    <Button 
                    onClick={()=>window.open("https://metamask.io/","_blank")} >
                      Install MetaMask
                      </Button>
                }
               
            
             
            </div>
          </div>
        </nav>
      </div>
      {account.data && 
      !pathname.includes("/marketplace") && 
      <div className='flex justify-end pt-1 sm:px-6 lg:px:8'>
        <div className='text-white bg-indigo-600 rounded-md p-2'>
        {account.data}
        </div>
        </div>
      }
    </section>
  )
}
