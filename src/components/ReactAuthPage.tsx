import React from 'react';
import { connect } from 'react-redux';
import { startLogin, login, User } from '../actions/auth';
import { AnyThunkDispatch } from '../types';
import { AxiosResponse } from 'axios';

interface Props {
    startLogin: any;
    login: any;
    history: any;
}

type RootState = {};

class ReactAuthPage extends React.Component<Props> {
    
    constructor(props: any) {
        super(props);
        props.startLogin().then((resp: AxiosResponse) => {
            if(resp.data.login) {
                const user: User = {
                    id: resp.data.user.id,
                    username: resp.data.user.username,
                    avatar: `https://cdn.discordapp.com/avatars/${resp.data.user.id}/${resp.data.user.avatar}.png`,
                    discriminator: resp.data.user.discriminator
                };
                props.dispatchlogin(user); 
                setTimeout(() => {
                    props.history.push('/dashboard');
                }, 500);
            } else {
                props.history.push('/');
            }
        }).catch((err: Error) => {
            console.log(err);
        });
    }

    render() {
        return (
            <div className="spinner">
                <span className="inner"></span>
                <span className="inner"></span>
                <span className="inner"></span>
            </div>
       );
    }
}

 const mapDispatchToProps = (dispatch: AnyThunkDispatch<RootState>) => ({
    startLogin: () => dispatch(startLogin()),
    dispatchlogin: (user: User) => dispatch(login(user))
 });

export default connect(undefined, mapDispatchToProps)(ReactAuthPage);