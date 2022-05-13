import React, { useEffect, useState } from 'react';
import './ExistingPolls.css';
import { SortDesc } from 'lucide-react';
import NewPoll from '../Existing/NewPoll/NewPoll';
import OldPoll from '../Existing/OldPoll/OldPoll';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useStateValue } from '../../StateProvider';

function ExistingPolls(props) {
  const { adminId } = useParams();
  const [{ user }, dispatch] = useStateValue();

  //DUMMY URL
  const url =
    'https://d503c9b2-a0ea-4d27-829e-46af23e234c8.mock.pstmn.io/10/polls';

  const [pollsData, setPollsData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(
    function () {
      const fetchData = async () => {
        try {
          axios.get(url).then((response) => {
            setPollsData(response.data);
            console.log(response.data);
          });
        } catch (error) {
          console.error(error);
        }
        setLoading(false);
      };

      fetchData();
      return {
        pollsData,
        loading,
      };
    },
    [url]
  );

  return (
    <div className={'main'}>
      <div className={'header'}>
        <h3>
          {user?.admin
            ? `${user.admin.firstName} ${user.admin.lastName}`
            : `${user?.firstName} ${user?.lastName}`}
          's Polls
        </h3>
        <button className={'sort'}>
          {' '}
          <SortDesc color={'#085B91'} size={'19'} strokeWidth={'1'} /> Sort By
        </button>
      </div>

      <div className={'polls'}>
        <NewPoll />
        {pollsData.length > 0 &&
          pollsData.map((poll) => (
            <OldPoll
              id={poll.key}
              key={poll.key}
              text={poll.text}
              date={poll.date}
            />
          ))}
      </div>
    </div>
  );
}

export default ExistingPolls;
