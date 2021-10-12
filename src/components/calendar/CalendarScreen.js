import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Navbar } from '../ui/Navbar'
import { AddNewFab } from '../ui/AddNewFab'

import { uiOpenModal } from '../../actions/ui'
import { eventSetActive, eventStartLoading } from '../../actions/events'
import { DeleteEventFab } from '../ui/DeleteEventFab'

import{ Calendar, momentLocalizer } from 'react-big-calendar'
import { messages } from '../../helpers/calendar-messages-es'
import { CalendarEvent } from './CalendarEvent'
import { CalendarModal } from './CalendarModal'
import 'react-big-calendar/lib/css/react-big-calendar.css'

import moment from 'moment'
import 'moment/locale/es'




moment.locale('es')
const localizer = momentLocalizer(moment)


export const CalendarScreen = () => {

    const dispatch = useDispatch()
    const { events, activeEvent } = useSelector(state => state.calendar)
    const { uid } = useSelector(state => state.auth)

    const [lastView, setLastView] = useState( localStorage.getItem('lastView') || 'month' )
    // const [action, setAction] = useState('')
    

    useEffect(() => {
        
        dispatch( eventStartLoading() )

    }, [ dispatch ])


    const onDoubleClick = (e) => {
        dispatch( uiOpenModal() )
    }

    const onSelectEvent = (e) => {
        dispatch( eventSetActive(e) )
    }

    const onViewChange = (e) => {
        setLastView(e)
        localStorage.setItem('lastView', e)
    }

    const onSelectSlot = (e) => {
        dispatch( eventSetActive(null) )
        // dispatch( uiOpenModal() )
        // setAction( e )
    }

    const eventStylesGetter = ( event, start, end, isSelected ) => {
 
        const style = {
            backgroundColor: ( uid === event.user._id ) ? '#367CF7' : '#465660',
            borderRadius: '0px',
            opacity: 0.8,
            display: 'block',
            color: 'white'
        }
        return {
            style
        }
    }

    return (
        <div className='calendar-screen'>
            <Navbar />

            <Calendar
              localizer={ localizer }
              events={ events }
              startAccessor="start"
              endAccessor="end"
              messages={ messages }
              eventPropGetter={ eventStylesGetter }
              onDoubleClickEvent={ onDoubleClick }
              onSelectEvent={ onSelectEvent }
              onView={ onViewChange }
              onSelectSlot={ onSelectSlot }
              selectable={ true }
              view={ lastView }
              components={{ event: CalendarEvent }}
            />

            <AddNewFab />

            {
                activeEvent && <DeleteEventFab />
            }
            
            <CalendarModal />

        </div>
    )
}
