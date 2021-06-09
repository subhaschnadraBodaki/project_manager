import React from 'react'
import ProjectOverview from '../components/Project-overview/ProjectOverview'
import TabsRender from '../components/Project-overview//Tabs/TabsRender';
import Section1 from '../components/Project-overview/Section1'
import Section2 from '../components/Project-overview/Section2'
import Heading from '../components/Project-overview/Heading'
export default function projectOverview() {
    const tabName =['Teams' , 'Budget' , 'Risks' ,'Deliverables']


    return (
        <div>
            <div className="mx-10 px-5">

            <Heading />
            </div>
            <div className="mx-1 px-2 border-2 border-gray-600 border-solid">
<Section1/>
            </div>
            <div className="border-2 border-gray-600 border-solid my-5 mx-1 px-2">
<Section2/>
            </div>
            <div className="my-5 px-2">
            <TabsRender  />
            </div>

        </div>
    )
}
