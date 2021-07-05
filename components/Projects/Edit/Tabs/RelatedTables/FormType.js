
import React from 'react'
import AddTask from '../../AddForms/AddTask'
import AddIssues from '../../AddForms/AddIssues'
import AddDeliverables from '../../AddForms/AddDeliverables'
import AddRisks from '../../AddForms/AddRisks'
import AddMilestones from '../../AddForms/AddMilestones'
import AddTeam from '../../AddForms/AddTeam'
import AddChangeReq from '../../AddForms/AddChangeReq'

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
         case 'AddMilestones':
         return <AddMilestones projectId={projectId}/>
         case 'Add Team':
         return <AddTeam projectId={projectId}/>
         case 'AddChangeReq':
         return <AddChangeReq projectId={projectId}/>
         default: 
         return null
       }
    }