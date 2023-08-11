import { Disclosure } from '@headlessui/react'
import { NavLink, useNavigate } from 'react-router-dom'
import Cookies from 'js-cookie'
import { logout } from '../store/authActions'

export default function TopNav() {
   
      const navigation = [
        { name: 'New School', href: '/user/create-school', current: true },
        { name: 'All School', href: '/user/all-school', current: false },
      ]
     
     
      const navigatge = useNavigate()
      const handleLogout = ()=>{
            Cookies.remove("token")
            logout();
            navigatge("/")
      }
  return ( 
    <div className="min-h-full">
        <Disclosure as="nav" className="bg-gray-800">
          {({ open }) => (
            <>
              <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="flex h-16 items-center justify-between">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <img
                        className=" w-[8rem]"
                        src="https://www.eupheus.in/static/media/logo.f9fd97ff89ac44ae2b1f.png"
                        alt="Your Company"
                      />
                    </div>
                    <div className="hidden md:block">
                      <div className="ml-10 flex items-baseline space-x-4" id="topBar">
                        {navigation.map((item,i) => (
                          <NavLink
                          end
                          to={item?.href}
                          key={i}
                          className=" text-gray-300 hover:bg-gray-700 hover:text-white  rounded-md px-3 py-2 text-sm font-medium"
                          >
                           {item?.name}
                          </NavLink>

                          
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="hidden md:block">
                    <div className="ml-4 flex items-center md:ml-6">
                          <button onClick={handleLogout} className=' bg-red-700 text-white py-2 px-4 rounded-lg hover:shadow-lg '>
                            Logout
                          </button>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
        </Disclosure>

     
      </div>
  )
}
