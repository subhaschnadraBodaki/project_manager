import AddWorkExperience from './RelatedTables/Add/AddWorkExperience'

export default function formTypeFxn ({formType, employeeId, employmentType, designation})  {
  console.log(formType);
  console.log(employeeId);
    switch(formType)
       {
         case 'AddWorkExperience':
         return <AddWorkExperience employeeId={employeeId} employmentType={employmentType} designation={designation} />
         default: 
         return null
       }
}
