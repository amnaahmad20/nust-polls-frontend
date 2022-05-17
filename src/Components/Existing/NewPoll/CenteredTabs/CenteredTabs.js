import * as React from 'react';
import { styled } from '@mui/system';
import TabsUnstyled from '@mui/base/TabsUnstyled';
import TabsListUnstyled from '@mui/base/TabsListUnstyled';
import TabPanelUnstyled from '@mui/base/TabPanelUnstyled';
import { buttonUnstyledClasses } from '@mui/base/ButtonUnstyled';
import TabUnstyled, { tabUnstyledClasses } from '@mui/base/TabUnstyled';
import $ from 'jquery';
import QuestionsTab from "./QuestionsTab/QuestionsTab";
import ResponseTab from "./ResponsesTab/ResponseTab";
import SettingTab from "./SettingTab/SettingTab";
import {useState} from "react";
import { useSpring, animated } from 'react-spring'


const Tab = styled(TabUnstyled)`
  color: #085B91;
  cursor: pointer;
  font-size: 0.875rem;
  font-weight: bold;
  background-color: rgba(8, 91, 145, 0);
  width: 100%;
  padding: 12px 16px;
  margin: 6px 6px;
  border: none;
  border-radius: 5px;
  display: flex;
  justify-content: center;
  z-index: 10;
  transition: 0.3s;

  @media only screen and (max-width: 400px) {
    flex-direction: column;
    padding: 6px 16px;
  }

    &.${tabUnstyledClasses.selected} {
    transition: 0.3s;
    color: white;
  }

  &.${buttonUnstyledClasses.disabled} {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const TabPanel = styled(TabPanelUnstyled)`
  width: 100%;
  height: 100%;
`;

const TabsList = styled(TabsListUnstyled)`
  min-width: 320px;
  background-color: white;
  border-radius: 8px;
  margin-bottom: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  align-content: space-between;
  
  @media only screen and (max-width: 400px) {
    min-width: 150px;
    flex-direction: column;
    text-align: center;
  }


`;

function first(){
    $('#tab-back').attr("class","tab-button first")
}
function second(){
    $('#tab-back').attr("class","tab-button")
}
function third(){
    $('#tab-back').attr("class","tab-button third")
}


export default function CenteredTabs() {

    const [value, setValue] = useState(1);


    const handleChange = (event, newValue) => {
        console.log(newValue);
        setValue(newValue);
    };



    return (
        <TabsUnstyled value={value} onChange={(e,index)=>handleChange(e,index)} defaultValue={1}>
            <div className={"tabs"} >
                <TabsList>
                    <span className={"tab-button first"} id={"tab-back"} />
                    <Tab onClick={first} >Questions</Tab>
                    <Tab onClick={second} >Responses</Tab>
                    <Tab onClick={third} >Settings</Tab>
                </TabsList>
            </div>
            <TabPanel hidden={value !== 1} value={value} index={0} >

                <div className={"create-container"} >
                    <QuestionsTab/>
                </div>
                </TabPanel>
            <TabPanel hidden={value !== 2} value={value} index={1} >
                <div className={"create-container"} >
                    <ResponseTab/>
                </div>
                </TabPanel>
            <TabPanel hidden={value !== 3} value={value} index={2} >
                <div className={"create-container"} >
                    <SettingTab/>
                </div>
                </TabPanel>
        </TabsUnstyled>
    );
}
