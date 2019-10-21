import React, { Component } from 'react';

import axios from 'axios';
import FormData from 'form-data';

import './Admin.css';
import { Dropdown } from 'semantic-ui-react'

import motorIcon from './images/motorIcon.png'
import modaIcon from './images/modaIcon.png'
import sportIcon from './images/sportIcon.png'

import Map from './Map'








class UploadProduct extends Component {
  constructor(props){
    super(props);
    this.state={
    image:"",
    name:"",
    price:0,
    user: props.appContext.state.userLoggedin,
    description:"",
    category:"",
    currency:"",
    imagePreviewUrl: null
    }
  }

  submitHandle = async event =>{
    let formData = new FormData();
    const config = {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    }
    event.preventDefault();  
    try{
        var payload=this.state;
        formData.set('image',payload.image);
        formData.set('name',payload.name);
        formData.set('price',payload.price);
        formData.set('user',payload.user);
        formData.set('description',payload.description);
        formData.set('category',payload.category);
        formData.set('currency',payload.currency);
        let response = await axios.post('http://localhost:3001/products/add', formData, config)
        alert("Product submitted");
        
        if(response.data.code == 200){
          //  let fields = {};
          //  fields["emailid"] = "";
          //  fields["password"] = "";
          //  fields["confirmPassword"] = "";
          //  this.setState({fields:fields});
           console.log("registration successfull");
          //  var loginscreen=[];
          //  loginscreen.push(<Login parentContext={this}/>);
          //  var loginmessage = "Not Registered yet.Go to registration";
          //  this.props.parentContext.setState({loginscreen:loginscreen,
          //  loginmessage:loginmessage,
          //  buttonLabel:"Register",
          //  isLogin:true
          //  });
          }
      }
      catch(error){
        console.log(error)
      }
  }

  handleChange = event =>{
    this.setState({[event.target.name] : event.target.value})
  }

  onChangeImage = e => {
    this.setState({image:e.target.files[0]});
    var reader = new FileReader();
    let file = e.target.files[0];

    reader.onloadend = () => {
      this.setState({
        image: file,
        imagePreviewUrl: reader.result
      });
    }
    try{
    reader.readAsDataURL(file)
    }catch(error){
      console.log(error);
    }

}

  removeImage = () =>{
    this.setState({ image: null, imagePreviewUrl: null })
    }

  handleChangeCategory = (event, data) =>{
    this.setState({category:data.value})
  }

  handleChangeCurrency = (event, data) =>{
    this.setState({currency:data.value})
  }




  render() {

    // const options = [
    //   { value: 'chocolate', label: 'Chocolate' },
    //   { value: 'strawberry', label: 'Strawberry' },
    //   { value: 'vanilla', label: 'Vanilla' },
    // ];

    let {imagePreviewUrl} = this.state;
    let $imagePreview = null;
    if (imagePreviewUrl) {
      $imagePreview = (<img src={imagePreviewUrl} />);
    }

    const friendOptions = [
      {
        key: 'Motos',
        text: 'Motos',
        value: 'Motos',
        image: { avatar: true, src: motorIcon },
      },
      {
        key: 'Moda',
        text: 'Moda',
        value: 'Moda',
        image: { avatar: true, src: modaIcon },
      },
      {
        key: 'Deportes',
        text: 'Deportes',
        value: 'Deportes',
        image: { avatar: true, src: sportIcon },
      },
    ];

    const currencyOptions = [
      {
        key: '€',
        text: '€',
        value: '€',      
      },
      {
        key: '$',
        text: '$',
        value: '$',       
      },
      {
        key: '£',
        text: '£',
        value: '£',     
      },
    ];
  

    return (
      
       
        <form onSubmit={this.submitHandle}>
        <div className="box">
          <h2>Información de tu producto</h2>
          
          <div className="row">
            <div className="col-sm-12">
              <div className="form-group">
                <label>Que estás vendiendo?</label>
                <span className="chars-counter">0/50</span>
                <input className="form-control" onChange={this.handleChange} name="name" value={this.state.name} maxLength="50" placeholder="En pocas palabras..." type="text"></input>

              </div>

            </div>

          </div>
          <div className="row">
            <div className="col-sm-4">
              <div className="form-group">
              <label>Precio</label>
              <input className="form-control" onChange={this.handleChange} name="price" value={this.state.price} max="999999999" min="0" placeholder="(No te pases)" type="number"></input>

              </div>

            </div>
            <div className="col-sm-2">
              <div className="form-group">
                <label>Moneda</label>
                <Dropdown
                placeholder='?'
                fluid
                search
                selection
                options={currencyOptions}
                onChange={this.handleChangeCurrency}
                 />
                {/* <select name="select">
                  <option value="value1">€</option> 
                 <option value="value2" selected>$</option>
                 <option value="value3">£</option>
                </select> */}
      
              </div>

            </div>
            <div className="col-sm-6">
              <div className="form-group">
                <label>Categoria</label>
                <Dropdown
                placeholder='Categoria'
                fluid
                search
                selection
                options={friendOptions}
                onChange={this.handleChangeCategory}
                 />
         
              </div>

            </div>



          </div>
           
          <div className="row">
            <div className="col-md-12">
              <div className="form-group last">
                <label>Descripcion</label>
                <span className="chars-counter">0/650</span>
                <textarea _ngcontent-c11="" className="form-control" onChange={this.handleChange} name="description" value={this.state.description} maxLength="650" placeholder="Añade información relevante como estado, modelo, color..."></textarea>

              </div>

            </div>

          </div>

        </div>
        <div className="box product-photos">
          <h2>FOTOS</h2>
          <div className="photo-number-10">
            <div className="drag-area">
              <label className="product-photo placeholder"  draggable="false">
              {$imagePreview}
                
               <a className="mat-icon" onClick={this.removeImage}>
                 <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 12 12" fit="" preserveAspectRatio="xMidYMid meet" focusable="false"><path fill="#253238" fillRule="evenodd" d="M7.414 6l4.293-4.293A.999.999 0 1 0 10.293.293L6 4.586 1.707.293A.999.999 0 1 0 .293 1.707L4.586 6 .293 10.293a.999.999 0 1 0 1.414 1.414L6 7.414l4.293 4.293a.997.997 0 0 0 1.414 0 .999.999 0 0 0 0-1.414L7.414 6z"></path></svg>
               </a>
                {this.state.imagePreviewUrl==null? <input type="file" name="image"  onChangeCapture={this.onChangeImage} ></input> : null }

              </label>
            

            </div>


          </div>

        </div>
        <div className="box">
         <h2>TUS PRODUCTOS SE VERÁN EN:</h2>
         <div className="row">
           <div className="col-sm-12">
             <div className="form-group"></div>
             <Map
              google={this.props.google}
              center={{lat: 18.5204, lng: 73.8567}}
              height='300px'
              zoom={15}
              />

           </div>
         </div>

       </div>
       
         <button className="btn-primary" type="submit"> Subir Producto

         </button>
          </form>
      
    );
  }
}
const style = {
  margin: 15,
};
export default UploadProduct;
