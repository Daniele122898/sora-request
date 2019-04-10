import React from 'react';
import { connect } from 'react-redux';
import PageHeader from './PageHeader';
import { ApplicationState, Request } from '../store/index';
import { AnyThunkDispatch } from '../types/index';
import { startFirstFetch } from '../actions/requestActions';
import { AnyAction } from 'redux';
import { ThunkAction } from 'redux-thunk';

interface Props {
    requests: Request[];
    firstFetch: boolean;
    startFirstFetch: () => ThunkAction<any, ApplicationState, undefined, AnyAction>;
}

type RootState = {};

class MyRequestsPage extends React.Component<Props> {
    
    constructor(props: any){
        super(props);

    }

    componentWillMount = () => {
        this.checkToFetchRequests();
    }

    checkToFetchRequests = () => {
        if (!this.props.firstFetch) {
            // fetch all the requests
            this.props.startFirstFetch();
        } // else do nothing
    }
    
    render () {
        return (
            <div>
                <PageHeader 
                  title={"Your Requests"} 
                  subtitle={"Here you can view and edit all your requests"} 
                />
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