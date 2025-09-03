

import React from 'react'
import Footer from '../components/Footer'
import Navbar from '../components/Navebar'

function layout({ children }: { children: React.ReactNode }) {
    return (
        <div>
            <Navbar />
            <div className='' >

                {children}

            </div>
            <Footer />

        </div>
    )
}

export default layout