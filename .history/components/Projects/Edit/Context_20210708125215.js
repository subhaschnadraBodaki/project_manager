import {createContext} from 'react'
import Prjdata from '../../../pages/projects/edit/[pid]'
console.log(Prjdata[0].project_tasks)
export const TaskTableContext = createContext()