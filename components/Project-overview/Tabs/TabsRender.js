import React from "react";
import Tabs from './Tabs'

export default function TabsRender() {
    const tabs =['Teams' , 'Risks' ,'Deliverables']
       return (
       <>
         <Tabs  color="blue" tab1={tabs[0]} tab2={tabs[1]} tab3={tabs[2]} />
       </>
     );
   }