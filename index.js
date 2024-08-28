document.addEventListener('DOMContentLoaded', function () {
    var faqButtons = document.querySelectorAll('.faq-header button');

    function updateIcons() {
        faqButtons.forEach(function (button) {
            var icon = button.querySelector('.toggle-icon');
            var isExpanded = button.getAttribute('aria-expanded') === 'true';

            // Set icon based on the state
            if (isExpanded) {
                icon.textContent = '-';
                icon.style.transform = 'rotate(180deg)'; // Rotate the icon when expanded
            } else {
                icon.textContent = '+';
                icon.style.transform = 'rotate(0deg)'; // Reset rotation when collapsed
            }
        });
    }

    // Add click event listeners to all FAQ buttons
    faqButtons.forEach(function (button) {
        button.addEventListener('click', function () {
            // Collapse all other FAQ sections
            faqButtons.forEach(function (btn) {
                if (btn !== button) {
                    btn.setAttribute('aria-expanded', 'false');
                }
            });
            // Expand the clicked FAQ section
            var isExpanded = button.getAttribute('aria-expanded') === 'true';
            button.setAttribute('aria-expanded', isExpanded ? 'false' : 'true');

            // Update icons for all FAQ sections
            updateIcons();
        });
    });

    // Initial call to set the correct state of icons
    updateIcons();
});
