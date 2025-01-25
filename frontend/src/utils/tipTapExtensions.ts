import StarterKit from "@tiptap/starter-kit";
import { Color } from '@tiptap/extension-color'
import ListItem from '@tiptap/extension-list-item'
import TextStyle from '@tiptap/extension-text-style'
import Image from "@tiptap/extension-image";
import Underline from "@tiptap/extension-underline";
import Placeholder from "@tiptap/extension-placeholder";
import Bold from "@tiptap/extension-bold";

type editortype = "heading" | "blog";

const getExtension = (mode:editortype)=>{
  const baseExtensions = [
    Bold,
    Underline
  ];


  const placeholder = Placeholder.configure({
    placeholder: mode==="heading"?"Title":"Share your story"
  });


  const blogExtension = [
    Color.configure({ types: [TextStyle.name, ListItem.name] }),
    TextStyle.configure({ types: [ListItem.name] }),
    StarterKit.configure({
      bold: false,
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
  ]

  if(mode==="blog"){
    return [...blogExtension,...baseExtensions,placeholder];
  }

  return [...baseExtensions,placeholder];
}

export default getExtension;