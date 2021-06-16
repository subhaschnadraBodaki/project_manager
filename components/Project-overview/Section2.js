import React from 'react'
import formatDate from '../FormatDate'


export default function Section2({ data }) {

    const columns = ['Start Date', 'End Date', 'Budgeted Effort', 'Percentage Completion', 'Budgeted Revenue', 'Billed Amount']

    function startDate() {
        if (data[0].actual_start_date === null) {

            return formatDate(data[0].planned_start_date)
        }
        else {
            return formatDate(data[0].actual_start_date)
        }
    }

    function endDate() {
        if (data[0].actual_end_date === null) {
            return formatDate(data[0].planned_end_date)
        }
        else {
            return formatDate(data[0].actual_end_date)
        }
    }
    const sDate = startDate()
    const eDate = endDate()
    const values = [sDate, eDate, '30 hr', '27%', '$500', '$1000']

    return (
        <div className="grid grid-cols-6 gap-4 my-5">

            {columns.map(c => {
                return <div>{c}</div>
            })}

            {values.map(v => {
                return <div>{v}</div>
            })}

        </div>
    )
}
