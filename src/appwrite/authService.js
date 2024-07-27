import { Client, Account,ID } from "appwrite";
import conf from "../conf/conf"

export class AuthService{

    client = new Client()
    account;

    constructor(){

        this.client
            .setEndpoint(conf.appwriteUrl) // Your API Endpoint
            .setProject(conf.appwriteProjectId); 

            this.account = new Account(this.client);
        
    }

    async createAccount({email,password,name}){

        try {
            
            const userAccount = await this.account.create(ID.unique(),email,password,name) //inappwrite (createSeesions)
            if(userAccount){
                // login fx call (signup successfully user no need to login )
                return this.login({email,password})
            }
            else
            return userAccount

        } catch (error) {
            console.log("error in authentication :: create Account",error)
        }
    }

    async login({email,password}){

        try {
           return await this.account.createEmailPasswordSession(email,password)
        } catch (error) {
            console.log("error in authentication :: login Account",error)
        }
    }

    // chech user in Home page or not
    // async getCurrentUser(){

    //     try {
    //       return await this.account.get();

    //     //    if(userexist){
    //     //     return userexist
    //     //    }
    //     //    else{
    //     //     return null
    //     //    }

    //     } catch (error) {
    //         console.log("error in authentication :: current user Account",error)
    //     }
    //     return null
    // }
    async logout({email,password}){

            try {
               return await this.account.deleteSessions()
            } catch (error) {
                console.log("error in authentication :: Logout Account error",error)
            }
    }
    


}


const authService = new AuthService()
export default authService;