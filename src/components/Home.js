'use strict';

import React, { Component } from 'react';
import { Link } from 'react-router';
import $ from 'jquery';
import {Helmet} from "react-helmet";

export default class Home extends Component {
    constructor(){
        super();
        this.state = {
                        lstData: [],
                     }
    }

    componentDidMount(){
        $.ajax({
              method  : 'GET',
              url     : "http://50.116.5.169/api/v1/allarticles/?l=en",
              
              success: function(res) {
                  this.setState({lstData:res})
              }.bind(this),

              error: function(e) {
                  console.log("error",e.statusText);
              }
          })
    }

    render()
    {
        var lstData = this.state.lstData.map(function(i,index){
	    	var title = i.title ;
	    	var id    = i.id ;

	    	return(
          <div>
            <Helmet>
              <title>{i.title}</title>
              <meta name="description" content={i.title} />
            </Helmet>

	    			<li><Link to={"/detail/"+id} key={id} id={id}>{title}</Link></li>
          </div>
	    	);
    	},this)

        return (
        	<div>
        		<h3>News list</h3>
        		{lstData}
          </div>
        	);
    }
}

