import React from 'react';
import WaifuRequestForm from './WaifuRequestForm';
import PageHeader from './PageHeader';

const DashboardPage = () => (
  <div>
    <PageHeader 
      title={"Request a Waifu"} 
      subtitle={"You can request 3 waifus per day."} 
    />
    <div className="content-container">
      <WaifuRequestForm onSubmit={() => { }} />
    </div>
  </div>
  
);

export default DashboardPage;