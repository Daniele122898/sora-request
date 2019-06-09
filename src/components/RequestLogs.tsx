import React from 'react';
import { Log } from '../store/index';
import LogEntry from './Log';

const RequestLogs = ({ logs }: {logs: Log[]}) => (
    <div className="log-body">
        <div className="log-header">
            <h4>Request Logs</h4>
        </div>
        <div className="logs-container">
            {logs.map(log => (
                <LogEntry log={log} key={log.id} />
            ))}
        </div>
    </div>
);

export default RequestLogs;