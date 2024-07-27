import React,{useState,useEffect} from 'react'
import {PostCard,Container} from '../components'
import appwriteService from "../appwrite/config"

function Allpost() {
  const [posts,setPosts] = useState([])
  
  useEffect(()=>{
    /// in appwrite fx ma qurrynuse ki thi is liya empty array diya
    appwriteService.getPosts([]).then((post)=>{
        if(post){
            setPosts(post.documents)
        }
    })


  },[])
  
  return (
    <div className='w-full py-8'>
        <Container>
            <div className="flex flex-wrap">
                {posts?.map((post)=>(
                    <div key={post.$id} className="p-2 w-1/4">
                        <PostCard {...post}/>
                    </div>
                ))}
            </div>
        </Container>
    </div>
  )
}

export default Allpost
