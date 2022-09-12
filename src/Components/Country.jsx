import React from 'react'
import { Link } from 'react-router-dom'

const Country = ({country}) => {
    // var iterator1  =[country.languages] 
    // let array2 = iterator1[0]
     
    

  return (
    <>
   
        <tr>
             <td>{country.name.common}</td>
             <td>{country.flag}</td>
             {/* <td>{country.languages[0]?.name}</td> */}
             <td>{country.population}</td>
             <td>{country.region}</td>
             <td>{country.subregion} </td> 
             <td>{country.capital}</td>
             <td>
               <a target="_blank"
               className='text-decoration-none color text-dark' href={country.maps.googleMaps}>{country.maps.googleMaps}
               </a>
             </td>
             <td><Link style={{listStyleType:"none",textDecoration:'none',color:'#000'}}  to={`/countryDetails/${country.name.official}`}>More Information</Link></td> 
        </tr>
       
    </>
  )
}

export default Country