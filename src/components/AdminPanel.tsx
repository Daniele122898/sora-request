import React from 'react';
import { connect } from 'react-redux'
import swal from 'sweetalert2';
import axios from 'axios';
import { IoMdCheckmark, IoMdClose } from 'react-icons/io'
import { Request } from '../store';
import CardEditor from './CardEditor';
import { getRarityStringFromInt } from './Card';
import PageHeader from './PageHeader';
import { AnyThunkDispatch } from '../types';
import { setRequests, SetRequests } from '../actions/requestActions';

type State = {
    requests: Request[]
}

type Props = {
    setRequests: (requests: Request[]) => SetRequests;
}

type RootState = {};

class AdminPanel extends React.Component<Props, State> {
    
    constructor(props: any) {
        super(props);

        this.state = {
            requests: []
        }
    }

    componentDidMount = () => {
        // get all requests
        axios.get('/api/getAdminRequests')
        .then(resp => {
            // if the user has no requests we do... nothing :)
            if (resp.data == null || resp.data.length === 0) {
                return;
            }
            const reqs: Request[] = [];
            for (let i=0; i<resp.data.length; i++) {
                const r = resp.data[i];
                reqs.push({
                    id: r.id,
                    imageUrl: r.imageUrl,
                    name: r.name,
                    rarity: r.rarity
                });
            }
            // set the state
            this.setState(()=> ({
                requests: reqs
            }));
            // dispatch so we can edit the requests
            this.props.setRequests(reqs);
        }).catch(e=> {
            console.log(e);
        });
    }

    makeApprovalRequest = (id: string ,accept: boolean) => {
        const req = {
            waifuId: id,
            accept
        }
        axios.post('/api/requestApproval', req)
        .then(resp => {
            if (resp.status != 200) {
                swal.fire({
                  type: 'error',
                  title: 'Oops...',
                  text: 'Something broke...'
                });
                return;
            }
            if (resp.data.success) {
                swal.fire(
                    'Success',
                    `Successfully ${accept ? 'accepted' : 'declined'} request!`,
                    'success'
                  );
                  // update state
                  this.setState((state) => ({
                      requests: state.requests.filter((req) => req.id !== id)
                  }), () => {
                      this.props.setRequests(this.state.requests);
                  })
            } else {
                swal.fire({
                    type: 'error',
                    title: 'Oops...',
                    text: resp.data.error ? resp.data.error : 'Something broke...'
                });
            }
        }).catch(e=> {
            swal.fire({
                type: 'error',
                title: 'Oops...',
                text: 'Something broke...'
            });
        })
    }

    acceptRequest = (id: string) => {
        this.makeApprovalRequest(id, true);
    }

    declineRequest = (id: string) => {
        this.makeApprovalRequest(id, false);
    }

    renderCards = () => {
        return this.state.requests.map((req) => {
            return (
                <div className="card--float" key={req.id}>
                    <CardEditor 
                        imageUrl={req.imageUrl}
                        name={req.name}
                        rarity={getRarityStringFromInt(req.rarity)}
                        id={req.id}
                    >
                        <div>
                            <button 
                                className="button button--half-width button-green"
                                onClick={() => {this.acceptRequest(req.id)}}
                            >
                                <IoMdCheckmark/>
                            </button>
                            <button
                                className="button button--half-width button-red"
                                onClick={() => {this.declineRequest(req.id)}}
                            >
                                <IoMdClose/>
                            </button>
                        </div>
                    </CardEditor>
                </div>
            );
        });
    }

    render() {
        return (
            <div>
                <PageHeader 
                  title={"Admin Panel"} 
                />
                <div className="content-container">
                    {this.renderCards()}
                </div>    
            </div>
        )
    }
}

const mapDispatchToProps = (dispatch: AnyThunkDispatch<RootState>) => ({
    setRequests: (requests: Request[]) => dispatch(setRequests(requests))
  });

export default connect(undefined, mapDispatchToProps)(AdminPanel);