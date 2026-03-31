import React,{useEffect,useState} from 'react';
import Axios from 'axios';




function CrudPage()
{

   const [foodName,setFoodName]=useState("");
   const [description,setDecription]=useState("");
    const [foodList,setFoodList]=useState([]);
   const [newFoodName,setNewFoodName]=useState("");

     useEffect(()=>{
    fetchData();
   },[])

    //insert 
    const addFoodData=()=>{
        Axios.post("https://task-mongo-7itg.onrender.com/insert",{foodName,description})
        .then((response)=>{
            console.log(response)
            alert("added");
        })
        .catch((err)=>{
            console.log(err)
        })
    }

     //getData
    const fetchData = () => {
  Axios.get("https://task-mongo-7itg.onrender.com/read")
    .then((response) => {
      console.log("API DATA 👉", response.data);

      // ✅ MAIN FIX
      if (Array.isArray(response.data)) {
        setFoodList(response.data);
      } else {
        console.log("Not array ❌", response.data);
        setFoodList([]); // fallback
      }
    })
    .catch((err) => {
      console.log(err);
      setFoodList([]); // safety
    });
};
    //update 
    const updateFood=(id)=>{
        Axios.put(`https://task-mongo-7itg.onrender.com/update`,{id,newFoodName})
        .then(()=>fetchData())
    }
    //delete
    const deleteFood=(id)=>{
        Axios.delete(`https://task-mongo-7itg.onrender.com/delete/${id}`).then(()=>fetchData())
    }




    return(
        
        <div className="container">
        <h1>This is CrudPage</h1>
          <div className="mb-3">
              <input type="text" className="form-control" placeholder="FoodName" required
              onChange={(e)=>setFoodName(e.target.value)}
              />
          </div>
          <div className="mb-3">
               <input type="text" className="form-control" placeholder="FoodDescription" required
               onChange={(e)=>setDecription(e.target.value)}
              />
          </div>
          <div className="mb-3">
              <button className="btn btn-primary" onClick={addFoodData}>AddFood</button>
          </div>

          <h3>View Details</h3>
          <table className='table table-bordered table-striped'>
            <tr>
                <th>FoodName</th>
                <th>FoodDescription</th>
                <th>Edit</th>
                <th>Delete</th>
            </tr>
            <tbody>
                {foodList.map((val,key)=>(
                    <tr key={key}>
                        <td>{val.foodName}</td>
                        <td>{val.description}</td>
                        <td>
                            <input type='text' placeholder='UpdatedFoodName' onChange={(e)=>setNewFoodName(e.target.value)}/>
                            <button className='btn btn-primary' onClick={()=>updateFood(val._id)}>Edit</button>
                           
                        </td>
                        <td>
                             <button className='btn btn-danger' onClick={()=>deleteFood(val._id)}>Delete</button>
                        </td>
                    </tr>
                ))}
            </tbody>
          </table>
          
        </div>
    )
}
export default CrudPage;