import axios from "axios";
// import EditContact from '../../../components/Contacts/EditContact/EditContact';
import EditContact from '../../../components/Contacts/EditContact/Tabs/EditContact'

const editcontact = ({contactdata}) => {
  const contactId = contactdata[0].id;
  return (
      <EditContact 
      contactId={contactId}
      contactdata={contactdata}
      />
  )
}

export async function getServerSideProps(context){
  const { contact_id }= context.query;
  const response =await axios({
    method: "get",
    url: `${process.env.NEXT_PUBLIC_SUPABASE_URL}/contacts?id=eq.${contact_id}`,
    headers: {
      apikey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
      "Content-Type": "application/json",
    },
  });
console.log(response)
  // const data = await axios.all([response])
  const contactdata = data[0].data;
  
  return{
          props:{
              
              contactdata,
              
           
             
          }
      }
      
      }

export default editcontact
