import React from 'react';
import { connect } from 'react-redux';
import JavascriptTimeAgo from 'javascript-time-ago';
import en from 'javascript-time-ago/locale/en';
import PageHeader from './PageHeader';
import { ApplicationState, Request, Log } from '../store/index';
import { AnyThunkDispatch } from '../types/index';
import { startFirstFetch } from '../actions/requestActions';
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
                                onClick={() => {}}
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
    startFirstFetch: () => dispatch(startFirstFetch())
});

export default connect(mapStateToProps, mapDispatchToProps)(MyRequestsPage);
