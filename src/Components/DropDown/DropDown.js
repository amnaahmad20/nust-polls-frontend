import {SidebarOpen, Trash, Type} from "lucide-react";
import "./DropDown.css"
import React, {useState} from "react";
import Popup from "reactjs-popup";
import 'reactjs-popup/dist/index.css';
import {X} from "lucide-react";
import axios, {Axios} from "axios";


export function DropDown(props) {

    const [name, setName] = useState("");
    const [open, setOpen] = useState(false);

    function handle(e) {
        const newName = e.target.value
        setName(newName)
    }

    function onRename(e) {
        e.preventDefault()
        props.renameHandler(name)
        setName("")
    }

    const closeModal = () => {
        setOpen(false)
        props.closeDropDown()
    };

    const saveModal = (e) => {
        onRename(e)
        setOpen(false)
    }

    function onDelete(e) {
        e.preventDefault()
        props.deleteHandler()
    }

    return (<div id="myDropdown" className={"dropdown-content"}>
        <a  onClick={onDelete} > Remove <Trash size={"10"}/> </a>
        <a onClick={() => setOpen(o => !o)} > Rename <Type size={"10"}/> </a>
        <Popup open={open} onClose={closeModal} closeOnEscape closeOnDocumentClick position="right center">
            {/*<div className={"overlay"} >*/}
            <div className={"popup"} >
                <div className={"popup-head"} >
                    <X className={"close"} onClick={closeModal} color={"#063651"} size={"20"} />
                    <h4  >
                        Rename Poll
                    </h4>
                </div>
                <form onSubmit={(e)=>{onRename(e)}} className={"popup-form"} >
                    <input onChange={(e)=>{handle(e)}} value={name} placeholder={props.oldName} type={"text"} />
                    <button onClick={(e)=>{saveModal(e)}} type={"submit"}> Save </button>
                </form>
            </div>
            {/*</div>*/}
        </Popup>

        <a > Open in new Tab <SidebarOpen size={"10"}/></a>
    </div>);

}