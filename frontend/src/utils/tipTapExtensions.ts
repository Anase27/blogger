import StarterKit from "@tiptap/starter-kit";
import { Color } from '@tiptap/extension-color'
import ListItem from '@tiptap/extension-list-item'
import TextStyle from '@tiptap/extension-text-style'
import Image from "@tiptap/extension-image";
import Underline from "@tiptap/extension-underline";
import Placeholder from "@tiptap/extension-placeholder";
import Bold from "@tiptap/extension-bold";
import Document from "@tiptap/extension-document";

type editortype = "heading" | "blog";

const getExtension = (mode:editortype)=>{
  const CustomDocument = Document.extend({
    content: 'heading block*',
  })
  const baseExtensions = [
    Underline
  ];


  const placeholder = Placeholder.configure({
    placeholder: ({node})=>{
      // console.log(node.type.name);
      if(node.type.name == "heading" && mode == "heading"){
        return "What's the title?"
      }
      return "Write your story here"
    }
  });


  const blogExtension = [
    StarterKit.configure({
      bulletList: {
        keepMarks: true,
        keepAttributes: false, // TODO : Making this as `false` becase marks are not preserved when I try to preserve attrs, awaiting a bit of help
      },
      orderedList: {
        keepMarks: true,
        keepAttributes: false, // TODO : Making this as `false` becase marks are not preserved when I try to preserve attrs, awaiting a bit of help
      },
      heading:{
        levels:[1,2,3],
      },
    }),
    Color.configure({ types: [TextStyle.name, ListItem.name] }),
    TextStyle.configure({ types: [ListItem.name] }),
    Image,
  ]

  if(mode==="blog"){
    return [...blogExtension,...baseExtensions,placeholder];
  }

  return [
    CustomDocument,
    StarterKit.configure({
      document: false,
      heading:{
        levels:[1,2,3],
      },
    }),
    // Document,
    ...baseExtensions,
    placeholder
  ];
}

export default getExtension;