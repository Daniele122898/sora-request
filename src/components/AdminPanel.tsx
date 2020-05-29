import React from 'react';
import { connect } from 'react-redux'
import swal from 'sweetalert2';
import axios from 'axios';
import { IoMdCheckmark, IoMdClose } from 'react-icons/io'
import { Request, ApplicationState } from '../store';
import CardEditor from './CardEditor';
import { getRarityStringFromInt } from './Card';
import PageHeader from './PageHeader';
import { AnyThunkDispatch } from '../types';
import { setRequests, SetRequests } from '../actions/requestActions';
import { isAdmin } from '../utils/utils';
import { History } from 'history';

type State = {
    requests: Request[]
}

type Props = {
    setRequests: (requests: Request[]) => SetRequests;
    isAdmin: boolean;
    history: History;
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
        // check if we're admin
        if (!this.props.isAdmin) {
            this.props.history.push('/dashboard');
        }

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

    makeApprovalRequest = (requestId: string ,accept: boolean) => {
        let p;
        if (accept) {
            p = axios.patch(`/api/request/${requestId}/approve`);
        } else {
            p = axios.patch(`/api/request/${requestId}/reject`);
        }

        p.then(resp => {
            swal.fire(
                'Success',
                `Successfully ${accept ? 'accepted' : 'declined'} request!`,
                'success'
            );
            // update state
            this.setState((state) => ({
                requests: state.requests.filter((req) => req.id !== requestId)
            }), () => {
                this.props.setRequests(this.state.requests);
            })

        }).catch(e => {
            console.error(e);
            swal.fire({
                type: 'error',
                title: 'Oops...',
                text: e.response.data.error
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

const mapStateToProps = (state: ApplicationState) => ({
    isAdmin: isAdmin(state.auth.user ? state.auth.user.id : '')
});

export default connect(mapStateToProps, mapDispatchToProps)(AdminPanel);
