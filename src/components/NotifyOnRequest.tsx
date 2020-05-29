import React, {Component} from 'react'
import {ApplicationState} from '../store/index';
import {connect} from 'react-redux';
import {AnyThunkDispatch} from '../types/index';
import {startSetNotify} from '../actions/requestActions';

interface Props {
    notifyOnWaifuRequest: boolean;
    startSetNotify: (notify: boolean) => any;
}

interface State {
    notifyOnWaifuRequest: boolean;
}

type RootState = {};

class NotifyOnRequest extends Component<Props, State> {

    constructor(props: any) {
        super(props);

        this.state = {
            notifyOnWaifuRequest: props.notifyOnWaifuRequest
        }
    }

    componentDidUpdate(prevProps: Props) {
        if (this.props.notifyOnWaifuRequest != prevProps.notifyOnWaifuRequest) {
            this.setState(() => ({
                notifyOnWaifuRequest: this.props.notifyOnWaifuRequest
            }));
        }
    }

    onToggleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const notify: boolean = event.target.checked;
        this.props.startSetNotify(notify)
            .then((resp: any) => {
                this.setState(() => ({
                    notifyOnWaifuRequest: notify
                }));
            });
    }

    render() {
        return (
            <div className="switch--container">
                <p>Get notified when a request gets processed</p>
                <label
                    htmlFor="notifySwitch"
                    className={"switch " + (this.props.notifyOnWaifuRequest ? "switch__on" : "")}
                >
                    <input
                        type="checkbox"
                        id="notifySwitch"
                        checked={this.state.notifyOnWaifuRequest}
                        onChange={this.onToggleChange}
                    />
                    <div></div>
                </label>
            </div>
        );
    }
}

const mapStateToProps = ({requests}: ApplicationState) => ({
    notifyOnWaifuRequest: requests.notifyOnWaifuRequest
});

const mapDispatchToProps = (dispatch: AnyThunkDispatch<RootState>) => ({
    startSetNotify: (notify: boolean) => dispatch(startSetNotify(notify))
});

export default connect(mapStateToProps, mapDispatchToProps)(NotifyOnRequest);
