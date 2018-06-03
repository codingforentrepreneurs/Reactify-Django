import React, { Component } from 'react';
import 'whatwg-fetch'
import cookie from 'react-cookies'

import PostInline from './PostInline'

class Posts extends Component {

    constructor(props){
        super(props)
        this.togglePostListClass = this.togglePostListClass.bind(this)

    }
    state = {
        posts: [],
        postsListClass: "card",
    }
  loadPosts(){
      const endpoint = '/api/posts/' 
      let thisComp = this
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
           thisComp.setState({
                  posts: responseData
              })
      }).catch(function(error){
          console.log("error", error)
      })
  }

  createPost(){
      const endpoint = '/api/posts/' 
      const csrfToken = cookie.load('csrftoken')
      let thisComp = this
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

  togglePostListClass(event){
      event.preventDefault()
      let currentListClass = this.state.postsListClass
      if (currentListClass === ""){
          this.setState({
              postsListClass: "card",
          })
      } else {
          this.setState({
              postsListClass: "",
          })
      }
      
  }

  componentDidMount(){
      this.setState({
          posts: [],
          postsListClass: "card",
      })
      this.loadPosts()
  }
  render() {
      const {posts} = this.state
      const {postsListClass} = this.state
    return (
      <div>
          <h1>Hello World</h1>
          <button onClick={this.togglePostListClass}>Toggle Class</button>
          {posts.length > 0 ? posts.map((postItem, index)=>{
              return (
                      <PostInline post={postItem} elClass={postsListClass} />
              )
          }) : <p>No Posts Found</p>}
          
      </div>
    );
  }
}

export default Posts;
