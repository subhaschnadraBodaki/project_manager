import React from 'react'
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { TrashIcon, PencilIcon } from '@heroicons/react/solid'
import { useRouter } from 'next/router'
import axios from 'axios'
import TableToolbar from '../TableToolbar'
import Modal from 'react-modal'
import {useState} from 'react'
import { Button } from 'primereact/button';
import EditTask from '../../EditTask'
import {PlusIcon , SaveIcon } from '@heroicons/react/solid'
import { Toolbar } from 'primereact/toolbar';
import AddTask from '../../AddTask'

export default function TasksData({projectsData}) {
       
    const projectId = projectsData[0].id
    const[EdittaskIsOpen, setEditTaskIsOpen] = useState(false)
    const[taskIsOpen, setTaskIsOpen] = useState(false)

    const customStyles = {
        content: {
          top: '50%',
          left: '50%',
          right: 'auto',
          bottom: 'auto',
          width: '800px', 
          height: '500px', 
          marginRight: '-50%',
          transform: 'translate(-50%, -50%)',
        },
      };
    
    if(projectsData[0]==null || projectsData[0] === undefined || projectsData[0].project_tasks[0]==null || projectsData[0].project_tasks[0]===undefined ){
return <div>No Data Found</div>
    }
    else{
    
    const tasksData = projectsData[0].project_tasks
    // console.log(tasksData)  
    // const router = useRouter()
    
    // const ActionOnClick = async (rowData) => {
    //     await router.push(`/projectdetails/${rowData.id}`)

    // }
    // const EditOnClick = async (rowData) => {
    //     await router.push(`/editproject/${rowData.id}`)

    // }
   
    // deleteRow(id, e){  
    //     axios.delete(`https://jsonplaceholder.typicode.com/posts/${id}`)  
    //       .then(res => {  
    //         console.log(res);  
    //         console.log(res.data);  
    //       })
    //     }

        // const deleteRow= axios.delete({
            
        //     url:  `${process.env.NEXT_PUBLIC_SUPABASE_URL}/tasks?id=eq.${rowData.id}` ,
        //     headers:{
        //         "apikey":process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
        //         "Content-Type": "application/json"
        //     }
            
        // })



    const ActionButton = (rowData) => {
        return (
            <React.Fragment>
                     <Modal 
            isOpen={EdittaskIsOpen}
            onRequestClose={()=> setEditTaskIsOpen(false)}
            style={customStyles}
            ariaHideApp={false}
            shouldCloseOnOverlayClick={false}
            >   
            
            <div className="grid grid-cols-2">
                <div><h2 className="h2Form">Project-Id : {projectId}</h2></div>
                <div className="text-right">
                <Button icon="pi pi-times" className="p-button-rounded p-button-danger p-button-outlined align-right" onClick={()=> setEditTaskIsOpen(false)} />
                </div>
            </div>

            <EditTask projectId={projectId} rowID={rowData.id} />
          </Modal>
                <button onClick={() => setEditTaskIsOpen(true) }>
                    <PencilIcon className="h-5 w-5 mr-4" />
                </button>
                <button onClick={() => console.log(rowData)}>
                    <TrashIcon className="h-5 w-5 " />
                </button>
            </React.Fragment>
        );
    }

    
    const columns = [
        {field:"name" , header:"Task Name"},
        {field:"parent_task" , header:"Parent Task"},
        {field:"predecessor_task" , header:"Predecessor Task"},
        {field:"description"  , header:"Task Description"}
    ]
const dynamicColumns = columns.map((col)=> {
    return <Column key={col.field} field = {col.field} header={col.header}/>


})


//----------------------header buttons------------------

const leftToolbarTemplate = () => {
    return (<>
            <Modal 
            isOpen={taskIsOpen}
            onRequestClose={()=> setTaskIsOpen(false)}
            style={customStyles}
            ariaHideApp={false}
            shouldCloseOnOverlayClick={false}
            >   
            
            <div className="grid grid-cols-2">
                <div><h2 className="h2Form">Project-Id : {projectId}</h2></div>
                <div className="text-right">
                <Button icon="pi pi-times" className="p-button-rounded p-button-danger p-button-outlined align-right" onClick={()=> setTaskIsOpen(false)} />
                </div>
            </div>

            <AddTask projectId={projectId} />
          </Modal>

        
        <React.Fragment>
            <button className="bg-blue-900 px-5 py-3 text-sm shadow-sm font-medium tracking-wider text-white rounded-2xl hover:shadow-lg  flex" ><PlusIcon className="h-5  w-5"  onClick={()=> setTaskIsOpen(true)} /> Add Task</button>
        </React.Fragment>
    </>
    )
  }

 

const rightToolbarTemplate = () => {
    return (
        <React.Fragment>
                 <button className="bg-blue-900 px-5 py-3 text-sm shadow-sm font-medium tracking-wider border text-white rounded-2xl hover:shadow-lg  flex "><SaveIcon className="h-5 w-5 mr-2"  /> Save</button>
           
        </React.Fragment>
    )
}

// ------------------------------------------------------------------
    return ( 
        <div>
            <div>
              <Toolbar className="p-mb-4" left={leftToolbarTemplate} right={rightToolbarTemplate}></Toolbar>
            </div>
              <DataTable value={tasksData} resizableColumns columnResizeMode="expand">
                        {dynamicColumns}
                        <Column header="Action" body={ActionButton}></Column>
                    </DataTable> 
        </div>
    )
    }
}
