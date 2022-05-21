import React, { useEffect, useState } from 'react';
import './ExistingPolls.css';
import { SortDesc } from 'lucide-react';
import NewPoll from '../Existing/NewPoll/NewPoll';
import OldPoll from '../Existing/OldPoll/OldPoll';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useStateValue } from '../../StateProvider';
import { Puff } from 'react-loading-icons';

function ExistingPolls(props) {
  const { adminId } = useParams();
  const [{ user }, dispatch] = useStateValue();

  //DUMMY URL
  const url = 'http://localhost:9000/polls/' + localStorage.getItem('adminId');

  const [pollsData, setPollsData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(function () {
    const fetchData = async () => {
      try {
        axios
          .get(url, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`,
              'Content-Type': 'application/json',
            },
          })
          .then((response) => {
            setLoading(false);
            setPollsData(response.data);
            console.log(response.data);
          });
      } catch (error) {
        setLoading(false);
        console.error(error);
      }
    };

    fetchData().then((r) => console.log('fetch request complete'));
    return {
      pollsData,
      loading,
    };
  }, []);

  function deletePoll(id) {
    setPollsData(pollsData.filter((poll) => poll._id !== id));
  }

  return (
    <div className={'main'}>
      <div className={'header'}>
        <h3>
          {(user?.admin && `${user.admin.firstName} ${user.admin.lastName}`) ||
            (user?.student &&
              `${user?.student.firstName} ${user?.student.lastName}`) ||
            `${user?.firstName} ${user?.lastName}`}
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
          pollsData.map(
            (poll) =>
              !loading && (
                <OldPoll
                  id={poll._id}
                  key={poll._id}
                  text={poll.poll_name}
                  date={poll.created_on}
                  deletePoll={deletePoll}
                  published={poll.published}
                />
              )
          )}
      </div>
      {loading && (
        <div style={{ paddingTop: '41px' }}>
          <Puff
            height={'50px'}
            transform={'scale(1.5)'}
            stroke="#085B91"
            strokeOpacity={0.125}
            speed={0.75}
          />
        </div>
      )}
    </div>
  );
}

export default ExistingPolls;
