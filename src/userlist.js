// import './App.css';
// import React, {useState} from 'react';
// import axios from "axios";

// function App() {
//   const[entrys,setEntrys]=useState([]);
//   axios.get(`https://jsonplaceholder.typicode.com/users`)
//       .then(res => {
//         const entry = res.data;
//         console.log(entry);
//         setEntrys(entry);
//       })
//   return (
//     <div className="App">
//       <table style={{border: "3px solid rgb(0, 0, 0)"}}>
//         <thead>
//             <th>Id</th>
//             <th>Name</th>
//             <th>User Name</th>
//             <th>Email</th>
//             <th>Phone</th>
//             <th>Website</th>
//         </thead>
//         {
//           entrys
//             .map(entry =>
//                 <tbody>
//                     <td>{entry.id}</td>
//                     <td>{entry.name}</td>
//                     <td>{entry.username}</td>
//                     <td>{entry.email}</td>
//                     <td>{entry.phone}</td>
//                     <td>{entry.website}</td>
//                 </tbody>
//             )
//         }
//       </table>
//     </div>
//   );
// }


// export default App;
import './App.css'
import React from 'react';
import { useState, useMemo } from 'react';
function App() {
  const [count, setCount] = useState(0);
  const expensiveCalculation = useMemo(() => {
    let result = 0;
    for (let i = 0; i < 10000; i++) {
      result += i;
    }
    return result;
    }, []);
  return (
    <div>
      <p>Count: {count}</p>
      <p>Expensive Calculation: {expensiveCalculation}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
  );
}
export default App;