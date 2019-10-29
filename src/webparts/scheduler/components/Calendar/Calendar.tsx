import * as React from 'react';
import * as $ from 'jquery';
import * as FC from 'fullcalendar';
import * as moment from 'moment';
import 'fullcalendar';
import {ICalendarProps} from './ICalendarProps';
import {ICalendarTask} from './ICalendarTask'
import { SPHttpClient, SPHttpClientResponse } from '@microsoft/sp-http';
import momentExt from 'fullcalendar/src/moment-ext';



export default class Calendar extends React.Component < ICalendarProps, {} > {
    private readonly colors: string[] = ['#466365', '#B49A67', '#93B7BE', '#E07A5F', '#849483', '#084C61', '#DB3A34'];

    private displayTasks(): void {
        $('#calendar').fullCalendar('destroy');
        $('#calendar').fullCalendar({
          weekends: false,
          header: {
            left: 'prev,next today',
            center: 'title',
            right: 'month,basicWeek,basicDay'
          },
          displayEventTime: false,
          // open up the display form when a user clicks on an event
          eventClick: (calEvent: FC.EventDef, jsEvent: MouseEvent, view: FC.View): void => {
            (window as any).location = `${this.props.context.pageContext.web.absoluteUrl}\
    /Lists/${this.props.listName}/DispForm.aspx?ID=${calEvent.id}`;
          },
          editable: true,
          timezone: "UTC",
          droppable: true, // this allows things to be dropped onto the calendar
          // update the end date when a user drags and drops an event 
          eventDrop: (event: FC.EventDef, delta: moment.Duration, revertFunc: Function): void => {
            //this.updateTask(event.id, event.start, event.end);
          },
          // put the events on the calendar 
          events: (start: moment.Moment, end: moment.Moment, timezone: string, callback: Function): void => {
            const startDate: string = start.format('YYYY-MM-DD');
            const endDate: string = end.format('YYYY-MM-DD');
    
            const restQuery: string = `/_api/Web/Lists/GetByTitle('${this.props.listName}')/items?$select=ID,Title,\
    Status,StartDate,DueDate,AssignedTo/Title&$expand=AssignedTo&\
    $filter=((DueDate ge '${startDate}' and DueDate le '${endDate}')or(StartDate ge '${startDate}' and StartDate le '${endDate}'))`;
                
                this.props.context.spHttpClient.get(this.props.context.pageContext.web.absoluteUrl + restQuery, SPHttpClient.configurations.v1, {
              headers: {
                'Accept': "application/json;odata.metadata=none"
              }
            })
              .then((response: SPHttpClientResponse): Promise<{ value: ICalendarTask[] }> => {
                return response.json();
              })
              .then((data: { value: ICalendarTask[] }): void => {
                let personColors: { [person: string]: string; } = {};
                let colorNo: number = 0;
    
                const events: any[] = data.value.map((task: ICalendarTask): any => {
                  const assignedTo: string = task.AssignedTo.map((person: { Title: string }): string => {
                    return person.Title;
                  }).join(', ');
    
                  let color: string = personColors[assignedTo];
                  if (!color) {
                    color = this.colors[colorNo++];
                    personColors[assignedTo] = color;
                  }
                  if (colorNo >= this.colors.length) {
                    colorNo = 0;
                  }
    
                  return {
                    title: `${task.Title} - ${assignedTo}`,
                    id: task.ID,
                    // specify the background color and border color can also create a class and use className paramter
                    color: color,
                    start: moment.utc(task.StartDate).add("1", "days"),
                    // add one day to end date so that calendar properly shows event ending on that day
                    end: moment.utc(task.DueDate).add("1", "days")
                  };
                });
    
                callback(events);
              });
          }
        });
      }
    
      private updateTask(id: number, startDate: moment.Moment, dueDate: moment.Moment): void {
        // subtract the previously added day to the date to store correct date
        const sDate: string = moment.utc(startDate).add("-1", "days").format('YYYY-MM-DD') + "T" +
          startDate.format("hh:mm") + ":00Z";
        if (!dueDate) {
          dueDate = startDate;
        }
        const dDate: string = moment.utc(dueDate).add("-1", "days").format('YYYY-MM-DD') + "T" +
          dueDate.format("hh:mm") + ":00Z";
    
          this.props.context.spHttpClient.post(`${this.props.context.pageContext.web.absoluteUrl}\
    /_api/Web/Lists/getByTitle('${this.props.listName}')/Items(${id})`, SPHttpClient.configurations.v1, {
            body: JSON.stringify({
              StartDate: sDate,
              DueDate: dDate,
            }),
            headers: {
              Accept: "application/json;odata=nometadata",
              "Content-Type": "application/json;odata=nometadata",
              "IF-MATCH": "*",
              "X-Http-Method": "PATCH"
            }
          })
          .then((response: SPHttpClientResponse): void => {
            if (response.ok) {
              alert("Update Successful");
            }
            else {
              alert("Update Failed");
            }
    
            this.displayTasks();
          });
      }
    componentDidMount(){
        this.displayTasks();
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