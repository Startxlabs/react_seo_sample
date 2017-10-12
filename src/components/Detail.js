'use strict';
import React, { Component } from 'react';
import { Link } from 'react-router';
import $ from 'jquery';
import {Helmet} from "react-helmet";

export default class NewsDetail extends Component {
    constructor(){
        super();
        this.state = {
                        lstData: [],
                     }
    }

    componentDidMount(){
        console.log(this.props.params.id)
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

    render(){
    	var lstData = this.state.lstData.map(function(i,index)
    	{
              if(i.id == this.props.params.id)
              {
                return(
                  <div>
                    <Helmet>
                      <title>{i.title}</title>
                      <meta name="description" content={i.title} />

                      <meta itemprop="name" content={i.title} />
                      <meta itemprop="description" content={i.title} />
                      <meta itemprop="image" content={i.thumbnail}/>

                      <meta name="twitter:card" content={i.title}/>
                      <meta name="twitter:site" content={i.title}/>
                      <meta name="twitter:title" content={i.title}/>
                      <meta name="twitter:description" content={i.title}/>
                      <meta name="twitter:creator" content={i.created_on}/>
                      <meta name="twitter:image:src" content={i.thumbnail}/>

                      <meta property="og:title" content={i.title} />
                      <meta property="og:type" content={i.title} />
                      <meta property="og:url" content={i.title} />
                      <meta property="og:image" content={i.thumbnail} />
                      <meta property="og:description" content={i.title} />
                      <meta property="og:site_name" content={i.title} />
                      <meta property="article:published_time" content={i.created_on} />
                      <meta property="article:modified_time" content={i.created_on} />
                      <meta property="article:section" content={i.title} />
                      <meta property="article:tag" content={i.title} />
                      <meta property="fb:admins" content={i.title} />
                      <meta property="fb:pages" content={i.title} />
                    </Helmet>

                    <h2>{i.title}</h2>
                    <p><img src={i.thumbnail} /></p>
                    <p>{i.created_on}</p>
                  </div>
                  );
              }
            },this)

        return (
        	<div>

        		<h1>This is Detail Page</h1>
        		{lstData}
        		<h3><Link to="/">Back Page</Link></h3>
            </div>
        	);
    }
}