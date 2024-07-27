import React,{useCallback,useEffect} from 'react'
import appwriteService from '../../appwrite/config'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import {Button ,Logo,Input, RTE } from "../index"
import { useForm } from 'react-hook-form'

export default function postForm({post}) {
  
    const { register, handleSubmit, watch, setValue, getValues, control} = useForm({
        defaultValues:{
            title:post?.title || "",
            content: post?.content || "",
            status: post?.status||"",
            slug: post?.slug|| "active"
        },
    });
    
  const navigate = useNavigate()
  //  * // error ca be occur in line .. auth = user.
  const userData = useSelector((state) => state.auth.userData); 
  
  
  // submit and update post button functionalty
  const submit = async(data) => {
    if(post){
       const file = data.image[0] ? await appwriteService.uploadFile(data.image[0]) :null
        if(file){
            await appwriteService.deleteFile(post.featuredImage)
        }
        const db = await appwriteService.updatePost(post.$id,{
            ...data,
            featuredImage: file? file.$id : undefined        
        })
       if(db){
        navigate(`post/${db.$id}`)
       } 
    }
    else{
        const file = data.image[0] ? await appwriteService.uploadFile(data.image[0]) : null
        
        //** sir work but i thought therir is no need to add waste of line
        //      if(file){
        // const imageId = file.$id
        // data.featuredImage = imageId
        //     }
        const db = await appwriteService.createPost({
           ...data,
           userId:userData.$id,
           featuredImage: file.$id
        })
        if(db){
            navigate(`post/${db.$id}`)
        }
    }

  }
  const slugTransform = useCallback((value) =>{
      if(value && typeof value === 'string')
        return value
    .trim()
    .toLowerCase()
    .replace(/\s+/g, '-')
    
    return ""
},[] )

// interview question subscribe or unsubscribe  is method in use effect to use memeory optimization in which we store any function into variable like subscribe and then in return we use call back and use unsubscrivbe() fx  to  variable so that our fx cannot stuck in loop
useEffect(()=>{

  const subscription = watch((value,{name})=>{
      if(name == 'title'){
          setValue('slug',slugTransform(value.title),{
              shouldValidate: true
          })
      }
  })
//    setValue('slug',slugTransform(watch('title')))

  return () => {
      subscription.unsubscribe()
  }
},[setValue,slugTransform,watch])

return (
    <form onSubmit={handleSubmit(submit)} className="flex flex-wrap">
        <div className="w-2/3 px-2">
            <Input
                label="Title :"
                placeholder="Title"
                className="mb-4"
                {...register("title", { required: true })}
            />
            <Input
                label="Slug :"
                placeholder="Slug"
                className="mb-4"
                {...register("slug", { required: true })}
                onInput={(e) => {
                    setValue("slug", slugTransform(e.currentTarget.value), { shouldValidate: true });
                }}
            />
            <RTE label="Content :" name="content" control={control} defaultValue={getValues("content")} />
        </div>
        <div className="w-1/3 px-2">
            <Input
                label="Featured Image :"
                type="file"
                className="mb-4"
                accept="image/png, image/jpg, image/jpeg, image/gif"
                {...register("image", { required: !post })}
            />
            {post && (
                <div className="w-full mb-4">
                    <img
                        src={appwriteService.getFilePreview(post.featuredImage)}
                        alt={post.title}
                        className="rounded-lg"
                    />
                </div>
            )}
            <Select
                options={["active", "inactive"]}
                label="Status"
                className="mb-4"
                {...register("status", { required: true })}
            />
            <Button type="submit" bgColor={post ? "bg-green-500" : undefined} className="w-full">
                {post ? "Update" : "Submit"}
            </Button>
        </div>
    </form>
);
}