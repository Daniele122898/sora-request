import React from 'react';
import axios from 'axios';
import swal from 'sweetalert2';
import WaifuRequestForm, { WaifuRequest } from './WaifuRequestForm';
import PageHeader from './PageHeader';

class DashboardPage extends React.Component<{}> {
  
  onSubmit = (request: WaifuRequest) => {
    // send the request to our backend
    axios.post('/api/requestWaifu',request)
    .then(resp => {
      if (resp.status != 200) {

        return;
      }
      if (resp.data.success) {
        swal.fire(
          'Success',
          "Successfully requested a waifu!",
          'success'
        );
      } else {
        swal.fire({
          type: 'error',
          title: 'Oops...',
          text: resp.data.error ? resp.data.error : 'Something broke...'
        });
      }

    }).catch(err => {
      swal.fire({
        type: 'error',
        title: 'Oops...',
        text: 'Something broke...'
      });
    });
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