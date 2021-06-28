import React from 'react'
import {PlusIcon , SaveIcon } from '@heroicons/react/solid'
import { Toolbar } from 'primereact/toolbar';
import {useRouter} from 'next/router'
import Modal from 'react-modal'
import {useState} from 'react'
import { Button } from 'primereact/button';
import AddTask from '../AddTask'
import FormType from './TabsData/FormType'


export default function TableToolbar({projectId,label,formType}) {
   
    const[modalIsOpen, setModalIsOpen] = useState(false)

     

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
    
     




    const leftToolbarTemplate = () => {
    //     const updatedtaskDataHandler = (enteredtaskData) =>{
    //         const tasksData = {
    //             ...enteredtaskData
    //         };
    //         console.log(tasksData)
    // };
        return (<>
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
                <div> 
                <FormType  projectId={projectId} formType={formType} /> 
                 </div>
              </Modal>
    
            
            <React.Fragment>
                <button className="headerBtn"  onClick={()=>setModalIsOpen(true) }  ><PlusIcon className="h-5  w-5" /> {label}</button>
            </React.Fragment>
        </>
        )
      }
    
     
    
      const rightToolbarTemplate = () => {
        return (
            <React.Fragment>
                     <button className="headerBtn"><SaveIcon className="h-5 w-5 mr-2"  /> Save</button>
                     
            </React.Fragment>
        )
    }
    

    
    return (
        <Toolbar className="p-mb-4" left={leftToolbarTemplate} right={rightToolbarTemplate}></Toolbar>
    )
}
