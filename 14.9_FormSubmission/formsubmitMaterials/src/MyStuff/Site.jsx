

import { useState } from "react";
import ForumList from "./ForumStuff/MagicForum";

export default function Site(){

    const forumAsks=[

        {index:'name', name:'Name: ', type:'singleLine', placeholder:'[Enter Name Here]'}, // default is ''
        {index:'quantity', name:'QT: ', type:'range', min:0, max:20}, // default is min, or 0
        {index:'purpose', placeholder:'(purpose)', type:'paragraph'}, // default is ''
        {index:'verified', rightName:'Verify?', type:'checkbox', // default is false
        // please agree!
        isValid(val){
            return !val ? 'please agree!' : true
        }},
    
    ];

    const[Mats, changeMats] = useState([]);

    const AddMaterial=(mat)=>{
        changeMats((pre)=>{
            delete mat.verified;
            console.log(mat)
            return[...pre, mat];
        });
    }
    const RemoveMaterial = (matToRemove) => {
        changeMats((prev) => {
          const copy = [...prev];
          const index = copy.indexOf(matToRemove);
          if (index !== -1) {
            copy.splice(index, 1); // ✅ remove the item by index
          } return copy;
        });
      };
      
    return (
      <div style={{ display: "flex", width: "100vw", height: "100vh" }}>
        <div style={{ flex: 1, padding: "1rem", background: "black" }}>
          <h2>Create Space Materials 🌳</h2>
          <ForumList forumAsks={forumAsks} AddMaterial={AddMaterial}/>
        </div>
        <div style={{ flex: 1, padding: "1rem", background: "#0D0D0D" }}>
            <h2>Storage 📦🚀</h2>
            <div style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '1rem'
            }}>
                {Mats.map((mat,i) => (
                <div
                    key={`${mat.name}_${mat.quantity}_${i}`}
                    style={{
                    position: 'relative', // ✅ enables absolute positioning inside
                    border: '3px solid purple',
                    padding: '0.5rem',
                    width: '100%',
                    borderRadius: '12px',
                    textAlign: 'left',
                    }}
                >
                    {/* 🗑️ Delete button in top-right */}
                    <button
                    onClick={() => RemoveMaterial(mat)}
                    style={{
                        position: 'absolute',
                        top: '6px',
                        right: '8px',
                        background: 'transparent',
                        border: 'none',
                        cursor: 'pointer',
                        fontSize: '1rem',
                    }}
                    title="Delete"
                    >
                    🗑️
                    </button>

                    <div style={{ fontWeight: 'bold' }}>
                    {`${mat.name} (qt: ${mat.quantity})`}
                    </div>
                    <div style={{ fontStyle: 'italic', opacity: 0.6 }}>
                    {mat.purpose}
                    </div>
                </div>
                ))}
            </div>
        </div>
      </div>
    );
  }
  