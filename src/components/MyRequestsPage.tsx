import React from 'react';
import { connect } from 'react-redux';
import PageHeader from './PageHeader';
import { ApplicationState, Request } from '../store/index';
import { AnyThunkDispatch } from '../types/index';
import { startFirstFetch } from '../actions/requestActions';
import { AnyAction } from 'redux';
import { ThunkAction } from 'redux-thunk';
import CardEditor from './CardEditor';
import {getRarityStringFromInt} from './Card';

interface Props {
    requests: Request[];
    firstFetch: boolean;
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
                <CardEditor 
                    imageUrl={req.imageUrl}
                    name={req.name}
                    rarity={getRarityStringFromInt(req.rarity)}
                    id={req.id}
                />
            );
        });
    }
    
    render () {
        return (
            <div>
                <PageHeader 
                  title={"Your Requests"} 
                  subtitle={"Here you can view and edit all your requests"} 
                />
                {this.renderCards()}
            </div>
        );
    }
}

const mapStateToProps = (state: ApplicationState) => ({
    requests: state.requests.requests,
    firstFetch: state.requests.firstFetch
});

const mapDispatchToProps = (dispatch: AnyThunkDispatch<RootState>) => ({
    startFirstFetch: () => dispatch(startFirstFetch())
});

export default connect(mapStateToProps, mapDispatchToProps)(MyRequestsPage);