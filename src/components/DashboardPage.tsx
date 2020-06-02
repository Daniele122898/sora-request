import React from 'react';
import {connect} from 'react-redux';
import axios from 'axios';
import swal from 'sweetalert2';
import WaifuRequestForm, {WaifuRequest} from './WaifuRequestForm';
import PageHeader from './PageHeader';
import {AnyThunkDispatch} from '../types/index';
import {addRequest, AddRequest, getWaifuRarities} from '../actions/requestActions';
import {ApplicationState, Request, WaifuRarity} from '../store/index';

type RootState = {};

interface Props {
    addRequest: (request: Request) => AddRequest;
    rarities: WaifuRarity[];
    startGetRarities(): any;
}

class DashboardPage extends React.Component<Props> {

    onSubmit = (request: WaifuRequest, clearInput: Function) => {
        // send the request to our backend
        axios.post('/api/requestWaifu', request)
            .then(resp => {
                swal.fire(
                    'Success',
                    "Successfully requested a waifu!",
                    'success'
                );
                // dispatch event
                this.props.addRequest({
                    ...request,
                    id: resp.data.id
                });
                // clear input
                clearInput();

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

    render() {
        return (
            <div>
                <PageHeader
                    title={"Request a Waifu"}
                    subtitle={"You can request 3 waifus per day."}
                />
                <div className="content-container">
                    <WaifuRequestForm onSubmit={this.onSubmit}/>
                </div>
            </div>

        );
    }
}

const mapStateToProps = ({requests}: ApplicationState) => ({
    rarities: requests.rarities,
});

const mapDispatchToProps = (dispatch: AnyThunkDispatch<RootState>) => ({
    addRequest: (request: Request) => dispatch(addRequest(request)),
    startGetRarities: () => dispatch(getWaifuRarities()),
});

export default connect(mapStateToProps, mapDispatchToProps)(DashboardPage);
