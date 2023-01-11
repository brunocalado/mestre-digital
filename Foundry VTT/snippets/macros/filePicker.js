const content = `<form>
    <div class="form-group">
        <label>Path:</label>
        <div class="form-fields">
            <input name="folder-path"><button class="picker-button"><i class="fas fa-file-import fa-fw"></i></button>
        </div>
    </div>
</form>`;


new Dialog({
    title: "test",
    content,
    buttons: {
        done: {
            label: "Done",
            callback: async(html) => {
                const path = html.find("[name=folder-path").val();
                //use path for something
                console.log(path)
            }
        }
    },
    render: listener
}).render(true);

function listener(html) {
    html.find(".picker-button").on("click", function(){
        new FilePicker({
            type: "folder",
            callback: function (path) {
              html.find("input[name=folder-path]").val(path);
        }}).render(true);
    });
}

// ---------------------------
const content = `<form>
    <div class="form-group">
        <label>field one:</label>
        <div class="form-fields">
            <input name="field-one-value">
            <button class="my-picker-button"><i class="fas fa-file-import fa-fw"></i></button>
        </div>
    </div>
    <div class="form-group">
        <label>field two:</label>
        <div class="form-fields">
            <input name="field-two-value">
        </div>
    </div>
    <div class="form-group">
        <label>field three:</label>
        <div class="form-fields">
            <input name="field-three-value" disabled value="test">
        </div>
    </div>
</form>`;

new Dialog({
    title: "test",
    content,
    buttons: {
        ok: {
            label: "OK",
            callback: async (html) => {
                //do something here with the values that were inputed.
            }
        }
    },
    render: (html) => listener(html)
}).render(true);

function listener(html) {
    html.find("button.my-picker-button").click(async () => {
        new FilePicker({
            type: "data",
            callback: async (path) => {
              html.find("input[name=field-one-value]").val(path);
        }}).render(true);
    }) 
}