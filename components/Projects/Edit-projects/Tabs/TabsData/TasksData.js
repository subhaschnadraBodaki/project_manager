import React from 'react'
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { TrashIcon, PencilIcon } from '@heroicons/react/solid'
import { useRouter } from 'next/router'
import axios from 'axios'
import TableToolbar from '../TableToolbar'
import Modal from 'react-modal'
import {useState}   from 'react'
import {useRef} from 'react'
import { Button } from 'primereact/button';
import EditTask from '../../EditTask'
import { Toast } from 'primereact/toast';



export default function TasksData({projectsData}) {
      const toast = useRef(null);  
    const projectId = projectsData[0].id
    const[modalIsOpen, setModalIsOpen] = useState(false)
    // console.log(projectsData)
    const customStyles = {
        content: {
          top: '50%',
          left: '50%',
          right: 'auto',
          bottom: 'auto',
          width: '900px', 
          height: '500px', 
          marginRight: '-50%',
          transform: 'translate(-50%, -50%)',
        },
      };
    
    if(projectsData[0]==null || projectsData[0] === undefined || projectsData[0].project_tasks[0]==null || projectsData[0].project_tasks[0]===undefined ){
return ( 
    <div>
      <TableToolbar projectId={projectId} label='Add Task' formType='AddTask'/>
      <div>No Data Found</div>
      </div>
)
    }
    else{
    
    const [tasksData,setTasksData] = useState(projectsData[0].project_tasks)
    
   const deleteProduct = (rowData) => {
        let  _tasksData = tasksData.filter(val => val.id !== rowData.id);
        setTasksData(_tasksData)
        console.log(_tasksData)
        // toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Task Deleted', life: 3000 });
// ---------------------------------------------------------------
        //    axios.delete({
            
        //     url:  `${process.env.NEXT_PUBLIC_SUPABASE_URL}/tasks?id=eq.${rowData.id}` ,
        //     headers:{
        //         "apikey":process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
        //         "Content-Type": "application/json"
        //     }
            
        // })


    }
       
        


    const ActionButton = (rowData) => {
         return (

            <React.Fragment>
            <Toast ref={toast} />
                     <Modal 
            isOpen={modalIsOpen}
            onRequestClose={()=> setModalIsOpen(false)}
            style={customStyles}
            ariaHideApp={false}
            shouldCloseOnOverlayClick={false}
            >   
            
            <div className="grid grid-cols-2">
                <div><h2 className="h2Form">Project-Id : {projectId}</h2></div>
                <div className="text-right">
                <Button icon="pi pi-times" className="p-button-rounded p-button-danger p-button-outlined align-right" onClick={()=> setModalIsOpen(false)} />
                </div>
            </div>

            <EditTask projectId={projectId} rowID={rowData.id} />
          </Modal>
               
                <button onClick={() => setModalIsOpen(true) }>
                    <PencilIcon className="h-5 w-5 mr-4" />
                </button>
                <button onClick={() => deleteProduct(rowData)}>
                    <TrashIcon className="h-5 w-5 " />
                </button>
            </React.Fragment>
        );
    }
// ---------------------------------------------------------------
    
    const columns = [
        {field:"name" , header:"Task Name"},
        {field:"parent_task" , header:"Parent Task"},
        {field:"predecessor_task" , header:"Predecessor Task"},
        {field:"description"  , header:"Task Description"}
    ]
   const dynamicColumns = columns.map((col)=> {
    return <Column key={col.field} field = {col.field} header={col.header}/>  
   })

// ------------------------------------------------------------------
    return ( 
        <div>
            <div>
              <TableToolbar projectId={projectId} label='Add Task' formType='AddTask'  />
            </div>
              <DataTable value={tasksData} resizableColumns columnResizeMode="expand">
                        {dynamicColumns}
                        <Column header="Action" body={ActionButton}></Column>
                    </DataTable> 
        </div>
    )
    }
}
