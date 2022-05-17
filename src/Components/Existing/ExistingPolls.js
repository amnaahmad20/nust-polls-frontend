import React, {useEffect, useState} from 'react';
import './ExistingPolls.css';
import {SortDesc} from 'lucide-react';
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
        'http://localhost:9000/polls/' + localStorage.getItem('adminId');

    const [pollsData, setPollsData] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(
        function () {
            const fetchData = async () => {
                try {
                    axios.get(url, {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem('token')}`,
                            'Content-Type': 'application/json'
                        }
                    }).then((response) => {
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
        []
    );

    function deletePoll(id) {
        setPollsData(pollsData.filter(poll => poll._id !== id))
    }

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
                    <SortDesc color={'#085B91'} size={'19'} strokeWidth={'1'}/> Sort By
                </button>
            </div>

            <div className={'polls'}>
                <NewPoll/>
                {pollsData.length > 0 &&
                    pollsData.map((poll) => (
                        <OldPoll
                            id={poll._id}
                            key={poll._id}
                            text={poll.poll_name}
                            date={poll.created_on}
                            deletePoll={deletePoll}
                        />
                    ))}
            </div>
        </div>
    );
}

export default ExistingPolls;
