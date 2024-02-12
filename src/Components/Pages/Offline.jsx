import React from 'react'

const Offline = () => {
    return (
        <div className='capitalize flex items-center justify-center p-1'>
            <section className='w-full 600px:w-[500px] text-center p-1'>
                <h2 className='font-semibold  text-2xl text-slate-600 dark:text-slate-200'>you are offline</h2>
                <p className='text-base text-slate-600 dark:text-slate-300 mt-2'>make sure you have a proper internet connection. You cannot watch videos without proper internet connection.</p>
            </section>
        </div>
    )
}

export default Offline