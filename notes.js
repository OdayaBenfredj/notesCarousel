import React, { useState, useEffect, } from 'react'
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import { actions } from '../Redux/Actions/ContactAction';
import { connect, useDispatch, useSelector } from 'react-redux';
import Button from '@material-ui/core/Button';
import './notes.css'
import plusIcon from "./assets/plus.svg";
import { Divider, Slider } from '@material-ui/core';
import Note from './note';
import { Carousel } from '3d-react-carousal';





export default function Notes(props) {
    const state = useSelector(state => state.contactDetails.contactDetails)
    const dispatch = useDispatch();
    const [noteValue, setNoteValue] = useState(state.notes[0]?state.notes[0].text:"")
    const [noteIndex, setNoteIndex] = useState(0)
    const [showNote, setShowNote] = useState(false)
    const [isMove, setIsMove] = useState(false)
    const [notesColors, setNotesColors] = useState(["#8E47FD", "#DE468C", "#ACE9FF", "#D5C01A", "#99E819"])
    const [currentNote, setCurrentNote] = useState(0)
    let jumpCounter = 0;

    const getDate = ()=>{
      return  new Date().toLocaleString()
    }
    const getBackground =(index) => {
return (  `transparent linear-gradient(90deg, ${notesColors[index]} 0%, #FFFFFF00 100%) `)
    }
    const notesOnClick = (value, index) => {
        const newNotes = [...state.notes]
        newNotes[index] ={text:value,date:new Date()} ;
        dispatch(actions.editContactNotes(newNotes));
        dispatch(actions.setNotes(newNotes));
    }

    const addNote = () => {
        dispatch(actions.setNotes( [...state.notes, ""]));
    }

    const removeNote = (index) => {
        const newNotes = [...state.notes]
        newNotes.splice(index, 1);
        dispatch(actions.editContactNotes(newNotes));
        dispatch(actions.setNotes(newNotes));
    }
    const setCurrent = (direction) => {
        let tempIndex = null;
        if (direction == "left") {
            if (currentNote < 4 || currentNote < state.notes.length - 1)
                tempIndex = currentNote + 1;
            // else if (state.notes.length < 5)!!!!!!!!!!!!!!!!!!!!!!!!!!!
            else tempIndex = 0;
        }
        else {
            if (currentNote > 0)
                tempIndex = currentNote - 1;
            else if (state.notes.length > 5)
                tempIndex = state.notes.length - 1;
            else tempIndex = 4;
        }
        setCurrentNote(tempIndex)
    }
    async function arrowNote(direction, num) {
        if (num == 2) {
            await setCurrent(direction)
            await setCurrent(direction)
            if (direction == "left") {
                const temp = [...notesColors];
                const item = temp.shift();
                temp.push(item)
                const temp1 = [...temp];
                const item1 = temp1.shift();
                temp1.push(item1)
                await setNotesColors(temp1)
            }
            else {
                const temp = [...notesColors];
                const item = temp.pop();
                temp.unshift(item)
                const temp1 = [...temp];
                const item1 = temp1.pop();
                temp1.unshift(item1)
                await setNotesColors(temp1)
            }

        }
        else arrowClick(direction);
        setShowNote(true)
    }
    const move =  (direction) => {
        setIsMove(true)
        setTimeout(() => {
            setIsMove(false)
        setShowNote(false)
        arrowClick(direction);
    }, 795);

    }
    const arrowClick = async (direction) => {
        setCurrent(direction)
        if (direction == "left") {
            const temp = [...notesColors];
            const item = temp.shift();
            temp.push(item)
             setNotesColors(temp)
        }
        else {
            const temp = [...notesColors];
            const item = temp.pop();
            temp.unshift(item)
             setNotesColors(temp)
        }


    }

    return (
        <div className="noteMain">
            <div className="row d-flex justify-content-end px-15">
                <div class="ml-4 mt-3 mr-auto title_file">Notes</div>
                <div className="divUploud mr-3 mt-2" onClick={(e) => { e.preventDefault(); addNote() }}>
                    <label className="plusIcon"><b> +</b></label>
                </div>
            </div>
            <div className="d-flex notesDiv">
                <div className="d-flex noteInnerDiv">
                <div onClick={() => move("left")} >{<ChevronLeftIcon style={{ color: '#555555' }} />}</div>     
                   {isMove?
                    <div className=" notePlace noteWrap15" >
                        <div className="noteTop"
                            style={{ background: `transparent linear-gradient(270deg, ${notesColors[4]} 0%, #FFFFFF00 100%) ` }}>
                        </div>
                        <div className="noteC"
                            style={{ background: `transparent linear-gradient(270deg, ${notesColors[4]} 0%, #FFFFFF00 100%) ` }}>
                        </div>
                    </div>:""}  
                   <div className={`noteWrap15  ${isMove?" from1-2":""}`} onClick={() => { arrowNote("right", 2); }}>
                        <div className="noteTop"
                            style={{ background: !isMove? `transparent linear-gradient(270deg, ${notesColors[0] } 0%, #FFFFFF00 100%) `: notesColors[0]}}>
                            </div>
                        <div className="noteC"
                            style={{ background: !isMove? `transparent linear-gradient(270deg, ${notesColors[0] } 0%, #FFFFFF00 100%) `: notesColors[0]}}>

                        </div>
                    </div>
                    <div className={`noteWrap24  ${isMove?" from2-3":""}`} onClick={() => { arrowNote("right", 1); }}>
                        <div className="noteTop"
                            style={{ background: notesColors[1] }}>
                        </div>
                        <div className="noteC"
                            style={{ background: notesColors[1] }}>
                        </div>
                    </div>
                    <div className={`noteWrap3  ${isMove?"from3-4":""}`} onClick={() => setShowNote(!showNote)}>
                        <div className="noteTop"
                            style={{ background: notesColors[2] }}>
                        </div>
                        <div className="noteC"
                            style={{ background: notesColors[2] }}>{state.notes[currentNote] ? state.notes[currentNote].text ?state.notes[currentNote].text:"": ""}
                        </div>
                    </div>
                    <div className={`noteWrap24  ${isMove?" from4-5":""}`} onClick={() => { arrowNote("left", 1); }}>
                        <div className="noteTop"
                            style={{ background: notesColors[3] }}>
                        </div>
                        <div className="noteC"
                            style={{ background: notesColors[3] }}>
                        </div>
                    </div>
                    <div className={`noteWrap15  ${isMove?" from5-1":""}`} onClick={() => { arrowNote("left", 2); }}>
                        <div className="noteTop"
                            style={{background: getBackground(4)}}
                        >
                        </div>
                        <div className="noteC"
                            style={{background: getBackground(4)}}
                                >
                        </div>
                    </div>
                    <div className="rightClick" onClick={() => move("right")} >{<ChevronRightIcon style={{ color: '#555555' }} />}</div>
                    {showNote ? <Note setShowNote={setShowNote} color={notesColors[2]}
                        index={currentNote} notesOnClick={notesOnClick} addNote={addNote} removeNote={removeNote}
                        noteIndex={noteIndex} setNoteIndex={setNoteIndex}
                        noteValue={noteValue} setNoteValue={setNoteValue} />
                        : ""}


                </div>
            </div>
        </div >
    )
}

