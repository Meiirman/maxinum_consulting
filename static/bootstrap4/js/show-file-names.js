$(function() {
    $("[data-show-file-names]").on("change", function() {
        const id = $(this).attr("id");
        const input = this;
        $(`label[for="${id}"]`).text(function(_, text) {
            if (!$(this).data("empty")) $(this).data("empty", text);
            const result = Array.from(input.files).map(file => file.name).join(", ");
            return result ? result : $(this).data("empty");
        });
    });
});