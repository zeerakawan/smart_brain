import React, { Component } from 'react'; 
import Particles from 'react-particles-js';
import Clarifai from 'clarifai';
import Navigation from './Components/Navigation/Navigation'; 
import FaceRecognition from './Components/FaceRecognition/FaceRecognition';
import Logo from './Components/Logo/Logo'; 
import Rank from './Components/Rank/Rank';
import ImageFormLink from './Components/Image-Link/ImageLinkForm';
import './App.css';

const app = new Clarifai.App({
  apiKey: 'fcafc5065ca84e818b6dc6bec35a64ed'
});

const particlesObject = {
  particles: {
    number: {
      value: 100,
      density: {
        enable: true,
        value_area: 700
      }
    }
  }
}

class App extends Component {
  constructor() {
    super();
    this.state = {
      input: "",
      imageURL: "",
      box: {},
    }
  } 

  calculateFaceLocation = (data) => {
    const face = data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById('inputimage');
    const width = Number(image.width);
    const height = Number(image.height);
    return {
      leftCol: face.left_col * width,
      topRow: face.top_row * height,
      rightCol: width - (face.right_col * width),
      bottomRow: height - (face.bottom_row * height)
    }
  }

  displayFaceBox = (box) => {
    console.log(box);
    this.setState({box: box});
  }

  onInputChange = (event) => {
    this.setState({ input: event.target.value });
  }

  onButtonSubmit = () => {
    this.setState({imageURL: this.state.input});
    app.models.predict(Clarifai.FACE_DETECT_MODEL, this.state.input)
      .then(response => this.displayFaceBox(this.calculateFaceLocation(response)))
    .catch(err => console.log(err));
  }

  render () {
    return (
      <div className="App">
        <Particles className='particles' params={particlesObject}/>
        <Navigation />
        <Logo />
        <Rank />
        <ImageFormLink onInputChange={this.onInputChange} onButtonSubmit={this.onButtonSubmit}/>
        <FaceRecognition  box={this.state.box} imageURL = {this.state.imageURL}/>
      </div>
    );
  }
}
export default App;
