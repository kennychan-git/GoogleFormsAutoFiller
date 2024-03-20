/**
* Fills inputs on forms page with the data
*/
function FillGoogleForms() {
    chrome.storage.sync.get("formData", function(result) {
        formData = result["formData"];
        var FormElement = document.getElementsByTagName("form")[0];
        
        // Fill text fields
        var selectorStr = "input[type='text'], input[type='email'], input[type='number'], input[type='tel'], input[type='url']";
        var fields = FormElement.querySelectorAll(selectorStr);
        fields.forEach(function(item) {
            var formTitle = item.closest("div[role='listitem']").querySelector("div[role='heading']").firstChild.textContent;
            var answer = formData[formTitle.trim()];
            if (answer) {
                item.value = answer;
                item.setAttribute("data-initial-value", answer);
                item.setAttribute("badinput", "false");
                // TODO: find the class that hides input inside text by reversed css finding
                item.nextElementSibling.style.display = "none";
            }
        });

        // Fill textareas
        var fields = FormElement.querySelectorAll("textarea");
        fields.forEach(function(item) {
            var formTitle = item.closest("div[role='listitem']").querySelector("div[role='heading']").firstChild.textContent;
            var answer = formData[formTitle.trim()];
            if (answer) {
                item.value = answer;
                item.setAttribute("data-initial-value", answer);
                item.setAttribute("badinput", "false");
                // TODO: find the class that hides input inside text by reversed css finding
                item.parentElement.previousElementSibling.style.display = "none";
            }
        });

        // Handle multiple options presented as buttons or checkboxes
        var multiOptionFields = FormElement.querySelectorAll("[role='checkbox'], [role='menuitemcheckbox'], [role='radio']");
        multiOptionFields.forEach(function(option) {
            var formTitle = option.closest("div[role='listitem']").querySelector("div[role='heading']").firstChild.textContent;
            var answer = formData[formTitle.trim()];
            if (answer && option.textContent.trim() === answer) {
                option.click();
            }
        });
    });
}

window.onload = FillGoogleForms;
