import React, { useState } from 'react'
import { IoSend } from 'react-icons/io5'

const BotComponent = () => {

    const [botMessage, setBotMessage] = useState()
    const inputChangeHandler = (e) => {
        // console.log(e.target.value)
        setBotMessage(e.target.value)
    }

    const onSubmit = (e ) => {
        e.preventDefault()
    }


  return (
    <div className=' flex flex-col shadow-2xl rounded-b-3xl mt-9 ' >
        <div className='bg-pryBlue text-white  p-4 pt-32 rounded-t-3xl ' >
            <h1 className='text-xl' >Hello there 👋🏽</h1>
            <h1 className='text-xl' >How are you feeling?</h1>
        </div>
        <div className='border-2 p-4 pt-10 flex flex-col ' >
            <p className='text-sm font-semibold justify-self-end ' >{botMessage ? botMessage : 'Send us a message' }</p>
            <p className='text-sm justify-self-start '  >{!botMessage && "We typically reply in few minutes"}</p>
        </div>
        <div className=' p-4 rounded-b-2xl border-2 flex items-center ' >
            <form className='flex gap-3' onSubmit={onSubmit} >
                <input type="text" className=' outline  outline-1 outline-slate-800 rounded-3xl p-2  ' value={botMessage} onChange={(e) => inputChangeHandler(e)} />
                <button type='submit' >
                    <IoSend size={28} />
                </button>
            </form>
        </div>
    </div>
  )
}

export default BotComponent