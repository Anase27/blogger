import {FloatingMenu,BubbleMenu, useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

const extensions = [StarterKit];

const content = '<p>Hello editor</p>';

const TipTap = () =>{
    const editor = useEditor({
        extensions,
        content,
      })
    return (

        <div>
            <p>befor content </p>
            <EditorContent editor={editor} />

                <FloatingMenu editor={editor}> the floating menu</FloatingMenu>
                <BubbleMenu editor={editor}>the bubble menu</BubbleMenu>
            <p>after content </p>
        </div>
    )
}

export default TipTap;