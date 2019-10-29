import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-webpart-base';

import * as strings from 'SchedulerWebPartStrings';
import Scheduler from './components/Scheduler';
import { ISchedulerProps } from './components/ISchedulerProps';
import { SPHttpClient, SPHttpClientResponse } from '@microsoft/sp-http';
/*import { PropertyPaneAsyncDropdown } from '../../controls/PropertyPaneAsyncDropdown/PropertyPaneAsyncDropdown';*/
import { IDropdownOption } from 'office-ui-fabric-react/lib/components/Dropdown';
import { update, get } from '@microsoft/sp-lodash-subset';

export interface IListInfo {
  Id: string;
  Title: string;
}
export interface ISchedulerWebPartProps {
  listName: string;  
  calendario:string;
  resursos:string;
  servicios:string;
  horaInicio:string;
  horaFin:string;
  duracion:number;
  diasSemana:string;
  vistaDefecto:string;
  zona:string;
  tema:string;
}


export default class SchedulerWebPart extends BaseClientSideWebPart<ISchedulerWebPartProps> {

  
  /*private loadLists(): Promise<IDropdownOption[]> {
    return new Promise<IDropdownOption[]>((resolve: (options: IDropdownOption[]) => void, reject: (error: any) => void) => {
      setTimeout(() => {
        resolve([{
          key: 'sharedDocuments',
          text: 'Shared Documents'
        },
          {
            key: 'myDocuments',
            text: 'My Documents'
          }]);
      }, 2000);
    });
  }*/
  /*
  private onListChange(propertyPath: string, newValue: any): void {
    const oldValue: any = get(this.properties, propertyPath);
    // store new value in web part properties
    update(this.properties, propertyPath, (): any => { return newValue; });
    // refresh web part
    this.render();
  }*/
  public render(): void {
    const element: React.ReactElement<ISchedulerProps > = React.createElement(
      Scheduler,
      {
        listName: this.properties.listName,
        context:this.context,
        calendario:this.properties.calendario,
        resursos:this.properties.resursos,
        servicios:this.properties.servicios,
        horaInicio:this.properties.horaInicio,
        horaFin:this.properties.horaFin,
        duracion:this.properties.duracion,
        diasSemana:this.properties.diasSemana,
        vistaDefecto:this.properties.vistaDefecto,
        zona:this.properties.zona,
        tema:this.properties.tema
      }
    );

    ReactDom.render(element, this.domElement);
  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse('2.0');
  }
  private onListItemChange(propertyPath: string, newValue: any): void {
    const oldValue: any = get(this.properties, propertyPath);
    // store new value in web part properties
    update(this.properties, propertyPath, (): any => { return newValue; });
    // refresh web part
    this.render();
  }
  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    /*let a = new PropertyPaneAsyncDropdown('listName', {
      key:"a",
      label: strings.CalendarListFieldLabel,
      loadOptions: this.loadLists.bind(this),
      onPropertyChange: this.onListChange.bind(this),
      selectedKey: this.properties.listName
    });*/
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription
          },
          groups: [
            {
              groupName: strings.CalendarConfig,
              groupFields: [
                
              ]
            },
            {              
              groupName: strings.CalendarConfig,
              groupFields: [
                PropertyPaneTextField('horaInicio', {
                  label: strings.StartFieldLabel
                }),
                PropertyPaneTextField('horaFin', {
                  label: strings.EndFieldLabel
                }),
                PropertyPaneTextField('duracion', {
                  label: strings.DurationFieldLabel
                }),
                PropertyPaneTextField('diasSemana', {
                  label: strings.WeekDaysFieldLabel
                }),
                PropertyPaneTextField('vistaDefecto', {
                  label: strings.DefaultViewFieldLabel
                }),
                PropertyPaneTextField('zona', {
                  label: strings.LocaleFieldLabel
                }),
                PropertyPaneTextField('tema', {
                  label: strings.ThemeFieldLabel
                })
              ]
            },
          ]
        }
      ]
    };
  }

  protected get disableReactivePropertyChanges(): boolean {
    return true;
  }
}
