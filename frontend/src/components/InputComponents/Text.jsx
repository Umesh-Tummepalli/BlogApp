import React, { useRef, useEffect } from 'react';
import {
  MDXEditor,
  headingsPlugin,
  listsPlugin,
  linkPlugin,
  quotePlugin,
  thematicBreakPlugin,
  toolbarPlugin,
  UndoRedo,
  BoldItalicUnderlineToggles,
  CodeToggle,
  CreateLink,
  linkDialogPlugin,
  BlockTypeSelect,
  ListsToggle
} from '@mdxeditor/editor';
import '@mdxeditor/editor/style.css';

const CustomHeadingButtons = () => {
  return (
    <BlockTypeSelect
      options={[
        { value: 'paragraph', label: 'Paragraph' },
        { value: 'h1', label: 'Heading 1' },
        { value: 'h2', label: 'Heading 2' },
        { value: 'h3', label: 'Heading 3' }
      ]}
      className="flex items-center gap-1"
    />
  );
};

const CustomListButtons = () => {
  return (
    <ListsToggle
      className="flex items-center gap-1"
      unorderedListTitle="Bulleted List"
      orderedListTitle="Numbered List"
    />
  );
};

const Text = ({ handleInputChange, index, value }) => {
  const timeoutRef = useRef(null);

  const handleChangeAdapter = (newMarkdown) => {
    clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      handleInputChange(index, newMarkdown);
    }, 500);
  };

  useEffect(() => {
    return () => clearTimeout(timeoutRef.current);
  }, []);

  return (
    <div className="w-full bg-[#191919] text-white rounded-md  p-2">
      <style>{`
  .custom-mdx-editor :where(.prose) h1 { font-size: 2rem; font-weight: bold; color: #ffffff; }
  .custom-mdx-editor :where(.prose) h2 { font-size: 1.5rem; font-weight: bold; color: #ffffff; }
  .custom-mdx-editor :where(.prose) h3 { font-size: 1.25rem; font-weight: bold; color: #ffffff; }
  .custom-mdx-editor :where(.prose) p { font-size: 1rem; color: #e5e5e5; }
  .custom-mdx-editor :where(.prose) ul,
  .custom-mdx-editor :where(.prose) ol { 
    margin-left: 1.5rem; 
    color: #d1d5db; 
    list-style-position: inside; 
    list-style-type: disc; /* for ul */
  }
  .custom-mdx-editor :where(.prose) ol { 
    list-style-type: decimal; /* for ol */
  }
  .custom-mdx-editor :where(.prose) blockquote { border-left: 4px solid #555; padding-left: 1rem; color: #aaa; font-style: italic; }
  .custom-mdx-editor :where(.prose) code { background: none; font-family: 'Fira Mono', 'Menlo', 'Monaco', 'Consolas', monospace; padding: 0.2em 0.4em; border-radius: 4px; color: #93c5fd; }
  .custom-mdx-editor :where(.prose) a { color: #60a5fa; text-decoration: underline; }
`}</style>


      <MDXEditor
        markdown={value || ''}
        onChange={handleChangeAdapter}
        className="custom-mdx-editor"
        contentEditableClassName="prose prose-invert overflow-auto focus:outline-none bg-transparent w-full max-w-full min-h-[200px]"
        placeholder="Enter your text here..."
        plugins={[
          headingsPlugin(),
          listsPlugin(),
          quotePlugin(),
          thematicBreakPlugin(),
          linkPlugin(),
          linkDialogPlugin(),
          toolbarPlugin({
            toolbarContents: () => (
              <>
                <UndoRedo />
                <BoldItalicUnderlineToggles />
                <CustomHeadingButtons />
                <CustomListButtons />
                <CodeToggle />
                <CreateLink />
              </>
            )
          })
        ]}
      />
    </div>
  );
};

export default Text;
