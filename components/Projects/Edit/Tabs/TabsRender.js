import React from "react";
import Tabs from './Tabs'

export default function TabsRender({projectsData}) {
  
       return (
       <>
         <Tabs  color="blue" projectsData={projectsData}  />
       </>
     );
   }