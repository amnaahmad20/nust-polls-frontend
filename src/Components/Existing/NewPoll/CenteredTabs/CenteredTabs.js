import * as React from 'react';
import { styled } from '@mui/system';
import Tab from '@mui/material/Tab';
import TabPanel from '@mui/lab/TabPanel';
import TabList from '@mui/lab/TabList';
import TabContext from '@mui/lab/TabContext';
import $ from 'jquery';
import QuestionsTab from './QuestionsTab/QuestionsTab';
import ResponseTab from './ResponsesTab/ResponseTab';
import SettingTab from './SettingTab/SettingTab';
import { useState } from 'react';
import { useSpring, animated } from 'react-spring';
import { ToastContainer } from 'react-toastify';
import { useStateValue } from '../../../../StateProvider';

function first() {
  $('#tab-back').attr('class', 'tab-button first');
}
function second() {
  $('#tab-back').attr('class', 'tab-button');
}
function third() {
  $('#tab-back').attr('class', 'tab-button third');
}

const BlueTab = styled(Tab)`
  color: #085B91 !important;
`;

export default function CenteredTabs() {
  const [{ responseTab }, dispatch] = useStateValue();

  const [value, setValue] = useState(1);

  const handleChange = (newValue) => {
    setValue(newValue);
  };

  return (
    <TabContext value={value} >
  
      <ToastContainer position="bottom-right" />
      <div className={'tabs'}>
        <TabList>
          <span className={'tab-button first'} id={'tab-back'} />
          <BlueTab
            label="Questions"
            onClick={(value) => {
              first();
              handleChange(1)
              dispatch({
                type: 'SET_RESPONSE_TAB',
                responseTab: false,
              });
            }}
          >
            Questions
          </BlueTab>
          <BlueTab
            label="Responses"
            onClick={() => {
              second();
              handleChange(2)
              dispatch({
                type: 'SET_RESPONSE_TAB',
                responseTab: true,
              });
            }}
          >
            Responses
          </BlueTab>
          <BlueTab
            label="Settings"
            onClick={() => {
              third();
              handleChange(3)
              dispatch({
                type: 'SET_RESPONSE_TAB',
                responseTab: false,
              });
            }}
          >
            Settings
          </BlueTab>
        </TabList>
      </div>
      <TabPanel hidden={value !== 1} value={value} index={0}>
        <div className={'create-container'}>
          <QuestionsTab />
        </div>
      </TabPanel>
      <TabPanel hidden={value !== 2} value={value} index={1}>
        <div className={'create-container'}>
          <ResponseTab />
        </div>
      </TabPanel>
      <TabPanel hidden={value !== 3} value={value} index={2}>
        <div className={'create-container'}>
          <SettingTab />
        </div>
      </TabPanel>
    </TabContext>

  );
}
