import Image from "next/image"
import Link from "next/link"
import { IoCalendarClearOutline, IoCheckboxOutline, IoListOutline, IoLogOutOutline } from "react-icons/io5";
import { SideBarItem } from './SideBarItem';

const sideBarItems = [
  {
    title: 'Dashboard',
    icon: <IoCalendarClearOutline size={30} />,
    path: '/dashboard',
  },
  {
    title: 'Rest TODOs',
    icon: <IoCheckboxOutline size={30} />,
    path: '/dashboard/rest-todos',
  },
  {
    title: 'Server Actions',
    icon: <IoListOutline size={30} />,
    path: '/dashboard/server-todos',
  },

]

export const SideBar = () => {
  return (
    < aside className = "ml-[-100%] fixed z-10 top-0 pb-3 px-6 w-full flex flex-col justify-between h-screen border-r bg-white transition duration-300 md:w-4/12 lg:ml-0 lg:w-[25%] xl:w-[20%] 2xl:w-[15%]" >
      <div>
        <div className="-mx-6 px-6 py-4">
          
          <Link href="#" title="home">
            <Image 
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS7RDEtPGvqNOxsei62fAUnKqBZkR5tyrOilA&s" 
              width={150} 
              height={150}
              alt="tailus logo"
            />
          </Link>
        </div>

        <div className="mt-8 text-center">
          <Image 
            src="https://cdn-icons-png.flaticon.com/512/6858/6858504.png" 
            width={10} 
            height={10} 
            alt="User logo" 
            className="m-auto rounded-full object-cover lg:w-28 lg:h-28"
          />
            <h5 className="hidden mt-4 text-xl font-semibold text-gray-600 lg:block">Rodolfo Sanchez</h5>
            <span className="hidden text-gray-400 lg:block">Admin</span>
        </div>

        <ul className="space-y-2 tracking-wide mt-8">
          {
            sideBarItems.map(( item ) => (
              <SideBarItem key={item.path} { ...item }/>
            ))
          }
        </ul>
      </div>

      <div className="px-6 -mx-6 pt-4 flex justify-between items-center border-t">
        <button className="px-4 py-3 flex items-center space-x-4 rounded-md text-gray-600 group">
          <IoLogOutOutline />
          <span className="group-hover:text-gray-700">Logout</span>
        </button>
      </div>
    </aside >
  )
}