import React from 'react'
import { Menu } from './Menu'



export const index = () => {
    return (
        <div className='relative flex-1 flex flex-col min-h-0 border-r border-gray-200 bg-white pt-0 '>
            <Menu />
            <main className='h-full w-full bg-gray-50 relative overflow-y-auto lg:ml-64 '>
                <div className='px-6 py-4'>
                    <div className='h-96 bg-white shadow'>Test</div>
                </div>

            </main>
        </div>
    )
}

// export default index 