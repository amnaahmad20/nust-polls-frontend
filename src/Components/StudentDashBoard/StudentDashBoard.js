import React, {useEffect, useState} from 'react';
import StudentPoll from "./StudentPoll/StudentPoll";
import {SortDesc} from "lucide-react";
import NewPoll from "../Existing/NewPoll/NewPoll";
import OldPoll from "../Existing/OldPoll/OldPoll";
import {Puff} from "react-loading-icons";
import {useStateValue} from "../../StateProvider";
import axios from "axios";
import {useParams} from "react-router-dom";

function StudentDashBoard(props) {

    const {studentId} = useParams();

    const [{user}, dispatch] = useStateValue();

    const url =
        'http://localhost:9000/polls/student/';

    const [pollsData, setPollsData] = useState([]);
    const [loading, setLoading] = useState(true);

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
                        console.log(response.data);
                        setLoading(false);
                        setPollsData(response.data);
                    });
                } catch (error) {
                    setLoading(false);
                    console.error(error);
                }
            };

            fetchData().then(r => console.log("fetch request complete"))
            return {
                pollsData,
                loading,
            };
        },
        []
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
                        <SortDesc color={'#085B91'} size={'19'} strokeWidth={'1'}/> Sort By
                    </button>
                </div>

                <div className={'polls'}>
                    {/*<NewPoll/>*/}
                    {pollsData.length > 0 &&
                        pollsData.map((poll) => (
                            !loading && poll.published && <StudentPoll
                                id={poll._id}
                                key={poll._id}
                                text={poll.poll_name}
                                date={poll.created_on}
                            />
                        ))}
                </div>
                {loading &&
                    <div style={{"paddingTop": "41px"}}><Puff height={"50px"} transform={"scale(1.5)"} stroke="#085B91"
                                                              strokeOpacity={.125} speed={.75}/></div>}
            </div>
    );
}

export default StudentDashBoard;