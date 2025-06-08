import { useEffect, useState } from "react";
import { BACKEND_URL } from "./config";
import axios from "axios";
import Nav from "@/components/Nav";


type blogContent = {
    id: string,
    title: string,
    content: string,
    published: boolean,
    authorId: string
};
const BlogList = ()=>{

    const [blogs,setBlogs] = useState<blogContent[]>();

    useEffect(()=>{
        const getBlogs = async ()=>{
            // const res = await axios.get(`http://127.0.0.1:8787/api/v1/blog/bulk`);
            const res = await axios.get(`${BACKEND_URL}/api/v1/blog/bulk`);
            setBlogs(res.data);
        }
        getBlogs();

    },[]);

    if(!blogs) return <div>Loading...</div>
    return(
        <>
            <div>
                <ul>
                    {blogs.map((blog)=>{
                        return(
                            <li key={blog.id}>
                                <a href={`/${blog.id}`}>
                                    <div>
                                        <h2>{blog.title}</h2>
                                    </div>
                                </a>
                            </li>
                        )
                    })}
                </ul>
            </div>
            <div className=''>
                <Nav></Nav>
            </div>
        </>
    )
}

export default BlogList;