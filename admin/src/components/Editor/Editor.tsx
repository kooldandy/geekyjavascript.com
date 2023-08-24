import React, { useState } from "react";
import hljs from "highlight.js";
import ReactQuill, { Quill } from "react-quill";
import * as Emoji from "quill-emoji";
import "quill-mention";
import ImageResize from "quill-image-resize-module-react";

import styles from './Editor.module.css';
import "react-quill/dist/quill.snow.css";
import "highlight.js/styles/atom-one-dark.css";
import "quill-emoji/dist/quill-emoji.css";
import "quill-mention/dist/quill.mention.css";


// configure hljs
hljs.configure({
  languages: ["javascript"],
});

const hashValues = [
  { id: 3, value: "Fredrik Sundqvist 2" },
  { id: 4, value: "Patrik Sjölin 2" },
];

//Add https to link if https is not present
const Link = Quill.import("formats/link");
Link.sanitize = function (url: string) {
  // quill by default creates relative links if scheme is missing.
  if (!url.startsWith("http://") && !url.startsWith("https://")) {
    return `http://${url}`;
  }
  return url;
};
Quill.register(Link, true);

//Add Emoji to Quill
Quill.register("modules/emoji", Emoji);

// Add sizes to whitelist and register them
const Size = Quill.import("attributors/style/size");
Size.whitelist = ["12px", "14px", "16px", "18px", '20px', '22px', '24px','28px', '32px', '36px', '42px'];
Quill.register(Size, true);

Quill.register("modules/imageResize", ImageResize);

// Add fonts to whitelist and register them
// const Font = Quill.import("formats/font");
// Font.whitelist = [
//   "arial",
//   "comic-sans",
//   "courier-new",
//   "georgia",
//   "helvetica",
//   "lucida",
// ];
// Quill.register(Font, true);

const mention = {
  allowedChars: /^[A-Za-z\sÅÄÖåäö]*$/,
  mentionDenotationChars: ["#"],
  linkTarget: "_blank",
  source: function (
    searchTerm: string,
    renderList: (v: any, s: string) => void,
    mentionChar: string
  ) {
    let values;

    if (mentionChar === "#") {
      values = hashValues;
    }
    if (searchTerm.length === 0) {
      renderList(values, searchTerm);
    } else {
      const matches = [];
      for (let i = 0; i < values.length; i++)
        if (~values[i].value.toLowerCase().indexOf(searchTerm.toLowerCase()))
          matches.push(values[i]);
      renderList(matches, searchTerm);
    }
  },
};

const toolbarOptions = [
  ["bold", "italic", "underline", "strike"], // toggled buttons
  ["blockquote", "code-block"],

  [{ list: "ordered" }, { list: "bullet" }],
  [{ script: "sub" }, { script: "super" }], // superscript/subscript
  [{ indent: "-1" }, { indent: "+1" }], // outdent/indent
  [{ direction: "rtl" }], // text direction

  [{ size: Size.whitelist }], // custom dropdown
  [{ header: [1, 2, 3, false] }],

  [{ color: [] }, { background: [] }], // dropdown with defaults from theme
  [{ font: [] }],
  [{ align: [] }],

  ["link", "image", "video", "emoji"],
  ["clean"], // remove formatting button
];

const _modules = {
  syntax: {
    highlight: (text: string) => hljs.highlightAuto(text).value,
  },
  // syntax: true,
  toolbar: toolbarOptions,
  "emoji-toolbar": true,
  "emoji-textarea": false,
  "emoji-shortname": true,
  mention,
  clipboard: {
    // toggle to add extra line breaks when pasting HTML:
    matchVisual: false,
  },
  imageResize: {
    parchment: Quill.import("parchment"),
    modules: ["Resize", "DisplaySize", "Toolbar"],
  },
};

const Editor = (props: { getData: (data: string) => void }) => {
  const [value, setValue] = useState("");

  const handleRteData = (v: string) => {
    setValue(v);

    if (props?.getData) {
      props?.getData?.(v);
    }
  };

  return (
    <>
      <ReactQuill
      className={styles['editor']}
        theme="snow"
        value={value}
        onChange={(v) => handleRteData(v)}
        modules={_modules}
        // formats={formats}
        placeholder="Please provide the content of your blog here"
      />
    </>
  );
};

export default Editor;
