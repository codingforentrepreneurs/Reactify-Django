import React, { Component } from 'react';
import 'whatwg-fetch'
import cookie from 'react-cookies'

import PostInline from './PostInline'

class Posts extends Component {
  loadPosts(){
      const endpoint = '/api/posts/' 
      let lookupOptions = {
          method: "GET",
          headers: {
              'Content-Type': 'application/json'
          }
      }

      fetch(endpoint, lookupOptions)
      .then(function(response){
          return response.json()
      }).then(function(responseData){
          console.log(responseData)
      }).catch(function(error){
          console.log("error", error)
      })
  }

  createPost(){
      const endpoint = '/api/posts/' 
      const csrfToken = cookie.load('csrftoken')
      let data = {
            "slug": "",
            "title": "",
            "content": "",
            "draft": false,
            "publish": null
        }
      if (csrfToken !== undefined) {
          let lookupOptions = {
              method: "POST",
              headers: {
                  'Content-Type': 'application/json',
                  'X-CSRFToken': csrfToken
              },
              body: JSON.stringify(data),
              credentials: 'include'
          }

          fetch(endpoint, lookupOptions)
          .then(function(response){
              return response.json()
          }).then(function(responseData){
              console.log(responseData)
          }).catch(function(error){
              console.log("error", error)
          })
      } 
      
  }

  componentDidMount(){
      this.loadPosts()
  }
  render() {
    return (
      <div>
          <h1>Hello World</h1>
          <PostInline title='Test Title' />
      </div>
    );
  }
}

export default Posts;
