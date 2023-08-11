import React, {useEffect, useRef, useState} from 'react';
import Flatpickr from "react-flatpickr";
import "flatpickr/dist/themes/light.css";
import "./SettingTab.css"
import rangePlugin from "flatpickr/dist/plugins/rangePlugin";
import axios from "axios";
import {useStateValue} from "../../../../../StateProvider";

function SettingTab(props) {

    const [{published_on, deadline}, dispatch] = useStateValue()

    let today = new Date()
    let todayNight = today
    todayNight.setHours(11, 59, 0, 0)


    const editQuestionUrl = 'http://localhost:9000/polls/edit-ques/' + localStorage.getItem('questionId');
    const editPollUrl = 'http://localhost:9000/polls/edit/' + localStorage.getItem('pollId');
    const fetchUrl = 'http://localhost:9000/polls/ques/' + localStorage.getItem('pollId');

    const [isChanged, setIsChanged] = useState(false);


    const [date, setDate] = useState();
    const [endDate, setEndDate] = useState();
    const [time, setTime] = useState(today);
    const [isSameDay, setIsSameDay] = useState(true);
    const [endTime, setEndTime] = useState(todayNight);
    const [isSameEndDay, setIsSameEndDay] = useState(true);

    const [loading, setLoading] = useState(true);


    const timeRef = useRef(time);
    timeRef.current = time;

    const endTimeRef = useRef(endTime);
    endTimeRef.current = endTime;


    useEffect(
        function () {
            const fetchData = async () => {
                try {
                    await axios.get(fetchUrl, {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem('token')}`,
                            'Content-Type': 'application/json'
                        }
                    }).then((response) => {
                        // setPollsData(response.data);
                        console.log("this is fetch response.data");
                        console.log(response.data);
                        setDate(response.data.published_on)
                        setEndDate(response.data.deadline)
                    });
                } catch (error) {
                    console.error(error);
                }
                setLoading(false);
            };
            // if(isCreated) {
            fetchData();
            // }
            return {
                loading,
            };
        },
        []
    );


    useEffect(() => {
        if (isChanged) {
            const timer = setTimeout(async () => {
                console.log('This will send a request after 2 seconds!')
                await axios.post(editPollUrl, {
                    poll: localStorage.getItem('pollId'), published_on: timeRef.current, deadline: endTimeRef.current
                }, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    }
                }).then(res => {
                    console.log("sending request")
                    console.log(res);
                    dispatch({
                        type: 'SET_POLL_DATES',
                        published_on: timeRef.current,
                        deadline: endTimeRef.current,
                    })
                    setIsChanged(false)
                }).catch(err => console.log(err.message))
            }, 2000);
            return () => clearTimeout(timer);
        }
    }, [isChanged])



    function getTime(date) {
        const parsedDate = new Date(Date.parse(date))
        // const formattedDate = parsedDate.toLocaleString("en-GB", {
        //     day: "numeric",
        //     month: "short",
        //     year: "numeric",
        // });
        // const currentTime = today.toLocaleString(
        //     "en-GB",{
        //         hour: "numeric",
        //         minute: "2-digit"
        //     }
        // )

        console.log(parsedDate.getDay());

        return ((today.getFullYear() === parsedDate.getFullYear() && today.getMonth() === parsedDate.getMonth() && today.getDate() === parsedDate.getDate()))
    }

    function parseTime() {
        return today.toLocaleString(
            "en-GB", {
                hour: "numeric",
                minute: "2-digit"
            }
        )
    }

    // function updateDate(newDate){
    //     const parsedDate = new Date(Date.parse(newDate))
    //     let updatedDate = time
    //     console.log("updatedDate before");
    //     console.log(updatedDate);
    //     console.log("Parsed Date");
    //     console.log(parsedDate);
    //     console.log(parsedDate.getHours());
    //     updatedDate.setHours(parsedDate.getHours(),parsedDate.getMinutes(),0,0)
    //         console.log("updatedDate after");
    //         console.log(updatedDate);
    //         return updateDate
    // }

    function updateTime(date) {
        const parsedDate = new Date(Date.parse(date))
        parsedDate.setHours(23, 59, 0, 0)
        return parsedDate
    }


    return (
        <div className={"settings-body"}>
            <div className={"deadline deadline-first "}>
                <div className={"date-desc"}>
                    <h6>Poll Posting & Closing Date</h6>
                    <p> Select When Poll is posted and when it stops accepting responses </p>
                </div>
                <div className={"date-selection"}>
                    <div className={"date-row"}>
                        <h6>Poll Posting Date</h6>
                        <h6>Poll Closing Date</h6>
                    </div>
                    <div className={"date-row "}>
                        <div className={"date-options"}>

                            <Flatpickr
                                options={{
                                    minDate: "today",
                                    altInput: true,
                                    altFormat: "F j, Y",
                                    dateFormat: "Y-m-d",
                                    altInputClass: "input-button startd",
                                    disableMobile: true,
                                    "plugins": [new rangePlugin({input: endDate})],
                                }}
                                value={date}
                                placeholder={"select date ▾"}
                                onChange={([date, endDate]) => {
                                    console.log("date");
                                    console.log(date);
                                    console.log("endDate");
                                    console.log(endDate);
                                    console.log("today");
                                    console.log(today);
                                    console.log("getTime(date)");
                                    console.log(getTime(date));
                                    console.log(typeof (getTime(date)));
                                    console.log("setTime(parseTime(date))");
                                    console.log(parseTime(date));
                                    console.log("setTime(updateTime(date))");
                                    console.log(updateTime(date));
                                    setIsSameDay(getTime(date))
                                    setTime(date)
                                    setIsSameEndDay(getTime(endDate))
                                    setEndTime(updateTime(endDate))
                                    setDate(date);
                                    setEndDate(endDate);
                                    dispatch({
                                        type: 'SET_IS_CHANGED', changed: true,
                                    })
                                    setIsChanged(true)
                                }}
                            />

                        </div>
                    </div>
                </div>
            </div>
            <div className={"deadline"}>
                <div className={"date-desc"}>
                    <h6>Poll Posting Time</h6>
                    <p>Select when the poll will start accepting responses</p>
                </div>
                <div className={"date-row"}>
                    <Flatpickr
                        options={{
                            noCalendar: true,
                            defaultHour: "00",
                            defaultMinute: "00",
                            enableTime: true,
                            minTime: "00:00",
                            dateFormat: "h:i K",
                            altInput: true,
                            disableMobile: true,
                            altInputClass: "input-button endd",
                            minuteIncrement: 1,
                        }}
                        value={time}
                        onChange={([date]) => {
                            console.log("set time date");
                            console.log(date);
                            dispatch({
                                type: 'SET_IS_CHANGED', changed: true,
                            })
                            setTime(date)
                            setIsChanged(true)
                        }}
                    />
                </div>
            </div>
            <div className={"deadline"}>
                <div className={"date-desc"}>
                    <h6>Poll Closing Time</h6>
                    <p>Select when the poll will stop accepting responses</p>
                </div>
                <div className={"date-row"}>

                    {isSameEndDay ?
                        <Flatpickr
                            options={{
                                noCalendar: true,
                                defaultHour: "23",
                                defaultMinute: "59",
                                minTime: "23:59",
                                enableTime: true,
                                dateFormat: "h:i K",
                                altInput: true,
                                disableMobile: true,
                                altInputClass: "input-button startt",
                                minuteIncrement: 1,
                            }}
                            value={endTime}
                            onChange={([date]) => {
                                console.log("set end time date");
                                setIsSameEndDay(getTime(date))
                                console.log("set end time date");
                                console.log(date);
                                dispatch({
                                    type: 'SET_IS_CHANGED', changed: true,
                                })
                                setEndTime(date)
                                setIsChanged(true)
                            }}
                        />
                        :
                        <Flatpickr
                            options={{
                                noCalendar: true,
                                defaultHour: "23",
                                defaultMinute: "59",
                                enableTime: true,
                                minTime: "00:00",
                                dateFormat: "h:i K",
                                altInput: true,
                                altInputClass: "input-button endt",
                                minuteIncrement: 1,
                            }}
                            value={endTime}
                            onChange={([date]) => {
                                console.log("set end time date");
                                setIsSameEndDay(getTime(date))
                                console.log("set end time date");
                                console.log(date);
                                dispatch({
                                    type: 'SET_IS_CHANGED', changed: true,
                                })
                                setEndTime(date)
                                setIsChanged(true)
                            }}
                        />
                    }
                </div>
            </div>
        </div>
    );
}

export default SettingTab;
