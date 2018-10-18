// GUI METHODS
// add element(s) to root, pass through single element OR an array of 'em
let add = (el)=> {
  let root = document.getElementById("root");
  if (Array.isArray(el)) {
      el.forEach((x)=>{
        root.appendChild(x)
      })
  } else {
      root.appendChild(el);
  }
}

// experimental custom elements for advanced users
let addEl = (el)=> {
  let root = document.getElementById("root");
  let element = document.createElement("div");
  element.innerHTML = el
  root.appendChild(element)
}

let listen = (eventName, callback)=> {
  window.addEventListener(eventName,callback)
}


// GUI ELEMENTS
// h1 tag

let h1 = (txt)=> {
  let node = document.createElement("h1");
  node.appendChild(label(txt));
  return node;
}

let label = (txt)=> {
  return document.createTextNode(txt);
}

let line = () => {
  let node = document.createElement("br");
  return node;
}

let checkbox = (chk = false)=> {
  let node = document.createElement("input")
  if(chk) node.setAttribute("checked" , "")
  node.setAttribute("type", "checkbox")
  return node;
}

let button = (txt, eventToEmit) => {
   let node = document.createElement("button")
   node.innerHTML = txt
   event = new Event(eventToEmit);
   node.onclick = function() { dispatchEvent(event)};
   return node;
}
