import axios from "axios";

export const commonrequest = async(methods,url,body,header)=>{
    let config = {
        method:methods,
        url,
        headers:header ? 
        header:{
            "Content-Type":"application/json"
        },
        data:body
    }

    //axios instance
    return axios(config).then((data)=>{
        console.log("This  is deepanshu grg");
        return data
    }).catch((error)=>{
        console.log("This is joshua")
        return error
    })
}