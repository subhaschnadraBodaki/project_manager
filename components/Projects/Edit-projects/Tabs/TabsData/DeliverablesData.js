import React from 'react'
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import TableToolbar from '../TableToolbar'
import { TrashIcon, PencilIcon } from '@heroicons/react/solid'
import Modal from 'react-modal'
import {useState} from 'react'
import { Button } from 'primereact/button';
import EditIssues from '../../EditIssues'
import {useRef} from 'react'
import { Toast } from 'primereact/toast';
import axios from 'axios'

export default function DeliverablesData({projectsData}) {
     const projectName = projectsData[0].name
    const projectId = projectsData[0].id
      const[ModalIsOpen, setModalIsOpen] = useState(false)
   const toast = useRef(null);  
  const [deleteItem,setDeleteItem]=useState(false)
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

        const customStylesDelete = {
        content: {
            position: 'absolute',
             top: '30%',
          left: '30%',
          right: 'auto',
          bottom: 'auto',
          width: '450px',
          height: '180px' , 
        },
      };
      if (projectsData[0] == null || projectsData[0] === undefined || projectsData[0].project_deliverables[0] == null || projectsData[0].project_deliverables[0] === undefined) {

        return (
         <div>
        <div><TableToolbar projectId={projectId} projectName={projectName} label='Add Deliverables' formType='AddDeliverables'/></div>
        <div>No Data Found</div>
        </div>
        )
    }
    else{
   const [deliverablesData,setDeliverablesData] =useState(projectsData[0].project_deliverables)

    const deleteProduct = (rowData) => {
         let  _deliverablesData = deliverablesData.filter(val => val.id !== rowData.id);
         setDeliverablesData(_deliverablesData)
         console.log(_deliverablesData)
           toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Deliverable Deleted', life: 3000 });
             const url =  `${process.env.NEXT_PUBLIC_SUPABASE_URL}/issues?id=eq.${rowData.id}` 
      axios.delete(url,
            {
            headers:{
                "apikey":process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
                "Content-Type": "application/json"
            }
            
        }
      )
          }


 const ActionButton = (rowData) => {
        return (
            <React.Fragment>
                     <Modal 
            isOpen={ModalIsOpen}
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

            <EditIssues projectId={projectId} rowID={rowData.id} />
          </Modal>

            <Modal
          isOpen={deleteItem}
            onRequestClose={()=> setDeleteItem(false)}
            style={customStylesDelete } 
            header="Confirm"
            ariaHideApp={false}
            shouldCloseOnOverlayClick={false}
             >
                  <div className="grid grid-cols-2">
                <div><h2 className="h2FormModal">Confirm</h2></div>
                <div className="text-right">
                <Button icon="pi pi-times" className="p-button-rounded p-button-danger p-button-outlined align-right" onClick={()=> setDeleteItem(false)} />
                </div>
               </div>

                    <div className="DeleteFormModalAlert md:mt-3">
                  <i className="pi pi-exclamation-triangle p-mr-3" style={{ fontSize: '2rem'}} />
                  <h2>Are you Sure you want to delete {rowData.name} ?</h2> 
                  </div>
                  <div className="text-right md:mt-2">        
                      
                    <Button label="No" icon="pi pi-times" className="p-button-text" onClick={()=>setDeleteItem(false)}/>
                    <Button label="Yes" icon="pi pi-check" className="p-button-text"  onClick={()=>deleteProduct(rowData)} />
            
                 </div>
          </Modal>

                <button onClick={() => setModalIsOpen(true) }>
                    <PencilIcon className="h-5 w-5 mr-4" />
                </button>
                <button onClick={() => setDeleteItem(true)}>
                    <TrashIcon className="h-5 w-5 " />
                </button>
            </React.Fragment>
        );
    }
    

    const columns = [
        {field:"name" , header:"Name"},
        {field:"project_id" , header:"Project ID"},
        {field:"status" , header:"Status"},
        {field:"parent_deliverables"  , header:"Parent Deliverables"}
    ]





const dynamicColumns = columns.map((col)=> {
    return <Column key={col.field} field = {col.field} header={col.header}/>
})
    return (
        <div>
               <div>
                 <Toast ref={toast} />
               <TableToolbar projectId={projectId} projectName={projectName} label='Add Deliverables' formType='AddDeliverables'/>
            </div>
              <DataTable value={deliverablesData} className="p-datatable-sm" resizableColumns columnResizeMode="expand">
                        {dynamicColumns}
                         <Column header="Action" body={ActionButton}></Column>
                    </DataTable> 
        </div>
    )
}
}
