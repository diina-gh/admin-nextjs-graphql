
import React, { useEffect, useState } from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import BlockUI from "./blockui";

function Editor({onDescChange, desc}) {
  let [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(true);
  }, []); // run on mounting

  if (loaded) {
    return (
      <CKEditor
        editor={ClassicEditor}
        onChange={(event, editor) => {  // do something when editor's content changed
          const data = editor.getData();
          onDescChange(data)
          console.log({ event, editor, data });
        }}
        config={{         
            toolbar: ['heading', '|', 'bold', 'italic', 'blockQuote', 'link', 'numberedList', 'bulletedList', 'insertTable', 'mergeTableCells', 'tableColumn', 'tableRow', '|', 'undo', 'redo'],
            placeholder: "Donnez une description ...",
          }}  

      />
    );
  } else {
    return (
      <div className="w-full h-full relative">
        <BlockUI blocking={true} />
      </div>
    );
  }
}

export default Editor;