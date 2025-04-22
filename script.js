// Make the DIV element draggable:
document.querySelectorAll('.draggable').forEach(el => {
    dragElement(el);
});

function dragElement(elmnt) {
    // console.log(elmnt);
    var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
    let isDragging = false;
    // otherwise, move the DIV from anywhere inside the DIV:
    elmnt.onmousedown = dragMouseDown;
    // console.log("work");


    function dragMouseDown(e) {
        e.preventDefault();
        isDragging = false; // reset
        // get the mouse cursor position at startup:
        pos3 = e.clientX;
        pos4 = e.clientY;
        document.onmouseup = closeDragElement;
        // call a function whenever the cursor moves:
        document.onmousemove = elementDrag;
    }

    function elementDrag(e) {
        e.preventDefault();
        isDragging = true; // mark that we are dragging
        // calculate the new cursor position:
        pos1 = pos3 - e.clientX;
        pos2 = pos4 - e.clientY;
        pos3 = e.clientX;
        pos4 = e.clientY;

        // Calculate new positions
        let newTop = elmnt.offsetTop - pos2;
        let newLeft = elmnt.offsetLeft - pos1;

        // Clamp so it stays in bounds
        const containerWidth = window.innerWidth;
        const containerHeight = window.innerHeight;
        const elWidth = elmnt.offsetWidth;
        const elHeight = elmnt.offsetHeight;

        // Clamp left/right
        newLeft = Math.max(0, Math.min(containerWidth - elWidth, newLeft));
        // Clamp top/bottom
        newTop = Math.max(0, Math.min(containerHeight - elHeight, newTop));

        // set the element's new position:
        elmnt.style.top = newTop + "px";
        elmnt.style.left = newLeft + "px";
    }

    function closeDragElement(e) {
        // stop moving when mouse button is released:
        document.onmouseup = null;
        document.onmousemove = null;

        if (isDragging) {
            e.preventDefault();
            e.stopPropagation();
            // console.log("dragging");
            setTimeout(() => { isDragging = false; }, 0); // reset after event loop
        }
    }

    // Block accidental click if it was a drag
    elmnt.addEventListener('click', function(e) {
        if (isDragging) {
            e.preventDefault();
            e.stopImmediatePropagation(); // just to be sure
            // console.log("Click prevented due to drag");
        }
    });
}