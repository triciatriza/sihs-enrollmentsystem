import React from 'react';
import { Link } from 'react-router-dom';
import './NotFoundPage.css';

const NotFoundPage = ()=>{
    return (
        <div class="container">
        <h1 class="first-four">4</h1>
        <div class="cog-wheel1">
            <div class="cog1">
              <div class="top"></div>
              <div class="down"></div>
              <div class="left-top"></div>
              <div class="left-down"></div>
              <div class="right-top"></div>
              <div class="right-down"></div>
              <div class="left"></div>
              <div class="right"></div>
          </div>
        </div>
        
        <div class="cog-wheel2"> 
          <div class="cog2">
              <div class="csstop"></div>
              <div class="cssdown"></div>
              <div class="cssleft-top"></div>
              <div class="cssleft-down"></div>
              <div class="cssright-top"></div>
              <div class="cssright-down"></div>
              <div class="cssleft"></div>
              <div class="cssright"></div>
          </div>
        </div>
       <h1 class="second-four">4</h1>
        <p class="wrong-para">Uh Oh! Page not found!</p>
      </div>
  
    );
}
export default NotFoundPage;