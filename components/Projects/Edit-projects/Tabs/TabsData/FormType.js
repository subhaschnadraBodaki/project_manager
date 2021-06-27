
import React from 'react'
import AddTask from '../../AddTask'
import AddIssues from '../../AddIssues'
import AddDeliverables from '../../AddDeliverables'
import AddRisks from '../../AddRisks'
export default function formTypeFxn({formType,projectId}) 
{
       switch(formType)
       {
         case 'AddTask':
         return <AddTask projectId={projectId}/>
         case 'AddIssues':
         return <AddIssues projectId={projectId}/>
         case 'AddDeliverables':
         return <AddDeliverables projectId={projectId}/>
         case 'AddRisks':
         return <AddRisks projectId={projectId}/>
          
         default: 
         return null
       }
    }