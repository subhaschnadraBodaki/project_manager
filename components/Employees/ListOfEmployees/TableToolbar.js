import React from "react";
import { PlusIcon, DownloadIcon } from "@heroicons/react/solid";
import { Toolbar } from "primereact/toolbar";
import { useRouter } from "next/router";
import Button from "../../utils/Button";

export default function TableToolbar() {
  const router = useRouter();
  const rightToolbarTemplate = () => {
    return (
      <React.Fragment>
        <div className="mx-4 ">
          <Button
            buttonName="Export"
            buttonIcon={<DownloadIcon className="h-5 w-5" />}
            onClickHandler={() => console.log("export")}
          />
        </div>
        <div>
          <Button
            buttonName="Add Employee"
            buttonIcon={<PlusIcon className="h-5  w-5" />}
            onClickHandler={() => {
              router.push("/employees/add");
            }}
          />
        </div>
      </React.Fragment>
    );
  };

  return <Toolbar className="p-mb-4" right={rightToolbarTemplate}></Toolbar>;
}
