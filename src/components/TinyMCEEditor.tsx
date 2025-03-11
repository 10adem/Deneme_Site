import { useRef } from 'react';
import { Editor } from '@tinymce/tinymce-react';

interface TinyMCEEditorProps {
  initialValue?: string;
  onChange: (content: string) => void;
  height?: number;
}

// Tip tanımını doğrudan kullanma
type EditorRefType = {
  getContent: () => string;
} | null;

export const TinyMCEEditor = ({ initialValue = '', onChange, height = 500 }: TinyMCEEditorProps) => {
  const editorRef = useRef<EditorRefType>(null);
  
  return (
    <Editor
      apiKey="xyooeg4azs1t9s8pa3qe2ikfxmqolzq7ym6314pfvvclf3oi"
      onInit={(_evt, editor) => {
        editorRef.current = editor;
      }}
      initialValue={initialValue}
      init={{
        height,
        menubar: true,
        plugins: [
          'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
          'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
          'insertdatetime', 'media', 'table', 'code', 'help', 'wordcount'
        ],
        toolbar: 'undo redo | blocks | ' +
          'bold italic forecolor | alignleft aligncenter ' +
          'alignright alignjustify | bullist numlist outdent indent | ' +
          'removeformat | help',
        content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',
        branding: false,
        promotion: false
      }}
      onEditorChange={onChange}
    />
  );
}; 