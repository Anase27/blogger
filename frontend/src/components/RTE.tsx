import { EditorContent, useEditor} from "@tiptap/react";

import MenuBar from "./MenuBar";
import axios from "axios";
import getExtension from "../utils/tipTapExtensions";
import { SelectionEditor } from "./SelectionEditor";


const content = `<h2>Hi there,</h2>
<p>
  this is a <em>basic</em> example of <strong>Tiptap</strong>. Sure, there are all kind of basic text styles you’d probably expect from a text editor. But wait until you see the lists:
</p>
<ul>
  <li>
    That’s a bullet list with one …
  </li>
  <li>
    … or two list items.
  </li>
</ul>
<p>
  Isn’t that great? And all of that is editable. But wait, there’s more. Let’s try a code block:
</p>
<pre><code class="language-css">body {
  display: none;
}</code></pre>
<p>
  I know, I know, this is impressive. It’s only the tip of the iceberg though. Give it a try and click a little bit around. Don’t forget to check the other examples too.
</p>
<blockquote>
  Wow, that’s amazing. Good work, boy! 👏
  <br />
  — Mom
</blockquote>
`

const RTE = () =>{
    
    const publishBlog = ()=>{
      try {
          const url : string = import.meta.env.VITE_BACKEND_URL;
          const blog = {
            title: JSON.stringify(titleEditor?.getJSON()),
            content: JSON.stringify(blogEditor?.getJSON())
          }
          localStorage.setItem("tolen","dkalj");
          console.log(blog);
          console.log("kjfalio");
          // console.log(url);
          axios.post(`${url}/api/v1/blog/`,blog,{
            headers:{
              Authorization: localStorage.getItem('token')
            }
          })
      } catch (error) {
          console.error(error);
      }
    }
    const titleEditor = useEditor({
      extensions: getExtension("heading"),
      content: ""
    })
    // const blogExtensions = getExtension("blog");
    const blogEditor = useEditor({
      extensions: getExtension("blog"),
      content: content
    })
    // console.log(blogEditor?.schema.spec.nodes);
    return (
        <div className="p-10">
          <EditorContent editor={titleEditor}></EditorContent>

          <MenuBar blogPublisher={publishBlog} editor={blogEditor}></MenuBar>
          <SelectionEditor editor={blogEditor}></SelectionEditor>
          <EditorContent editor={blogEditor}></EditorContent>
        </div>
    )
}

export default RTE;