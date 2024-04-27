import React from 'react'

const TipComponent = () => {

    const tipsDummy = [
        {
            topic: "Do you know eating late is bad?",
            description: " its not good its not goodits not goodits not goodits not goodits not goodits not goodits not goodits not goodits not goodits not goodits not goodits not goodits not goodits not goodits not goodits not goodits not goodits not goodits not goodits not good "
        },
        {
            topic: "Do you talking too much is bad?",
            description: " its not good its not goodits not goodits not goodits not goodits not goodits not goodits not goodits not goodits not goodits not goodits not goodits not goodits not goodits not goodits not goodits not goodits not goodits not goodits not goodits not good "
        },
    ]


  return (
    <div>
        <h2 className='bg-gray-300 text-xl p-2 px-4 capitalize rounded-2xl   ' >Health Tips</h2>
        <div className=' border-2 rounded-3xl p-4 ' >
            {
                tipsDummy.map(({topic, description}) => {
                    return(
                        <div className='' >
                            <h3 className=' font-semibold ' >{topic}</h3>
                            <p className=' text-sm ml-5 ' >{description}</p>
                        </div>
                    )
                })
            }
        </div>
    </div>
  )
}

export default TipComponent