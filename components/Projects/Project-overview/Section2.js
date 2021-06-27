import React ,{useState} from 'react'
import formatDate from '../../utils/FormatDate'
import Link from 'next/link'
import PercentageCompletionTeamplate from './PercentageCompletionTeamplate';

export default function Section2({ projectsData }) {

    const [MoreDetails, setMoreDetails] = useState(false);

    if (projectsData[0] == null || projectsData[0] === undefined) {

        return <div>No Data Found</div>

    }
    else {
        const columns = ['Start Date', 'End Date', 'Budgeted Effort', 'Percentage Completion', 'Budgeted Revenue', 'Billed Amount']

        const { actual_start_date, actual_end_date, planned_start_date, planned_end_date,  percentage_of_completion ,budgeted_effort , budgeted_revenue , billed_amount} = projectsData[0]

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

    const percentage_completion =
    <PercentageCompletionTeamplate percentageCompletion={percentage_of_completion} />


const values = [sDate, eDate, budgeted_effort, percentage_completion, budgeted_revenue, billed_amount]

        const linkName = MoreDetails ? 'Less Details' : 'More Details '
        const extraContent =
            <div>
                
                <div className="grid grid-cols-4 grid-rows-3 grid-flow-col gap-y-0.5  gap-x-1  px-5 ">

                    {columns.map((c, index) => {
                        if (index < columns.length / 2) {
                            return <div key={index} className="col-start-1  text-base  font-serif  my-1.5 max-h-7 ">{c}</div>
                        }
                        else {
                            return (<div key={index} className=" col-start-3 text-base font-serif    max-h-7 my-1.5  ">{c}</div>)
                        }
                    })}
                    {values.map((v, index) => {
                        if (v === null || v === undefined) {
                            return (
                                <div key={index} >-</div>
                            )
                        }
                        else {
                            return (
                                <div key={index} className="text-base text-black font-normal font-mono  max-h-7 my-1.5 ">{v}</div>
                            )
                        }
                    })}

                </div>
            </div>

        return (
            < >
                {MoreDetails && extraContent}
                <Link href=''  >
                    <div>
                        <a className="cursor-pointer text-blue-900" onClick={() => { setMoreDetails(!MoreDetails) }}>{linkName}</a>
                    </div>
                </Link>
                
            </>
        )
    }
}


// <div className="grid grid-cols-6 gap-4 my-5">

// {columns.map((c, index) => {
//     if (c === null) {
//         return <div key={index} className="text-sm font-medium text-gray-600 flex justify-center" > - </div>
//     }
//     else {

//         return <div key={index} className="text-sm font-medium text-gray-800 flex justify-center" >{c}</div>
//     }
// })}

// {values.map((v, index) => {

//     if (v === null) {
//         return <div key={index} className="text-lg  flex justify-center"> - </div>
//     }
//     else {

//         return <div key={index} className="text-lg  flex justify-center" >{v}</div>
//     }
// })}
// </div>
