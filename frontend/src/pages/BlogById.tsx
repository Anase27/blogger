import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { BACKEND_URL } from "./config";
import axios from "axios";
import { EditorContent, generateHTML, useEditor } from "@tiptap/react";
import StarterKit from '@tiptap/starter-kit';
import Image from "@tiptap/extension-image";
import Underline from "@tiptap/extension-underline";
import BlogContent from "./BlogContent";

const BlogById = ()=>{
    const {id} = useParams();
    const [blog,setBlog] = useState();
    useEffect(()=>{
        const fetchBlog = async ()=>{
            const res = await axios.get(`http://127.0.0.1:8787/api/v1/blog/${id}`);
            // console.log(res.data);
            // console.log(()=>generateHTML(res.data,[
            //         StarterKit,
            //         Image,
            //         Underline
            //     ]));
            setBlog(res.data);
        }
        fetchBlog();
    },[])
    
    // const editor = useEditor({
    //     shouldRerenderOnTransaction: false,
    //     editable: false,
    //     content: generateHTML(blog,[StarterKit,
    //         Image,
    //         Underline]),
    //         extensions: [StarterKit,
    //             Image,
    //             Underline],
    //         })
    //         console.log(editor);
            
    if(!blog) return<>Loading...</>
    return(
        <>
            <div>
                {/* <EditorContent editor={editor} /> */}
                <BlogContent content={blog}/>
            </div>
        </>
    )
}

export default BlogById;