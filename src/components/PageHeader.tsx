import React from 'react';

const PageHeader = ({title, subtitle}: {title: string, subtitle?: string}) => (
    <div className="page-header">
      <div className="content-container">
        <h1 className="page-header__title">{title}</h1>
        {subtitle && 
            <h3 className="page-header__subtitle">
                You can request 3 waifus per day.
            </h3>
        }
      </div>
    </div>
);

export default PageHeader;