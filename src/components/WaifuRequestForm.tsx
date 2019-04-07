import React from 'react';

interface Props {
    onSubmit: Function;
    request?: WaifuRequest;
}

interface State {
    request: WaifuRequest;
    error: string;
    buttonText: string;
}

export enum WaifuRarity {
    Common = 0,
    Uncommon = 1,
    Rare = 2,
    Epic = 3,
    UltimateWaifu = 99,
    Special = 98
}

export interface WaifuRequest {
    name: string;
    imageUrl: string;
    rarity: number;
}

class WaifuRequestForm extends React.Component<Props, State> {
    constructor(props: any) {
        super(props);
        //initialize state so we can edit the request later
        this.state = {
            request: {
                name: this.props.request ? this.props.request.name : '',
                imageUrl: this.props.request ? this.props.request.imageUrl : '',
                rarity: this.props.request ? this.props.request.rarity : WaifuRarity.Common,
            },
            error: '',
            buttonText: this.props.request ? 'Save Edit' : 'Submit Request'
        }
    }

    onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // check before submitting
        const req = this.state.request;
        if (!req.imageUrl.startsWith('http')) {
            this.setState(() => 
            ({ error: 'Image Url should be an URL to an image!' }));
            return;
        }
        if (!req.imageUrl.endsWith('.jpg') &&
            !req.imageUrl.endsWith('.png') &&
            !req.imageUrl.endsWith('.gif') &&
            !req.imageUrl.endsWith('.jpeg')) {
                this.setState(() => 
            ({ error: 'Image Url should be an URL to an image!' }));
            return;
        }

        this.props.onSubmit(this.state.request);
    };

    onNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const name = e.target.value;
        if (name.length > 50) return;
        this.setState((state)=> ({ request: {...state.request, name } }));
    }

    onUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const imageUrl = e.target.value;
        if (imageUrl.length > 200) return;
        this.setState((state)=> ({ request: {...state.request, imageUrl } }));
    }
    
    onRarityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const rarity = parseInt(e.target.value, 10);
        this.setState((state)=> ({ request: {...state.request, rarity } }));
    }

    render() {
        return (
            <div>
                <form className="form" onSubmit={this.onSubmit}>
                    <input 
                    className="text-input"
                    type="text"
                    placeholder="Waifu Name"
                    value={this.state.request.name}
                    onChange={this.onNameChange}
                    />
                    <input 
                    className="text-input"
                    type="text"
                    placeholder="Image URL (Gif if Ultimate Waifu)"
                    value={this.state.request.imageUrl}
                    onChange={this.onUrlChange}
                    />
                    <select
                        className="select"
                        value={this.state.request.rarity}
                        onChange={this.onRarityChange}
                    >
                        <option value={WaifuRarity.Common.toLocaleString()}>Common</option>
                        <option value={WaifuRarity.Uncommon.toLocaleString()}>Uncommon</option>
                        <option value={WaifuRarity.Rare.toLocaleString()}>Rare</option>
                        <option value={WaifuRarity.Epic.toLocaleString()}>Epic</option>
                        <option value={WaifuRarity.UltimateWaifu.toLocaleString()}>Ultimate Waifu</option>
                        <option value={WaifuRarity.Special.toLocaleString()}>Special</option>
                    </select>
                    <button className="button">{this.state.buttonText}</button>
                </form>
                { this.state.request.imageUrl && 
                    <div className="card">
                        <div className="crop pop">
                            <img src={this.state.request.imageUrl} alt="Waifu Image"/>
                        </div>
                        <div className="card-body card-body--title">
                            <h5 className="card-title">Zero Two</h5>
                        </div>
                        <ul className="list-group list-group-flush">
                            <li className="list-group-item">Ultimate Waifu</li>
                        </ul>
                        <div className="card-body card-body--id">
                            <p className="card-text"><span className="waifuId">ID: 1</span></p>
                        </div>
                    </div>
                }
            </div>
        );
    }
}

export default WaifuRequestForm;