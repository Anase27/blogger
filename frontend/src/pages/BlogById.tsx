import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { BACKEND_URL } from "./config";
import axios from "axios";
import BlogContent from "./BlogContent";
import Nav from "@/components/Nav";

const BlogById = ()=>{
    const {id} = useParams();
    const [blog,setBlog] = useState();

    useEffect(()=>{
        const fetchBlog = async ()=>{
            // REPLACE WITH YOUR BACKEND URL
            // const res = await axios.get(`http://127.0.0.1:8787/api/v1/blog/${id}`);
            const res = await axios.get(`${BACKEND_URL}/api/v1/blog/${id}`);
            setBlog(res.data);
        }
        fetchBlog();
    },[id]);
            
    if(!blog) return<>Loading...</>
    return(
        <>
            <div>
                <BlogContent content={blog}/> 
            </div>
            <div className=''>
                <Nav></Nav>
            </div>
        </>
    )
}

export default BlogById;