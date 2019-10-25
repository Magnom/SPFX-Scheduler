import * as React from 'react';
import styles from './Scheduler.module.scss';
import { ISchedulerProps } from './ISchedulerProps';
import { escape } from '@microsoft/sp-lodash-subset';

export default class Scheduler extends React.Component < ISchedulerProps, {} > {
  public render(): React.ReactElement<ISchedulerProps> {
    return(
      <div className = { styles.scheduler } >
  <div className={styles.container}>
    <div className={styles.row}>
      <div className={styles.column}>
        <span className={styles.title}>Welcome to SharePoint!</span>
        <p className={styles.subTitle}>Customize SharePoint experiences using Web Parts.</p>
        <p className={styles.description}>{escape(this.props.description)}</p>
        <a href='https://aka.ms/spfx' className={styles.button}>
          <span className={styles.label}>Learn more</span>
        </a>
      </div>
    </div>
  </div>
      </div >
    );
  }
}
