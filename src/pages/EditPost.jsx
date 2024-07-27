import React,{useState,useEffect} from 'react'
import {PostForm , Container} from '../components/index'
import appwriteService from "../appwrite/config"
import { useNavigate,useParams } from 'react-router-dom'

function EditPost() {
  
  const navigate = useNavigate()
  const slug = useParams()
  const [post, setPost] = useState(null)

  useEffect(()=>{
    if(post){
        appwriteService.getPost(slug).then((post)=>{
            setPost(post)
        })
    }else{
        navigate('/')
    }

  },[navigate,slug])
  
    return post? (
    <div className='py-8'>
        <Container>
                {<PostForm post ={post}/>}
        </Container>
    </div>
    ):null

}
export default EditPost
