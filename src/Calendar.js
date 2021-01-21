import './calendar.css'
import React, { useEffect, useRef, useState } from 'react'
import Calendar from 'tui-calendar'; /* ES6 */
import "tui-calendar/dist/tui-calendar.css";
//import 'bootstrap';
import 'moment'
// If you use the default popups, use this.
import 'tui-date-picker/dist/tui-date-picker.css';
import 'tui-time-picker/dist/tui-time-picker.css';
import 'tui-date-picker/dist/tui-date-picker.js';
import 'tui-time-picker/dist/tui-time-picker.js';
import 'tui-code-snippet/dist/tui-code-snippet.min.js';
import moment from 'moment'
import $ from 'jquery'
import Dropdown from 'react-bootstrap/Dropdown'
import 'popper.js'
import 'jquery'
import 'bootstrap/dist/css/bootstrap.min.css'
import "./css/default.css"
import "./css/tui-example-style.css"
import "./css/icons.css"
import "tui-calendar/dist/tui-calendar.js"
//import {CalendarList, findCalendar, ScheduleList, generateSchedule} from './js/data/event.js'
import imgbi from './images/img-bi.png'
import userimg from './images/user.png'
import Chance from 'chance'
//import { useQuery, useMutation } from '@apollo/react-hooks'
//import {USER_QUERY, PROJECT_QUERY} from './graphql'
import { BrowserRouter,NavLink, Switch, Route, Redirect,useLocation } from "react-router-dom";
const chance = new Chance()

function GanttCalendar(props) {
    console.log(props.location.state);
    const name = props.location.state.username
    const password = props.location.state.userid
    const projects = props.location.state.projects
    const projectsColors = props.location.state.projectsColors
    const calendarRef = useRef(null)
    const [calendar, setCalendar] = useState(null)
    //const [projects, setProjects] = useState([])
    //const [events, setEvents] = useState([])
    //const [items, setItems] = useState([])

    let onClickNavi = null, onClickMenu = null, onChangeCalendars = null, onNewSchedule = null, createNewSchedule = null, onChangeNewScheduleCalendar = null;
    let datePicker, selectedCalendar;
    let CalendarList = [];
    let ScheduleList = [];
    const location = useLocation()

    // const { data, refetch, subscribeToMore } = useQuery(USER_QUERY, {
    //   variables: {
    //     name: username,
    //     id: userid,
    //     type: 'login'
    //   }
    // })
    //
    // useEffect(() => {
    //     console.log(data)
    //     if(data){
    //         setProjects(data.user.projects)
    //         console.log(data.user.projects)
    //     }
    // }, [data])
    //
    // useEffect(() => {
    //     console.log(projects);
    //     var itemlist = []
    //     projects.forEach(p => {
    //         console.log(p)
    //         p.events.forEach(e => {
    //             console.log(e);
    //             e.items.forEach(i => {
    //                 itemlist.push({
    //                     start: moment(i.time.start.replace('/', '-').replace('/', '-    ')).toDate(),
    //                     end: moment(i.time.end.replace('/', '-').replace('/', '-')).    toDate(),
    //                     title: p.name + ' ' + e.name + ' ' + i.name,
    //                     backgroundColor: '#ff0000',
    //                     textColor: '#ff0000'
    //                 })
    //             })
    //         })
    //     })
    //     console.log(itemlist)
    //     setItems(itemlist)
    // }, [projects])

    var SCHEDULE_CATEGORY = [
        'milestone',
        'task'
    ];
    function CalendarInfo() {
        this.id = null;
        this.name = null;
        this.checked = true;
        this.color = null;
        this.bgColor = null;
        this.borderColor = null;
        this.dragBgColor = null;
    }
    function addCalendar(calendar) {
        CalendarList.push(calendar);
    }
    function findCalendar(id) {
        var found;

        CalendarList.forEach(function(calendar) {
            if (calendar.id === id) {
                found = calendar;
            }
        });

        return found || CalendarList[0];
    }
    function hexToRGBA(hex) {
        var radix = 16;
        var r = parseInt(hex.slice(1, 3), radix),
            g = parseInt(hex.slice(3, 5), radix),
            b = parseInt(hex.slice(5, 7), radix),
            a = parseInt(hex.slice(7, 9), radix) / 255 || 1;
        var rgba = 'rgba(' + r + ', ' + g + ', ' + b + ', ' + a + ')';

        return rgba;
    }
    (function () {
        var calendar;
        var id = 0;
        projects.forEach(p => {
            let eventnum = 0;
            if(p.events) {
                p.events.forEach(e => {
                    calendar = new CalendarInfo();
                    id += 1;
                    calendar.id = String(id);
                    calendar.name = e.name;
                    calendar.color = '#ffffff';
                    calendar.bgColor = projectsColors[p.color][eventnum];
                    calendar.borderColor = projectsColors[p.color][eventnum];
                    addCalendar(calendar);
                    eventnum++;
                })
            }
        })

        // calendar = new CalendarInfo();
        // id += 1;
        // calendar.id = String(id);
        // calendar.name = 'Company';
        // calendar.color = '#ffffff';
        // calendar.bgColor = '#00a9ff';
        // calendar.dragBgColor = '#00a9ff';
        // calendar.borderColor = '#00a9ff';
        // addCalendar(calendar);
        //
        // calendar = new CalendarInfo();
        // id += 1;
        // calendar.id = String(id);
        // calendar.name = 'Family';
        // calendar.color = '#ffffff';
        // calendar.bgColor = '#ff5583';
        // calendar.dragBgColor = '#ff5583';
        // calendar.borderColor = '#ff5583';
        // addCalendar(calendar);
        //
        // calendar = new CalendarInfo();
        // id += 1;
        // calendar.id = String(id);
        // calendar.name = 'Friend';
        // calendar.color = '#ffffff';
        // calendar.bgColor = '#03bd9e';
        // calendar.dragBgColor = '#03bd9e';
        // calendar.borderColor = '#03bd9e';
        // addCalendar(calendar);
        //
        // calendar = new CalendarInfo();
        // id += 1;
        // calendar.id = String(id);
        // calendar.name = 'Travel';
        // calendar.color = '#ffffff';
        // calendar.bgColor = '#bbdc00';
        // calendar.dragBgColor = '#bbdc00';
        // calendar.borderColor = '#bbdc00';
        // addCalendar(calendar);
        //
        // calendar = new CalendarInfo();
        // id += 1;
        // calendar.id = String(id);
        // calendar.name = 'etc';
        // calendar.color = '#ffffff';
        // calendar.bgColor = '#9d9d9d';
        // calendar.dragBgColor = '#9d9d9d';
        // calendar.borderColor = '#9d9d9d';
        // addCalendar(calendar);
        //
        // calendar = new CalendarInfo();
        // id += 1;
        // calendar.id = String(id);
        // calendar.name = 'Birthdays';
        // calendar.color = '#ffffff';
        // calendar.bgColor = '#ffbb3b';
        // calendar.dragBgColor = '#ffbb3b';
        // calendar.borderColor = '#ffbb3b';
        // addCalendar(calendar);
        //
        // calendar = new CalendarInfo();
        // id += 1;
        // calendar.id = String(id);
        // calendar.name = 'National Holidays';
        // calendar.color = '#ffffff';
        // calendar.bgColor = '#ff4040';
        // calendar.dragBgColor = '#ff4040';
        // calendar.borderColor = '#ff4040';
        // addCalendar(calendar);
    })();
    function ScheduleInfo() {
        this.id = null;
        this.calendarId = null;

        this.title = null;
        this.body = null;
        this.isAllday = false;
        this.start = null;
        this.end = null;
        this.category = '';
        this.dueDateClass = '';

        this.color = null;
        this.bgColor = null;
        this.dragBgColor = null;
        this.borderColor = null;
        this.customStyle = '';

        this.isFocused = false;
        this.isPending = false;
        this.isVisible = true;
        this.isReadOnly = false;
        this.goingDuration = 0;
        this.comingDuration = 0;
        this.recurrenceRule = '';
        this.state = '';

        this.raw = {
            memo: '',
            hasToOrCc: false,
            hasRecurrenceRule: false,
            location: null,
            class: 'public', // or 'private'
            creator: {
                name: '',
                avatar: '',
                company: '',
                email: '',
                phone: ''
            }
        };
    }
    function generateTime(schedule, renderStart, renderEnd) {
        var startDate = moment(renderStart.getTime())
        var endDate = moment(renderEnd.getTime());
        var diffDate = endDate.diff(startDate, 'days');

        schedule.isAllday = chance.bool({likelihood: 30});
        if (schedule.isAllday) {
            schedule.category = 'allday';
        } else if (chance.bool({likelihood: 30})) {
            schedule.category = SCHEDULE_CATEGORY[chance.integer({min: 0, max: 1})];
            if (schedule.category === SCHEDULE_CATEGORY[1]) {
                schedule.dueDateClass = 'morning';
            }
        } else {
            schedule.category = 'time';
        }

        startDate.add(chance.integer({min: 0, max: diffDate}), 'days');
        startDate.hours(chance.integer({min: 0, max: 23}))
        startDate.minutes(chance.bool() ? 0 : 30);
        schedule.start = startDate.toDate();

        endDate = moment(startDate);
        if (schedule.isAllday) {
            endDate.add(chance.integer({min: 0, max: 3}), 'days');
        }

        schedule.end = endDate
            .add(chance.integer({min: 1, max: 4}), 'hour')
            .toDate();

        if (!schedule.isAllday && chance.bool({likelihood: 20})) {
            schedule.goingDuration = chance.integer({min: 30, max: 120});
            schedule.comingDuration = chance.integer({min: 30, max: 120});;

            if (chance.bool({likelihood: 50})) {
                schedule.end = schedule.start;
            }
        }
    }
    function generateNames() {
        var names = [];
        var i = 0;
        var length = chance.integer({min: 1, max: 10});

        for (; i < length; i += 1) {
            names.push(chance.name());
        }

        return names;
    }
    function generateRandomSchedule(calendar, renderStart, renderEnd) {
        var schedule = new ScheduleInfo();

        schedule.id = chance.guid();
        schedule.calendarId = calendar.id;

        schedule.title = chance.sentence({words: 3});
        schedule.body = chance.bool({likelihood: 20}) ? chance.sentence({words: 10}) : '';
        schedule.isReadOnly = chance.bool({likelihood: 20});
        generateTime(schedule, renderStart, renderEnd);

        schedule.isPrivate = chance.bool({likelihood: 10});
        schedule.location = chance.address();
        schedule.attendees = chance.bool({likelihood: 70}) ? generateNames() : [];
        schedule.recurrenceRule = chance.bool({likelihood: 20}) ? 'repeated events' : '';
        schedule.state = chance.bool({likelihood: 20}) ? 'Free' : 'Busy';
        schedule.color = calendar.color;
        schedule.bgColor = calendar.bgColor;
        schedule.dragBgColor = calendar.dragBgColor;
        schedule.borderColor = calendar.borderColor;

        if (schedule.category === 'milestone') {
            schedule.color = schedule.bgColor;
            schedule.bgColor = 'transparent';
            schedule.dragBgColor = 'transparent';
            schedule.borderColor = 'transparent';
        }

        schedule.raw.memo = chance.sentence();
        schedule.raw.creator.name = chance.name();
        schedule.raw.creator.avatar = chance.avatar();
        schedule.raw.creator.company = chance.company();
        schedule.raw.creator.email = chance.email();
        schedule.raw.creator.phone = chance.phone();

        if (chance.bool({ likelihood: 20 })) {
            var travelTime = chance.minute();
            schedule.goingDuration = travelTime;
            schedule.comingDuration = travelTime;
        }

        ScheduleList.push(schedule);
    }
    function generateSchedule(viewName, renderStart, renderEnd) {
        ScheduleList = []
        //     {
        //         id: '1',
        //         calendarId: '1',
        //         title: 'my schedule',
        //         category: 'time',
        //         dueDateClass: '',
        //         start: '2021-01-18T22:30:00+09:00',
        //         end: '2021-01-19T02:30:00+09:00'
        //     },
        //     {
        //         id: '2',
        //         calendarId: '1',
        //         title: 'second schedule',
        //         category: 'time',
        //         dueDateClass: '',
        //         start: '2021-01-18T17:30:00+09:00',
        //         end: '2021-01-19T17:31:00+09:00',
        //         isReadOnly: true    // schedule is read-only
        //     }
        // ]

        let id = 0;
        projects.forEach(p => {
            let eventnum = 0;
            if(p.events) {
                p.events.forEach(e => {
                    id++;
                    e.items.forEach(i => {
                        if(i.usernames.includes(name)) {
                            let schedule = {
                                id: String(id),
                                calendarId: String(id),
                                title: i.name,
                                body: 'Progress: ' + i.progress,
                                isReadOnly: true,
                                dueDateClass: '',
                                category: 'time',
                                isAllday: true,
                                start: moment(i.time.start.replace('/', '-').replace('/', '-    ')).toDate(),
                                end: moment(i.time.end.replace('/', '-').replace('/', '-')).endOf('day')._d,
                                color: '#ffffff',
                                bgColor: projectsColors[p.color][eventnum],
                                borderColor: projectsColors[p.color][eventnum]
                            }
                            ScheduleList.push(schedule);
                        }
                        // let schedule = new ScheduleInfo();
                        // schedule.id = chance.guid();
                        // schedule.calendarId = String(id);
                        // schedule.title = i.name;
                        // schedule.body = 'Progress: ' + i.progress;
                        // schedule.isReadOnly = true;
                        // schedule.category = 'all-day'
                        // schedule.isAllday = true
                        // schedule.start = moment(i.time.start.replace('/', '-').replace('/', '-    ')).toDate()
                        // schedule.end = moment(i.time.end.replace('/', '-').replace('/', '-')).    toDate()
                        // schedule.color = '#ffffff';
                        // schedule.bgColor = projectsColors[p.color][eventnum];
                        // schedule.borderColor = projectsColors[p.color][eventnum];
                        // ScheduleList.push(schedule);
                    })
                    eventnum++;
                })
            }
        })

        console.log(ScheduleList);
        // CalendarList.forEach(function(calendar) {
        //     var i = 0, length = 10;
        //     if (viewName === 'month') {
        //         length = 3;
        //     } else if (viewName === 'day') {
        //         length = 4;
        //     }
        //     for (; i < length; i += 1) {
        //         generateRandomSchedule(calendar, renderStart, renderEnd);
        //     }
        // });
    }

    let getDataAction = function(target) {
        return target.dataset ? target.dataset.action : target.getAttribute('data-action');
    }

    useEffect(() => {
        console.log(calendarRef);
        var newcalendar = new Calendar(calendarRef.current, {
            defaultView: 'month',
            taskView: true, useDetailPopup: true,
            template: {
                popupDetailRepeat: function(model) {
                    return model.recurrenceRule;
                },
                popupDetailBody: function(model) {
                    return model.body;
                }
            },
        });
        setCalendar(newcalendar)

    }, [calendarRef])

    useEffect(() => {
        if(calendar){
            function setDropdownCalendarType() {
                var calendarTypeName = document.getElementById('calendarTypeName');
                var calendarTypeIcon = document.getElementById('calendarTypeIcon');
                var options = calendar.getOptions();
                var type = calendar.getViewName();
                var iconClassName;

                if (type === 'day') {
                    type = 'Daily';
                    iconClassName = 'calendar-icon ic_view_day';
                } else if (type === 'week') {
                    type = 'Weekly';
                    iconClassName = 'calendar-icon ic_view_week';
                } else if (options.month.visibleWeeksCount === 2) {
                    type = '2 weeks';
                    iconClassName = 'calendar-icon ic_view_week';
                } else if (options.month.visibleWeeksCount === 3) {
                    type = '3 weeks';
                    iconClassName = 'calendar-icon ic_view_week';
                } else {
                    type = 'Monthly';
                    iconClassName = 'calendar-icon ic_view_month';
                }

                calendarTypeName.innerHTML = type;
                calendarTypeIcon.className = iconClassName;
            }
            function onChangeNewScheduleCalendar(e) {
                console.log('Click Menu')
                var target = $(e.target).closest('a[role="menuitem"]')[0];
                var calendarId = getDataAction(target);
                changeNewScheduleCalendar(calendarId);
            }
            function changeNewScheduleCalendar(calendarId) {
                var calendarNameElement = document.getElementById('calendarName');
                var calendar = findCalendar(calendarId);
                var html = [];

                html.push('<span class="calendar-bar" style="background-color: ' + calendar.bgColor + '; border-color:' + calendar.borderColor + ';"></span>');
                html.push('<span class="calendar-name">' + calendar.name + '</span>');

                calendarNameElement.innerHTML = html.join('');

                selectedCalendar = calendar;
            }
            onClickMenu = function(e) {
                console.log('click menu');
                var target = $(e.target).closest('a[role="menuitem"]')[0];
                var action = getDataAction(target);
                var options = calendar.getOptions();
                var viewName = '';

                console.log(target);
                console.log(action);
                switch (action) {
                    case 'toggle-daily':
                        viewName = 'day';
                        break;
                    case 'toggle-weekly':
                        viewName = 'week';
                        break;
                    case 'toggle-monthly':
                        options.month.visibleWeeksCount = 0;
                        viewName = 'month';
                        break;
                    case 'toggle-weeks2':
                        options.month.visibleWeeksCount = 2;
                        viewName = 'month';
                        break;
                    case 'toggle-weeks3':
                        options.month.visibleWeeksCount = 3;
                        viewName = 'month';
                        break;
                    case 'toggle-narrow-weekend':
                        options.month.narrowWeekend = !options.month.narrowWeekend;
                        options.week.narrowWeekend = !options.week.narrowWeekend;
                        viewName = calendar.getViewName();

                        target.querySelector('input').checked = options.month.narrowWeekend;
                        break;
                    case 'toggle-start-day-1':
                        options.month.startDayOfWeek = options.month.startDayOfWeek ? 0 : 1;
                        options.week.startDayOfWeek = options.week.startDayOfWeek ? 0 : 1;
                        viewName = calendar.getViewName();

                        target.querySelector('input').checked = options.month.startDayOfWeek;
                        break;
                    case 'toggle-workweek':
                        options.month.workweek = !options.month.workweek;
                        options.week.workweek = !options.week.workweek;
                        viewName = calendar.getViewName();

                        target.querySelector('input').checked = !options.month.workweek;
                        break;
                    default:
                        break;
                }

                calendar.setOptions(options, true);
                calendar.changeView(viewName, true);

                setDropdownCalendarType();
                setRenderRangeText();
                setSchedules();
            }
            function currentCalendarDate(format) {
                var currentDate = moment([calendar.getDate().getFullYear(), calendar.getDate().getMonth(), calendar.getDate().getDate()]);
                return currentDate.format(format);
            }
            let setRenderRangeText = function() {
                var renderRange = document.getElementById('renderRange');
                var options = calendar.getOptions();
                var viewName = calendar.getViewName();

                var html = [];
                if (viewName === 'day') {
                    html.push(currentCalendarDate('YYYY.MM.DD'));
                }
                else if (viewName === 'month' &&
                    (!options.month.visibleWeeksCount || options.month.visibleWeeksCount > 4)) {
                    html.push(currentCalendarDate('YYYY.MM'));
                }
                else {
                    html.push(moment(calendar.getDateRangeStart().getTime()).format('YYYY.MM.DD'));
                    html.push(' ~ ');
                    html.push(moment(calendar.getDateRangeEnd().getTime()).format(' MM.DD'));
                }
                renderRange.innerHTML = html.join('');
            }
            let setSchedules = function() {
                calendar.clear();
                generateSchedule(calendar.getViewName(), calendar.getDateRangeStart(), calendar.getDateRangeEnd());
                console.log(ScheduleList);
                calendar.createSchedules(ScheduleList);
                refreshScheduleVisibility();
            }
            function refreshScheduleVisibility() {
                var calendarElements = Array.prototype.slice.call(document.querySelectorAll('#calendarList input'));

                CalendarList.forEach(function(_calendar) {
                    calendar.toggleSchedules(_calendar.id, !_calendar.checked, false);
                });

                calendar.render(true);

                calendarElements.forEach(function(input) {
                    var span = input.nextElementSibling;
                    span.style.backgroundColor = input.checked ? span.style.borderColor : 'transparent';
                });
            }
            function onChangeCalendars(e) {
                var calendarId = e.target.value;
                var checked = e.target.checked;
                var viewAll = document.querySelector('.lnb-calendars-item input');
                var calendarElements = Array.prototype.slice.call(document.querySelectorAll('#calendarList input'));
                var allCheckedCalendars = true;

                if (calendarId === 'all') {
                    allCheckedCalendars = checked;

                    calendarElements.forEach(function(input) {
                        var span = input.parentNode;
                        input.checked = checked;
                        span.style.backgroundColor = checked ? span.style.borderColor : 'transparent';
                    });

                    CalendarList.forEach(function(calendar) {
                        calendar.checked = checked;
                    });
                } else {
                    findCalendar(calendarId).checked = checked;

                    allCheckedCalendars = calendarElements.every(function(input) {
                        return input.checked;
                    });

                    if (allCheckedCalendars) {
                        viewAll.checked = true;
                    } else {
                        viewAll.checked = false;
                    }
                }

                refreshScheduleVisibility();
            }
            onClickNavi = function(e) {
                var action = getDataAction(e.target);

                switch (action) {
                    case 'move-prev':
                        calendar.prev();
                        break;
                    case 'move-next':
                        calendar.next();
                        break;
                    case 'move-today':
                        calendar.today();
                        break;
                    default:
                        return;
                }

                setRenderRangeText();
                setSchedules();
            }
            function setEventListener() {
                $('#menu-navi').on('click', onClickNavi);
                $('.dropdown-menu a[role="menuitem"]').on('click', onClickMenu);
                console.log($('.dropdown-menu-title'));
                console.log(onClickMenu);
                $('#lnb-calendars').on('change', onChangeCalendars);
                // $('#btn-save-schedule').on('click', onNewSchedule);
                // $('#btn-new-schedule').on('click', createNewSchedule);
                $('#dropdownMenu-calendars-list').on('click', onChangeNewScheduleCalendar);
                // window.addEventListener('resize', resizeThrottled);
            }
            setDropdownCalendarType()
            setRenderRangeText();
            setSchedules();
            setEventListener();
            var calendarList = document.getElementById('calendarList');
            var html = [];
            CalendarList.forEach(function(calendar) {
                html.push('<div class="lnb-calendars-item"><label>' +
                    '<input type="checkbox" class="tui-full-calendar-checkbox-round" value="' + calendar.id + '" checked>' +
                    '<span style="border-color: ' + calendar.borderColor + '; background-color: ' + calendar.borderColor + ';"></span>' +
                    '<span>' + calendar.name + '</span>' +
                    '</label></div>'
                );
            });
            calendarList.innerHTML = html.join('\n');
        }

    }, [calendar])

    return (
        <div className="App">
            <div>
                <meta httpEquiv="content-type" content="text/html; charset=utf-8"/>
                <title>TOAST UI Calendar App DEMO</title>
            </div>
            <div>
                <div id="top">
                    <a href="https://github.com/nhn/tui.calendar">
                        <img src={imgbi}/>
                    </a>
                </div>
                <div id="lnb">
                    <div id="lnb-calendars" className="lnb-calendars">
                        <div style={{display: "flex", flexDirection: "row", padding: '5px'}}>
                            <img className="userimg" src={userimg} style={{height: '50px', width: '50px'}}/>
                            <div className="usernametitle" style={{fontSize: '25px', margin: 'auto'}}>{name}</div>
                        </div>
                        <div>
                            <div class="lnb-calendars-item">
                                <label>
                                    <input class="tui-full-calendar-checkbox-square" type="checkbox" value="all" checked/>
                                    <span></span>
                                    <strong>View all</strong>
                                </label>
                            </div>
                        </div>
                        <div id="calendarList" className="lnb-calendars-d1">
                        </div>
                    </div>
                </div>
                <div id="right">
                    <div id="menu">
                        <Dropdown style={{display: 'none'}}>
                            <Dropdown.Toggle id="dropdownMenu-calendarType" className="btn btn-default btn-sm dropdown-toggle">
                                <i id="calendarTypeIcon" className="calendar-icon ic_view_month" style={{marginRight: "4px"}}></i>
                                <span id="calendarTypeName">Dropdown</span>&nbsp;
                                <i className="calendar-icon tui-full-calendar-dropdown-arrow"></i>
                                </Dropdown.Toggle>
                                <Dropdown.Menu className="dropdown-menu" role="menu" aria-labelledby="dropdownMenu-calendarType">
                                <Dropdown.Item role="presentation">
                                <a className="dropdown-menu-title" role="menuitem" data-action="toggle-daily">
                                <i className="calendar-icon ic_view_day"></i>Daily
                                </a>
                                </Dropdown.Item>
                                <Dropdown.Item role="presentation">
                                <a className="dropdown-menu-title" role="menuitem" data-action="toggle-weekly">
                                <i className="calendar-icon ic_view_week"></i>Weekly
                                </a>
                                </Dropdown.Item>
                                <Dropdown.Item role="presentation">
                                <a className="dropdown-menu-title" role="menuitem" data-action="toggle-monthly">
                                <i className="calendar-icon ic_view_month"></i>Month
                                </a>
                                </Dropdown.Item>

                            </Dropdown.Menu>
                        </Dropdown>
                        <span id="menu-navi">
                            <button type="button" className="btn btn-default btn-sm move-today" data-action="move-today">Today</button>
                            <button type="button" className="btn btn-default btn-sm move-day" data-action="move-prev">
                                <i className="calendar-icon ic-arrow-line-left" data-action="move-prev"></i>
                            </button>
                            <button type="button" className="btn btn-default btn-sm move-day" data-action="move-next">
                                <i className="calendar-icon ic-arrow-line-right" data-action="move-next"></i>
                            </button>
                        </span>
                        <span id="renderRange" className="render-range"></span>
                    </div>
                    <div>
                        <div id="calendar" ref={calendarRef}> </div>
                    </div>
                </div>

                <script src="https://code.jquery.com/jquery-3.2.1.slim.min.js" integrity="sha384-KJ3o2DKtIkvYIK3UENzmM7KCkRr/rE9/Qpg6aAZGJwFDMVNA/GpGFF93hXpG5KkN"
crossOrigin="anonymous"></script>
                <script src="https://cdnjs.cloudflare.com/ajax/libs/chance/1.0.13/chance.min.js"></script>
            </div>
            <NavLink to={{pathname: `/home`,
            state:
            {
                password: password,
                username: name
            }}} ><button className="back_btn"><span>Back</span></button></NavLink>

        </div>
);
}

export default GanttCalendar;

