
import React from 'react'
import AddTask from '../../AddTask'
import AddIssues from '../../AddIssues'
import AddDeliverables from '../../AddDeliverables'
import AddRisks from '../../AddRisks'
import EditTask from '../../EditTask'
import EditIssues from '../../EditIssues'
import EditDeliverables from '../../EditDeliverables'

export default function formTypeFxn({formType,projectId,editData}) 
{
       switch(formType)
       {
         case 'AddTask':
         return <AddTask projectId={projectId} />
         case 'AddIssues':
         return <AddIssues projectId={projectId}/>
         case 'AddDeliverables':
         return <AddDeliverables projectId={projectId}/>
         case 'AddRisks':
         return <AddRisks projectId={projectId}/>
         case 'Edit Task':
         return <EditTask projectId={projectId} editData={editData} />
         case 'Edit Issue':
         return <EditIssues projectId={projectId} editData={editData} />
         case 'Edit Risk':
         return <EditIssues projectId={projectId} editData={editData} />
         case 'Edit Deliverable':
         return <EditDeliverables projectId={projectId} editData={editData} />
         
         default: 
         return null
       }
    }