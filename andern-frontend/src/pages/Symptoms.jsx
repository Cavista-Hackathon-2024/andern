import React from 'react'

const Symptoms = () => {
  
  const questions = ["Describe your symptoms"]



  return (
    <div>
        {/* Form */}
        <div className=' p-4 border-2 rounded-3xl ' >
          {
            questions.map((text) => {
              return(
                <div className=' flex flex-col mb-5 ' >
                  <div>{text}</div>
                  <input type="text" className=' outline  outline-1 outline-slate-300 rounded-3xl p-2  ' />
                </div>
              )
            })
          }
        </div>
   
          <button classname="bg-blue-500 text-white px-4 py-2 rounded-l-lg"> Submit to pharmacy</button>
          <button  classname="bg-blue-500 text-white px-4 py-2 rounded-l-lg">Get AI insights</button>

    </div>
  )
}

export default Symptoms