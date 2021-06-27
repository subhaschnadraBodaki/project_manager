
import React from 'react'
import AddTask from '../../AddTask'
import AddIssues from '../../AddIssues'

export default function formTypeFxn({formType,projectId}) 
{
       switch(formType)
       {
         case 'AddTask':
         return <AddTask projectId={projectId}/>
         case 'AddIssues':
         return <AddIssues projectId={projectId}/>

         default: 
         return null
       }
    }