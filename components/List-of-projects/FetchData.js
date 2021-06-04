import React from 'react'
const getProjectList = async () => {
    const productsSmall = await fetch(process.env.apiURL)
    return productsSmall.json()
    
  }
  
export default getProjectList