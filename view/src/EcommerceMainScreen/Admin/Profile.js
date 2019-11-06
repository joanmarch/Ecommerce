import React from "react";
import './Admin.css';

class Profile extends React.Component {
  render() {
    return (
          <div className="MainFlexContainer">
            <div className="Box1">
              <h5>Tu perfil</h5>
              <div className="Box1_1">
                <p>Aqui podras ver y editar los datos de tu perfil</p>
                <p style = {{margin : "0px 20px"}}>|</p>
                <a href="">Ver mi perfil publico</a>
                <button className="CloseSessionButton">Cerrar sesion</button>
              </div>
              
              <div className="Box1_2">
                <p style = {{margin : "0px 20px"}}>PERFIL</p>
                <p>CUENTA</p>
                <div className="Box1_3">
                <i class="fa fa-star-o" aria-hidden="true"></i>
                <i class="fa fa-star-o" aria-hidden="true"></i>
                <i class="fa fa-star-o" aria-hidden="true"></i>
                <i class="fa fa-star-o" aria-hidden="true"></i>
                <i class="fa fa-star-o" aria-hidden="true"></i>
                <p>(0 Opinions)</p>
              </div>
              </div>    
            </div>
            <div className="Box2">
              
            </div>
            <div className="Box3">
              <h6>Información publica</h6>
              <div className="Box3_1">
                <p>Nombre:</p>
                <input placeholder="Entra aqui tu nombre" name="name" type="text" maxLength="50"></input>
              </div>
              <div className="Box3_2">
                <p>Apellidos:</p>
                <input placeholder="Entra aqui tu apellido" name="apellido" type="text" maxLength="50"></input>
              </div>
              <div className="Box3_3">
                <p>Ubicacion de tus productos:</p>
                <input placeholder="Indicanos tu ubicacion" name="ubicacion" type="text"></input>
              </div>


            </div>


          
          </div>
    );
  }
}

export default Profile;
