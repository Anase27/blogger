import { Editor, BubbleMenu } from "@tiptap/react"


interface SelectionEditorProps{
    editor: Editor | null
}
export const SelectionEditor = ({editor}:SelectionEditorProps)=>{
    
    return (
        <>
            {editor && <BubbleMenu editor={editor}>
                <div className="bubble-menu flex flex-col border border-black backdrop-blur-md max-h-120px overflow-y-scroll no-scrollbar">
                    <button
                        onClick={() => editor.chain().focus().toggleBold().run()}
                        disabled={
                        !editor.can()
                            .chain()
                            .focus()
                            .toggleBold()
                            .run()
                        }
                        className={editor.isActive('bold') ? 'is-active' : ''}
                    >
                        Bold
                    </button>
                    <button
                        onClick={() => editor.chain().focus().toggleItalic().run()}
                        disabled={
                        !editor.can()
                            .chain()
                            .focus()
                            .toggleItalic()
                            .run()
                        }
                        className={editor.isActive('italic') ? 'is-active' : ''}
                    >
                        Italic
                    </button>
                    <button
                        onClick={() => editor.chain().focus().toggleStrike().run()}
                        disabled={
                        !editor.can()
                            .chain()
                            .focus()
                            .toggleStrike()
                            .run()
                        }
                        className={editor.isActive('strike') ? 'is-active' : ''}
                    >
                        Strike
                    </button>
                    <button
                        onClick={()=>editor.chain().focus().toggleUnderline().run()}          
                    >
                        Underline
                    </button>
                </div>
            </BubbleMenu>}
        </>
    )
}