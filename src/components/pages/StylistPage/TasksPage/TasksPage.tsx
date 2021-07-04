import React, { memo } from "react";
import styles from './TasksPage.module.scss';

const TasksPage: React.FC = () => {
  return(
    <div className={styles['tasks-page']}>Tasks page</div>
  )
}

export default memo(TasksPage);