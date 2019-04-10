import React from 'react';
import Card from './Card';

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
        // first let's check the image
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
        // first trim the name
        req.name = req.name.trim();
        // set the new state to the trimmed one
        this.setState((state)=> ({
            request: {
                ...state.request,
                name: req.name
            }
        }))
        // now check name
        if (req.name.length < 3) {
            this.setState(() => ({
                error: 'Name should be no less than 3 characters!'
            }));
            return;
        }

        this.props.onSubmit(this.state.request, this.clearInput);
    };

    clearInput = () => {
        this.setState(() => ({
            request: {
                name: '',
                imageUrl: '',
                rarity: WaifuRarity.Common
            }
        }));
    }

    onNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const name = e.target.value;
        if (name.length > 50) return;
        this.setState((state)=> ({ request: {...state.request, name } }));
    }

    onUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const imageUrl = e.target.value.trim();
        if (imageUrl.length > 300) return;
        this.setState((state)=> ({ request: {...state.request, imageUrl } }));
    }
    
    onRarityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const rarity = parseInt(e.target.value, 10);
        this.setState((state)=> ({ request: {...state.request, rarity } }));
    }

    getRarityString = (): string => {
        switch(this.state.request.rarity) {
            case WaifuRarity.Common: 
                return "Common";
            case WaifuRarity.Uncommon: 
                return "Uncommon";
            case WaifuRarity.Rare: 
                return "Rare";
            case WaifuRarity.Epic: 
                return "Epic";
            case WaifuRarity.UltimateWaifu: 
                return "Ultimate Waifu";
            case WaifuRarity.Special: 
                return "Special";
            default:
                return "Common";
        }
    };

    render() {
        return (
            <div className="split-between">
                <div className="split-between-70">
                <h2 className="image-preview--title">Enter Details</h2>
                    <form className="form" onSubmit={this.onSubmit}>
                        {this.state.error && <p className="form__error">{this.state.error}</p>}
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
                </div>
                <div className="split-between-30 center">
                    <h2 className="image-preview--title">Preview</h2>
                    <Card 
                        imageUrl={this.state.request.imageUrl}
                        name={this.state.request.name}
                        rarity={this.getRarityString()}
                        enableIdFooter={true}
                    />
                </div>
            </div>
        );
    }
}

export default WaifuRequestForm;