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

    function renameOption(optionIndex,text) {
        props.onRenameOption(optionIndex,text)
        options[optionIndex].text = text
        return options[optionIndex]
    }

    return (
        <div>
            {options && options.length > 0 && options.map((option) => (
                <Choice published={props.published} index={options.indexOf(option)}  onRename={renameOption} onDelete={deleteOption} length={options.length} option={option} key={option.id} value={option.text} name={"id"}/>
            ))}
            { !props.published && <AddChoice onAddOption={addOption} /> }

        </div>
    );
}

export default MultipleChoice;