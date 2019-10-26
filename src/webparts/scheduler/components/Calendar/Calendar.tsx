import * as React from 'react';
import 'jquery';
import 'moment';
import 'fullcalendar';
import {ICalendarProps} from './ICalendarProps';

export default class Calendar extends React.Component < ICalendarProps, {} > {
    componentDidMount(){
        require('./script');
    }
    public render(): React.ReactElement<ICalendarProps> {
      
      return(
        <div>
          <link type="text/css" rel="stylesheet" href="//cdnjs.cloudflare.com/ajax/libs/fullcalendar/3.4.0/fullcalendar.min.css" />
          <div id="calendar"></div>
        </div>
      );
      
    }
  }