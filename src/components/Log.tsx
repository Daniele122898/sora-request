import React from 'react';
import ReactTimeAgo from 'react-time-ago';
import { Log } from '../store/index';

const LogEntry = ({log} : {log: Log}) => (
    <div className="log-entry">
        <div className="log__waifu-name">
            <p>{log.waifuName}</p>
        </div>
        <div className="log__rest">
            <p>Request {log.accepted ? "accepted" : "declined"}</p>
        </div>
        <div className="log__rest">
            <span><ReactTimeAgo date={log.processedTime} locale="en" /></span>
        </div>
    </div>
)

export default LogEntry;