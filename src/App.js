// import React, {useEffect, useState} from "react";
// import "./App.css";
// import useCollapse from "react-collapsed";
// import "./styles.scss";
// import Axios from 'axios'

// function App() {
//   const [data, setData] = useState([])
//  const { getCollapseProps, getToggleProps } = useCollapse();
//   useEffect(() => {
//     Axios.get("https://api.thecatapi.com/v1/breeds")
//     .then(res=> {console.log(res.data)
//     setData(res.data)}).catch(err => console.log(err));
//   }, [])

//   const arr = data.map((data, index) => {
//     return (
//       <tr>
//         <td className="header btn toggle" {...getToggleProps()}>
//           {data.name}
//         </td>
//         <div {...getCollapseProps()}>
//           <div className="content">
//             Now you can see the hidden content. <br />
//             <br />
//             Click again to hide...
//           </div>
//         </div>
//       </tr>
//     );
//   })
//   return (
//     <div className="app">
//       <header>
//         {arr}
//       </header>
//       <div>
//         <tr>
//           <td>
//             <button className="header btn toggle" {...getToggleProps()}>
//               {arr}
//             </button>
//             <div {...getCollapseProps()}>
//               <div className="content">
//                 Now you can see the hidden content. <br />
//                 <br />
//                 Click again to hide...
//               </div>
//             </div>
//           </td>
//         </tr>
//       </div>

//       <p>Some content below the collapsibles.</p>
//     </div>
//   );
// }

// export default App;

import React, { useEffect, useState } from "react";

import "./styles.scss";
import Axios from "axios";
import Collapsible from "react-collapsible";




const App = () => {
  const [data, setData] = useState([]);
  const [expand] = useState("[Click Here]");
  const [query, setQuery] = useState("");

  function collapse (expand) {
    if (expand === "[Click Here]") {
      return "[Collapse]";
    } else {
      return "[Expand]";
    }
  }
      const getData = () => {
        Axios.get(
          "https://api.thecatapi.com/v1/breeds"
        )
          .then((res) => {
            console.log(res.data);
            setData(res.data);
          })
          .catch((err) => console.log(err));
      };


  useEffect(() => {
    getData()
  }, []);



const fetchMoreData= () => {
  setTimeout(() => {
    setData(data.concat(Array.from({length: 20})))
  }, 500)
}
const onHandleScroll = (e) => {
  e.persist();
  if (e.target.scrollHeight - e.target.scrollTop === e.target.clientHeight) {
    fetchMoreData();
  }
};
  return (
    <div onScroll={onHandleScroll}>
      <header style={{ display: "flex", justifyContent: "space-between" }}>
        <h1 className="title">
          <b style={{ color: "purple" }}>CAT</b>
          <b>List</b>
        </h1>
        <input
          className="search"
          placeholder="Enter Cat Name"
          onChange={(event) => setQuery(event.target.value)}
        />
      </header>
   
        {data
          .filter((data) => {
            if (query === "") {
              return data;
            } else if (data.name.toLowerCase().includes(query.toLowerCase())) {
              return data;
            }
          })
          .map((data, index) => {
            return (
              <div>
                <p key={index} className=" btn toggle block content">
                  <b>{data.name}</b>

                  <Collapsible
                    className="expand"
                    trigger={expand}
                    onClick={collapse}
                  >
                    <div style={{ width: "55%" }}>
                      {data.image != null ? (
                        <img
                          className="image"
                          src={data.image.url}
                          alt={data.image.url}
                        />
                      ) : (
                        <h1>"No Image"</h1>
                      )}
                      <h3 style={{ paddingTop: 10 }}>
                        <b>More Information</b>
                      </h3>
                      <p>
                        Wikipedia:
                        <a
                          href={data.wikipedia_url}
                          target="_blank"
                          rel="noreferrer"
                        >
                          {data.wikipedia_url}
                        </a>
                      </p>
                      <p>
                        CFA:
                        <a href={data.cfa_url} target="_blank" rel="noreferrer">
                          {data.cfa_url}
                        </a>
                      </p>
                      <p>
                        Vetstreet:
                        <a
                          href={data.vetstreet_url}
                          target="_blank"
                          rel="noreferrer"
                        >
                          {data.vetstreet_url}
                        </a>
                      </p>
                      <p>
                        VCA Hospitals:
                        <a
                          href={data.vcahospitals_url}
                          target="_blank"
                          rel="noreferrer"
                        >
                          {data.vcahospitals_url}
                        </a>
                      </p>
                      <h3>
                        <b>Specification</b>
                      </h3>
                      <p>Alternative names : {data.alt_names}</p>
                      <p>Life Span : {data.life_span} Years</p>
                      <p>
                        Weight : {data.weight.imperial} Imperial,{" "}
                        {data.weight.metric} Metric
                      </p>
                      <p>Temprament : {data.temperament}</p>
                      <p>Origin : {data.origin}</p>
                      <p>Country Code : {data.country_code}</p>
                      <p>Description : {data.description}</p>
                      <h3>
                        <b>Treat Level</b>
                      </h3>
                      <p>Indoor : {data.indoor}</p>
                      <p>Lap : {data.lap}</p>
                      <p>Adaptability : {data.adaptability}</p>
                      <p>Affection Level : {data.affection_level}</p>
                      <p>Child Friendly : {data.child_friendly}</p>
                      <p>Dog Friendly : {data.dog_friendly}</p>
                      <p>Energy Level : {data.energy_level}</p>
                      <p>Grooming : {data.grooming}</p>
                      <p>Health Issues : {data.health_issues}</p>
                      <p>Intelligence : {data.intelligence}</p>
                      <p>Shedding Level : {data.shedding_level}</p>
                      <p>Social Needs : {data.social_needs}</p>
                      <p>Vocalisation : {data.vocalisation}</p>
                      <p>Experimental : {data.experimental}</p>
                      <h3>
                        <b>Body Specification</b>
                      </h3>
                      <p>Hairless : {data.hairless}</p>
                      <p>Natural : {data.natural}</p>
                      <p>Rarity : {data.rare}</p>
                      <p>Rex : {data.rex}</p>
                      <p>Suppressed Tail : {data.natural}</p>
                      <p>Short Legs : {data.natural}</p>
                    </div>
                  </Collapsible>
                </p>
              </div>
            );
          })}
    
    </div>
  );
};

export default App;
