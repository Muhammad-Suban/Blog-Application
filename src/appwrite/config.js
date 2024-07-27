import {Client,Databases,ID,Storage,Query } from "appwrite";
import conf from "../conf/conf"


export class Service  {

    client = new Client()
    databases;
    storage;

    constructor(){
        this.client
            .setEndpoint(conf.appwriteUrl) // Your API Endpoint
            .setProject(conf.appwriteProjectId); 

            this.databases = new Databases(this.client);
            this.storage = new Storage(this.client);

    }

    async createPost({title,slug,content,featuredImage,status,userId}){
        try {
            await this.databases.createDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status,
                    userId,
                }
            )

        } catch (error) {
            console.log("Error in appwrite Config :: create post error", error)
        }
    }

    async updatePost(slug,{title,content,featuredImage,status}){
        try {
            return await this.databases.updateDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status,
                }
            )
            
        } catch (error) {
            console.log("Error in appwrite Config :: update post error")
        }
    }

    async deletePost(slug){
        try {
            await this.databases.deleteDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug,
            )
            return true;

        } catch (error) {
            console.log("Error in appwrite Config :: Delete post error")
            return false;
        }
    }

    async getPost(slug){
        try {
            return await this.databases.getDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug,
            )
        } catch (error) {
            console.log("Error in appwrite Config :: get post error")
        }
    }

// choice hy parameter pr lagoi ya await ma
// [] all logic query implement in 
// we create index {status key}in appwrite so that why we apply query otherwise can't 
    // async getPosts(queries = [Query.equal("status" , "active")]){
    //     try {
    //         return await this.databases.listDocuments(
    //             conf.appwriteDatabaseId,
    //             conf.appwriteCollectionId,
    //             queries,
    //             // [
    //             //     Query.equal("status" , "active")
    //             // ]
    //         )
    //     } catch (error) {
    //         console.log("Error in appwrite Config :: get all posts error")
    //         return false;
    //     }
    // }
    async getPosts(queries = [Query.equal("status", "active")]){
        try {
            return await this.databases.listDocuments(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                queries,
                

            )
        } catch (error) {
            console.log("Appwrite serive :: getPosts :: error", error);
            return false
        }
    }

//FILE SERVICES

    // thisfx return fileid which we used below as fileId and above in featured Image
    async uploadFile(file){
        try {
            return await this.storage.createFile(
                conf.appwriteBucketId,
                ID.unique(),
                file,
            )
        } catch (error) {
            console.log("Error in appwrite Config :: upload file  error")
            return false;
        }
    }

    async deleteFile(fileId){
        try {
            await this.storage.deleteFile(
                conf.appwriteBucketId,
                fileId,
            )
            return true;

        } catch (error) {
            console.log("Error in appwrite Config :: delete file  error")
            return false;
        }
    }

     getFilePreview(fileId){
           return this.storage.getFilePreview(
                conf.appwriteBucketId,
                fileId,
    )}



}

const service = new Service()

export default  service