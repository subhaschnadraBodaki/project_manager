import Modal from "react-modal";
import { Toolbar } from "primereact/toolbar";
import { PlusIcon, SaveIcon } from "@heroicons/react/solid";
import { Button } from "primereact/button";
import React, { useState } from 'react'

import FormType from '../FormType'


export default function TableToolbar({
  employeeId,
  employeeName,
  label,
  formType,
  employmentType,
  designation,
}) {

  const [modalIsOpen, setModalIsOpen] = useState(false);

  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      width: "900px",
      height: "500px",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
    },
  };

  const leftToolbarTemplate = () => {
    return (
      <>
        <Modal
          isOpen={modalIsOpen}
          onRequestClose={() => setModalIsOpen(false)}
          style={customStyles}
          ariaHideApp={false}
          shouldCloseOnOverlayClick={false}
        >
          <div className="grid grid-cols-3">
            <div>
              <h2 className="h2Form">
                {employeeName} ({employeeId})
              </h2>
            </div>

            <div className=" shadow-sm py-6 text-blue-900 ">
              <h2 className="text-2xl text-center  font-semibold px-20">
                {label}
              </h2>
            </div>

            <div className="text-right">
              <Button
                icon="pi pi-times"
                className="p-button-rounded p-button-danger p-button-outlined align-right"
                onClick={() => setModalIsOpen(false)}
              />
            </div>
          </div>
          
          <div>
            <FormType
              employeeId={employeeId}
              formType={formType}
              employmentType={employmentType}
              designation={designation}
            />
          </div>

          <div className="text-right mr-10 ">
            <button className="btn " onClick={() => setModalIsOpen(false)}>
              Close
            </button>
            <button className="btn ml-3" type="submit" form="a-form">
              Save
            </button>
          </div>
        </Modal>

        <React.Fragment>
          <button className="headerBtn" onClick={() => setModalIsOpen(true)}>
            <PlusIcon className="h-5  w-5" /> {label}
          </button>
        </React.Fragment>
      </>
    );
  };

  const rightToolbarTemplate = () => {
    return (
      <React.Fragment>
        <button className="headerBtn">
          <SaveIcon className="h-5 w-5 mr-2" /> Save
        </button>
      </React.Fragment>
    );
  };

  return (
    <Toolbar
      className="p-mb-4"
      left={leftToolbarTemplate}
      right={rightToolbarTemplate}
    ></Toolbar>
  );
};
