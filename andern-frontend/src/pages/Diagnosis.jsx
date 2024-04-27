import React from 'react'

const Diagnosis = () => {
  return (
    <div>
        <h1>Wanna get drugs? submit your prescriptions</h1>
        <form className=' shadow-2xl outline outline-1 outline-gray-600 p-4 my-3 rounded-2xl ' >
          <div className='flex justify-stretch my-4 gap-4  '>
              <div className='flex items-center gap-2 ' >
                <label htmlFor="hospitalName">Hospital Name:</label>
                <input type="text" name="hospitalName" className=' outline outline-1 outline-gray-600 px-2  ' />
              </div>
              <div className='flex items-center gap-2 ' >
                <label htmlFor="hospitalName">Hospital Id:</label>
                <input type="text" name="hospitalName" className=' outline outline-1 outline-gray-600 px-2  ' />
              </div>
          </div>
          <div className='flex items-center my-4 gap-2 ' >
            <label htmlFor="hospitalName">Upload prescription:</label>
            <input type="file" name="hospitalName" className=' outline outline-1 outline-gray-600 px-2  ' />
          </div>
          <div className='flex items-center my-4 gap-2 ' >
            <label htmlFor="hospitalName">Input prescription:</label>
            <input type="text" name="hospitalName" className=' outline outline-1 outline-gray-600 px-2 w-[500px] h-[50px]  ' />
          </div>
          
        </form>
    </div>
  )
}

export default Diagnosis