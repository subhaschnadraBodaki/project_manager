import React from 'react'
import ProjectOverview from '../components/Project-overview/ProjectOverview'
import TabsRender from '../components/Project-overview//Tabs/TabsRender';

export default function projectOverview() {
    const tabName =['Teams' , 'Budget' , 'Risks' ,'Deliverables']


    return (
        <div>
            <ProjectOverview />
            <div className="my-5 px-2">
            <TabsRender  />
            </div>

        </div>
    )
}
