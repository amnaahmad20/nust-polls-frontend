import React from 'react';
import './ResponseTab.css';
import DoughnutChart from '../../../../Charts/DoughnutChart';

function ResponseTab(props) {
  return (
    <div className={'responses'}>
      No responses Yet
      <div style={{ margin: 'auto', padding: '0 20%' }}>
        <DoughnutChart
          labelSet={[
            'Maybelline',
            'Huda',
            'Faiza Beauty Cream',
            'Miss Rose',
            'Garnier',
            'Oriflame',
            'Rivaj UK',
            'Other ',
          ]}
          dataSet={[100, 100, 100, 100, 100, 100, 100, 100]}
        />
      </div>
    </div>
  );
}

export default ResponseTab;
