import { EditorContent, useEditor} from "@tiptap/react";

import MenuBar from "./MenuBar";
import axios from "axios";
import getExtension from "../utils/tipTapExtensions";
import { SelectionEditor } from "./SelectionEditor";
import { useState } from "react";


interface FloatingButtonProps {
  top: number
  show: boolean
}

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

  const [floatingButton,setFloatingButton] = useState<FloatingButtonProps>({
    top:0,
    show: false
  })
    
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

    const blogEditor = useEditor({
      extensions: getExtension("blog"),
      content: content,
      onFocus: ({ editor }) => {
        // Show floating button on initial focus
        const selection = editor.view.state.selection
        // console.log(selection);
        updateFloatingButton(editor, selection)
        // if (selection.empty) {
        // }
      },
      onBlur: ({event}) => {
        const relatedTarget = event.relatedTarget as HTMLElement;
        console.log(relatedTarget);
        console.log(!relatedTarget?.closest('.floating-menu'));
        // if(!relatedTarget?.closest('.floating-menu')){
        //   setFloatingButton(prev => ({...prev,show:false}))
        // }
      },
      onSelectionUpdate: ({editor})=>{
        const selection = editor.view.state.selection
        updateFloatingButton(editor,selection)
      },
      onUpdate: ({ editor }) => {
        const selection = editor.view.state.selection
        // console.log(selection);
        // const s = editor.view.state
        updateFloatingButton(editor, selection)
        // if (selection.empty) {
        // }
      },
    });




    const updateFloatingButton = (editor: any, selection: any) => {

      const pos = editor.view.coordsAtPos(selection.from)
      const dom = editor.view.domAtPos(selection.from)
      const parentNode = (dom.node as Node).parentNode as HTMLElement
      
      if (parentNode) {
        const editorElement = editor.view.dom as HTMLElement
        // console.log(editorElement)
        const editorRect = editorElement.getBoundingClientRect()
        const relativeTop = pos.top - editorRect.top + editorElement.scrollTop
  
        setFloatingButton({
          top: relativeTop,
          show: true
        })
      }
    }


    // console.log(blogEditor?.schema.spec.nodes);
    return (
        <div className="p-10 relative">
          <EditorContent editor={titleEditor}></EditorContent>

          <div className="relative floating-menu">
            <div>
              <MenuBar blogPublisher={publishBlog} editor={blogEditor} top={floatingButton.top} show={floatingButton.show} ></MenuBar>
            </div>
            <div>
              <SelectionEditor editor={blogEditor}></SelectionEditor>
            </div>
            <div>
              <EditorContent editor={blogEditor}></EditorContent>
            </div>
          </div>
        </div>
    )
}

export default RTE;