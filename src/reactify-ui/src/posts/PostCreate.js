import React, {Component} from 'react'


class PostCreate extends Component {
    render(){
        return (
            <form>
                <div className='form-group'>
                    <label for='title'>Post title</label>
                    <input type='text' id='title' name='title' className='form-control' placeholder='Blog post title' />
                </div>
                 <div className='form-group'>
                    <label for='content'>Content</label>
                    <textarea id='content' name='content' className='form-control' placeholder='Post content' />
                   
                </div>
                <div className='form-group'>
                    <label for='draft'>
                    <input type='checkbox' id='draft' name='draft' className='mr-2' />
                     Draft </label>
                </div>
                <div className='form-group'>
                    <label for='publish'>Publish Date</label>
                    <input type='date' id='publish' name='publish' className='form-control' />
                </div>
                <button className='btn btn-primary'>Save</button>
            </form>
        )
    }

}

export default PostCreate