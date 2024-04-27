import React from 'react'

const Symptoms = () => {
  
  const questions = ['Are you okay?', "What is wrong with you?", "Are you currently taking any medications or supplements?"]



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
    </div>
  )
}

export default Symptoms