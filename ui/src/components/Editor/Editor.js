import React, { useRef, useEffect} from 'react';
import useForm from '../../hooks/useForm';
import { basicSetup } from 'codemirror';
import { EditorState } from '@codemirror/state';
import { EditorView, keymap } from '@codemirror/view';
import { defaultKeymap, indentWithTab } from '@codemirror/commands';
import { oneDark } from '@codemirror/theme-one-dark';
import { json } from '@codemirror/lang-json';
import { xml } from '@codemirror/lang-xml';
import { html } from '@codemirror/lang-html';

function Editor({ language, onContentChange }) {
    const editor = useRef();
    const { enteredValues } = useForm();

  
    useEffect(() => {
      const extensions = [
        basicSetup,
        keymap.of([defaultKeymap, indentWithTab]),
        oneDark,
      ];
  
      if (language === 'json') {
        extensions.push(json());
      } else if (language === 'xml') {
        extensions.push(xml());
      } else if (language === 'text') {
        extensions.push(html());
      }
  
      const startState = EditorState.create({
        doc: enteredValues.body || "",
        extensions: extensions,
      });
  
      const view = new EditorView({ state: startState, parent: editor.current });

      //to grab input value
      view.contentDOM.addEventListener('blur', () => {
        const content = view.state.doc.toString();
        onContentChange(content);
      });
      
      return () => {
        view.destroy();
      };
    }, [language]); 
  
    return (
      <div className="service-create__highlighting-container" ref={editor}></div>
    );
}
  
export default Editor;