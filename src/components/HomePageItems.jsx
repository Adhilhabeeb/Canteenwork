import React, { useContext, useEffect, useState } from "react";
import TodaysSpecial from "./HomePageContents/TodaysSpecial";
import BreakfastItems from "./HomePageContents/BreakfastItems";
import { collection, addDoc, getDocs, deleteDoc, doc, setDoc, getDoc } from "firebase/firestore";
import { db } from "../Firebase";
import { ourcontext } from "../main";
import { Box, Typography } from "@mui/material";


function HomePageItems() {
  const [recipes, setRecipes] = useState({});
  let {admin ,hoste,cashier,user,openmenuadd,setopenmenuadd,setcartempty,cartempty}  =useContext(ourcontext)
   


   const fetchMenuItems = async () => {
      const querySnapshot = await getDocs(collection(db, "menus"));
      if (!querySnapshot.docs.length>0) {
       
        setcartempty(true)
      }
      const items = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));

      console.log(items[0],"itttee")

      if (items.length>0) {
      setRecipes(items[0])
        
      }
//   let mm={
//     breakfast:items[0].breakfast,
//     lunch:items[0].lunch,
//     special:items[0].speacil,
//     snaks:items[0].snacks
//   }
//   let fetar=[]
//   let  newSet = new Set();
  
//  setRecipes(items[0]);
//   console.log(items,"ittttttttytytryeqtrwygfwjebvwjnsv")
  // Object.values(mm).forEach(el=>{
  //  el.forEach(elmen=>{
  // fetar.push(elmen)
  // newSet.add(elmen); // Add if not selected
  
  
  //  })
  // })
  
  // console.log(fetar,"fetytt")
  // console.log(newSet,"neeee87969765888586")
  // setSelectedItems(newSet)
  
    };
  async function fetchData() {
    try {
      const response = await fetch("https://dummyjson.com/recipes");
      const data = await response.json();
      // setRecipes(data.recipes);


      console.log(data,"dattatatatdumy")
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  useEffect(() => {
    fetchData();
    fetchMenuItems()
  }, []);

  return (
    <div>

      {cartempty?
     <Box>

      <Typography  component={"h3"} variant="p">

        We are updating our menu
      </Typography>

      </Box>
     
     :
      
<>

<TodaysSpecial recipes={recipes.specialFoods} />
<BreakfastItems recipes={recipes} />

</>
      }
     
    </div>
  );
}

export default HomePageItems;
