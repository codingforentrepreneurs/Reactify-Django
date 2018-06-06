import React, {Component} from 'react'
import 'whatwg-fetch'
import cookie from 'react-cookies'
import { Link } from 'react-router-dom'

import PostForm from './PostForm'

class PostDetail extends Component {
    constructor(props){
        super(props)
        this.handlePostItemUpdated= this.handlePostItemUpdated.bind(this)
        this.state = {
             slug: null,
             post: null,
             doneLoading: false,
        }
    }

    handlePostItemUpdated(postItemData){
        this.setState({
            post: postItemData
        })
    }
    loadPost(slug){
      const endpoint = `/api/posts/${slug}/` 
      let thisComp = this
      let lookupOptions = {
          method: "GET",
          headers: {
              'Content-Type': 'application/json'
          }
      }

      const csrfToken = cookie.load('csrftoken')
      if (csrfToken !== undefined) {
          lookupOptions['credentials'] = 'include'
          lookupOptions['headers']['X-CSRFToken'] = csrfToken
       }

      fetch(endpoint, lookupOptions)
      .then(function(response){
          if (response.status == 404){
              console.log('Page not found')
          }
          return response.json()
      }).then(function(responseData){
          if (responseData.detail){
              thisComp.setState({
                  doneLoading: true,
                  post: null
              })
          } else {
           thisComp.setState({
                  doneLoading: true,
                  post: responseData
              })
          }
      }).catch(function(error){
          console.log("error", error)
      })
  }
    componentDidMount(){
        this.setState({
                slug: null,
                post: null
            })
        if (this.props.match){
            const {slug} = this.props.match.params
            this.setState({
                slug: slug,
                doneLoading: false
            })
            this.loadPost(slug)
        }
    }
    render(){
        const {doneLoading} = this.state
        const {post} = this.state
        return(
            <p>{(doneLoading === true) ? <div>
                {post === null ? "Not Found": 
                <div>
                <h1>{post.title}</h1>
                {post.slug}

                <p className='lead'>
                <Link maintainScrollPosition={false} to={{
                    pathname: `/posts`,
                    state: { fromDashboard: false }
                  }}>Posts</Link>

                  {post.owner === true ? <Link maintainScrollPosition={false} to={{
                    pathname: `/posts/create/`,
                    state: { fromDashboard: false }
                  }}>Create Post</Link> : "" }
               </p>

                  {post.owner === true ? <PostForm post={post} postItemUpdated={this.handlePostItemUpdated} /> : ""}
                </div>
               }
           </div> : "Loading..."}</p>
        )
    }
}

export default PostDetail