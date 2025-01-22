import { EditorProvider} from "@tiptap/react";
import MenuBar from "./MenuBar";
import StarterKit from "@tiptap/starter-kit";
import { Color } from '@tiptap/extension-color'
import TextStyle from '@tiptap/extension-text-style'
import ListItem from '@tiptap/extension-list-item'
import Image from "@tiptap/extension-image";
import Underline from "@tiptap/extension-underline";
import axios from "axios";

const extensions = [
  Color.configure({ types: [TextStyle.name, ListItem.name] }),
  TextStyle.configure({ types: [ListItem.name] }),
  StarterKit.configure({
      bulletList: {
          keepMarks: true,
          keepAttributes: false, // TODO : Making this as `false` becase marks are not preserved when I try to preserve attrs, awaiting a bit of help
      },
      orderedList: {
          keepMarks: true,
          keepAttributes: false, // TODO : Making this as `false` becase marks are not preserved when I try to preserve attrs, awaiting a bit of help
      },
  }),
  Image,
  // Dropcursor,
  Underline
];

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
    // const editor = useEditor({
    //     extensions,
    //     content,
    //   })
    const publishBlog = (blog:unknown)=>{
      try {
          const url : string = import.meta.env.VITE_BACKEND_URL;

          console.log(JSON.stringify(blog));
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
    return (

        <div className="p-10">
            {/* <FloatingMenu editor={null}>the floating menu</FloatingMenu> */}
            <EditorProvider slotBefore={<MenuBar blogPublisher={publishBlog}/>} extensions={extensions} content={content}></EditorProvider>
        </div>
    )
}

export default RTE;