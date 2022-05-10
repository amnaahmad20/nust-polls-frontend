import React, {useEffect, useState} from 'react';
import Flatpickr from "react-flatpickr";
import "flatpickr/dist/themes/light.css";
import "./SettingTab.css"
import rangePlugin from "flatpickr/dist/plugins/rangePlugin";
import {ChevronRight} from "lucide-react";

function SettingTab(props) {

    let today = new Date()
    let todayNight = today
    todayNight.setHours(11,59,0,0)

    function getTime(date = this.date) {
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

    function parseTime(){
        return today.toLocaleString(
            "en-GB",{
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

    function updateTime(date){
        const parsedDate = new Date(Date.parse(date))
        return parsedDate.setHours(23,59,0,0)
    }

    const [date, setDate] = useState();
    const [endDate, setEndDate] = useState();
    const [time, setTime] = useState(today);
    const [isSameDay, setIsSameDay] = useState(true);
    const [endTime, setEndTime] = useState(todayNight);
    const [isSameEndDay, setIsSameEndDay] = useState(true);


    useEffect(() => {
        return () => {
            console.log(endTime);
        };
    }, [endTime]);


    return (
        <div className={"settings-body"}>
            <div className={"deadline"}>
                <div className={"date-desc"} >
                    <h6>Poll Posting & Closing Date</h6>
                    <p> Select When Poll is posted and when it stops accepting responses </p>
                </div>
                <div>
                    <div className={"date-row"} >
                        <h6>Poll Posting Date</h6>
                        <h6>Poll Closing Date</h6>
                    </div>
                    <div className={"date-row"} >

                    <Flatpickr
                        options={{
                            minDate: "today",
                            altInput: true,
                            altFormat: "F j, Y",
                            dateFormat: "Y-m-d",
                            altInputClass: "input-button",
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
                            console.log(setTime(parseTime(date)));
                            setIsSameDay(getTime(date))
                            setTime(date)
                            setIsSameEndDay(getTime(endDate))
                            setEndTime(updateTime(endDate))
                            setDate(date);
                            setEndDate(endDate);
                        }}
                    />

                    </div>



                </div>
            </div>
            <div className={"deadline"}>
                <div className={"date-desc"} >
                <h6>Poll Posting Time</h6>
                <p>Select when the poll will start accepting responses</p>
                </div>
                <div className={"date-row"} >
                    <Flatpickr
                        options={{
                            noCalendar: true,
                            defaultHour: "00",
                            defaultMinute: "00",
                            enableTime: true,
                            minTime: "00:00",
                            dateFormat: "h:i K",
                            altInput: true,
                            altInputClass: "input-button",
                            minuteIncrement: 1,
                        }}
                        value={time}
                        onChange={([date]) => {
                            console.log("set time date");
                            console.log(date);
                            setTime(date)
                        }}
                    />
                </div>
            </div>
            <div className={"deadline"}>
                <div className={"date-desc"} >
                <h6>Poll Closing Time</h6>
                <p>Select when the poll will stop accepting responses</p>
                </div>
                <div className={"date-row"} >

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
                            altInputClass: "input-button",
                            minuteIncrement: 1,
                        }}
                        value={endTime}
                        onChange={([date]) => {
                            console.log("set end time date");
                            setIsSameEndDay(getTime(date))
                            console.log("set end time date");
                            console.log(date);
                            setEndTime(date)
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
                            altInputClass: "input-button",
                            minuteIncrement: 1,
                        }}
                        value={endTime}
                        onChange={([date]) => {
                            console.log("set end time date");
                            setIsSameEndDay(getTime(date))
                            console.log("set end time date");
                            console.log(date);
                            setEndTime(date)
                        }}
                    />
                }
                </div>
            </div>
        </div>
    );
}

export default SettingTab;
