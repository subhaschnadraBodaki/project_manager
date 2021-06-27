import React from 'react'

export default function Button({buttonName , onClickHandler , buttonIcon}) {
    return (
        <div>
            <button className="bg-blue-900 px-0.5 py-1 text-sm shadow-sm font-medium tracking-wider border text-blue-100 rounded-md hover:shadow-lg hover:bg-blue-800 flex" onClick={onClickHandler}>{buttonIcon}{buttonName}</button>
        </div>
    )
}
