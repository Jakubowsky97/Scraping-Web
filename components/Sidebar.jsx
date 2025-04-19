"use client"
import React, { useContext } from 'react'
import SidebarHeader from './SidebarHeader'
import { ThemeContext } from '@/context/ThemeContext';

const Sidebar = () => {

    const ctx = useContext(ThemeContext);

    console.log(ctx)

    return (
        <div>
            <h3>Sidebar {ctx.theme}</h3>
            <SidebarHeader />
        </div>
    )
}

export default Sidebar