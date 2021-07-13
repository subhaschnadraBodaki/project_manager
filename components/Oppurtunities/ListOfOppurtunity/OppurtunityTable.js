import React from "react";
import OppurtunityListTable from "../ListOfOppurtunity/OppurtunityListTable";
import TableToolbar from '../ListOfOppurtunity/TableToolbar'
import { PencilIcon, EyeIcon } from "@heroicons/react/solid";
import { useRouter } from "next/router";

export default function OppurtunityTable({ oppurtunitiesData }) {
  const router = useRouter();

  const ActionOnClick = async (rowData) => {
    await router.push(`/oppurtunities/overview/${rowData.id}`);
  };

  const EditOnClick = async (rowData) => {
    await router.push(`/oppurtunities/edit/${rowData.id}`);
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
        Opportunity
      </h1>
      <TableToolbar/>

      <OppurtunityListTable
        actionBody={ActionButton}
        oppurtunitiesData={oppurtunitiesData}
      ></OppurtunityListTable>
    </div>
  );
}