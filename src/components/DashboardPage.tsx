import React from 'react';
import {connect} from 'react-redux';
import axios from 'axios';
import swal from 'sweetalert2';
import WaifuRequestForm, {WaifuRequest} from './WaifuRequestForm';
import PageHeader from './PageHeader';
import {AnyThunkDispatch} from '../types/index';
import {addRequest, AddRequest, getWaifuRarities} from '../actions/requestActions';
import {ApplicationState, Request, WaifuRarity} from '../store/index';
import LoadingPage from "./LoadingPage";

type RootState = {};

interface Props {
    addRequest: (request: Request) => AddRequest;
    rarities: WaifuRarity[];
    startGetRarities(): any;
}

interface State {
    error: string;
}

class DashboardPage extends React.Component<Props, State> {

    constructor(props: any) {
        super(props);

        this.state = {
            error: '',
        }
    }

    componentWillMount() {
        // fetch
        this.props.startGetRarities().then((resp: any) => {
            if (resp.error != undefined) {
                // handle error
                this.setState(()=> ({
                    error: resp.error ? resp.error : ''
                }));
                return;
            }
        });
    }

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

    renderConditionally = () => {
        if (this.state.error)
            return (<p>Failed to fetch available Waifu Rarities :(</p>);
        else if (!this.props.rarities || this.props.rarities.length == 0)
            return (<LoadingPage/>);
        else
            return (<WaifuRequestForm onSubmit={this.onSubmit}/>);
    }

    render() {
        return (
            <div>
                <PageHeader
                    title={"Request a Waifu"}
                    subtitle={"You can request 3 waifus per day."}
                />
                <div className="content-container">
                    {this.renderConditionally()}
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
