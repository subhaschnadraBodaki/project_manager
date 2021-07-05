import React from 'react'
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { TrashIcon, PencilIcon } from '@heroicons/react/solid'
import { useRouter } from 'next/router'
import axios from 'axios'
import TableHeader from '../TableHeader'
import Modal from 'react-modal'
import {useState}   from 'react'
import {useRef} from 'react'
import { Button } from 'primereact/button';
import EditTask from '../../EditForms/EditTask'
import { Toast } from 'primereact/toast';
import formatDate from '../../../../utils/FormatDate';

export default function StatusReportsTable({projectsData}) {


     const toast = useRef(null);  
    const projectId = projectsData[0].id
    const projectName = projectsData[0].name

    const[modalIsOpen, setModalIsOpen] = useState(false)
    const [deleteItemConfirm,setDeleteItemConfirm]=useState(false)
    const[deleteData,setDeleteData]=useState(null)
    const [editData,setEditData]=useState(null)
   
    // console.log(projectsData)
    const customStyles = {
        content: {
          top: '50%',
          left: '50%',
          right: 'auto',
          bottom: 'auto',
          width: '900px', 
          height: '600px', 
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
    

    if(projectsData[0]==null || projectsData[0] === undefined || projectsData[0].project_status_report[0]==null || projectsData[0].project_status_report[0]===undefined ){
     return ( 
    <div>
      <TableHeader projectId={projectId} projectName={projectName} label='Add Prj. Status' formType='AddTask'/>
      <div>No Data Found</div>
      </div>
)
            }

else{
const [statusReport,SetStatusReport] = useState(projectsData[0].project_status_report)



const deleteProduct = (deleteData) => {
        let  _statusReport = statusreport.filter(val => val.id !== deleteData.id);
        SetStatusReport(_statusReport)
        setDeleteItemConfirm(false)
        //  console.log(rowData)
         toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Project Status Deleted', life: 3000 });

        const url =  `${process.env.NEXT_PUBLIC_SUPABASE_URL}/project_status_reports?id=eq.${deleteData.id}` 
      axios.delete(url,
            {
            headers:{
                "apikey":process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
                "Content-Type": "application/json"
            }
            
        }
      )
    };

   const edit = (rData) => {
          setEditData(rData)
         setModalIsOpen(true)
      }; 

   const deleteFxn = (dData) => {
        setDeleteData(dData)
        setDeleteItemConfirm(true)
   }
  

     

    const ActionButton = (rowData) => {
            
         return (
            <React.Fragment>
            <Modal            
            isOpen={modalIsOpen}
            onRequestClose={()=> setModalIsOpen(false)}
            style={customStyles}
            ariaHideApp={false}
            shouldCloseOnOverlayClick={false}
            >   
            
            <div className="grid grid-cols-3">
                <div><h2 className="h2Form">{projectName} ({projectId})</h2></div>
                 <div className=" shadow-sm py-6 text-blue-900 ">
                <h2 className="ModalHeading ">Edit Prj. Status
                </h2>
                </div>
                <div className="text-right">
                <Button icon="pi pi-times" className="p-button-rounded p-button-danger p-button-outlined align-right" onClick={()=> setModalIsOpen(false)} />
                </div>
            </div>
             <div>
              <EditTask projectId={projectId} editData={editData} />
             

            </div>
                    <div className="text-right mr-10 ">
                     <button className="btn " onClick={()=>setModalIsOpen(false)}  >Close</button>
                    <button className="btn ml-3" type="submit" form="a-form" >Save 
                    </button>
                    
                    </div> 
          </Modal>

          {/* --------------------------------------------- */}
          <Modal
          isOpen={deleteItemConfirm}
            onRequestClose={()=> setDeleteItemConfirm(false)}
            style={customStylesDelete } 
            header="Confirm"
            ariaHideApp={false}
            shouldCloseOnOverlayClick={false}
             >
                  <div className="grid grid-cols-2">
                <div><h2 className="h2FormModal">Confirm</h2></div>
                <div className="text-right">
                <Button icon="pi pi-times" className="p-button-rounded p-button-danger p-button-outlined align-right" onClick={()=> setDeleteItemConfirm(false)} />
                </div>
               </div>

                    <div className="DeleteFormModalAlert md:mt-3">
                  <i className="pi pi-exclamation-triangle p-mr-3" style={{ fontSize: '2rem'}} />
                  <h2>Are you Sure you want to delete ?</h2> 
                  </div>
                  <div className="text-right md:mt-2">        
                      
                    <Button label="No" icon="pi pi-times" className="p-button-text" onClick={()=>setDeleteItemConfirm(false)}/>
                    <Button label="Yes" icon="pi pi-check" className="p-button-text"  onClick={()=>deleteProduct(deleteData)} />
            
                 </div>
          </Modal>
               
                <button onClick={()=> edit(rowData) }>
                    <PencilIcon className="h-5 w-5 mr-4" />
                </button>
                <button onClick={() => deleteFxn(rowData)}>
                    <TrashIcon className="h-5 w-5 " />
                </button>
            </React.Fragment>
        );
    }
// ---------------------------------------------------------
function reportingDate (){
    if (statusReport[0].reporting_date==null){
        return '-'
    }
    else{
        return formatDate(statusReport[0].reporting_date)
    }
}

// ----------------------------------------------------------
    const columns = [
        {field:"quality_status" , header:"Quality Status"},
        {field:"effort_status" , header:"Effort Status"},
        {field:"milestone_status"  , header:"Milestone Status"}
    ]
const dynamicColumns = columns.map((col)=> {
    return <Column key={col.field} field = {col.field} header={col.header}/>
})
    return (
        <div>
               <div>
                 <Toast ref={toast} />
              <TableHeader projectId={projectId} projectName={projectName} label='Add Prj. Status' formType='AddTask'  />
            </div>
              <DataTable value={statusReport} className="p-datatable-sm" resizableColumns columnResizeMode="expand">
              <Column header="Reporting Date" body={reportingDate}></Column>
                        {dynamicColumns}
                           <Column header="Action" body={ActionButton}></Column>
                    </DataTable> 
        </div>
    )
}
}