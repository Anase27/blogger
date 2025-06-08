import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Image from "@tiptap/extension-image";
import Underline from "@tiptap/extension-underline";
import Nav from '@/components/Nav';


interface BlogContentProps {
  content: JSON;
}
const BlogContent = ({ content }: BlogContentProps) => {
  console.log('Rendering blog content:', content);

  const editor = useEditor({
    extensions: [StarterKit,Image,Underline],
    content: content,
    editable: false,
  });
  if (!editor) {
    return null;
  }
  return (
    <>
      <div className="prose prose-lg max-w-4xl mx-auto">
        <EditorContent editor={editor} />
      </div>
      <div className=''>
        <Nav></Nav>
      </div>
    </>
  );
};
export default BlogContent;