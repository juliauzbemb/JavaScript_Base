'ust strict';

document.addEventListener('DOMContentLoaded', function() {
    const margin = 10;
    const allTooltips = document.querySelectorAll('.has-tooltip');


    function createTooltip(elementWithHint) {
        const hint = document.createElement('div');
        hint.textContent = elementWithHint.title;
        hint.className = 'tooltip';
        elementWithHint.insertAdjacentElement('afterend', hint);    
    }   

    function positionChange(hint, elementWithHint, margin=0) {
        const dataSet = elementWithHint.dataset.position ? elementWithHint.dataset.position : "bottom";
        const coordElementWithHint = elementWithHint.getBoundingClientRect();
        const coordHint = hint.getBoundingClientRect();

        switch (dataSet) {
            case "bottom":
                hint.style.left = `${coordElementWithHint.left}px`;
                hint.style.top = `${coordElementWithHint.bottom + margin}px`;
                break;
            case "top":
                hint.style.left = `${coordElementWithHint.left}px`;
                hint.style.top = `${coordElementWithHint.top - coordHint.height - margin}px`;
                break;
            case "right":
                hint.style.left = `${coordElementWithHint.left + coordElementWithHint.width + margin}px`;
                hint.style.top = `${coordElementWithHint.top}px`;
                break;
            case "left":
                hint.style.left = `${coordElementWithHint.left - coordHint.width - margin}px`;
                hint.style.top = `${coordElementWithHint.top}px`;
                break;
        };
    }

    allTooltips.forEach((link) => {
        createTooltip(link, margin);

        link.addEventListener('click', (e) => {
            const tooltip = e.currentTarget.nextElementSibling;
            const activeTooltip = document.querySelector('.tooltip_active');

            if (activeTooltip != tooltip) {
                if (activeTooltip) {
                    activeTooltip.classList.remove('tooltip_active');
                };
                tooltip.classList.add('tooltip_active');
                positionChange(tooltip, e.currentTarget, margin);
            } else {
                tooltip.classList.remove('tooltip_active');
            };
            e.preventDefault();
        });
    });

    const windowEvents = ['scroll', 'resize'];

    windowEvents.forEach((event) => {
        window.addEventListener(event, () => {
            const activeTooltip = document.querySelector('.tooltip_active');
            if (activeTooltip) {
                activeTooltip.classList.remove('tooltip_active');        
            };
        });  
    });
})

