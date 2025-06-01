function togglePassword(fieldId, toggleElement) {
    const input = document.getElementById(fieldId)
    const icon = toggleElement.querySelector('i')
    if (input.type === 'password') {
        input.type = 'text'
        icon.classList.remove('fa-eye')
        icon.classList.add('fa-eye-slash')
    } else {
        input.type = 'password'
        icon.classList.remove('fa-eye-slash')
        icon.classList.add('fa-eye')
    }
}
document.addEventListener("DOMContentLoaded", function () {
    const deleteButtons = document.querySelectorAll(".delete-btn");
    deleteButtons.forEach(button => {
        button.addEventListener("click", function (e) {
            e.preventDefault(); // prevent immediate navigation
            const url = this.getAttribute("href");
            const name = this.getAttribute("data-name") || "this item";
            Swal.fire({
                title: `Are you sure?`,
                text: `You are about to delete "${name}". This action cannot be undone!`,
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#d33",
                cancelButtonColor: "#3085d6",
                confirmButtonText: "Yes, delete it!"
            }).then((result) => {
                if (result.isConfirmed) {
                    window.location.href = url; // Proceed with the delete
                }
            });
        });
    });
});