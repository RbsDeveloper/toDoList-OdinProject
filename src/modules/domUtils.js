// Function to create an element with optional classes, text, and attributes
export function createElement(tag, classes = [], text = '', attributes = {}) {
    const element = document.createElement(tag);
      // Add classes if provided
    if(classes.length){
        element.classList.add(...classes);
    }
    // Add text content if provided
    if(text){
        element.textContent = text;
    }
    // Add attributes if provided
    for (const [key, value] of Object.entries(attributes)) {
        element.setAttribute(key, value);
    }

    return element;
}   