import React from 'react'
import { Link } from 'react-router-dom'
import { routes } from './routes'


const Navbar = ({ currentRoute }) => {
  return (
    <nav className="flex justify-between items-center py-4 bg-purple-900">
      <div className="flex-shrink-0 ml-10 cursor-pointer">
        <span className='ml-1 text-3xl text-purple-50 font-semibold'>Save That Shit</span>
      </div>
      <ul className="hidden md:flex overflow-x-hidden mr-10 font-semibold">
        {routes.map((route) => {
          const { id, path, value } = route
          return (
            <li key={id} className={`mr-6 p-1 ${currentRoute === path ? 'text-purple-300' : 'text-purple-50'
              } hover:text-purple-300`}>
              <Link to={path}>
                {value}
              </Link>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}

export default Navbar
