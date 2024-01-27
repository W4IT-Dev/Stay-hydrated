const items = document.querySelectorAll('.item');

// Initial setup
toggleSelectedItem();

// Function to toggle selected item
function toggleSelectedItem() {
    items.forEach(item => {
        item.classList.toggle('selected');
    });
}
