import React from "react";
import ProjectListTable from "./ProjectListTable";
import TableToolbar from "./TableToolbar";
import { EyeIcon, PencilIcon } from "@heroicons/react/solid";
import { useRouter } from "next/router";

export default function ProjectTable({ data, employeeData }) {
  const router = useRouter();

  const ActionOnClick = async (rowData) => {
    await router.push(`/projects/overview/${rowData.id}`);
  };
  const EditOnClick = async (rowData) => {
    await router.push(`/projects/edit/${rowData.id}`);
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
        List Of Projects
      </h1>
      <TableToolbar />

      <ProjectListTable
        actionBody={ActionButton}
        data={data}
        employeeData={employeeData}
      />
    </div>
  );
}
