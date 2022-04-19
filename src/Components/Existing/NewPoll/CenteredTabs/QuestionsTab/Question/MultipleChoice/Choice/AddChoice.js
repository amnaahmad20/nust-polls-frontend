import React from 'react';

function AddChoice(props) {
    function addShortText() {

    }

    function addOption() {
        props.onAddOption()
    }

    return (<div onClick={addOption} className={"radio-option row"}>
        <label className="container">
            <input disabled={true} type="radio" />
            <span className="checkmark"/>
        </label>
        <div className={"radio-text-bold"}> Add Option
            {/*or <a onClick={addShortText} className={"radio-text-bold"} >add "Other" </a>*/}
        </div>
    </div>);
}

export default AddChoice;