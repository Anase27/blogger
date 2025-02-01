import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { BACKEND_URL } from "./config";
import axios from "axios";
import { generateHTML } from "@tiptap/react";
import StarterKit from '@tiptap/starter-kit';
import Image from "@tiptap/extension-image";
import Underline from "@tiptap/extension-underline";

const BlogById = ()=>{
    const {id} = useParams();
    const [blog,setBlog] = useState<string>();
    useEffect(()=>{
        const fetchBlog = async ()=>{
            const res = await axios.get(`http://127.0.0.1:8787/api/v1/blog/${id}`);
            setBlog(generateHTML(JSON.parse(res.data.content),[
                StarterKit,
                Image,
                Underline
            ]));
        }
        fetchBlog();
        // setBlog(()=>temp.content);
    },[])


    return(
        <>
            <div>
                {generateHTML(JSON.parse(blog),[
                StarterKit,
                Image,
                Underline
            ])}
            </div>
        </>
    )
}

export default BlogById;