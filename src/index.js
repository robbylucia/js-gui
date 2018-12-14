import showdown from "showdown";
// import * as d3 from "d3";

showdown.setFlavor('github');
const converter = new showdown.Converter();

// Misc helpers
const round = (n, places) => {
  let factor = 10 ** places;
  return Math.round(n * factor) / factor;
}

function ElementException(msg) {
  this.msg = msg;
  this.name = 'ElementException';
}
let debug_mode = false;

// JSGUI helper functions
//allows toggle or set of debug_mode
const debug = (bool = !debug_mode) => {
  debug_mode = !!bool;
   if (debug_mode) if (debug_mode) console.log("Debug Mode set to:" + debug_mode)
}
/**
 * `md` converts markdown to HTML using showdown.js.
 * @param {string} text - The markdown to be converted.
 * @return span element
 */
const md = (text) => {
  let span = el("span");
  span.innerHTML = converter.makeHtml(text);
  return span;
}

/**
 * `isIterable` returns a boolean if param is iterable
 * @param t the element to be checked
 * @return boolean
 */
const isIterable = (t) => {
  return typeof t[Symbol.iterator] === 'function';
}

// adds a class to an element
const addClass = (el, clazz) => {
  el.className += " " + clazz;
}

// adds css to an element
const addCss = (tag, clazzes) => {
  let items = document.getElementsByTagName(tag);
  for (let i of items) {
    addClass(i, clazzes);
  }
}

// add sensible bootstrap css styling
const bootstrapify = () => {
  addCss("table", "table table-sm");
  addCss("dl", "row");
  addCss("dt", "font-weight-bold col-sm-3 col-lg-2 text-right");
  addCss("dd", "col-sm-9 col-lg-10");
  addCss("img", "img-fluid");
}

// ========================== GUI METHODS

// add element(s) to root, pass through single element OR an array of 'em
let add = (el) => {
   if (debug_mode) console.info("Adding element", el, "to root");
  let root = document.getElementById("root");
  if (Array.isArray(el)) {
    el.forEach((x) => {
      append(root, x);
    })
  } else {
    append(root, el);
  }
}

// adds element(s) to a container element
const append = (container, ...elements) => {
  // if child is not a node, append it as a label
  // todo: give a warning if it's not a node or typeof string
  // todo: give a warning if it's not a valid child of the node tag

  const addToContainer = (el) => {
    if (!el) {
      throw (new ElementException(`Cannot create an HTML element from null or undefined data: ${el}`));
    }

    if (!el.nodeType) {
       if (debug_mode) console.warn("Appending el without nodetype: ", el);
      el = label(String(el));
    }
    container.appendChild(el);
  }

  if (elements.length === 1 && Array.isArray(elements[0])) {
     if (debug_mode) console.log("iterable elements", elements);
    elements = elements[0];
  }
  elements.forEach(addToContainer);

  return container;
}

// ========================== Base GUI ELEMENTS

/**
 * `el` creates a DOM element based on a tag
 * @param tag the HTML tag for this element
 * @param attr a map or object literal of html tag attributes
 * @param ...children will be appended as child nodes of this `el`
 * @return the new element
 */
const el = (tag, attr = {}, ...children) => {
  try {
    let node = document.createElement(tag);
    children = children || [];
    // todo: warn for invalid attributes in here
    for (let [k, v] of Object.entries(attr)) {
      node.setAttribute(k, v)
    }

    const a = child => append(node, child);
     if (debug_mode) console.log("Attributes:", attr);
    children.forEach(a);

    return node;
  }
  catch (e) {
    console.error(e);
    console.error("Failed to create element:", tag);
    console.error("Attributes:", attr);
    console.error("Children:", children);
    throw (e);
  }
}

let label = (txt) => {
  return document.createTextNode(txt);
}

// ===================================== layout

let div = (attr, ...children) => el("div", attr, ...children);
let section = (attr, ...children) => el("section", attr, ...children);
let header = (attr, ...children) => el("header", attr, ...children);
let footer = (attr, ...children) => el("footer", attr, ...children);
let main = (attr, ...children) => el("main", attr, ...children);
let aside = (attr, ...children) => el("aside", attr, ...children);

let grid = (cols, attr) => {
  if (cols > 12 || cols < 1) {
    throw ("Failed to create grid. Cols must be between 1-12, not", cols);
  }
  let c = div(attr);
  addClass(c, "row");
  for (let i = 1; i <= cols; i++) {
    let col = el("div", { "class": `col-${i} col-sm` });
    c = append(c, col);
  }
  return c;
}

const addToGrid = (grid, col, ...children) => {
  let n = grid.querySelector(`.col-${col}`);
  return append(n, children);
}


// ===================================== navigation
let nav = (attr, ...children) => el("nav", attr, ...children);

// ===================================== typography
let h1 = (txt, attr, children = []) => el("h1", attr, txt, ...children);
let h2 = (txt, attr, children = []) => el("h2", attr, txt, ...children);
let h3 = (txt, attr, children = []) => el("h3", attr, txt, ...children);
let h4 = (txt, attr, children = []) => el("h4", attr, txt, ...children);
let h5 = (txt, attr, children = []) => el("h5", attr, txt, ...children);
let h6 = (txt, attr, children = []) => el("h6", attr, txt, ...children);

let p = (txt, attr, children = []) => el("p", attr, txt, ...children);
let pre = (txt, attr, children = []) => el("pre", attr, txt, ...children);
let caption = (txt, attr, children = []) => el("caption", attr, txt, ...children);

let br = () => el("br");
let hr = () => el("hr");

let img = (url, alt = "image") => {
  return el("img", { src: url, alt: alt });
};

// url of link
// any jsgui element, can be a string (will default to p tag)
const link = (url, element, attr = {}) => {
  attr.href = url;
  return el("a", attr, element || url);
};
const ahref = (url, element, attr = {}) => {
  attr.href = url;
  return el("a", attr, element || url);
};

// ===================================== table
let table = (data = [], header, attr = {}) => {
  let t = el("table", attr);
  if (header) {
    append(t, thead(header));
  }

  let rows = data.map(tr);
  if (debug_mode) console.log(rows);
  append(t, rows);
  if (debug_mode) console.log(t);
  return t;
}

let thead = (cells, attr = {}) => {
  let head = el("thead");
  let row = tr();
  cells = cells.map(th);
  row = append(row, cells);
  return append(head, row);
}

let tr = (cells = [], attr = {}) => {
  try {
    let row = el("tr");
    if (!isIterable(cells)) {
      try {
        cells = Object.values(cells);
      }
      catch (e) {
        console.error(`Error creating table row: bad cells data.
cells must be iterable or return values from Object.values.
cells: ${cells}`);

      }
    }
    let cols = cells.map(td);
    return append(row, cols);

  }
  catch (e) {
    console.error("Could not create table row.");
    console.log("Cells:", cells);
    console.log("Attr:", attr);
    throw (e);
  }

}
let th = (content, attr, children = []) => el("th", attr, content);
let td = (content, attr, children = []) => el("td", attr, content);


// ========================== lists
let dl = (items, attr) => {
  try {
    let list = el("dl");
    for (let [k, v] of Object.entries(items)) {
      append(list, el("dt", {}, k));
      append(list, el("dd", {}, v === undefined ? "undefined" : v));
    }
    return list;
  }
  catch (e) {
    console.error("Failed to create definition list <dl> from:", items);
    throw (e);
  }
}

let ul = (listItems, attr = {}) => {
  listItems = Array.isArray(listItems) ? listItems : [listItems];
  let list = el("ul")
  listItems.forEach((listItem) => {
    append(list, el("li", attr, listItem))
  })
  return list;
}


let ol = (listItems, attr = {}) => {
  listItems = Array.isArray(listItems) ? listItems : [listItems];
  let list = el("ol")
  listItems.forEach((listItem) => {
    append(list, el("li", attr, listItem))
  })
  return list;
}

// debug, call jsgui.demo() for this
let demo = () => {
  add(h5("jsgui debug v0.2.3: " + Math.round(Math.random() * 100), { style: "box-shadow: 0 0 100px 0px #b9d854; position: fixed; top: 0; right: 0; padding: 0.5em; background: #282828; color: #BADA55" }))
  add(img("https://picsum.photos/400/400/?random", "Random test image"))
}

export { debug, ol, ul, ahref, link, demo, bootstrapify, round, md, add, append, h1, h2, h3, h4, h5, h6, div, section, header, footer, main, aside, p, caption, table, br, hr, dl, img, grid, addToGrid };