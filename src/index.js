import jpng from 'jpng';
import pngToJPNG from '../lib/png-to-jpng.js';
import createDropZone from './drop-zone.js';
import { createResults } from './jpng-results.js';

function copyIMGTag(button){
  const code = button.getAttribute('data-tag'),
        input = document.createElement('textarea');

  input.value = code.replace(/\\n/gim, '\n');

  input.classList.add('visually-hidden');
  document.body.appendChild(input);
  input.select();
  document.execCommand("copy");
  document.body.removeChild(input);
}

function preventImageDropRedirect(e){
  e.preventDefault();
  return false;
}

function initializeDnD(){
  document.addEventListener('dragover', preventImageDropRedirect);
  document.addEventListener('drop', preventImageDropRedirect);
  createResults();
  createDropZone();
}

if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', initializeDnD);
else initializeDnD();

window.copyIMGTag = copyIMGTag;
