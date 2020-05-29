import React from 'react';
import {connect} from 'react-redux';
import axios from 'axios';
import swal from 'sweetalert2';
import PageHeader from './PageHeader';
import WaifuRequestForm, {WaifuRequest} from './WaifuRequestForm';
import {ApplicationState, Request} from '../store';
import {AnyThunkDispatch} from '../types/index';
import {editRequest, EditRequest} from '../actions/requestActions';

interface Props {
    match: any;
    request?: Request;
    editRequest: (request: Request) => EditRequest;
}

type RootState = {};

class EditWaifuRequest extends React.Component<Props> {

    onSubmit = (request: WaifuRequest, clearInput: Function) => {
        if (!this.props.request) return;
        const req: any = {...request, requestId: this.props.request.id};
        axios.post(`/api/editWaifu/${this.props.request.id}`, req)
            .then(resp => {
                // request failed
                if (resp.status != 200) {
                    swal.fire({
                        type: 'error',
                        title: 'Oops...',
                        text: 'Something broke...'
                    });
                    return;
                }

                swal.fire(
                    'Success',
                    "Successfully edited the request",
                    'success'
                );
                // dispatch edit event
                this.props.editRequest(req);
                // we dont want to clear the input.

            }).catch(e => {
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
                    title={"Edit Your Waifu Request"}
                />
                <div className="content-container">
                    <WaifuRequestForm
                        onSubmit={this.onSubmit}
                        request={this.props.request}
                    />
                </div>
            </div>)
    }
}

const mapStateToProps = (state: ApplicationState, props: Props) => ({
    request: state.requests.requests.find((req) => (req.id === props.match.params.id))
});

const mapDispatchToProps = (dispatch: AnyThunkDispatch<RootState>) => ({
    editRequest: (request: Request) => dispatch(editRequest(request))
});

export default connect(mapStateToProps, mapDispatchToProps)(EditWaifuRequest);
