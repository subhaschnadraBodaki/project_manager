import {createContext} from 'react'
import Prjdata from '../../../pages/projects/edit/[pid]'
export const TaskTableContext = createContext(Prjdata[0].project_tasks)