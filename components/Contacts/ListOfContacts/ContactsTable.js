import React from "react";
import ContactListTable from "./ContactListTable";
import TableToolbar from './TableToolbar'
import { PencilIcon, EyeIcon } from "@heroicons/react/solid";
import { useRouter } from "next/router";

export default function ContactsTable({ contactsData }) {
  const router = useRouter();

  const ActionOnClick = async (rowData) => {
    await router.push(`/contacts/overview/${rowData.id}`);
  };

  const EditOnClick = async (rowData) => {
    await router.push(`/contacts/edit/${rowData.id}`);
  };

  const ActionButton = (rowData) => {
    return (
      <React.Fragment>
        <button onClick={() => ActionOnClick(rowData)}>
          <EyeIcon className="h-5 w-5 mr-4" />
        </button>

        <button onClick={() => EditOnClick(rowData)}>
          <PencilIcon className="h-5 w-5 " />
        </button>
      </React.Fragment>
    );
  };
  return (
    <div className="card px-2 mx-5">
      <h1 className="my-5 text-blue-900 text-2xl flex align-item justify-center">
        Contact
      </h1>
      <TableToolbar/>

      <ContactListTable
        actionBody={ActionButton}
        contactsData={contactsData}
      ></ContactListTable>
    </div>
  );
}