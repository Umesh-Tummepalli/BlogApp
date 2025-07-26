import React, { useRef, useEffect, useState } from 'react';
import {
  MDXEditor,
  listsPlugin,
  quotePlugin,
  thematicBreakPlugin,
  linkPlugin,
  linkDialogPlugin,
  toolbarPlugin,
  UndoRedo,
  BoldItalicUnderlineToggles,
  CodeToggle,
  CreateLink,
  ListsToggle,
} from '@mdxeditor/editor';
import '@mdxeditor/editor/style.css';

const MarkdownEditor = ({ handleInputChange, index, value }) => {
  const timeoutRef = useRef();
  const [showPlaceholder, setShowPlaceholder] = useState(true);

  useEffect(() => {
    setShowPlaceholder(!value || value.trim() === '');
  }, [value]);

  const handleChangeAdapter = (newMarkdown) => {
    clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      handleInputChange(index, newMarkdown);
    }, 500);
  };

  return (
    <div className="relative border-1 rounded-md border-zinc-700 p-2 bg-zinc-900" style={{ fontFamily: 'Poppins, sans-serif' }}>
      {/* Load Poppins font dynamically */}
      <link href="https://fonts.googleapis.com/css2?family=Poppins&display=swap" rel="stylesheet" />

      {/* Embedded placeholder */}
      {showPlaceholder && (
        <div
          style={{
            position: 'absolute',
            top: '1rem',
            left: '1rem',
            color: '#a1a1aa', // zinc-400
            opacity: 0.5,
            pointerEvents: 'none',
            fontFamily: 'Poppins, sans-serif',
          }}
        >
          Enter text...
        </div>
      )}

      <MDXEditor
        markdown={value}
        onChange={handleChangeAdapter}
        className="dark-theme"
        contentEditableClassName="prose prose-invert h-40 overflow-auto p-2 rounded-b-md focus:outline-none bg-zinc-900 text-white caret-white"
        plugins={[
          quotePlugin(),
          thematicBreakPlugin(),
          linkPlugin(),
          linkDialogPlugin(),
          listsPlugin({ checkListMaxIndent: 0 }),
          toolbarPlugin({
            toolbarContents: () => (
              <>
                <UndoRedo />
                <BoldItalicUnderlineToggles />
                <CodeToggle />
                <ListsToggle />
                <CreateLink />
              </>
            ),
          }),
        ]}
      />
    </div>
  );
};

export default MarkdownEditor;
