import showdown from "showdown";
import d3 from "d3";

showdown.setFlavor('github');
const converter = new showdown.Converter();

// Non exported functions
// Misc helpers
const round = (n, places) => {
  let factor = 10 ** places;
  return Math.round(n * factor) / factor;
}

function ElementException(msg) {
  this.msg = msg;
  this.name = 'ElementException';
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

// JSGUI helper functions
// this is now in a big fat object for easier auto exporting
const jsgui = {
  /**
   * `md` converts markdown to HTML using showdown.js.
   * @param {string} text - The markdown to be converted.
   * @return span element
 */
  md: (text) => {
    let span = el("span");
    span.innerHTML = converter.makeHtml(text);
    return span;
  },

  bootstrapify: () => {
    addCss("table", "table table-sm");
    addCss("dl", "row");
    addCss("dt", "font-weight-bold col-sm-3 col-lg-2 text-right");
    addCss("dd", "col-sm-9 col-lg-10");
    addCss("img", "img-fluid");
  },

// ========================== GUI METHODS
  add: (el) => {
    console.info("Adding element", el, "to root");
    let root = document.getElementById("root");
    if (Array.isArray(el)) {
      el.forEach((x) => {
        jsgui.append(root, x);
      })
    } else {
      jsgui.append(root, el);
    }
  },

  append: (container, ...elements) => {
    // if child is not a node, append it as a label
    // todo: give a warning if it's not a node or typeof string
    // todo: give a warning if it's not a valid child of the node tag

    const addToContainer = (el) => {
      if (!el) {
        throw (new ElementException(`Cannot create an HTML element from null or undefined data: ${el}`));
      }

      if (!el.nodeType) {
        console.warn("Appending el without nodetype: ", el);
        el = jsgui.label(String(el));
      }
      container.appendChild(el);
    }

    if (elements.length === 1 && Array.isArray(elements[0])) {
      console.log("iterable elements", elements);
      elements = elements[0];
    }
    elements.forEach(addToContainer);
    return container;
  },

  /**
 * `el` creates a DOM element based on a tag
 * @param tag the HTML tag for this element
 * @param attr a map or object literal of html tag attributes
 * @param ...children will be appended as child nodes of this `el`
 * @return the new element
 */
  el: (tag, attr = {}, ...children) => {
    try {
      let node = document.createElement(tag);
      children = children || [];
      // todo: warn for invalid attributes in here
      for (let [k, v] of Object.entries(attr)) {
        node.setAttribute(k, v)
      }

      const a = child => jsgui.append(node, child);
      console.log("Attributes:", attr);
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
  },

  label: (txt) => {
    return document.createTextNode(txt);
  },

  
  // ===================================== layout
  div: (attr, ...children) => jsgui.el("div", attr, ...children),
  section: (attr, ...children) => jsgui.el("section", attr, ...children),
  header: (attr, ...children) => jsgui.el("header", attr, ...children),
  footer: (attr, ...children) => jsgui.el("footer", attr, ...children),
  main: (attr, ...children) => jsgui.el("main", attr, ...children),
  aside: (attr, ...children) => jsgui.el("aside", attr, ...children),

  grid : (cols, attr) => {
    if (cols > 12 || cols < 1) {
      throw ("Failed to create grid. Cols must be between 1-12, not", cols);
    }
    let c = jsgui.div(attr);
    addClass(c, "row");
    for (let i = 1; i <= cols; i++) {
      let col = jsgui.el("div", { "class": `col-${i} col-sm` });
      c = jsgui.append(c, col);
    }
    return c;
  },

  addToGrid: (grid, col, ...children) => {
    let n = grid.querySelector(`.col-${col}`);
    return jsgui.append(n, children);
  },

  // ===================================== navigation
  nav: (attr, ...children) => jsgui.el("nav", attr, ...children),

  // ===================================== typography
  h1: (txt, attr, children = []) => jsgui.el("h1", attr, txt, ...children),
  h2: (txt, attr, children = []) => jsgui.el("h2", attr, txt, ...children),
  h3: (txt, attr, children = []) => jsgui.el("h3", attr, txt, ...children),
  h4: (txt, attr, children = []) => jsgui.el("h4", attr, txt, ...children),
  h5: (txt, attr, children = []) => jsgui.el("h5", attr, txt, ...children),
  h6: (txt, attr, children = []) => jsgui.el("h6", attr, txt, ...children),
  p: (txt, attr, children = []) => jsgui.el("p", attr, txt, ...children),
  pre: (txt, attr, children = []) => jsgui.el("pre", attr, txt, ...children),
  caption: (txt, attr, children = []) => jsgui.el("caption", attr, txt, ...children),
  br: () => jsgui.el("br"),
  hr: () => jsgui.el("hr"),
  img: (url, alt = "image") => jsgui.el("img", { src: url, alt: alt }),

  // ===================================== table
  table: (data = [], header, attr = {}) => {
    let t = jsgui.el("table", attr);
    if (header) {
      jsgui.append(t, jsgui.thead(header));
    }

    let rows = data.map(tr);
    console.log(rows);
    append(t, rows);
    console.log(t);
    return t;
  },

  thead: (cells, attr = {}) => {
    let head = jsgui.el("thead");
    let row = jsgui.tr();
    cells = cells.map(th);
    row = jsgui.append(row, cells);
    return jsgui.append(head, row);
  },
  tr: (cells = [], attr = {}) => {
    try {
      let row = jsgui.el("tr");
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
      return jsgui.append(row, cols);
    }
    catch (e) {
      console.error("Could not create table row.");
      console.log("Cells:", cells);
      console.log("Attr:", attr);
      throw (e);
    }
  },
  th: (content, attr, children = []) => jsgui.el("th", attr, content),
  td: (content, attr, children = []) => jsgui.el("td", attr, content),

  // ========================== lists
  dl: (items, attr) => {
    try {
      let list = jsgui.el("dl");
      for (let [k, v] of Object.entries(items)) {
        jsgui.append(list, jsgui.el("dt", {}, k));
        jsgui.append(list, jsgui.el("dd", {}, v === undefined ? "undefined" : v));
      }
      return list;
    }
    catch (e) {
      console.error("Failed to create definition list <dl> from:", items);
      throw (e);
    }
  }
}

export {jsgui};

// dev only below
jsgui.add(jsgui.h5("jsgui debug v1: " + Math.round(Math.random() * 100), { style: "box-shadow: 0 0 100px 0px #b9d854; position: fixed; top: 0; right: 0; padding: 0.5em; background: #282828; color: #BADA55" }))
jsgui.add(jsgui.img("https://picsum.photos/400/400/?random", "Random test image"))