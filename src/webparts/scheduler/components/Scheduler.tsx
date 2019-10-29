import * as React from 'react';
import styles from './Scheduler.module.scss';
import { ISchedulerProps } from './ISchedulerProps';
import { escape } from '@microsoft/sp-lodash-subset';
import Calendar from './Calendar/Calendar';


export default class Scheduler extends React.Component < ISchedulerProps, {} > {

  
  public render(): React.ReactElement<ISchedulerProps> {
    
    return(
      <div className = { styles.scheduler } >
        <Calendar listName= {this.props.listName}  context={this.props.context} description="test"></Calendar>
      </div >
    );
  }
}
