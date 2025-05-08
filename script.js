document.querySelectorAll('.draggable').forEach(el => {
    dragElement(el);
  });
  
  function dragElement(elmnt) {
    let isDragging = false;
    let shiftX = 0;
    let shiftY = 0;

    const id = elmnt.id;
    if (id) loadPosition();
  
    elmnt.addEventListener('mousedown', dragMouseDown);
    elmnt.addEventListener('touchstart', dragMouseDown, { passive: false });
  
    function dragMouseDown(e) {
      e.preventDefault();
      isDragging = false;
  
      const isTouch = e.type === 'touchstart';
      const clientX = isTouch ? e.touches[0].clientX : e.clientX;
      const clientY = isTouch ? e.touches[0].clientY : e.clientY;
  
      const rect = elmnt.getBoundingClientRect();
      shiftX = clientX - rect.left;
      shiftY = clientY - rect.top;
  
      if (isTouch) {
        document.addEventListener('touchmove', elementDrag, { passive: false });
        document.addEventListener('touchend', closeDragElement);
      } else {
        document.addEventListener('mousemove', elementDrag);
        document.addEventListener('mouseup', closeDragElement);
      }
    }
  
    function elementDrag(e) {
      e.preventDefault();
      isDragging = true;
  
      const isTouch = e.type === 'touchmove';
      const clientX = isTouch ? e.touches[0].clientX : e.clientX;
      const clientY = isTouch ? e.touches[0].clientY : e.clientY;
  
      const elementWidth = elmnt.offsetWidth;
      const elementHeight = elmnt.offsetHeight;
  
      const rawX = clientX - shiftX;
      const rawY = clientY - shiftY;
  
      const clampedX = Math.max(0, Math.min(rawX, elmnt.offsetParent.clientWidth - elementWidth));
      const clampedY = Math.max(0, Math.min(rawY, elmnt.offsetParent.clientHeight - elementHeight));
  
      const percentX = (clampedX / elmnt.offsetParent.clientWidth) * 100;
      const percentY = (clampedY / elmnt.offsetParent.clientHeight) * 100;
  
      elmnt.style.left = `${percentX}%`;
      elmnt.style.top = `${percentY}%`;

      if (id) savePosition(percentX, percentY);
    }
  
    function closeDragElement(e) {
      document.removeEventListener('mousemove', elementDrag);
      document.removeEventListener('mouseup', closeDragElement);
      document.removeEventListener('touchmove', elementDrag);
      document.removeEventListener('touchend', closeDragElement);
  
      if (isDragging) {
        e.preventDefault();
        e.stopPropagation();
        setTimeout(() => { isDragging = false; }, 0);
      }
    }

    function savePosition(left, top) {
        const positions = JSON.parse(localStorage.getItem('draggablePositions')) || {};
        positions[id] = { left, top };
        localStorage.setItem('draggablePositions', JSON.stringify(positions));
    }

    function loadPosition() {
        const positions = JSON.parse(localStorage.getItem('draggablePositions')) || {};
        if (positions[id]) {
          elmnt.style.left = `${positions[id].left}%`;
          elmnt.style.top = `${positions[id].top}%`;
        }
    }
    
  
    elmnt.addEventListener('click', function(e) {
      if (isDragging) {
        e.preventDefault();
        e.stopImmediatePropagation();
      }
    });

    elmnt.ondragstart = () => false;
}