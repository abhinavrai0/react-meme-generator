import React from 'react';
import Header from './Header'

class MemeGenerator extends React.Component {
    
    constructor() {
        super();
        this.state = {
            topText: "",
            bottomText: "",
            imageUrl: "http://i.imgflip.com/1bij.jpg",
            isLoading: false,
            allMemeImages: [],
        };
    }

    componentDidMount() {
        this.setState((previousState) => {
            return ({
                ...previousState,
                isLoading: true,
            });
        });
        fetch("https://api.imgflip.com/get_memes")
        .then((response) => response.json())
        .then((response) => {
            this.setState((previousState) => {
                return ({
                    ...previousState,
                    isLoading: false,
                    allMemeImages: response.data.memes,
                });
            });
        });
    }

    handleGenerateMemeClick(event) {
        event.preventDefault();
        const randomImageIndex = Math.floor(Math.random() * (this.state.allMemeImages.length));
        const randomUrl = this.state.allMemeImages[randomImageIndex].url;
        this.setState((previousState) => {
            return {
                ...previousState,
                imageUrl: randomUrl,
            };
        });
    }

    handleInputChange(event) {
        let { name, value } = event.target;
        this.setState((previousState) => {
            return {
                ...previousState,
                [name]: value,
            };

        });
    };

    render() {
        return (
            <div className="meme-generator">
                { this.state.isLoading && <h1>Loading...</h1>}
                <form>
                    <input
                        type="text"
                        name="topText"
                        value={this.state.topText}
                        onChange={(event) => this.handleInputChange(event)}
                    ></input>
                    <input
                        type="text"
                        name="bottomText"
                        value={this.state.bottomText}
                        onChange={(event) => this.handleInputChange(event)}
                    ></input>
                    <button
                        className="generate-button"
                        onClick={(event) => this.handleGenerateMemeClick(event)}
                        >
                        Generate
                    </button>
                </form>
                <img src={this.state.imageUrl} alt="Meme Trolling"></img>
                <h1>{this.state.topText}</h1>
                <h1>{this.state.bottomText}</h1>
                
            </div>
        );
    }
    
}

export default MemeGenerator;
