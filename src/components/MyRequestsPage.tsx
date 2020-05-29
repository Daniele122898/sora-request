import React from 'react';
import { connect } from 'react-redux';
import JavascriptTimeAgo from 'javascript-time-ago';
import swal from 'sweetalert2';
import axios from 'axios';
import en from 'javascript-time-ago/locale/en';
import PageHeader from './PageHeader';
import { ApplicationState, Request, Log } from '../store/index';
import { AnyThunkDispatch } from '../types/index';
import {removeRequest, RemoveRequest, startFirstFetch} from '../actions/requestActions';
import { AnyAction } from 'redux';
import { ThunkAction } from 'redux-thunk';
import CardEditor from './CardEditor';
import { getRarityStringFromInt } from './Card';
import RequestLogs from './RequestLogs';
import NotifyOnRequest from './NotifyOnRequest';
import {IoMdTrash} from "react-icons/io";

JavascriptTimeAgo.locale(en);

interface Props {
    requests: Request[];
    firstFetch: boolean;
    logs: Log[];
    startFirstFetch: () => ThunkAction<any, ApplicationState, undefined, AnyAction>;
    removeRequest: (requestId: string) => RemoveRequest;
}

type RootState = {};

class MyRequestsPage extends React.Component<Props> {

    componentWillMount = () => {
        this.checkToFetchRequests();
    }

    checkToFetchRequests = () => {
        if (!this.props.firstFetch) {
            // fetch all the requests
            this.props.startFirstFetch();
        } // else do nothing
    }

    removeRequest = (requestId: string) => {
        axios.delete(`/api/removeRequest/${requestId}`)
            .then(resp => {
                swal.fire(
                    'Success',
                    "Successfully removed waifu request!",
                    'success'
                );
                this.props.removeRequest(requestId);
            })
            .catch(err => {
                console.error(err);

                swal.fire({
                    type: 'error',
                    title: 'Oops...',
                    text: err.response.data.error,
                });
            });
    }

    renderCards = () => {
        return this.props.requests.map((req) => {
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
                                className="button button--full-width button-red"
                                onClick={() => {this.removeRequest(req.id)}}
                            >
                                <IoMdTrash/>
                            </button>
                        </div>
                    </CardEditor>
                </div>
            );
        });
    }

    render () {
        return (
            <div>
                <PageHeader 
                  title={"Your Requests"} 
                  subtitle={"View and edit all your requests"} 
                />
                <div className="content-container">
                    <NotifyOnRequest />
                    {this.renderCards()}
                    <RequestLogs logs={this.props.logs} />
                </div>    
            </div>
        );
    }
}

const mapStateToProps = (state: ApplicationState) => ({
    requests: state.requests.requests,
    firstFetch: state.requests.firstFetch,
    logs: state.requests.logs
});

const mapDispatchToProps = (dispatch: AnyThunkDispatch<RootState>) => ({
    startFirstFetch: () => dispatch(startFirstFetch()),
    removeRequest: (requestId: string) => dispatch(removeRequest(requestId))
});

export default connect(mapStateToProps, mapDispatchToProps)(MyRequestsPage);
