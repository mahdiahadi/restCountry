import {React,useEffect,useState} from 'react'
import { useParams } from 'react-router-dom'
import { useGetCountryDetailsQuery } from '../services/CountriesApi';
import './CountryDetails.css'
const CountryDetails = () => {
    const {name}=useParams();
    const {data:countryDetails}=useGetCountryDetailsQuery(name)
  return (
    <div>
        {
            countryDetails?.map((c) => {
                const{
                    numericCode,
                    flags,
                    name,
                    flag,
                    population,
                    region,
                    subregion,
                    capital,                 
                }=c
                return(
                    <article key={numericCode} className='c-card'>
                    <h2>{name?.official}</h2>
                    <div id='carousel' className='c-pic-frame'>
                      <div id='sliderBox' className='slider-box'>
                        <img className='c-pic' src={flags?.png} alt="flag" />
                      </div>
                    </div>
                    <section>
                      <h3>Information</h3>
                      <ul className='c-list'>
                         <li>Flag: {flag}</li>
                        <li>Capital: {capital}</li>
                        <li>Population: {population}</li>
                        <li>Region: {region}</li>
                        <li>Subregion: {subregion}</li>
                        <li>Common Name: {name.common}</li>

                      </ul>
                    </section>
                    </article>
                     
                )
            })
        }
       </div>
  )
}

export default CountryDetails