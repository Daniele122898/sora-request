import React from 'react';
import WaifuRequestForm, { WaifuRequest } from './WaifuRequestForm';
import PageHeader from './PageHeader';

class DashboardPage extends React.Component<{}> {
  
  onSubmit = (request: WaifuRequest) => {
    
  }
  
  render() {
    return (
      <div>
        <PageHeader 
          title={"Request a Waifu"} 
          subtitle={"You can request 3 waifus per day."} 
        />
        <div className="content-container">
          <WaifuRequestForm onSubmit={this.onSubmit} />
        </div>
      </div>
      
    );
  }
} 

export default DashboardPage;