import React from 'react'
import Modal from 'react-modal'
import {useState}   from 'react'
import {useRef} from 'react'
import { Button } from 'primereact/button';
import FormType from './FormType'

export default function EditForm({projectName,projectId,formType,editData}) {
const[modalIsOpen, setModalIsOpen] = useState(true)
console.log('Edit form is working')

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

          function refreshPage(){ 
               setModalIsOpen(false)
         window.location.reload(); 
         }


    return (
        
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
                <h2 className="text-2xl text-center  font-semibold px-20">{formType}
                </h2>
                </div>
                <div className="text-right">
                <Button icon="pi pi-times" className="p-button-rounded p-button-danger p-button-outlined align-right" onClick={()=> setModalIsOpen(false)} />
                </div>
            </div>
                  <FormType projectId={projectId} formType={formType} editData={editData}/>
            
                    <div className="text-right mr-10 ">
                     <button className="btn " onClick={()=> setModalIsOpen(false)}  >Close</button>
                    <button className="btn ml-3" type="submit"  form="editForm" >Save 
                    </button>
                    
                    </div> 
          </Modal>
    )
}