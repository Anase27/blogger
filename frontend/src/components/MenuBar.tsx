import { Editor } from "@tiptap/react"
// import { cn } from "../utils/utils"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger
 } from "@/components/ui/dropdown-menu"
 import { Plus } from "lucide-react"
// import { Ref } from "react"

interface MenuBarProps{
  blogPublisher: ()=>void,
  editor:Editor | null
  top: number
  show: boolean
  // fileChangeHandler: (event: React.ChangeEvent<HTMLInputElement>)=>void
  inputRefCaller: ()=>void
}


const MenuBar:React.FC<MenuBarProps> = ({blogPublisher,editor,top,show,inputRefCaller}) => {
    // const { editor } = useCurrentEditor()
  
    if (!editor || !show) {
      return null
    }
    
  //   const imageUploader=(file:File) =>{
  //     try {
  //       const filereader = new FileReader();
  //       filereader.onloadend = ()=>{
  //         editor.chain().focus().setImage({src:filereader.result as string}).run();
  //         console.log("Image uploaded successfuly");
  //       }
  //       filereader.readAsDataURL(file);
  //     } catch (error) {
  //       console.error("Error uploading image",error);
  //     }
  //   }
  //   const fileChangeHandler = (event:React.ChangeEvent<HTMLInputElement>)=>{
  //     console.log("Image input is clicked")
  //     const file = event.target.files?.[0];
  //     if(!file) return;

  //     if(!file.type.startsWith('image/')){
  //         console.log("only images are accepted");
  //         return;
  //     }
  //     if(file.size>5*1024*1024){
  //         console.log("Images file size should not exceed 5MB");
  //         return;
  //     }
  //     imageUploader(file);
  //     if (event.target) {
  //         event.target.value = "";
  //     }
  // }

    const menuContent = (
      <div className="floating-menu">
        <DropdownMenuGroup>
                {/* <DropdownMenuItem>
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
                </DropdownMenuItem>
                <DropdownMenuItem>
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
                </DropdownMenuItem>
                <DropdownMenuItem>
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
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <button
                    onClick={()=>editor.chain().focus().toggleUnderline().run()}
                  >
                    Underline
                  </button>
                </DropdownMenuItem> */}
                <DropdownMenuItem>
                  <button
                    onClick={() => editor.chain().focus().toggleCode().run()}
                    disabled={
                      !editor.can()
                        .chain()
                        .focus()
                        .toggleCode()
                        .run()
                    }
                    className={editor.isActive('code') ? 'is-active' : ''}
                  >
                    Code
                  </button>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <button
                    onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
                    className={editor.isActive('heading', { level: 1 }) ? 'is-active' : ''}
                  >
                    H1
                  </button>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <button
                    onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
                    className={editor.isActive('heading', { level: 2 }) ? 'is-active' : ''}
                  >
                    H2
                  </button>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <button
                    onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
                    className={editor.isActive('heading', { level: 3 }) ? 'is-active' : ''}
                  >
                    H3
                  </button>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <button
                    onClick={() => editor.chain().focus().toggleBulletList().run()}
                    className={editor.isActive('bulletList') ? 'is-active' : ''}
                  >
                    Bullet list
                  </button>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <button
                    onClick={() => editor.chain().focus().toggleOrderedList().run()}
                    className={editor.isActive('orderedList') ? 'is-active' : ''}
                  >
                    Ordered list
                  </button>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <button
                    onClick={() => editor.chain().focus().toggleCodeBlock().run()}
                    className={editor.isActive('codeBlock') ? 'is-active' : ''}
                  >
                    Code block
                  </button>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <button
                    onClick={() => editor.chain().focus().toggleBlockquote().run()}
                    className={editor.isActive('blockquote') ? 'is-active' : ''}
                  >
                    Blockquote
                  </button>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <button onClick={() => editor.chain().focus().setHorizontalRule().run()}>
                    Horizontal rule
                  </button>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <button
                    onClick={() => editor.chain().focus().setColor('#958DF1').run()}
                    className={editor.isActive('textStyle', { color: '#958DF1' }) ? 'is-active' : ''}
                  >
                    Purple
                  </button>
                </DropdownMenuItem>
                <DropdownMenuItem>
                    <button onClick={()=>{inputRefCaller()}}>
                      Image
                    </button>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <button
                    onClick={()=> {
                      blogPublisher()
                    }}
                  >
                    output
                  </button>
                </DropdownMenuItem>
        </DropdownMenuGroup>
      </div>
    )
  
    return (
      <div 
      className="floating-menu absolute -left-5 transition-[top] duration-300 ease-in-out"
      style={{
        "top": `${top}px`,
        // "transition": 'top 0.3s ease-in-out'
      }}
      >
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button className="flex items-center justify-center w-8 h-8 rounded-full bg-white border border-gray-200 hover:bg-gray-50 transition-colors duration-200 shadow-sm">
            <Plus className="w-4 h-4 text-gray-600" />
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-48">
          {menuContent}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
    )
}


export default MenuBar;