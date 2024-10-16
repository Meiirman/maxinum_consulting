$(function() {
    let counter = 0;
    $("[data-for-multiple-forms]").on("click", function() {
        const inputs = $($(this).data("forMultipleForms"));
        const form = $(this).parents("form");
        if (form.length === 0) {
            console.error(this, "should be inside form.")
            return;
        }
        let id = null;
        if (form.id) {
            id = form.id;
        } else {
            id = `form-${counter++}`;
            form.attr("id", id);
        }
        inputs.attr("form", id);
    });
});