'use strict';

document.addEventListener('DOMContentLoaded', function() {

    const checkboxes = document.querySelectorAll('input.interest__check');

    checkboxes.forEach((checkbox) => {
        checkbox.addEventListener('change', () => {
            let parentList = checkbox.closest('li.interest');
            setParent(parentList);
            setChildren(parentList, checkbox);
        });
    });
    
    function setParent(parentList) {
        let olderParent = parentList.parentElement.closest('li.interest');
        if (olderParent !== null) {
            let parentCheckbox = olderParent.querySelector('input.interest__check');
            let closestChildren = getClosestChildren(olderParent);
            if (closestChildren.every(item => item.checked === true)) {
                parentCheckbox.indeterminate = false;
                parentCheckbox.checked = true;
            } else if (closestChildren.some(item => (item.checked === true) || (item.indeterminate === true))) {
                parentCheckbox.checked = false;
                parentCheckbox.indeterminate = true;
            } else {
                parentCheckbox.indeterminate = false;
                parentCheckbox.checked = false;
            }
            setParent(olderParent);
        }
    }

    function getClosestChildren(parent) {
        return Array.from(parent.querySelectorAll('input.interest__check')).filter((child) => child.parentElement.parentElement.parentElement === parent.children[1]);
    }
    
    function setChildren(parentList, checkbox) {
        let closestChildren = getClosestChildren(parentList);
        closestChildren.forEach((child) => {
            child.indeterminate = false;
            child.checked = checkbox.checked === true;
            setChildren(child.closest('li.interest'), child)
        });
    }
})
