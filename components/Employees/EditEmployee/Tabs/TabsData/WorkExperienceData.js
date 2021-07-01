import React, { useRef, useState } from "react";
import { Button } from "primereact/button";
import { Toast } from "primereact/toast";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { TrashIcon, PencilIcon } from "@heroicons/react/solid";
import { useRouter } from "next/router";
import axios from "axios";
import Modal from "react-modal";

import TableToolbar from "../TableToolbar";
import EditWorkExperience from "../../RelatedTables/Edit/EditWorkExperience";

const WorkExperienceData = ({ employeeData, employmentType, designation }) => {
  const toast = useRef(null);
  const employeeId = employeeData[0].employee_id;
  const employeeName = employeeData[0].first_name;

  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [deleteItem, setDeleteItem] = useState(false);

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

  const customStylesDelete = {
    content: {
      position: "absolute",
      top: "30%",
      left: "30%",
      right: "auto",
      bottom: "auto",
      width: "450px",
      height: "180px",
    },
  };

  if (
    employeeData[0] == null ||
    employeeData[0] === undefined ||
    employeeData[0].work_experience[0] == null ||
    employeeData[0].work_experience[0] === undefined
  ) {
    return (
      <div>
        <TableToolbar
          employeeId={employeeId}
          employeeName={employeeName}
          label="Add WorkExperience"
          formType="AddWorkExperience"
          employmentType={employmentType}
          designation={designation}
        />
        <div>No Data Found</div>
      </div>
    );
  } else {
    const [workExperienceData, setWorkExperienceData] = useState(
      employeeData[0].work_experience
    );

    // ----------------------------delete task from database and table------
    const deleteProduct = (rowData) => {
      let _workExperienceData = workExperienceData.filter(
        (val) => val.id !== rowData.id
      );
      setWorkExperienceData(_workExperienceData);
      setDeleteItem(false);
      // console.log(rowData)
      toast.current.show({
        severity: "success",
        summary: "Successful",
        detail: "Task Deleted",
        life: 3000,
      });

      const url = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/work_experience?id=eq.${rowData.id}`;
      axios.delete(url, {
        headers: {
          apikey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
          "Content-Type": "application/json",
        },
      });
    };

    const ActionButton = (rowData) => {
      return (
        <React.Fragment>
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
                  Edit Work Exp
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
            

            <EditWorkExperience
              employeeId={employeeId}
              rowID={rowData.id}
              employeeData={employeeData}
              designation={designation}
              employmentType={employmentType}
            />

            <div className="text-right mr-10 ">
              <button className="btn " onClick={() => setModalIsOpen(false)}>
                Close
              </button>
              <button className="btn ml-3" type="submit" form="editForm">
                Save
              </button>
            </div>
          </Modal>

          <Modal
            isOpen={deleteItem}
            onRequestClose={() => setDeleteItem(false)}
            style={customStylesDelete}
            header="Confirm"
            ariaHideApp={false}
            shouldCloseOnOverlayClick={false}
          >
            <div className="grid grid-cols-2">
              <div>
                <h2 className="h2FormModal">Confirm</h2>
              </div>
              <div className="text-right">
                <Button
                  icon="pi pi-times"
                  className="p-button-rounded p-button-danger p-button-outlined align-right"
                  onClick={() => setDeleteItem(false)}
                />
              </div>
            </div>

            <div className="DeleteFormModalAlert md:mt-3">
              <i
                className="pi pi-exclamation-triangle p-mr-3"
                style={{ fontSize: "2rem" }}
              />
              <h2>Are you Sure you want to delete {rowData.name} ?</h2>
            </div>
            <div className="text-right md:mt-2">
              <Button
                label="No"
                icon="pi pi-times"
                className="p-button-text"
                onClick={() => setDeleteItem(false)}
              />
              <Button
                label="Yes"
                icon="pi pi-check"
                className="p-button-text"
                onClick={() => deleteProduct(rowData)}
              />
            </div>
          </Modal>

          <button onClick={() => setModalIsOpen(true)}>
            <PencilIcon className="h-5 w-5 mr-4" />
          </button>
          <button onClick={() => setDeleteItem(true)}>
            <TrashIcon className="h-5 w-5 " />
          </button>
        </React.Fragment>
      );
    };
    // ---------------------------------------------------------------

    const columns = [
      { field: "organization", header: "organization" },
      { field: "no_of_years", header: "No Of Years" },
      { field: "employment_type", header: "Employment Type" },
      { field: "designation", header: "Designation" },
    ];
    const dynamicColumns = columns.map((col) => {
      return <Column key={col.field} field={col.field} header={col.header} />;
    });

    return (
      <div>
        <div>
          <Toast ref={toast} />
          <TableToolbar
            employeeId={employeeId}
            employeeName={employeeName}
            label="Add Work Exp"
            formType="AddWorkExperience"
            employmentType={employmentType}
            designation={designation}
          />
        </div>
        <DataTable
          value={workExperienceData}
          className="p-datatable-sm"
          resizableColumns
          columnResizeMode="expand"
        >
          {dynamicColumns}
          <Column header="Action" body={ActionButton}></Column>
        </DataTable>
      </div>
    );
  }
};

export default WorkExperienceData;
