import React, { Component } from 'react';

class PostInline extends Component {
  render() {
      const {post} = this.props
    return (
      <div>
          {post !== undefined ? <div>
              <h1>{post.title}</h1>
              <p>{post.content}</p>
              </div>
              : ""}
      </div>
    );
  }
}

export default PostInline;
