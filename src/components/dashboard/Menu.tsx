import React from 'react'

type Props = {}

export const Menu = (props: Props) => {
    return (
        <aside className=' fixed z-20 h-full top-0 left-0 pt-16 flex lg:flex flex-shrink-0 flex-col w-64 '>
            <div className='flex-1 flex flex-col pt-5 pb-4 overflow-y-auto'>
                <div className='flex-1 flex flex-col pl-3'>
                    <ul className='p-3'>
                        <li className='d-menu-list'>Dashboard</li>
                        <li className='d-menu-list'>User</li>
                        <li className='d-menu-list'>Help</li>
                    </ul>
                </div>
            </div>
        </aside>
    )
}

