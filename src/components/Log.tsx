import React from 'react';
import ReactTimeAgo from 'react-time-ago';
import {Log} from '../store/index';
import swal from 'sweetalert2';

const LogEntry = ({log} : {log: Log}) => (
    <div className="log-entry" onClick={() => {
        if (log.accepted) {
            swal.fire({
                title: `${log.waifuName} Accepted`,
                imageUrl: log.imageUrl,
            });
        } else {
            swal.fire({
                title: `${log.waifuName} Rejected`,
                imageUrl: log.imageUrl,
                text: log.rejectReason ? log.rejectReason : "Unknown reason"
            });
        }
    }}>
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
