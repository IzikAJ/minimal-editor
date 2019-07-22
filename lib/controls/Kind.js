export const Kind = {
  // сделать bullet points, нумерацию
  // list
  OrderedList: 'OrderedList',
  UnorderedList: 'UnorderedList',

  // центрировать текст
  // justify
  Center: 'Center',
  Left: 'Left',
  Right: 'Right',
  Justify: 'Justify',

  // поменять размер шрифта
  // font size
  Size: 'Size',
  IncreaseSize: 'IncreaseSize',
  DecreaseSize: 'DecreaseSize',

  // сделать шрифт жирным/курсивом/подчеркнутым
  // font style
  Bold: 'Bold',
  Italic: 'Italic',
  Underline: 'Underline',
  Strike: 'Strike',

  // вставить гиперссылку
  Link: 'Link',


  // убрать формат
  UnFormat: 'UnFormat',

  // some else
  Undo: 'Undo',
  Redo: 'Redo',
}


// .icon - font: before { content: '\41'; } /* 'A' */
// .icon - bucket: before { content: '\46'; } /* 'F' */
// .icon - link: before { content: '\4c'; } /* 'L' */
// .icon - paragraph: before { content: '\4e'; } /* 'N' */
// .icon - list - numbered: before { content: '\4f'; } /* 'O' */
// .icon - text - height: before { content: '\54'; } /* 'T' */
// .icon - list - bullet: before { content: '\55'; } /* 'U' */
// .icon - cw: before { content: '\59'; } /* 'Y' */
// .icon - ccw: before { content: '\5a'; } /* 'Z' */
// .icon - fontsize: before { content: '\61'; } /* 'a' */
// .icon - bold: before { content: '\62'; } /* 'b' */
// .icon - align - center: before { content: '\63'; } /* 'c' */
// .icon - italic: before { content: '\69'; } /* 'i' */
// .icon - align - justify: before { content: '\6a'; } /* 'j' */
// .icon - align - left: before { content: '\6c'; } /* 'l' */
// .icon - align - right: before { content: '\72'; } /* 'r' */
// .icon - strike: before { content: '\73'; } /* 's' */
// .icon - underline: before { content: '\75'; } /* 'u' */




// сделать абзац

// вставить гиперссылку
// 'createLink', false, 'http://i.ua'

// поменять цвет шрифта
// foreColor, hiliteColor, [[styleWithCss, false, true], backColor]

// сделать заливку
// formatBlock

// менять интервал (по аналогии с Word)

// export const Command = {
//   // сделать bullet points, нумерацию
//   // list
//   [Kind.OrderedList]: 'insertOrderedList',
//   [Kind.UnorderedList]: 'insertUnorderedList',

//   // центрировать текст
//   // justify
//   [Kind.Center]: 'justifyCenter',
//   [Kind.Left]: 'justifyLeft',
//   [Kind.Right]: 'justifyRight',
//   [Kind.Justify]: 'justifyFull',

//   // поменять размер шрифта
//   // font size
//   [Kind.Size]: 'fontSize',
//   [Kind.IncreaseSize]: 'increaseFontSize',
//   [Kind.DecreaseSize]: 'decreaseFontSize',

//   // сделать шрифт жирным/курсивом/подчеркнутым
//   // font style
//   [Kind.Bold]: 'bold',
//   [Kind.Italic]: 'italic',
//   [Kind.Underline]: 'underline',
//   [Kind.Strike]: 'strikeThrough',

//   // вставить гиперссылку
//   [Kind.Link]: 'createLink',


//   // убрать формат
//   [Kind.UnFormat]: 'removeFormat',

//   // some else
//   [Kind.Undo]: 'undo',
//   [Kind.Redo]: 'redo',
// }


// // hiliteColor
// // removeFormat
