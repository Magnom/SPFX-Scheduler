declare interface ISchedulerWebPartStrings {
  PropertyPaneDescription: string;
  DataSources: string;
  CalendarConfig: string;
  ListNameFieldLabel: string;
  CalendarListFieldLabel: string;
  ResourceListFieldLabel: string;
  ServiceListFieldLabel: string;
  StartFieldLabel: string;
  EndFieldLabel: string;
  DurationFieldLabel: string;
  WeekDaysFieldLabel: string;
  DefaultViewFieldLabel: string;
  LocaleFieldLabel: string;
  ThemeFieldLabel: string;
}

declare module 'SchedulerWebPartStrings' {
  const strings: ISchedulerWebPartStrings;
  export = strings;
}
