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
	    			<p><Link to={"/detail/"+id}  id={id}>{title}</Link></p>
          </div>
	    	);
    	},this)

        return (
        	<div>
          <Helmet>
          <title>React SEO App - Example</title>
          <meta name="description" content= "This is a Test App for react SEO"/>
          <meta itemprop="name" content="React SEO App." />
          <meta itemprop="description" content="This is a Test App for react SEO" />
          </Helmet>
        		<h3>News list</h3>
        		{lstData}
          </div>
        	);
    }
}

