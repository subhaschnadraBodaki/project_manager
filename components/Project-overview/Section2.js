import React from 'react'
import formatDate from '../FormatDate'


export default function Section2({ projectsData }) {

    if (projectsData[0]==null || projectsData[0] ===undefined) {

        return <div>No Data Found</div>
       
    }
    else{
        const columns = ['Start Date', 'End Date', 'Budgeted Effort', 'Percentage Completion', 'Budgeted Revenue', 'Billed Amount']

        const {actual_start_date , actual_end_date,planned_start_date,planned_end_date , currency , percentage_of_completion}=projectsData[0]

        function startDate() {
            if (actual_start_date === null) {

                return formatDate(planned_start_date)
            }
            else {
                return formatDate(actual_start_date)
            }
        }

        function endDate() {
            if (actual_end_date === null) {
                return formatDate(planned_end_date)
            }
            else {
                return formatDate(actual_end_date)
            }
        }


        // const reportingDate = formatDate(statusReport.reporting_date)
        const sDate = startDate()
        const eDate = endDate()
        const values = [sDate, eDate, '30 hr', percentage_of_completion, '$500', currency]

        return (
            <div className="grid grid-cols-6 gap-4 my-5">

                {columns.map((c, index) => {
                    if (c === null) {
                        return <div key={index} className="text-sm font-medium text-gray-600 flex justify-center" > - </div>
                    }
                    else {

                        return <div key={index} className="text-sm font-medium text-gray-600 flex justify-center" >{c}</div>
                    }
                })}

                {values.map((v, index) => {

                    if (v === null) {
                        return <div key={index} className="text-lg rounded bg-gray-200 flex justify-center"> - </div>
                    }
                    else {

                        return <div key={index} className="text-lg rounded bg-gray-200 flex justify-center" >{v}</div>
                    }
                })}

            </div>
        )
    }
}
