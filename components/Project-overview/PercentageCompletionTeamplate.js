import React from 'react'

export default function PercentageCompletionTeamplate({percentageCompletion}) {
   
   
   if(percentageCompletion==null  || percentageCompletion===undefined){

   
    return (
        
        <div className="relative pt-1">
  <div className="flex items-center justify-between">
    
    <div className="text-right">
      <span className="text-base font-semibold inline-block text-blue-600">
    0%
      </span>
    </div>
  </div>
  <div className="w-24 overflow-hidden h-2 mb-4 text-xs flex rounded bg-blue-200">
    <div style={{ width: '0%' }} className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-blue-500"></div>
  </div>
</div>
    )
}

else{
    return (
        
        <div >
  <div className="flex  items-center justify-between">
    
    <div className="text-right">
      <span className="text-base font-semibold inline-block text-blue-600">
   {percentageCompletion}%
      </span>
    </div>
  </div>
  <div className="w-24 overflow-hidden h-2 mb-4 text-base flex rounded bg-blue-200  ">
    <div style={{ width: `${percentageCompletion}%` }} className=" shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-blue-500"></div>
  </div>
</div>
    )
}
}