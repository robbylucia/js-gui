// add element(s) to root, pass through single element OR an array of 'em
let add = (el) => {
    console.info("Adding element", el, "to root");
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
            console.warn("Appending el without nodetype: ", el);
            el = label(String(el));
        }
        container.appendChild(el);
    }

    if (elements.length === 1 && Array.isArray(elements[0])) {
        console.log("iterable elements", elements);
        elements = elements[0];
    }
    elements.forEach(addToContainer);

    return container;
}

const el = (tag, attr = {}, ...children) => {
    try {
        let node = document.createElement(tag);
        children = children || [];
        // todo: warn for invalid attributes in here
        for (let [k, v] of Object.entries(attr)) {
            node.setAttribute(k, v)
        }

        const a = child => append(node, child);
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
}

let img = (url, alt = "image") => {
    return el("img", { src: url, alt: alt });
}

add(img("https://picsum.photos/400/400/?random", "Random test image"))