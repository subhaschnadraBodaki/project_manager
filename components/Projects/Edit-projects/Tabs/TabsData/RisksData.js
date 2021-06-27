import React from 'react'
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import TableToolbar from '../TableToolbar'
import { TrashIcon, PencilIcon } from '@heroicons/react/solid'
import Modal from 'react-modal'
import {useState} from 'react'
import { Button } from 'primereact/button';
import EditTask from '../../EditTask'


export default function RisksData({projectsData}) {
    const projectId = projectsData[0].id

      const[ModalIsOpen, setModalIsOpen] = useState(false)

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

     if (projectsData[0] == null || projectsData[0] === undefined || projectsData[0].project_risks[0] == null || projectsData[0].project_risks[0] === undefined) {

        return (
        <div>
        <div><TableToolbar projectId={projectId} label='Add Risk' formType='AddRisks'/></div>
        <div>No Data Found</div>
        </div>
        )
    }
    
    else{
       const riskData = projectsData[0].project_risks
      
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

            <EditTask projectId={projectId} rowID={rowData.id} />
          </Modal>

                <button onClick={() => setModalIsOpen(true) }>
                    <PencilIcon className="h-5 w-5 mr-4" />
                </button>
                <button onClick={() => console.log(rowData)}>
                    <TrashIcon className="h-5 w-5 " />
                </button>
            </React.Fragment>
        );
    }

   
  
    const columns = [
        {field:"risk_rank" , header:"Risk Rank"},
        {field:"risk_value" , header:"Risk Value"},
        {field:"notes" , header:"Notes"},
        {field:"state"  , header:"State"},
        {field:"status"  , header:"Status"},
        {field:"impact"  , header:"Impact"},
        {field:"probability"  , header:"Probability"},
    ]
   
const dynamicColumns = columns.map((col)=> {
    return <Column key={col.field} field = {col.field} header={col.header}/>
})
    return (
        <div>
               <div>
               <TableToolbar projectId={projectId} label='Add Risk' formType='AddRisks'/>
            </div>
           <DataTable value={riskData} resizableColumns columnResizeMode="expand">
                        {dynamicColumns}
                         <Column header="Action" body={ActionButton}></Column>
                    </DataTable> 
        </div>
    );
}
}