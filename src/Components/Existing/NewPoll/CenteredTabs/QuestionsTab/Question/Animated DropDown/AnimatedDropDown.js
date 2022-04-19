import {useEffect, useState} from "react";
import UnopDropdown from "unop-react-dropdown";
import "./AnimatedDropDown.css"
import {AlignLeft, ChevronRight, Circle} from 'lucide-react'
import $ from 'jquery';


export default function AnimatedDropDown (props){
    const [open, setOpen] = useState(false);
    const handler = () => {
        const id = "#drop-down-arrow"+props.id
        const arrow = $(id)
        open?
        arrow.css({
            transform: "rotate(90deg)",
        }):arrow.css({
                transform: "rotate(270deg)",
            });
        setOpen(!open);
    };


    const [options, setOptions] = useState([
        {
            type:"TextBased",
            name:"Short Text"
        },{
            type:"MCQ",
            name:"Multiple Choice"
        }
    ]);


    const [selectedValue, setSelectedValue] = useState(
        props.selected
    );

    const [focused, setFocused] = useState(false)
    const onFocus = () => setFocused(true)
    const onBlur = () => setFocused(false)

    function select(val) {
        setSelectedValue(val)
        props.onSelection(val);
        props.switch(val)
    }

    function isSelected(val){
        return val===selectedValue
    }


    // Change props and see effect
    return (

        <UnopDropdown
            onAppear={handler}
            onDisappearStart={handler}

            trigger={
            <button className="AnimatedDropdownButton" >
                    {selectedValue === options[0].type ? <AlignLeft/>
                        :
                        <Circle size={15} fill={"#085B91"} style={{
                            border: "2px solid white",
                            outline: "2px solid #085B91",
                            borderRadius: "15px"
                        }}/>
                    }
                    {selectedValue === options[0].type ? options[0].name:options[1].name}
                <ChevronRight id={"drop-down-arrow"+props.id} size={15} style={{
                transform: 'rotate(90deg)',
                    transition: "0.3s",
            }}/></button>

            }
            closeOnClickOut
            delay={300}
            align="LEFT"
        >
            <div className={"dropdown-wrapper"} >
            <div
                className={`AnimatedDropdownStyles openAnimation ${
                    !open ? " closeAnimation" : "" || focused?" closeAnimation" : ""
                }`}
            >
                <div className={isSelected(options[0].type)? "selected":""}  onClick={() => select(options[0].type)}>
                    <AlignLeft size={16} fill={"#085B91"}style={{
                        marginRight: "12px"
                    }}/>
                    {options[0].name} </div>
                <div className={isSelected(options[1].type)? "selected":""} onClick={() => select(options[1].type)}>
                    <Circle size={12} fill={"#085B91"} style={{
                        border: "2px solid white",
                        outline: "2px solid #085B91",
                        borderRadius: "15px",
                        marginRight: "15px"
                    }}/>
                    { options[1].name}</div>
            </div>
            </div>
        </UnopDropdown>

    );
};
