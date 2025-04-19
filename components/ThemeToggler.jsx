"use client"
import { ThemeContext } from '@/context/ThemeContext'
import React, { useContext } from 'react'

const ThemeToggler = () => {

  const {theme, toggleTheme} = useContext(ThemeContext);

  return (
    <div>
        <h2>{theme == "dark" ? "Ciemny tryb" : "Jasny tryb"}</h2>
        <button onClick={toggleTheme} className='bg-blue-500 text-white p-2 rounded-md'>Zmień tryb</button>
    </div>
  )
}

export default ThemeToggler