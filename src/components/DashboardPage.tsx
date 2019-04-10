import React from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import swal from 'sweetalert2';
import WaifuRequestForm, { WaifuRequest } from './WaifuRequestForm';
import PageHeader from './PageHeader';
import { AnyThunkDispatch } from '../types/index';
import { addRequest, AddRequest } from '../actions/requestActions';
import { Request } from '../store/index';

type RootState = {};

interface Props {
  addRequest: (request: Request) => AddRequest;
}

class DashboardPage extends React.Component<Props> {
  
  onSubmit = (request: WaifuRequest, clearInput: Function) => {
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
        // dispatch event
        this.props.addRequest({
          ...request,
          id: resp.data.requestId
        });
        // clear input
        clearInput();

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

const mapDispatchToProps = (dispatch: AnyThunkDispatch<RootState>) => ({
  addRequest: (request: Request) => dispatch(addRequest(request))
});

export default connect(undefined, mapDispatchToProps)(DashboardPage);