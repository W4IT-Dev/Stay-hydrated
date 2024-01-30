

function toggleSelectedItem(parentElement) {
    let items = parentElement.querySelectorAll('.item')
    items.forEach(item => {
        item.classList.toggle('selected');
    });
}
