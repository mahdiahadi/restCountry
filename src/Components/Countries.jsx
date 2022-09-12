
import {React,useState,useEffect} from 'react'
import { useGetCountriesQuery, useGetCountryCategoryQuery } from '../services/CountriesApi'
import Country from './Country';
import ReactPaginate  from 'react-paginate'
import {BiSortAlt2} from 'react-icons/bi'
import './countries.css'

const Countries = ({simplified }) => {

    const regions = [
      {
        name: "Filter by region",
        desc: "All",
      },
      {
        name: "africa",
        desc: "africa",
      },
      {
        name: "americas",
        desc: "americas",
      },
      {
        name: "asia",
        desc: "asia",
      },
      {
        name: "europe",
        desc: "europe",
      },
      {
        name: "oceania",
        desc: "oceania",
      },
    ]
    const [isLoading, setIsLoading] = useState(true)
    const {data:countriesData,isFetching}=useGetCountriesQuery();
    const [region,setRegion]=useState('')
     const {data}=useGetCountryCategoryQuery(region)
    const [countries, setCountries] = useState()
    const [searchTerms, setSearchTerms] = useState('')
    const [order,setOrder]=useState('ASC')

    const [pageCount, setPageCount] = useState(0);
    const [itemOffset, setItemOffset] = useState(0);
    const itemsPerPage=15;

    const sorting=(col)=>{
      if (order==='ASC'){
        const sorted=[...countriesData]?.sort((a,b)=>
          a[col]?.toLowerCase() > b[col]?.toLowerCase() ? 1 : -1
        )
        setCountries(sorted)
        setOrder("DSC")
      }
       if (order==='DSC'){
         const sorted=[...countriesData]?.sort((a,b)=>
           a[col]?.toLowerCase() < b[col]?.toLowerCase() ? 1 : -1
         )
         setCountries(sorted)
         setOrder("ASC")
       }
    }
    const sortingName=(col)=>{
      if (order==='ASC'){
        const sorted=[...countriesData]?.sort((a,b)=>
          a[col]?.common?.toLowerCase() > b[col]?.common?.toLowerCase() ? 1 : -1
        )
        setCountries(sorted)
        setOrder("DSC")
      }
       if (order==='DSC'){
         const sorted=[...countriesData]?.sort((a,b)=>
         a[col]?.common?.toLowerCase() < b[col]?.common?.toLowerCase() ? 1 : -1
         )
         setCountries(sorted)
         setOrder("ASC")
       }
    }
   
    useEffect(()=>{
      const endOffset = itemOffset + itemsPerPage;
         let fetchData=countriesData?.filter((item) =>
         Object.values(item)
           .join("")
           .toLowerCase()
           .includes(searchTerms.toLowerCase())
       )
       setCountries(fetchData?.slice(0, endOffset))
       setPageCount(Math.ceil( fetchData?.length / itemsPerPage))
  
    },[itemOffset, itemsPerPage,countriesData,searchTerms]);

    
     

      useEffect(() => {
      
        let filterRegions =  (value) => {
          const endOffset = itemOffset + itemsPerPage;
          if(region===" "){
            setRegion(" ")
            setCountries(countriesData);
        
          }else{ 
           setCountries(data?.slice(0, endOffset))
           setPageCount(Math.ceil( data?.length / itemsPerPage))
           setRegion(value)
         }
        
       }
       filterRegions()
        // eslint-disable-next-line
        }, [itemOffset, itemsPerPage,data])

        useEffect(() => {
          const endOffset = itemOffset + itemsPerPage;
              setCountries(countriesData?.slice(itemOffset, endOffset));
              setPageCount(Math.ceil( countriesData?.length / itemsPerPage)) ;
     
          }, [itemOffset, itemsPerPage]);
     

      const handlePageClick = (event) => {
              if(searchTerms){
                const searchOffset = (event.selected * itemsPerPage) % countries?.length;
                console.log(searchTerms)
                setItemOffset(searchOffset);
              }
              else if(region){
                const regionOffset = (event.selected * itemsPerPage) % data?.length;
                console.log(regionOffset)
                setItemOffset(regionOffset);
              }

            const newOffset = (event.selected * itemsPerPage) % countriesData?.length;
            console.log(newOffset)
            setItemOffset(newOffset); 
       
       };

  return (
    <>
           <div className="container">
            <div className="row">
                <div className="col-6">
                <div className="d-flex justify-content-start m-2 ">
                <input 
                     onChange={(e)=>setSearchTerms(e.target.value.toLowerCase())}
                     placeholder="Search Country"
                     
                 />
          </div>
     
                </div>
                <div className="col-6">
                <div className="d-flex justify-content-end m-2">
          <select
            name="select"
            id="select"
            onChange={ (e)=>setRegion(e.target.value)}
            value={regions.name}
          >
             <option value="">Filter by region</option> 
            <option value="africa">africa</option>
            <option value="asia">asia</option>
            <option value="europe">europe</option>
            <option value="americas">americas</option>
            <option value="oceania">oceania</option>
          </select>
        </div>
                </div>
            </div>
           </div>
        <div className="hscroll">
             <table width="100%" border="1" className='table table-striped table-bordered table-responsive over table-hover overflow-auto' style={{cellSpacing:'0', cellpadding:"6"}}>
                     <thead className='thead-dark'>
                            <tr>
                                 <th> Name  <BiSortAlt2 onClick={()=>sortingName("name")}/> </th>
                                 <th> Flag</th>
                                 {/* <th> Languages</th> */}
                                 <th> Population </th>
                                 <th> Region <BiSortAlt2 onClick={()=>sorting("region")}/></th>
                                 <th> Subregion  <BiSortAlt2 onClick={()=>sorting("subregion")}/> </th>
                                 <th> Capital</th>
                                 <th> Maps</th>
                                 <th>About</th>
                              </tr>
                      </thead>
             {
                countries?.map((country,i) =>(
                      <tbody key={i} >
                            <Country country={country}/>
                      </tbody>
                ))
            }
             </table>
            
                
                    <ReactPaginate
                    breakLabel="..."
                    nextLabel=" >"
                    onPageChange={handlePageClick}
                    pageRangeDisplayed={2}
                    pageCount={pageCount}
                    previousLabel="< "
                    renderOnZeroPageCount={null}
                    containerClassName="pagination"
                    pageLinkClassName='page-num'
                    previousLinkClassName='page-num'
                    nextLinkClassName='page-num'
                    activeLinkClassName='active'
                  />
                
            
       </div>
    </>
  )
}

export default Countries
