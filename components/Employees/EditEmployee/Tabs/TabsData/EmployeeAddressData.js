import React, { useRef, useState } from "react";
import { Button } from "primereact/button";
import { Toast } from "primereact/toast";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { TrashIcon, PencilIcon } from "@heroicons/react/solid";
import axios from "axios";
import Modal from "react-modal";
import TableToolbar from "../TableToolbar";
import EditEmployeeAddress from "../../RelatedTables/Edit/EditEmployeeAddress";

const EmployeeAddressData = ({ employeeData, addressType, countries }) => {
  const toast = useRef(null);

  const employeeId = employeeData[0].employee_id;
  const employeeName = employeeData[0].first_name;

  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [deleteItemConfirm, setDeleteItemConfirm] = useState(false);
  const [deleteData, setDeleteData] = useState(null);
  const [editAddress, setEditAddress] = useState(null);

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
    employeeData[0].employee_address[0] == null ||
    employeeData[0].employee_address[0] === undefined
  ) {
    return (
      <div>
        <TableToolbar
          employeeId={employeeId}
          employeeName={employeeName}
          label="Address"
          formType="AddEmployeeAddress"
          addressType={addressType}
          countries={countries}
        />
        <div>No Data Found</div>
      </div>
    );
  } else {
    const [employeeAddressData, setEmployeeAddressData] = useState(
      employeeData[0].employee_address
    );

    const deleteEmployeeAddress = (deleteData) => {
      let _employeeAddressData = employeeAddressData.filter(
        (val) => val.id !== deleteData.id
      );
      setEmployeeAddressData(_employeeAddressData);
      setDeleteItemConfirm(false);
      // console.log(rowData)
      toast.current.show({
        severity: "success",
        summary: "Successful",
        detail: "Address  Deleted",
        life: 3000,
      });

      const url = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/employee_address?id=eq.${deleteData.id}`;
      axios.delete(url, {
        headers: {
          apikey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
          "Content-Type": "application/json",
        },
      });
    };

    const edit = (rowData) => {
      setEditAddress(rowData);
      setModalIsOpen(true);
    };

    const deleteFxn = (dData) => {
      setDeleteData(dData);
      setDeleteItemConfirm(true);
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
                  Edit Address
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

            <EditEmployeeAddress
              employeeId={employeeId}
              editAddress={editAddress}
              addressType={addressType}
              countries={countries}
            />

            <div className="text-right mr-10 ">
              <button className="btn " onClick={() => setModalIsOpen(false)}>
                Close
              </button>
              <button className="btn ml-3" type="submit" form="editAddress">
                Save
              </button>
            </div>
          </Modal>

          <Modal
            isOpen={deleteItemConfirm}
            onRequestClose={() => setDeleteItemConfirm(false)}
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
                  onClick={() => setDeleteItemConfirm(false)}
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
                onClick={() => setDeleteItemConfirm(false)}
              />
              <Button
                label="Yes"
                icon="pi pi-check"
                className="p-button-text"
                onClick={() => deleteEmployeeAddress(deleteData)}
              />
            </div>
          </Modal>

          <button onClick={() => edit(rowData)}>
            <PencilIcon className="h-5 w-5 mr-4" />
          </button>
          <button onClick={() => deleteFxn(rowData)}>
            <TrashIcon className="h-5 w-5 " />
          </button>
        </React.Fragment>
      );
    };

    const columns = [
      { field: "address_type", header: "Address Type" },
      { field: "address", header: "address" },
      { field: "city", header: "City" },
      { field: "country", header: "Country" },
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
            label="Address"
            formType="AddEmployeeAddress"
            addressType={addressType}
            countries={countries}
          />
        </div>

        <DataTable
          value={employeeAddressData}
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

export default EmployeeAddressData;