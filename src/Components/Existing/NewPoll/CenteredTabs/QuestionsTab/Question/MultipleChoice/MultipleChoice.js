import React, {useEffect, useState} from 'react';
import Choice from "./Choice/Choice";
import AddChoice from "./Choice/AddChoice";

function MultipleChoice(props) {

    const [options, setOptions] = useState(props.question.options);

    function addOption() {
        const newOption = props.onAddOption(props.id, "Option")
        setOptions([...options,newOption])
    }

    function deleteOption(index) {
        const newOptions = props.onDeleteOption(props.id,index)
        setOptions([...newOptions])
    }

    function renameOption(index,text) {
        options[index].text = text
        return options[index]
    }

    return (
        <div>
            {options && options.length > 0 && options.map((option) => (
                <Choice index={options.indexOf(option)}  onRename={renameOption} onDelete={deleteOption} length={options.length} option={option} key={option.id} value={option.text} name={"id"}/>
            ))}
            <AddChoice onAddOption={addOption} />
        </div>
    );
}

export default MultipleChoice;