'use client'
import Link from "next/link"
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

interface Props {
  title: string;
  icon: ReactNode;
  path: string;
}

export const SideBarItem = ({ title, icon, path }: Props) => {
  const pathname = usePathname();

  return (
    <li>
      <Link 
        href={ path } 
        className={`
          relative px-4 py-3 flex items-center space-x-4 rounded-xl 
          hover:bg-gradient-to-r hover:bg-sky-600 
          ${ ( path === pathname ) ? 'text-white bg-linear-to-r from-sky-600 to-cyan-400' : ''}`}
      >
        { icon }
        <span className="group-hover:text-white-700 text-black">{ title }</span>
      </Link>
    </li>
  )
}