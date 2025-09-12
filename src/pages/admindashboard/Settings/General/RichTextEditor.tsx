import ReactQuill from "react-quill-new";
import "react-quill/dist/quill.snow.css";
import "./RichTextEditor.css";

const modules = {
  toolbar: [
    [{ header: [1, 2, 3, false] }],
    ["bold", "italic", "underline", "strike"],
    [{ list: "ordered" }, { list: "bullet" }],
    [{ align: [] }],
    ["link"],
    ["clean"],
  ],
};

type RichTextEditorProps = {
  label?: string;
  value: string;
  onChange: (value: string) => void;
};

function RichTextEditor({ value, onChange }: RichTextEditorProps) {
  return (
    <div className="mb-6">
      <ReactQuill
        theme="snow"
        value={value}
        onChange={onChange}
        modules={modules}
        className="bg-white !rounded-lg  outline-none shadow-sm"
      />
    </div>
  );
}

export default RichTextEditor;
