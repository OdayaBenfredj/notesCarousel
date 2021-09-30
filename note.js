import React, { useState, useEffect, } from 'react'
import { actions } from '../Redux/Actions/ContactAction';
import { connect, useDispatch, useSelector } from 'react-redux';
import './listContact.css'
import deleteImg from "./assets/delete.svg";


import Button from '@material-ui/core/Button';




export default function Note(props) {
    const { index, notesOnClick, removeNote, setShowNote, color } = props;
    const [noteValue, setNoteValue] = useState("")
    const [noteClass, setNoteClass] = useState("openNote")
    const [showTriple, setShowTriple] = useState(true)
    
    
const closeNote =()=>{
    setShowTriple(false)
           setTimeout(() => {
               setShowNote(false)
           }, 800);
    setNoteClass("closeNote")
}

    const state = useSelector(state => state.contactDetails.contactDetails)
    useEffect(() => {
        setNoteValue(state.notes[index]?state.notes[index].text:"");
    }, [state.notes[index]])
    return (
        <>
    {showTriple? <div className="req" >
            <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 4 5"><defs><style></style>
            </defs><path class="a" d="M2.5,0,5,4H0Z" transform="translate(0 5) rotate(-90)" fill={color} /></svg>
            </div>:''
}
        <div className={noteClass} style={{ backgroundColor: color }}>
        {showTriple?   <div className="openNoteHeader" style={{ backgroundColor: color }}>
                <img className="noteDelete" src={deleteImg} 
                onClick={(e) => { e.preventDefault();
                 removeNote(index);
                  setNoteValue("");
                  closeNote();
}}/>
                <span>{state.notes?state.notes[index]?state.notes[index].date?state.notes[index].date.toLocaleString().split('T')[0]:"":"":""}</span>
                <div className="noteBtn" onClick={(e) => {
                            notesOnClick(noteValue, index)
                            closeNote();
                    }}>x</div>
            </div>
            :""}
            <div className="noteDiv" style={{ backgroundColor: color }}>
                <textarea
                    class="noteInput "
                    rows="5"
                    value={noteValue}
                    onChange={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        setNoteValue(e.target.value)
                    }}

                >
                </textarea>
                {/* <div className="doneNotBtn">
                    <Button className="mx-auto btnNote"
                        style={{ backgroundColor: color }}
                        onClick={(e) => {
                            console.log(noteValue, "lllllllllllkkkkkkkkkkkkk")
                            e.preventDefault();
                            e.stopPropagation();
                            notesOnClick(noteValue, index)
                            setTimeout(() => {
                                setShowNote(false)
                            }, 800);
                        }}>

                        done  </Button>
                </div> */}

            </div >
        </div >
        </>
    )
}









// import React, { useState, useEffect, } from 'react'
// import { actions } from '../Redux/Actions/ContactAction';
// import { connect, useDispatch, useSelector } from 'react-redux';
// import './listContact.css'





// export default function Note(props) {
//     const { index, notesOnClick, addNote, removeNote,
//         noteIndex, setNoteIndex, noteValue, setNoteValue } = props;
//     const state = useSelector(state => state.contactDetails.contactDetails)

//     return (
//         <div>
//             <li>
//                 <div class="rotate-1 lazur-bg">
//                     <button className="noteBtn" onClick={(e) => { e.preventDefault(); removeNote(index) }} value="-">-</button>
//                     <button className="noteBtn" onClick={(e) => {
//                         e.preventDefault(); addNote()
//                     }} >+</button>
//                     <textarea
//                         class="noteInput "
//                         rows="5"
//                         value={index == noteIndex ? noteValue : state.notes[index]}
//                         onChange={(e) => {
//                             e.preventDefault();
//                             e.stopPropagation();
//                             setNoteValue(e.target.value)
//                         }}
//                         onMouseLeave={(e) => {
//                             e.preventDefault();
//                             e.stopPropagation();
//                             notesOnClick(e.target.value, index)
//                             setNoteIndex(-1)
//                         }}
//                         onMouseEnter={(e) => {
//                             setNoteIndex(index)
//                             setNoteValue(state.notes[index])
//                             e.preventDefault();
//                             e.stopPropagation();
//                         }}
//                     >
//                     </textarea>
//                 </div>
//             </li>
//         </div>
//     )
// }


