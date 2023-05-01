// Export Function
function exportFields() {
  event.preventDefault();

  // Get the form element containing the ACF fields
  const form = document.querySelector('#post');

  // Create an array to store the field data
  const fieldData = [];

  // Loop through each field within the form and extract the data
  form.querySelectorAll('*[id^="acf-field_"]').forEach(function(field) {
    let fieldDataItem;

    // Extract the data based on the type of the field
    switch (field.type) {
      case 'text':
      case 'textarea':
      case 'select-one':
      case 'checkbox':
      case 'radio':
        if (field.id !== "acf-field_6440e7ffa25a1-field_6440ca7d64fb4" && field.id !== "acf-field_63f6c19111d73") {
          fieldDataItem = {
            id: field.id,
            label: field.dataset.label,
            value: field.value.replace(/\n/g, '\\n')
          };
        }
        break;
      case 'select-multiple':
        const options = [];
        field.querySelectorAll('option:checked').forEach(function(option) {
          options.push(option.value.replace(/\n/g, '\\n'));
        });
        fieldDataItem = {
          id: field.id,
          label: field.dataset.label,
          value: options
        };
        break;
      case 'url':
        fieldDataItem = {
          id: field.id,
          label: field.dataset.label,
          value: field.value.replace(/\n/g, '\\n')
        };
        break;
      case 'color':
        fieldDataItem = {
          id: field.id,
          label: field.dataset.label,
          value: field.value.replace(/\n/g, '\\n')
        };
        break;
      case 'number':
        fieldDataItem = {
          id: field.id,
          label: field.dataset.label,
          value: parseInt(field.value.replace(/\n/g, '\\n'))
        };
        break;
      case 'email':
        fieldDataItem = {
          id: field.id,
          label: field.dataset.label,
          value: field.value.replace(/\n/g, '\\n')
        };
        break;
      case 'password':
        fieldDataItem = {
          id: field.id,
          label: field.dataset.label,
          value: field.value.replace(/\n/g, '\\n')
        };
        break;
      case 'title':
        fieldDataItem = {
          id: field.id,
          label: field.dataset.label,
          value: field.value.replace(/\n/g, '\\n')
        };
        break;
    }

    // Add the field data to the array
    if (fieldDataItem) {
      fieldData.push(fieldDataItem);
    }
  });

  // Convert the array to JSON
  const jsonData = JSON.stringify(fieldData).replace(/\n/g, '\\n');

  // Create a new download link with the JSON data as the href
  const downloadLink = document.createElement("a");
  downloadLink.setAttribute("href", "data:text/plain;charset=utf-8," + encodeURIComponent(jsonData));
  const now = new Date();
  const currentDate = new Date();
  const timestamp = currentDate.getTime();
  downloadLink.setAttribute("download", `configuration_export_3pad_${timestamp}.txt`);

  document.body.appendChild(downloadLink);
  downloadLink.click();
  document.body.removeChild(downloadLink);
}


  

////import Function
function importFields() {
  event.preventDefault(); // prevent default form submission

  // Get the text input element
  const textInput = document.getElementById("import-fields");

  // Check if a text has been inputted
  if (textInput.value.length === 0) {
    showAlert("⚠️ Please input the exported settings. ⚠️");
    return;
  } else {
    try {
      // Parse the text as JSON
      const fileData = JSON.parse(decodeURIComponent(textInput.value));

      // Loop through each field and set the value
      fileData.forEach(function (field) {
        // Ignore field with ID "acf-field_63f6c19111d73" 'Delete My Site'
        if (field.id === "acf-field_63f6c19111d73") {
          return;
        }

        const inputField = document.getElementById(field.id);
        if (inputField) {
          if (inputField.classList.contains("wp-color-picker")) {
            // Use the wpColorPicker API to set the color picker value
            inputField.value = field.value;
            jQuery(inputField).wpColorPicker("color", field.value);
          } else if (inputField.type === "checkbox") {
            // Handle checkbox values
            inputField.checked = field.value;
          } else {
            inputField.value = field.value;
          }
        }
      });

      showAlert("✅ Settings imported successfully. ✅");

    } catch (e) {
      showAlert("⚠️ Failed to import settings. Please make sure the input is valid JSON. ⚠️");
    }
  }
}

  
  function showAlert(message) {
    const overlay = document.createElement("div");
    overlay.className = "overlay";
    document.body.appendChild(overlay);
  
    const alertMessage = document.createElement("div");
    alertMessage.className = "message";
    alertMessage.innerText = message;
    document.body.appendChild(alertMessage);
  
    const fadeInTime = 500;
    const fadeOutTime = 500;
    const displayTime = 3000;
  
    overlay.style.display = "block";
    alertMessage.style.display = "block";
    alertMessage.style.opacity = 0;
  
    // Fade in the alert message
    jQuery(alertMessage).animate({ opacity: 1 }, fadeInTime);
  
    // Fade out the alert message and remove the overlay after the display time
    setTimeout(function () {
      jQuery(alertMessage).animate({ opacity: 0 }, fadeOutTime, function () {
        alertMessage.parentNode.removeChild(alertMessage);
        overlay.parentNode.removeChild(overlay);
      });
    }, displayTime);
  }
  
  
  
  
  
  // Add event listeners to the buttons
  document.getElementById("export-btn").addEventListener("click", exportFields);
document.getElementById("import-btn").addEventListener("click", importFields);

///Template Import
// Get all template buttons
const templateButtons = document.querySelectorAll(".template-button");

// Add click event listener to each template button
templateButtons.forEach(function(button) {
  button.addEventListener("click", function(event) {
    // Prevent the default button behavior
    event.preventDefault();

    // Get the template ID from the data attribute
    const templateId = button.getAttribute("data-template-id");

    // Define the JSON string to import based on the template ID
    let jsonString;
    switch (templateId) {
      case "artist-template":
        jsonString = '[\n  {\n    "id": "acf-field_6381d69d45ace",\n    "value": "Music Template"\n  },\n  {\n    "id": "acf-field_6381d68145acd",\n    "value": ""\n  },\n  {\n    "id": "acf-field_631ed9cdb57bb",\n    "value": "#d3480d"\n  },\n  {\n    "id": "acf-field_63e7208925e64",\n    "value": ""\n  },\n  {\n    "id": "acf-field_63e720ba25e65",\n    "value": ""\n  },\n  {\n    "id": "acf-field_63e7213825e66",\n    "value": ""\n  },\n  {\n    "id": "acf-field_63f93c4de068e",\n    "value": "https://templatefiles.4everland.store/images/pexels-jacob-sierra-15252497.jpg"\n  },\n  {\n    "id": "acf-field_63ef1ea78dfd6",\n    "value": "No"\n  },\n  {\n    "id": "acf-field_63f51397b75e7",\n    "value": ""\n  },\n  {\n    "id": "acf-field_63f671b462884",\n    "value": ""\n  },\n  {\n    "id": "acf-field_63ab5e1358940",\n    "value": "No"\n  },\n  {\n    "id": "acf-field_6397a05a07548",\n    "value": "Yes"\n  },\n  {\n    "id": "acf-field_6397a05a0754c",\n    "value": "Welcome To"\n  },\n  {\n    "id": "acf-field_6397a05a0754f",\n    "value": "#ffffff"\n  },\n  {\n    "id": "acf-field_6397a05a07552",\n    "value": "system-ui"\n  },\n  {\n    "id": "acf-field_6397a05a07555",\n    "value": "200"\n  },\n  {\n    "id": "acf-field_639966e3debad",\n    "value": ""\n  },\n  {\n    "id": "acf-field_6399675ddebb0",\n    "value": ""\n  },\n  {\n    "id": "acf-field_6397a05a07558",\n    "value": "HOLLOW SHELLS"\n  },\n  {\n    "id": "acf-field_6397a05a0755b",\n    "value": "#ffffff"\n  },\n  {\n    "id": "acf-field_6397a05a0755e",\n    "value": "system-ui"\n  },\n  {\n    "id": "acf-field_6397a05a07561",\n    "value": "900"\n  },\n  {\n    "id": "acf-field_63996716debae",\n    "value": ""\n  },\n  {\n    "id": "acf-field_6399672ddebaf",\n    "value": ""\n  },\n  {\n    "id": "acf-field_6397a1c978b2b",\n    "value": "Yes"\n  },\n  {\n    "id": "acf-field_6397a1c978b32",\n    "value": "Live"\n  },\n  {\n    "id": "acf-field_6397a1c978b38",\n    "value": ""\n  },\n  {\n    "id": "acf-field_63997cdcd0013",\n    "value": 0\n  },\n  {\n    "id": "acf-field_63997d0bd0014",\n    "value": ""\n  },\n  {\n    "id": "acf-field_6397a1c978b35",\n    "value": ""\n  },\n  {\n    "id": "acf-field_63998027f1990",\n    "value": ""\n  },\n  {\n    "id": "acf-field_6397a1c978b3c",\n    "value": "BLOG"\n  },\n  {\n    "id": "acf-field_6397a1c978b43",\n    "value": ""\n  },\n  {\n    "id": "acf-field_63997d32d0015",\n    "value": 0\n  },\n  {\n    "id": "acf-field_63997d4fd0017",\n    "value": ""\n  },\n  {\n    "id": "acf-field_6397a1c978b3f",\n    "value": ""\n  },\n  {\n    "id": "acf-field_6399806bf1991",\n    "value": ""\n  },\n  {\n    "id": "acf-field_6397a1c978b47",\n    "value": "SHOP"\n  },\n  {\n    "id": "acf-field_6397a1c978b4e",\n    "value": ""\n  },\n  {\n    "id": "acf-field_63997d3fd0016",\n    "value": 0\n  },\n  {\n    "id": "acf-field_63997d65d0018",\n    "value": ""\n  },\n  {\n    "id": "acf-field_6397a1c978b4b",\n    "value": ""\n  },\n  {\n    "id": "acf-field_6399807cf1992",\n    "value": ""\n  },\n  {\n    "id": "acf-field_6397a1c978b51",\n    "value": "system-ui"\n  },\n  {\n    "id": "acf-field_6397a1c978b54",\n    "value": "900"\n  },\n  {\n    "id": "acf-field_6397a0fa13f1d",\n    "value": "https://templatefiles.4everland.store/images/pexels-jacob-sierra-15252497.jpg"\n  },\n  {\n    "id": "acf-field_63eb00509525b",\n    "value": 50\n  },\n  {\n    "id": "acf-field_63eb017a9525c",\n    "value": 50\n  },\n  {\n    "id": "acf-field_6397a0fa13f23",\n    "value": "#000000"\n  },\n  {\n    "id": "acf-field_63ad2d1a0bb6a",\n    "value": ""\n  },\n  {\n    "id": "acf-field_6397a0fa13f29",\n    "value": ""\n  },\n  {\n    "id": "acf-field_6397a0fa13f2c",\n    "value": ""\n  },\n  {\n    "id": "acf-field_6397a0fa13f32",\n    "value": ""\n  },\n  {\n    "id": "acf-field_63979f92a76d4",\n    "value": "Yes"\n  },\n  {\n    "id": "acf-field_63979f92a76df",\n    "value": "fas fa-newspaper"\n  },\n  {\n    "id": "acf-field_63979f92a76ee",\n    "value": "#ffffff"\n  },\n  {\n    "id": "acf-field_639cd21b02667",\n    "value": ""\n  },\n  {\n    "id": "acf-field_63979f92a76e7",\n    "value": ""\n  },\n  {\n    "id": "acf-field_6398dbff900f5",\n    "value": "No"\n  },\n  {\n    "id": "acf-field_63979f92a76f4",\n    "value": "fas fa-fire"\n  },\n  {\n    "id": "acf-field_63979f92a7705",\n    "value": "#dd3333"\n  },\n  {\n    "id": "acf-field_639cd24a02668",\n    "value": ""\n  },\n  {\n    "id": "acf-field_63979f92a76fb",\n    "value": ""\n  },\n  {\n    "id": "acf-field_6398dc4f900f6",\n    "value": ""\n  },\n  {\n    "id": "acf-field_63979f92a770b",\n    "value": ""\n  },\n  {\n    "id": "acf-field_63979f92a7720",\n    "value": ""\n  },\n  {\n    "id": "acf-field_639cd25602669",\n    "value": ""\n  },\n  {\n    "id": "acf-field_63979f92a7713",\n    "value": ""\n  },\n  {\n    "id": "acf-field_6398dc5e900f7",\n    "value": ""\n  },\n  {\n    "id": "acf-field_63979f92a7725",\n    "value": ""\n  },\n  {\n    "id": "acf-field_63979f92a772d",\n    "value": ""\n  },\n  {\n    "id": "acf-field_639cd2620266a",\n    "value": ""\n  },\n  {\n    "id": "acf-field_63979f92a7728",\n    "value": ""\n  },\n  {\n    "id": "acf-field_6398dc6d900f8",\n    "value": ""\n  },\n  {\n    "id": "acf-field_63979f1583ed8",\n    "value": "Yes"\n  },\n  {\n    "id": "acf-field_63979f1583edb",\n    "value": "youtube"\n  },\n  {\n    "id": "acf-field_63979f1583ede",\n    "value": ""\n  },\n  {\n    "id": "acf-field_639cdba321817",\n    "value": ""\n  },\n  {\n    "id": "acf-field_63979f1583ee1",\n    "value": ""\n  },\n  {\n    "id": "acf-field_63979f1583ee4",\n    "value": "twitter"\n  },\n  {\n    "id": "acf-field_63979f1583ee7",\n    "value": ""\n  },\n  {\n    "id": "acf-field_639cdbbc21818",\n    "value": ""\n  },\n  {\n    "id": "acf-field_63979f1583eea",\n    "value": ""\n  },\n  {\n    "id": "acf-field_63979f1583eed",\n    "value": "instagram"\n  },\n  {\n    "id": "acf-field_63979f1583ef1",\n    "value": ""\n  },\n  {\n    "id": "acf-field_639cdbbe21819",\n    "value": ""\n  },\n  {\n    "id": "acf-field_63979f1583ef4",\n    "value": ""\n  },\n  {\n    "id": "acf-field_63979f1583ef7",\n    "value": "facebook"\n  },\n  {\n    "id": "acf-field_63979f1583efa",\n    "value": ""\n  },\n  {\n    "id": "acf-field_639cdbc12181a",\n    "value": ""\n  },\n  {\n    "id": "acf-field_63979f1583efd",\n    "value": ""\n  },\n  {\n    "id": "acf-field_63979f1583f00",\n    "value": ""\n  },\n  {\n    "id": "acf-field_63979f1583f03",\n    "value": ""\n  },\n  {\n    "id": "acf-field_639cdbc32181b",\n    "value": ""\n  },\n  {\n    "id": "acf-field_63979f1583f06",\n    "value": ""\n  },\n  {\n    "id": "acf-field_63979f1583f09",\n    "value": ""\n  },\n  {\n    "id": "acf-field_63979f1583f0c",\n    "value": ""\n  },\n  {\n    "id": "acf-field_639cdbc42181c",\n    "value": ""\n  },\n  {\n    "id": "acf-field_63979f1583f0f",\n    "value": ""\n  },\n  {\n    "id": "acf-field_6355c49c72d25",\n    "value": "Yes"\n  },\n  {\n    "id": "acf-field_6355c54b72d27",\n    "value": "fas fa-music"\n  },\n  {\n    "id": "acf-field_63562fde64f11",\n    "value": ""\n  },\n  {\n    "id": "acf-field_63d97b01322d6",\n    "value": ""\n  },\n  {\n    "id": "acf-field_6355c56972d28",\n    "value": "fab fa-youtube"\n  },\n  {\n    "id": "acf-field_63562fec64f12",\n    "value": ""\n  },\n  {\n    "id": "acf-field_63d97af2322d5",\n    "value": ""\n  },\n  {\n    "id": "acf-field_6355c56d72d29",\n    "value": "fas fa-comment"\n  },\n  {\n    "id": "acf-field_63562ff364f13",\n    "value": ""\n  },\n  {\n    "id": "acf-field_63d97aa5322d4",\n    "value": ""\n  },\n  {\n    "id": "acf-field_6355c57872d2b",\n    "value": ""\n  },\n  {\n    "id": "acf-field_6355c59072d2c",\n    "value": ""\n  },\n  {\n    "id": "acf-field_63d580c992c2d",\n    "value": "Discord"\n  },\n  {\n    "id": "acf-field_63d580c992c30",\n    "value": ""\n  },\n  {\n    "id": "acf-field_63d580c992c33",\n    "value": ""\n  },\n  {\n    "id": "acf-field_63d580c992c40",\n    "value": 0\n  },\n  {\n    "id": "acf-field_63d580c992c46",\n    "value": "1"\n  },\n  {\n    "id": "acf-field_63d580c992c4c",\n    "value": "1061496413474783352"\n  },\n  {\n    "id": "acf-field_63d580c992c51",\n    "value": "1067294783153901588"\n  },\n  {\n    "id": "acf-field_63ef19eb313f0",\n    "value": "embed1-button"\n  },\n  {\n    "id": "acf-field_63d580c992c5f",\n    "value": "https://template.typeform.com/to/QurPHBFr"\n  },\n  {\n    "id": "acf-field_63d580c992c67",\n    "value": "Yes"\n  },\n  {\n    "id": "acf-field_63ef19b6313ef",\n    "value": ""\n  },\n  {\n    "id": "acf-field_63d583e00ae4f",\n    "value": ""\n  },\n  {\n    "id": "acf-field_63d583e70ae51",\n    "value": ""\n  },\n  {\n    "id": "acf-field_63ef196c313ee",\n    "value": ""\n  },\n  {\n    "id": "acf-field_63d584140ae62",\n    "value": ""\n  },\n  {\n    "id": "acf-field_63d583ee0ae54",\n    "value": ""\n  },\n  {\n    "id": "acf-field_63ef1923313ed",\n    "value": ""\n  },\n  {\n    "id": "acf-field_63d584190ae66",\n    "value": ""\n  },\n  {\n    "id": "acf-field_63d583f40ae58",\n    "value": ""\n  },\n  {\n    "id": "acf-field_63d9871ea201f",\n    "value": "embed2-button"\n  },\n  {\n    "id": "acf-field_63d583d10ae4c",\n    "value": "https://app.huddle01.com/qjx-yqwd-bay"\n  },\n  {\n    "id": "acf-field_63d583dc0ae4e",\n    "value": "Yes"\n  },\n  {\n    "id": "acf-field_63ef1b0d313f5",\n    "value": "embed4-button"\n  },\n  {\n    "id": "acf-field_63d584110ae60",\n    "value": "https://mirror.xyz/cryptojeter.eth"\n  },\n  {\n    "id": "acf-field_63d583ea0ae52",\n    "value": "Yes"\n  },\n  {\n    "id": "acf-field_63ef1ae3313f4",\n    "value": "embed5-button"\n  },\n  {\n    "id": "acf-field_63d584120ae61",\n    "value": "https://www.ketnipz.com/collections/spring-2023"\n  },\n  {\n    "id": "acf-field_63d583eb0ae53",\n    "value": "Yes"\n  },\n  {\n    "id": "acf-field_63ef1a9d313f3",\n    "value": "embed7-button"\n  },\n  {\n    "id": "acf-field_63d584150ae63",\n    "value": "https://audius.co/embed/playlist/QZ4R1vG?flavor=card"\n  },\n  {\n    "id": "acf-field_63d583f00ae55",\n    "value": ""\n  },\n  {\n    "id": "acf-field_63ef1a67313f2",\n    "value": "embed8-button"\n  },\n  {\n    "id": "acf-field_63d584160ae64",\n    "value": "https://www.youtube.com/embed/videoseries?list=PLhsz9CILh357zA1yMT-K5T9ZTNEU6Fl6n"\n  },\n  {\n    "id": "acf-field_63d583f10ae56",\n    "value": ""\n  },\n  {\n    "id": "acf-field_63ef1a31313f1",\n    "value": "comments-button"\n  },\n  {\n    "id": "acf-field_63d584170ae65",\n    "value": ""\n  },\n  {\n    "id": "acf-field_63d583f20ae57",\n    "value": ""\n  }\n]';
        break;
      case "podcast-template":
        jsonString = '[{"id":"acf-field_6381d69d45ace","value":"Podcast Template"},{"id":"acf-field_6381d68145acd","value":"https://templatefiles.4everland.store/images/719777127b0d68741c89f12f14dfba1612137084.jpeg"},{"id":"acf-field_631ed9cdb57bb","value":"#5fd615"},{"id":"acf-field_63e7208925e64","value":""},{"id":"acf-field_63e720ba25e65","value":""},{"id":"acf-field_63e7213825e66","value":""},{"id":"acf-field_63f93c4de068e","value":"https://templatefiles.4everland.store/images/719777127b0d68741c89f12f14dfba1612137084.jpeg"},{"id":"acf-field_63ef1ea78dfd6","value":"Yes"},{"id":"acf-field_63f51397b75e7","value":""},{"id":"acf-field_63f671b462884","value":""},{"id":"acf-field_63ab5e1358940","value":"No"},{"id":"acf-field_6397a05a07548","value":"Yes"},{"id":"acf-field_6397a05a0754c","value":"TUNE IN"},{"id":"acf-field_6397a05a0754f","value":"#ffffff"},{"id":"acf-field_6397a05a07552","value":"system-ui"},{"id":"acf-field_6397a05a07555","value":"200"},{"id":"acf-field_639966e3debad","value":""},{"id":"acf-field_6399675ddebb0","value":""},{"id":"acf-field_6397a05a07558","value":"IN THE 乙ᗝᑎᗴ WITH 𝙺𝙰𝚃𝙸𝙴"},{"id":"acf-field_6397a05a0755b","value":"#ffffff"},{"id":"acf-field_6397a05a0755e","value":"Trebuchet MS"},{"id":"acf-field_6397a05a07561","value":"900"},{"id":"acf-field_63996716debae","value":""},{"id":"acf-field_6399672ddebaf","value":""},{"id":"acf-field_6397a1c978b2b","value":"Yes"},{"id":"acf-field_6397a1c978b32","value":"𝑳𝑰𝑽𝑬"},{"id":"acf-field_6397a1c978b38","value":"#90d65e"},{"id":"acf-field_63997cdcd0013","value":1},{"id":"acf-field_63997d0bd0014","value":""},{"id":"acf-field_6397a1c978b35","value":""},{"id":"acf-field_63998027f1990","value":""},{"id":"acf-field_6397a1c978b3c","value":"𝑩𝑳𝑶𝑮"},{"id":"acf-field_6397a1c978b43","value":"#ffffff"},{"id":"acf-field_63997d32d0015","value":1},{"id":"acf-field_63997d4fd0017","value":""},{"id":"acf-field_6397a1c978b3f","value":""},{"id":"acf-field_6399806bf1991","value":""},{"id":"acf-field_6397a1c978b47","value":"𝑺𝑼𝑩𝑺𝑪𝑹𝑰𝑩𝑬"},{"id":"acf-field_6397a1c978b4e","value":""},{"id":"acf-field_63997d3fd0016","value":1},{"id":"acf-field_63997d65d0018","value":""},{"id":"acf-field_6397a1c978b4b","value":""},{"id":"acf-field_6399807cf1992","value":""},{"id":"acf-field_6397a1c978b51","value":"Arial"},{"id":"acf-field_6397a1c978b54","value":"900"},{"id":"acf-field_6397a0fa13f1d","value":"https://templatefiles.4everland.store/images/pexels-antoni-shkraba-production-8412316.jpg"},{"id":"acf-field_63eb00509525b","value":48},{"id":"acf-field_63eb017a9525c","value":25},{"id":"acf-field_6397a0fa13f23","value":"#000000"},{"id":"acf-field_63ad2d1a0bb6a","value":"Yes"},{"id":"acf-field_6397a0fa13f29","value":"Youtube"},{"id":"acf-field_6397a0fa13f2c","value":"xVY7paiKPjk"},{"id":"acf-field_6397a0fa13f32","value":""},{"id":"acf-field_63979f92a76d4","value":"Yes"},{"id":"acf-field_63979f92a76df","value":""},{"id":"acf-field_63979f92a76ee","value":""},{"id":"acf-field_639cd21b02667","value":""},{"id":"acf-field_63979f92a76e7","value":""},{"id":"acf-field_6398dbff900f5","value":"No"},{"id":"acf-field_63979f92a76f4","value":""},{"id":"acf-field_63979f92a7705","value":""},{"id":"acf-field_639cd24a02668","value":""},{"id":"acf-field_63979f92a76fb","value":""},{"id":"acf-field_6398dc4f900f6","value":""},{"id":"acf-field_63979f92a770b","value":""},{"id":"acf-field_63979f92a7720","value":""},{"id":"acf-field_639cd25602669","value":""},{"id":"acf-field_63979f92a7713","value":""},{"id":"acf-field_6398dc5e900f7","value":""},{"id":"acf-field_63979f92a7725","value":""},{"id":"acf-field_63979f92a772d","value":""},{"id":"acf-field_639cd2620266a","value":""},{"id":"acf-field_63979f92a7728","value":""},{"id":"acf-field_6398dc6d900f8","value":""},{"id":"acf-field_63979f1583ed8","value":"Yes"},{"id":"acf-field_63979f1583edb","value":"youtube"},{"id":"acf-field_63979f1583ede","value":"#dd3333"},{"id":"acf-field_639cdba321817","value":""},{"id":"acf-field_63979f1583ee1","value":""},{"id":"acf-field_63979f1583ee4","value":"twitter"},{"id":"acf-field_63979f1583ee7","value":"#1e73be"},{"id":"acf-field_639cdbbc21818","value":""},{"id":"acf-field_63979f1583eea","value":""},{"id":"acf-field_63979f1583eed","value":"instagram"},{"id":"acf-field_63979f1583ef1","value":"#ea25ea"},{"id":"acf-field_639cdbbe21819","value":""},{"id":"acf-field_63979f1583ef4","value":""},{"id":"acf-field_63979f1583ef7","value":"facebook"},{"id":"acf-field_63979f1583efa","value":"#1e73be"},{"id":"acf-field_639cdbc12181a","value":""},{"id":"acf-field_63979f1583efd","value":""},{"id":"acf-field_63979f1583f00","value":""},{"id":"acf-field_63979f1583f03","value":""},{"id":"acf-field_639cdbc32181b","value":""},{"id":"acf-field_63979f1583f06","value":""},{"id":"acf-field_63979f1583f09","value":""},{"id":"acf-field_63979f1583f0c","value":""},{"id":"acf-field_639cdbc42181c","value":""},{"id":"acf-field_63979f1583f0f","value":""},{"id":"acf-field_6355c49c72d25","value":"Yes"},{"id":"acf-field_6355c54b72d27","value":"fas fa-video"},{"id":"acf-field_63562fde64f11","value":""},{"id":"acf-field_63d97b01322d6","value":""},{"id":"acf-field_6355c56972d28","value":"fas fa-comments"},{"id":"acf-field_63562fec64f12","value":""},{"id":"acf-field_63d97af2322d5","value":""},{"id":"acf-field_6355c56d72d29","value":"fab fa-vimeo"},{"id":"acf-field_63562ff364f13","value":""},{"id":"acf-field_63d97aa5322d4","value":""},{"id":"acf-field_6355c57872d2b","value":"#81d742"},{"id":"acf-field_6355c59072d2c","value":"#ffffff"},{"id":"acf-field_63d580c992c2d","value":"Disqus"},{"id":"acf-field_63d580c992c30","value":"767795799"},{"id":"acf-field_63d580c992c33","value":""},{"id":"acf-field_63d580c992c40","value":0},{"id":"acf-field_63d580c992c46","value":"1"},{"id":"acf-field_63d580c992c4c","value":"1061496413474783352"},{"id":"acf-field_63d580c992c51","value":"1067294783153901588"},{"id":"acf-field_63ef19eb313f0","value":""},{"id":"acf-field_63d580c992c5f","value":"https://pip.me/3pad"},{"id":"acf-field_63d580c992c67","value":"No"},{"id":"acf-field_63ef19b6313ef","value":""},{"id":"acf-field_63d583e00ae4f","value":""},{"id":"acf-field_63d583e70ae51","value":"Yes"},{"id":"acf-field_63ef196c313ee","value":""},{"id":"acf-field_63d584140ae62","value":""},{"id":"acf-field_63d583ee0ae54","value":""},{"id":"acf-field_63ef1923313ed","value":"embed10-button"},{"id":"acf-field_63d584190ae66","value":"https://w.soundcloud.com/player/?visual=true&amp;url=https://api.soundcloud.com/users/123678639&amp;show_artwork=true"},{"id":"acf-field_63d583f40ae58","value":""},{"id":"acf-field_63d9871ea201f","value":"embed2-button"},{"id":"acf-field_63d583d10ae4c","value":"https://meet.jit.si/3Pad-Demo"},{"id":"acf-field_63d583dc0ae4e","value":"Yes"},{"id":"acf-field_63ef1b0d313f5","value":"embed4-button"},{"id":"acf-field_63d584110ae60","value":"https://mirror.xyz/cryptojeter.eth"},{"id":"acf-field_63d583ea0ae52","value":"Yes"},{"id":"acf-field_63ef1ae3313f4","value":"embed5-button"},{"id":"acf-field_63d584120ae61","value":"https://template.typeform.com/to/QurPHBFr"},{"id":"acf-field_63d583eb0ae53","value":"Yes"},{"id":"acf-field_63ef1a9d313f3","value":"embed7-button"},{"id":"acf-field_63d584150ae63","value":"https://www.youtube.com/embed/videoseries?list=PLgc0GNip2uYV8XvkugaH0VlNT-xxhTHOI"},{"id":"acf-field_63d583f00ae55","value":"No"},{"id":"acf-field_63ef1a67313f2","value":"comments-button"},{"id":"acf-field_63d584160ae64","value":""},{"id":"acf-field_63d583f10ae56","value":""},{"id":"acf-field_63ef1a31313f1","value":"embed9-button"},{"id":"acf-field_63d584170ae65","value":"https://player.vimeo.com/video/498433383?h=2c0e186bc4&amp;app_id=122963&amp;byline=0&amp;badge=0&amp;portrait=0&amp;title=0"},{"id":"acf-field_63d583f20ae57","value":""}]';
        break;
      case "model-template":
        jsonString = '[\n  {\n    "id": "acf-field_6381d69d45ace",\n    "value": "Model Template"\n  },\n  {\n    "id": "acf-field_6381d68145acd",\n    "value": ""\n  },\n  {\n    "id": "acf-field_631ed9cdb57bb",\n    "value": "#d3480d"\n  },\n  {\n    "id": "acf-field_63e7208925e64",\n    "value": ""\n  },\n  {\n    "id": "acf-field_63e720ba25e65",\n    "value": ""\n  },\n  {\n    "id": "acf-field_63e7213825e66",\n    "value": ""\n  },\n  {\n    "id": "acf-field_63f93c4de068e",\n    "value": "https://templatefiles.4everland.store/images/pexels-arianna-jade%CC%81-4006513.jpg"\n  },\n  {\n    "id": "acf-field_63ef1ea78dfd6",\n    "value": "Yes"\n  },\n  {\n    "id": "acf-field_63f51397b75e7",\n    "value": ""\n  },\n  {\n    "id": "acf-field_63f671b462884",\n    "value": ""\n  },\n  {\n    "id": "acf-field_63ab5e1358940",\n    "value": "Yes"\n  },\n  {\n    "id": "acf-field_6397a05a07548",\n    "value": "Yes"\n  },\n  {\n    "id": "acf-field_6397a05a0754c",\n    "value": "Hi, I Model"\n  },\n  {\n    "id": "acf-field_6397a05a0754f",\n    "value": "#ffffff"\n  },\n  {\n    "id": "acf-field_6397a05a07552",\n    "value": "system-ui"\n  },\n  {\n    "id": "acf-field_6397a05a07555",\n    "value": "200"\n  },\n  {\n    "id": "acf-field_639966e3debad",\n    "value": ""\n  },\n  {\n    "id": "acf-field_6399675ddebb0",\n    "value": ""\n  },\n  {\n    "id": "acf-field_6397a05a07558",\n    "value": "JENICE HEART"\n  },\n  {\n    "id": "acf-field_6397a05a0755b",\n    "value": "#ffffff"\n  },\n  {\n    "id": "acf-field_6397a05a0755e",\n    "value": "system-ui"\n  },\n  {\n    "id": "acf-field_6397a05a07561",\n    "value": "300"\n  },\n  {\n    "id": "acf-field_63996716debae",\n    "value": ""\n  },\n  {\n    "id": "acf-field_6399672ddebaf",\n    "value": ""\n  },\n  {\n    "id": "acf-field_6397a1c978b2b",\n    "value": "Yes"\n  },\n  {\n    "id": "acf-field_6397a1c978b32",\n    "value": "BOOK ME"\n  },\n  {\n    "id": "acf-field_6397a1c978b38",\n    "value": ""\n  },\n  {\n    "id": "acf-field_63997cdcd0013",\n    "value": 0\n  },\n  {\n    "id": "acf-field_63997d0bd0014",\n    "value": ""\n  },\n  {\n    "id": "acf-field_6397a1c978b35",\n    "value": ""\n  },\n  {\n    "id": "acf-field_63998027f1990",\n    "value": ""\n  },\n  {\n    "id": "acf-field_6397a1c978b3c",\n    "value": "BLOG"\n  },\n  {\n    "id": "acf-field_6397a1c978b43",\n    "value": ""\n  },\n  {\n    "id": "acf-field_63997d32d0015",\n    "value": 0\n  },\n  {\n    "id": "acf-field_63997d4fd0017",\n    "value": ""\n  },\n  {\n    "id": "acf-field_6397a1c978b3f",\n    "value": ""\n  },\n  {\n    "id": "acf-field_6399806bf1991",\n    "value": ""\n  },\n  {\n    "id": "acf-field_6397a1c978b47",\n    "value": "CHAT"\n  },\n  {\n    "id": "acf-field_6397a1c978b4e",\n    "value": ""\n  },\n  {\n    "id": "acf-field_63997d3fd0016",\n    "value": 0\n  },\n  {\n    "id": "acf-field_63997d65d0018",\n    "value": ""\n  },\n  {\n    "id": "acf-field_6397a1c978b4b",\n    "value": ""\n  },\n  {\n    "id": "acf-field_6399807cf1992",\n    "value": ""\n  },\n  {\n    "id": "acf-field_6397a1c978b51",\n    "value": "system-ui"\n  },\n  {\n    "id": "acf-field_6397a1c978b54",\n    "value": "200"\n  },\n  {\n    "id": "acf-field_6397a0fa13f1d",\n    "value": "https://templatefiles.4everland.store/images/pexels-arianna-jade%CC%81-4006513.jpg"\n  },\n  {\n    "id": "acf-field_63eb00509525b",\n    "value": 50\n  },\n  {\n    "id": "acf-field_63eb017a9525c",\n    "value": 25\n  },\n  {\n    "id": "acf-field_6397a0fa13f23",\n    "value": "#000000"\n  },\n  {\n    "id": "acf-field_63ad2d1a0bb6a",\n    "value": "No"\n  },\n  {\n    "id": "acf-field_6397a0fa13f29",\n    "value": ""\n  },\n  {\n    "id": "acf-field_6397a0fa13f2c",\n    "value": ""\n  },\n  {\n    "id": "acf-field_6397a0fa13f32",\n    "value": "https://templatefiles.4everland.store/videos/pexels-cottonbro-studio-6652239-1366x720-25fps.mp4"\n  },\n  {\n    "id": "acf-field_63979f92a76d4",\n    "value": "Yes"\n  },\n  {\n    "id": "acf-field_63979f92a76df",\n    "value": "fas fa-dollar-sign"\n  },\n  {\n    "id": "acf-field_63979f92a76ee",\n    "value": "#59e547"\n  },\n  {\n    "id": "acf-field_639cd21b02667",\n    "value": ""\n  },\n  {\n    "id": "acf-field_63979f92a76e7",\n    "value": ""\n  },\n  {\n    "id": "acf-field_6398dbff900f5",\n    "value": "No"\n  },\n  {\n    "id": "acf-field_63979f92a76f4",\n    "value": "fas fa-video"\n  },\n  {\n    "id": "acf-field_63979f92a7705",\n    "value": "#dd3333"\n  },\n  {\n    "id": "acf-field_639cd24a02668",\n    "value": ""\n  },\n  {\n    "id": "acf-field_63979f92a76fb",\n    "value": ""\n  },\n  {\n    "id": "acf-field_6398dc4f900f6",\n    "value": ""\n  },\n  {\n    "id": "acf-field_63979f92a770b",\n    "value": "fas fa-heart"\n  },\n  {\n    "id": "acf-field_63979f92a7720",\n    "value": "#ea23bc"\n  },\n  {\n    "id": "acf-field_639cd25602669",\n    "value": ""\n  },\n  {\n    "id": "acf-field_63979f92a7713",\n    "value": ""\n  },\n  {\n    "id": "acf-field_6398dc5e900f7",\n    "value": ""\n  },\n  {\n    "id": "acf-field_63979f92a7725",\n    "value": "fas fa-music"\n  },\n  {\n    "id": "acf-field_63979f92a772d",\n    "value": "#dbef21"\n  },\n  {\n    "id": "acf-field_639cd2620266a",\n    "value": ""\n  },\n  {\n    "id": "acf-field_63979f92a7728",\n    "value": ""\n  },\n  {\n    "id": "acf-field_6398dc6d900f8",\n    "value": ""\n  },\n  {\n    "id": "acf-field_63979f1583ed8",\n    "value": "Yes"\n  },\n  {\n    "id": "acf-field_63979f1583edb",\n    "value": "youtube"\n  },\n  {\n    "id": "acf-field_63979f1583ede",\n    "value": ""\n  },\n  {\n    "id": "acf-field_639cdba321817",\n    "value": ""\n  },\n  {\n    "id": "acf-field_63979f1583ee1",\n    "value": ""\n  },\n  {\n    "id": "acf-field_63979f1583ee4",\n    "value": "twitter"\n  },\n  {\n    "id": "acf-field_63979f1583ee7",\n    "value": ""\n  },\n  {\n    "id": "acf-field_639cdbbc21818",\n    "value": ""\n  },\n  {\n    "id": "acf-field_63979f1583eea",\n    "value": ""\n  },\n  {\n    "id": "acf-field_63979f1583eed",\n    "value": "instagram"\n  },\n  {\n    "id": "acf-field_63979f1583ef1",\n    "value": ""\n  },\n  {\n    "id": "acf-field_639cdbbe21819",\n    "value": ""\n  },\n  {\n    "id": "acf-field_63979f1583ef4",\n    "value": ""\n  },\n  {\n    "id": "acf-field_63979f1583ef7",\n    "value": "facebook"\n  },\n  {\n    "id": "acf-field_63979f1583efa",\n    "value": ""\n  },\n  {\n    "id": "acf-field_639cdbc12181a",\n    "value": ""\n  },\n  {\n    "id": "acf-field_63979f1583efd",\n    "value": ""\n  },\n  {\n    "id": "acf-field_63979f1583f00",\n    "value": ""\n  },\n  {\n    "id": "acf-field_63979f1583f03",\n    "value": ""\n  },\n  {\n    "id": "acf-field_639cdbc32181b",\n    "value": ""\n  },\n  {\n    "id": "acf-field_63979f1583f06",\n    "value": ""\n  },\n  {\n    "id": "acf-field_63979f1583f09",\n    "value": ""\n  },\n  {\n    "id": "acf-field_63979f1583f0c",\n    "value": ""\n  },\n  {\n    "id": "acf-field_639cdbc42181c",\n    "value": ""\n  },\n  {\n    "id": "acf-field_63979f1583f0f",\n    "value": ""\n  },\n  {\n    "id": "acf-field_6355c49c72d25",\n    "value": ""\n  },\n  {\n    "id": "acf-field_6355c54b72d27",\n    "value": "fas fa-music"\n  },\n  {\n    "id": "acf-field_63562fde64f11",\n    "value": ""\n  },\n  {\n    "id": "acf-field_63d97b01322d6",\n    "value": ""\n  },\n  {\n    "id": "acf-field_6355c56972d28",\n    "value": "fab fa-youtube"\n  },\n  {\n    "id": "acf-field_63562fec64f12",\n    "value": ""\n  },\n  {\n    "id": "acf-field_63d97af2322d5",\n    "value": ""\n  },\n  {\n    "id": "acf-field_6355c56d72d29",\n    "value": "fas fa-comment"\n  },\n  {\n    "id": "acf-field_63562ff364f13",\n    "value": ""\n  },\n  {\n    "id": "acf-field_63d97aa5322d4",\n    "value": ""\n  },\n  {\n    "id": "acf-field_6355c57872d2b",\n    "value": ""\n  },\n  {\n    "id": "acf-field_6355c59072d2c",\n    "value": ""\n  },\n  {\n    "id": "acf-field_63d580c992c2d",\n    "value": "Telegram"\n  },\n  {\n    "id": "acf-field_63d580c992c30",\n    "value": ""\n  },\n  {\n    "id": "acf-field_63d580c992c33",\n    "value": "NNuQGtJo"\n  },\n  {\n    "id": "acf-field_63d580c992c40",\n    "value": 5\n  },\n  {\n    "id": "acf-field_63d580c992c46",\n    "value": "1"\n  },\n  {\n    "id": "acf-field_63d580c992c4c",\n    "value": "1061496413474783352"\n  },\n  {\n    "id": "acf-field_63d580c992c51",\n    "value": "1067294783153901588"\n  },\n  {\n    "id": "acf-field_63ef19eb313f0",\n    "value": "embed1-button"\n  },\n  {\n    "id": "acf-field_63d580c992c5f",\n    "value": "https://pip.me/3pad"\n  },\n  {\n    "id": "acf-field_63d580c992c67",\n    "value": "No"\n  },\n  {\n    "id": "acf-field_63ef19b6313ef",\n    "value": "embed3-button"\n  },\n  {\n    "id": "acf-field_63d583e00ae4f",\n    "value": "https://meet.jit.si/3Pad-Demo"\n  },\n  {\n    "id": "acf-field_63d583e70ae51",\n    "value": "Yes"\n  },\n  {\n    "id": "acf-field_63ef196c313ee",\n    "value": ""\n  },\n  {\n    "id": "acf-field_63d584140ae62",\n    "value": "https://hello.com"\n  },\n  {\n    "id": "acf-field_63d583ee0ae54",\n    "value": ""\n  },\n  {\n    "id": "acf-field_63ef1923313ed",\n    "value": "embed10-button"\n  },\n  {\n    "id": "acf-field_63d584190ae66",\n    "value": "https://w.soundcloud.com/player/?visual=true&amp;url=https%3A%2F%2Fapi.soundcloud.com%2Fusers%2F123678639&amp;show_artwork=true"\n  },\n  {\n    "id": "acf-field_63d583f40ae58",\n    "value": ""\n  },\n  {\n    "id": "acf-field_63d9871ea201f",\n    "value": "embed2-button"\n  },\n  {\n    "id": "acf-field_63d583d10ae4c",\n    "value": "https://template.typeform.com/to/QurPHBFr"\n  },\n  {\n    "id": "acf-field_63d583dc0ae4e",\n    "value": "Yes"\n  },\n  {\n    "id": "acf-field_63ef1b0d313f5",\n    "value": "embed4-button"\n  },\n  {\n    "id": "acf-field_63d584110ae60",\n    "value": "https://mirror.xyz/cryptojeter.eth"\n  },\n  {\n    "id": "acf-field_63d583ea0ae52",\n    "value": "Yes"\n  },\n  {\n    "id": "acf-field_63ef1ae3313f4",\n    "value": "comments-button"\n  },\n  {\n    "id": "acf-field_63d584120ae61",\n    "value": "https://www.ketnipz.com/collections/spring-2023"\n  },\n  {\n    "id": "acf-field_63d583eb0ae53",\n    "value": "Yes"\n  },\n  {\n    "id": "acf-field_63ef1a9d313f3",\n    "value": ""\n  },\n  {\n    "id": "acf-field_63d584150ae63",\n    "value": "https://audius.co/embed/playlist/QZ4R1vG?flavor=card"\n  },\n  {\n    "id": "acf-field_63d583f00ae55",\n    "value": ""\n  },\n  {\n    "id": "acf-field_63ef1a67313f2",\n    "value": ""\n  },\n  {\n    "id": "acf-field_63d584160ae64",\n    "value": "https://www.youtube.com/embed/videoseries?list=PLhsz9CILh357zA1yMT-K5T9ZTNEU6Fl6n"\n  },\n  {\n    "id": "acf-field_63d583f10ae56",\n    "value": ""\n  },\n  {\n    "id": "acf-field_63ef1a31313f1",\n    "value": ""\n  },\n  {\n    "id": "acf-field_63d584170ae65",\n    "value": ""\n  },\n  {\n    "id": "acf-field_63d583f20ae57",\n    "value": ""\n  }\n]';
        break;
      case "restaurant-template":
        jsonString = '[\n  {\n    "id": "acf-field_6381d69d45ace",\n    "value": "Restaurant Template"\n  },\n  {\n    "id": "acf-field_6381d68145acd",\n    "value": "https://templatefiles.4everland.store/images/Restaurant-Logo-PNG-Download-Image-992193378.png"\n  },\n  {\n    "id": "acf-field_631ed9cdb57bb",\n    "value": "#776015"\n  },\n  {\n    "id": "acf-field_63e7208925e64",\n    "value": ""\n  },\n  {\n    "id": "acf-field_63e720ba25e65",\n    "value": ""\n  },\n  {\n    "id": "acf-field_63e7213825e66",\n    "value": ""\n  },\n  {\n    "id": "acf-field_63f93c4de068e",\n    "value": "https://templatefiles.4everland.store/images/Restaurant-Logo-PNG-Download-Image-992193378.png"\n  },\n  {\n    "id": "acf-field_63ef1ea78dfd6",\n    "value": "Yes"\n  },\n  {\n    "id": "acf-field_63f51397b75e7",\n    "value": ""\n  },\n  {\n    "id": "acf-field_63f671b462884",\n    "value": ""\n  },\n  {\n    "id": "acf-field_63ab5e1358940",\n    "value": "No"\n  },\n  {\n    "id": "acf-field_6397a05a07548",\n    "value": "Yes"\n  },\n  {\n    "id": "acf-field_6397a05a0754c",\n    "value": "We’re Open"\n  },\n  {\n    "id": "acf-field_6397a05a0754f",\n    "value": "#ffffff"\n  },\n  {\n    "id": "acf-field_6397a05a07552",\n    "value": "system-ui"\n  },\n  {\n    "id": "acf-field_6397a05a07555",\n    "value": "200"\n  },\n  {\n    "id": "acf-field_639966e3debad",\n    "value": ""\n  },\n  {\n    "id": "acf-field_6399675ddebb0",\n    "value": ""\n  },\n  {\n    "id": "acf-field_6397a05a07558",\n    "value": "DRAGONS LOUNGE"\n  },\n  {\n    "id": "acf-field_6397a05a0755b",\n    "value": "#ffffff"\n  },\n  {\n    "id": "acf-field_6397a05a0755e",\n    "value": "Times New Roman"\n  },\n  {\n    "id": "acf-field_6397a05a07561",\n    "value": "300"\n  },\n  {\n    "id": "acf-field_63996716debae",\n    "value": ""\n  },\n  {\n    "id": "acf-field_6399672ddebaf",\n    "value": ""\n  },\n  {\n    "id": "acf-field_6397a1c978b2b",\n    "value": "Yes"\n  },\n  {\n    "id": "acf-field_6397a1c978b32",\n    "value": "RESERVE"\n  },\n  {\n    "id": "acf-field_6397a1c978b38",\n    "value": ""\n  },\n  {\n    "id": "acf-field_63997cdcd0013",\n    "value": 0\n  },\n  {\n    "id": "acf-field_63997d0bd0014",\n    "value": ""\n  },\n  {\n    "id": "acf-field_6397a1c978b35",\n    "value": ""\n  },\n  {\n    "id": "acf-field_63998027f1990",\n    "value": ""\n  },\n  {\n    "id": "acf-field_6397a1c978b3c",\n    "value": "LOCATIONS"\n  },\n  {\n    "id": "acf-field_6397a1c978b43",\n    "value": ""\n  },\n  {\n    "id": "acf-field_63997d32d0015",\n    "value": 0\n  },\n  {\n    "id": "acf-field_63997d4fd0017",\n    "value": ""\n  },\n  {\n    "id": "acf-field_6397a1c978b3f",\n    "value": ""\n  },\n  {\n    "id": "acf-field_6399806bf1991",\n    "value": ""\n  },\n  {\n    "id": "acf-field_6397a1c978b47",\n    "value": "MENU"\n  },\n  {\n    "id": "acf-field_6397a1c978b4e",\n    "value": ""\n  },\n  {\n    "id": "acf-field_63997d3fd0016",\n    "value": 0\n  },\n  {\n    "id": "acf-field_63997d65d0018",\n    "value": ""\n  },\n  {\n    "id": "acf-field_6397a1c978b4b",\n    "value": ""\n  },\n  {\n    "id": "acf-field_6399807cf1992",\n    "value": ""\n  },\n  {\n    "id": "acf-field_6397a1c978b51",\n    "value": "Times New Roman"\n  },\n  {\n    "id": "acf-field_6397a1c978b54",\n    "value": "900"\n  },\n  {\n    "id": "acf-field_6397a0fa13f1d",\n    "value": "https://templatefiles.4everland.store/images/pexels-yente-van-eynde-2403391.jpg"\n  },\n  {\n    "id": "acf-field_63eb00509525b",\n    "value": 50\n  },\n  {\n    "id": "acf-field_63eb017a9525c",\n    "value": 25\n  },\n  {\n    "id": "acf-field_6397a0fa13f23",\n    "value": "#000000"\n  },\n  {\n    "id": "acf-field_63ad2d1a0bb6a",\n    "value": "Yes"\n  },\n  {\n    "id": "acf-field_6397a0fa13f29",\n    "value": "Vimeo"\n  },\n  {\n    "id": "acf-field_6397a0fa13f2c",\n    "value": "243486454"\n  },\n  {\n    "id": "acf-field_6397a0fa13f32",\n    "value": ""\n  },\n  {\n    "id": "acf-field_63979f92a76d4",\n    "value": "Yes"\n  },\n  {\n    "id": "acf-field_63979f92a76df",\n    "value": "fas fa-comment"\n  },\n  {\n    "id": "acf-field_63979f92a76ee",\n    "value": "#eeee22"\n  },\n  {\n    "id": "acf-field_639cd21b02667",\n    "value": ""\n  },\n  {\n    "id": "acf-field_63979f92a76e7",\n    "value": ""\n  },\n  {\n    "id": "acf-field_6398dbff900f5",\n    "value": "No"\n  },\n  {\n    "id": "acf-field_63979f92a76f4",\n    "value": ""\n  },\n  {\n    "id": "acf-field_63979f92a7705",\n    "value": "#dd3333"\n  },\n  {\n    "id": "acf-field_639cd24a02668",\n    "value": ""\n  },\n  {\n    "id": "acf-field_63979f92a76fb",\n    "value": ""\n  },\n  {\n    "id": "acf-field_6398dc4f900f6",\n    "value": ""\n  },\n  {\n    "id": "acf-field_63979f92a770b",\n    "value": ""\n  },\n  {\n    "id": "acf-field_63979f92a7720",\n    "value": "#ea23bc"\n  },\n  {\n    "id": "acf-field_639cd25602669",\n    "value": ""\n  },\n  {\n    "id": "acf-field_63979f92a7713",\n    "value": ""\n  },\n  {\n    "id": "acf-field_6398dc5e900f7",\n    "value": ""\n  },\n  {\n    "id": "acf-field_63979f92a7725",\n    "value": ""\n  },\n  {\n    "id": "acf-field_63979f92a772d",\n    "value": "#dbef21"\n  },\n  {\n    "id": "acf-field_639cd2620266a",\n    "value": ""\n  },\n  {\n    "id": "acf-field_63979f92a7728",\n    "value": ""\n  },\n  {\n    "id": "acf-field_6398dc6d900f8",\n    "value": ""\n  },\n  {\n    "id": "acf-field_63979f1583ed8",\n    "value": "Yes"\n  },\n  {\n    "id": "acf-field_63979f1583edb",\n    "value": "snapchat"\n  },\n  {\n    "id": "acf-field_63979f1583ede",\n    "value": ""\n  },\n  {\n    "id": "acf-field_639cdba321817",\n    "value": ""\n  },\n  {\n    "id": "acf-field_63979f1583ee1",\n    "value": ""\n  },\n  {\n    "id": "acf-field_63979f1583ee4",\n    "value": "twitter"\n  },\n  {\n    "id": "acf-field_63979f1583ee7",\n    "value": ""\n  },\n  {\n    "id": "acf-field_639cdbbc21818",\n    "value": ""\n  },\n  {\n    "id": "acf-field_63979f1583eea",\n    "value": ""\n  },\n  {\n    "id": "acf-field_63979f1583eed",\n    "value": "instagram"\n  },\n  {\n    "id": "acf-field_63979f1583ef1",\n    "value": ""\n  },\n  {\n    "id": "acf-field_639cdbbe21819",\n    "value": ""\n  },\n  {\n    "id": "acf-field_63979f1583ef4",\n    "value": ""\n  },\n  {\n    "id": "acf-field_63979f1583ef7",\n    "value": "facebook"\n  },\n  {\n    "id": "acf-field_63979f1583efa",\n    "value": ""\n  },\n  {\n    "id": "acf-field_639cdbc12181a",\n    "value": ""\n  },\n  {\n    "id": "acf-field_63979f1583efd",\n    "value": ""\n  },\n  {\n    "id": "acf-field_63979f1583f00",\n    "value": "pinterest"\n  },\n  {\n    "id": "acf-field_63979f1583f03",\n    "value": ""\n  },\n  {\n    "id": "acf-field_639cdbc32181b",\n    "value": ""\n  },\n  {\n    "id": "acf-field_63979f1583f06",\n    "value": ""\n  },\n  {\n    "id": "acf-field_63979f1583f09",\n    "value": "dribbble"\n  },\n  {\n    "id": "acf-field_63979f1583f0c",\n    "value": ""\n  },\n  {\n    "id": "acf-field_639cdbc42181c",\n    "value": ""\n  },\n  {\n    "id": "acf-field_63979f1583f0f",\n    "value": ""\n  },\n  {\n    "id": "acf-field_6355c49c72d25",\n    "value": ""\n  },\n  {\n    "id": "acf-field_6355c54b72d27",\n    "value": "fas fa-music"\n  },\n  {\n    "id": "acf-field_63562fde64f11",\n    "value": ""\n  },\n  {\n    "id": "acf-field_63d97b01322d6",\n    "value": ""\n  },\n  {\n    "id": "acf-field_6355c56972d28",\n    "value": "fab fa-youtube"\n  },\n  {\n    "id": "acf-field_63562fec64f12",\n    "value": ""\n  },\n  {\n    "id": "acf-field_63d97af2322d5",\n    "value": ""\n  },\n  {\n    "id": "acf-field_6355c56d72d29",\n    "value": "fas fa-comment"\n  },\n  {\n    "id": "acf-field_63562ff364f13",\n    "value": ""\n  },\n  {\n    "id": "acf-field_63d97aa5322d4",\n    "value": ""\n  },\n  {\n    "id": "acf-field_6355c57872d2b",\n    "value": ""\n  },\n  {\n    "id": "acf-field_6355c59072d2c",\n    "value": ""\n  },\n  {\n    "id": "acf-field_63d580c992c2d",\n    "value": "Disqus"\n  },\n  {\n    "id": "acf-field_63d580c992c30",\n    "value": "767795799"\n  },\n  {\n    "id": "acf-field_63d580c992c33",\n    "value": ""\n  },\n  {\n    "id": "acf-field_63d580c992c40",\n    "value": 0\n  },\n  {\n    "id": "acf-field_63d580c992c46",\n    "value": "1"\n  },\n  {\n    "id": "acf-field_63d580c992c4c",\n    "value": "1061496413474783352"\n  },\n  {\n    "id": "acf-field_63d580c992c51",\n    "value": "1067294783153901588"\n  },\n  {\n    "id": "acf-field_63ef19eb313f0",\n    "value": "comments-button"\n  },\n  {\n    "id": "acf-field_63d580c992c5f",\n    "value": "https://pip.me/3pad"\n  },\n  {\n    "id": "acf-field_63d580c992c67",\n    "value": "No"\n  },\n  {\n    "id": "acf-field_63ef19b6313ef",\n    "value": ""\n  },\n  {\n    "id": "acf-field_63d583e00ae4f",\n    "value": ""\n  },\n  {\n    "id": "acf-field_63d583e70ae51",\n    "value": "Yes"\n  },\n  {\n    "id": "acf-field_63ef196c313ee",\n    "value": ""\n  },\n  {\n    "id": "acf-field_63d584140ae62",\n    "value": ""\n  },\n  {\n    "id": "acf-field_63d583ee0ae54",\n    "value": ""\n  },\n  {\n    "id": "acf-field_63ef1923313ed",\n    "value": ""\n  },\n  {\n    "id": "acf-field_63d584190ae66",\n    "value": ""\n  },\n  {\n    "id": "acf-field_63d583f40ae58",\n    "value": ""\n  },\n  {\n    "id": "acf-field_63d9871ea201f",\n    "value": "embed2-button"\n  },\n  {\n    "id": "acf-field_63d583d10ae4c",\n    "value": "https://template.typeform.com/to/QurPHBFr"\n  },\n  {\n    "id": "acf-field_63d583dc0ae4e",\n    "value": "Yes"\n  },\n  {\n    "id": "acf-field_63ef1b0d313f5",\n    "value": "embed4-button"\n  },\n  {\n    "id": "acf-field_63d584110ae60",\n    "value": "https://www.yelp.com/map/stk-steakhouse-dallas"\n  },\n  {\n    "id": "acf-field_63d583ea0ae52",\n    "value": ""\n  },\n  {\n    "id": "acf-field_63ef1ae3313f4",\n    "value": "embed5-button"\n  },\n  {\n    "id": "acf-field_63d584120ae61",\n    "value": "https://m.yelp.com/menu/stk-steakhouse-las-vegas-2"\n  },\n  {\n    "id": "acf-field_63d583eb0ae53",\n    "value": "Yes"\n  },\n  {\n    "id": "acf-field_63ef1a9d313f3",\n    "value": ""\n  },\n  {\n    "id": "acf-field_63d584150ae63",\n    "value": "https://audius.co/embed/playlist/QZ4R1vG?flavor=card"\n  },\n  {\n    "id": "acf-field_63d583f00ae55",\n    "value": ""\n  },\n  {\n    "id": "acf-field_63ef1a67313f2",\n    "value": ""\n  },\n  {\n    "id": "acf-field_63d584160ae64",\n    "value": "https://www.youtube.com/embed/videoseries?list=PLhsz9CILh357zA1yMT-K5T9ZTNEU6Fl6n"\n  },\n  {\n    "id": "acf-field_63d583f10ae56",\n    "value": ""\n  },\n  {\n    "id": "acf-field_63ef1a31313f1",\n    "value": ""\n  },\n  {\n    "id": "acf-field_63d584170ae65",\n    "value": ""\n  },\n  {\n    "id": "acf-field_63d583f20ae57",\n    "value": ""\n  }\n]';
        break;
      case "reset-template":
        jsonString = '[{"id":"acf-field_6381d69d45ace","value":"Get Started"},{"id":"acf-field_6381d68145acd","value":""},{"id":"acf-field_631ed9cdb57bb","value":"#000"},{"id":"acf-field_63e7208925e64","value":""},{"id":"acf-field_63e720ba25e65","value":""},{"id":"acf-field_63e7213825e66","value":""},{"id":"acf-field_63f93c4de068e","value":"https://ipfs.io/ipfs/QmeJ13XnVj1pdEnCGzRQEKLsmPUhzTCd8ryArBwmRDK2CB"},{"id":"acf-field_63ef1ea78dfd6","value":"No"},{"id":"acf-field_63f51397b75e7","value":""},{"id":"acf-field_63f671b462884","value":""},{"id":"acf-field_63ab5e1358940","value":"No"},{"id":"acf-field_63f6c19111d73","value":""},{"id":"acf-field_6397a05a07548","value":""},{"id":"acf-field_6397a05a0754c","value":""},{"id":"acf-field_6397a05a0754f","value":"#FFF"},{"id":"acf-field_6397a05a07552","value":"system-ui"},{"id":"acf-field_6397a05a07555","value":"200"},{"id":"acf-field_639966e3debad","value":""},{"id":"acf-field_6399675ddebb0","value":""},{"id":"acf-field_6397a05a07558","value":""},{"id":"acf-field_6397a05a0755b","value":"#FFF"},{"id":"acf-field_6397a05a0755e","value":"system-ui"},{"id":"acf-field_6397a05a07561","value":"900"},{"id":"acf-field_63996716debae","value":""},{"id":"acf-field_6399672ddebaf","value":""},{"id":"acf-field_6397a1c978b2b","value":""},{"id":"acf-field_6397a1c978b32","value":""},{"id":"acf-field_6397a1c978b38","value":""},{"id":"acf-field_63997cdcd0013","value":null},{"id":"acf-field_63997d0bd0014","value":""},{"id":"acf-field_6397a1c978b35","value":""},{"id":"acf-field_63998027f1990","value":""},{"id":"acf-field_6397a1c978b3c","value":""},{"id":"acf-field_6397a1c978b43","value":""},{"id":"acf-field_63997d32d0015","value":null},{"id":"acf-field_63997d4fd0017","value":""},{"id":"acf-field_6397a1c978b3f","value":""},{"id":"acf-field_6399806bf1991","value":""},{"id":"acf-field_6397a1c978b47","value":""},{"id":"acf-field_6397a1c978b4e","value":""},{"id":"acf-field_63997d3fd0016","value":null},{"id":"acf-field_63997d65d0018","value":""},{"id":"acf-field_6397a1c978b4b","value":""},{"id":"acf-field_6399807cf1992","value":""},{"id":"acf-field_6397a1c978b51","value":"system-ui"},{"id":"acf-field_6397a1c978b54","value":"900"},{"id":"acf-field_6397a0fa13f1d","value":"https://media.giphy.com/media/xTkcEQACH24SMPxIQg/giphy.gif"},{"id":"acf-field_63eb00509525b","value":50},{"id":"acf-field_63eb017a9525c","value":50},{"id":"acf-field_6397a0fa13f23","value":"#f7cc65"},{"id":"acf-field_63ad2d1a0bb6a","value":""},{"id":"acf-field_6397a0fa13f29","value":""},{"id":"acf-field_6397a0fa13f2c","value":""},{"id":"acf-field_6397a0fa13f32","value":""},{"id":"acf-field_63979f92a76d4","value":""},{"id":"acf-field_63979f92a76df","value":""},{"id":"acf-field_63979f92a76ee","value":""},{"id":"acf-field_639cd21b02667","value":""},{"id":"acf-field_63979f92a76e7","value":""},{"id":"acf-field_6398dbff900f5","value":""},{"id":"acf-field_63979f92a76f4","value":""},{"id":"acf-field_63979f92a7705","value":""},{"id":"acf-field_639cd24a02668","value":""},{"id":"acf-field_63979f92a76fb","value":""},{"id":"acf-field_6398dc4f900f6","value":""},{"id":"acf-field_63979f92a770b","value":""},{"id":"acf-field_63979f92a7720","value":""},{"id":"acf-field_639cd25602669","value":""},{"id":"acf-field_63979f92a7713","value":""},{"id":"acf-field_6398dc5e900f7","value":""},{"id":"acf-field_63979f92a7725","value":""},{"id":"acf-field_63979f92a772d","value":""},{"id":"acf-field_639cd2620266a","value":""},{"id":"acf-field_63979f92a7728","value":""},{"id":"acf-field_6398dc6d900f8","value":""},{"id":"acf-field_63979f1583ed8","value":""},{"id":"acf-field_63979f1583edb","value":""},{"id":"acf-field_63979f1583ede","value":""},{"id":"acf-field_639cdba321817","value":""},{"id":"acf-field_63979f1583ee1","value":""},{"id":"acf-field_63979f1583ee4","value":""},{"id":"acf-field_63979f1583ee7","value":""},{"id":"acf-field_639cdbbc21818","value":""},{"id":"acf-field_63979f1583eea","value":""},{"id":"acf-field_63979f1583eed","value":""},{"id":"acf-field_63979f1583ef1","value":""},{"id":"acf-field_639cdbbe21819","value":""},{"id":"acf-field_63979f1583ef4","value":""},{"id":"acf-field_63979f1583ef7","value":""},{"id":"acf-field_63979f1583efa","value":""},{"id":"acf-field_639cdbc12181a","value":""},{"id":"acf-field_63979f1583efd","value":""},{"id":"acf-field_63979f1583f00","value":""},{"id":"acf-field_63979f1583f03","value":""},{"id":"acf-field_639cdbc32181b","value":""},{"id":"acf-field_63979f1583f06","value":""},{"id":"acf-field_63979f1583f09","value":""},{"id":"acf-field_63979f1583f0c","value":""},{"id":"acf-field_639cdbc42181c","value":""},{"id":"acf-field_63979f1583f0f","value":""},{"id":"acf-field_6355c49c72d25","value":""},{"id":"acf-field_6355c54b72d27","value":""},{"id":"acf-field_63562fde64f11","value":""},{"id":"acf-field_63d97b01322d6","value":""},{"id":"acf-field_6355c56972d28","value":""},{"id":"acf-field_63562fec64f12","value":""},{"id":"acf-field_63d97af2322d5","value":""},{"id":"acf-field_6355c56d72d29","value":""},{"id":"acf-field_63562ff364f13","value":""},{"id":"acf-field_63d97aa5322d4","value":""},{"id":"acf-field_6355c57872d2b","value":""},{"id":"acf-field_6355c59072d2c","value":""},{"id":"acf-field_63d580c992c2d","value":""},{"id":"acf-field_63d580c992c30","value":""},{"id":"acf-field_63d580c992c33","value":""},{"id":"acf-field_63d580c992c40","value":null},{"id":"acf-field_63d580c992c46","value":"1"},{"id":"acf-field_63d580c992c4c","value":""},{"id":"acf-field_63d580c992c51","value":""},{"id":"acf-field_63ef19eb313f0","value":""},{"id":"acf-field_63d580c992c5f","value":""},{"id":"acf-field_63d580c992c67","value":""},{"id":"acf-field_63ef19b6313ef","value":""},{"id":"acf-field_63d583e00ae4f","value":""},{"id":"acf-field_63d583e70ae51","value":""},{"id":"acf-field_63ef196c313ee","value":""},{"id":"acf-field_63d584140ae62","value":""},{"id":"acf-field_63d583ee0ae54","value":""},{"id":"acf-field_63ef1923313ed","value":""},{"id":"acf-field_63d584190ae66","value":""},{"id":"acf-field_63d583f40ae58","value":""},{"id":"acf-field_63d9871ea201f","value":""},{"id":"acf-field_63d583d10ae4c","value":""},{"id":"acf-field_63d583dc0ae4e","value":""},{"id":"acf-field_63ef1b0d313f5","value":""},{"id":"acf-field_63d584110ae60","value":""},{"id":"acf-field_63d583ea0ae52","value":""},{"id":"acf-field_63ef1ae3313f4","value":""},{"id":"acf-field_63d584120ae61","value":""},{"id":"acf-field_63d583eb0ae53","value":""},{"id":"acf-field_63ef1a9d313f3","value":""},{"id":"acf-field_63d584150ae63","value":""},{"id":"acf-field_63d583f00ae55","value":""},{"id":"acf-field_63ef1a67313f2","value":""},{"id":"acf-field_63d584160ae64","value":""},{"id":"acf-field_63d583f10ae56","value":""},{"id":"acf-field_63ef1a31313f1","value":""},{"id":"acf-field_63d584170ae65","value":""},{"id":"acf-field_63d583f20ae57","value":""}]';
        break;
      default:
        jsonString = "";
        break;
    }

    // Set the input value of "import-fields" to the JSON string
    const importFieldsInput = document.getElementById("import-fields");
    importFieldsInput.value = jsonString;

    // Click the "import-btn" button
    const importBtn = document.getElementById("import-btn");
    importBtn.click();

      // Click the "update" button
    const updateBtn = document.getElementById("publish");
    updateBtn.click();
  });
});




//Disable button Save
const templateDirects = document.querySelectorAll(".export-btn");
templateDirects.forEach(function(templateDirect) {
  templateDirect.addEventListener("click", function (event) {
    // Prevent the default button behavior
    event.preventDefault();

  // Define an array of link types and their corresponding redirect URLs
  const linkTypes = [
    { type: "artist-link", url: "https://3pad.eth.limo/music-template-demo" },
    { type: "podcast-link", url: "https://3pad.eth.limo/podcast-template-demo" },
      { type: "model-link", url: "https://3pad.eth.limo/model-template-demo" },
      { type: "restaurant-link", url: "https://3pad.eth.limo/restaurant-template-demo" },

    // Add more link types and URLs as needed
  ];

  // Loop through each link type and add an event listener that redirects to the specified URL
  linkTypes.forEach((link) => {
    const myLinks = document.getElementsByClassName(link.type);

        for (let i = 0; i < myLinks.length; i++) {
        myLinks[i].addEventListener("click", function () {
            window.open(link.url, "_blank");
        });
        }
    });
    });
});




  
///Help Button Js

  jQuery(document).ready(function($){
    $('.help-button').on('click', function() {
      $('.help-button-wrapper').toggleClass('expanded');
    });
    });

    jQuery(document).ready(function($){
      $(window).scroll(function(){
          if($(this).scrollTop() > 10){
              $('#wpadminbar').addClass('sticky');
          }
          else{
              $('#wpadminbar').removeClass('sticky');
          }
      });
  });

  
  ////Preview Button on home page customization
  jQuery(document).ready(function ($) {
    // Get the current URL

    const previewButton = $('#post-preview');
    const previewHref = previewButton.attr('href');
    const previewIndex = previewHref.indexOf('?preview=true');
    const siteUrl = previewHref.substring(0, previewIndex)
                              .replace(/\/$/, '') // Remove any trailing slashes
                              .replace(/(\/\/[^\/]+)(.*)/, "$1$2");

    

// Use the siteUrl variable in your code
      
  

      ///Site Preview
      $('#publishing-action').after('<iframe id="preview-frame"  src="' + siteUrl + '/?customize-home=' + Date.now() + '" title="Site Preview"></iframe>');

          ///Launch Button
      //$('#publishing-action').after('<div class="button button-primary button-large launch-bt" id="preview-bt" style=" background: #397939; width: 30%; ">Launch</div></a>');

      //Preview Button
      $('#publishing-action').after('<div class="button button-primary button-large" id="preview-bt" style=" width: 100%; ">Preview</div>');

      $('#preview-bt').click(function() {
        $('#preview-frame').toggleClass('show');
        if ($('#preview-frame').hasClass('show')) {
            $(this).text('❌ Close ❌');
            $(this).css('background-color', 'red');
        } else {
            $(this).text('Preview');
            $(this).css('background-color', '');
        }
    });

  });
  


  jQuery(document).ready(function($){
    $(window).scroll(function(){
        if($(this).scrollTop() > 100){
            $('#major-publishing-actions').addClass('sticky');
        }
        else{
            $('#major-publishing-actions').removeClass('sticky');
        }
    });
});

//Ajax Fields Update
jQuery(document).ready(function($) {
  var acfFields =
    '#post input[id^="acf-field_"][type!="button"][type!="submit"][type!="reset"][type!="hidden"][type!="checkbox"][type!="radio"], #post select[id^="acf-field_"], #post textarea[id^="acf-field_"], #post input[type="checkbox"][id^="acf-field_"], #post input[type="radio"][id^="acf-field_"], #post input[type="color"][id^="acf-field_"], #post input[type="hidden"][name^="acf["]';

  var exportDB = _.debounce(function() {
    // Clear the previous content of the textarea before inserting the new value
    $('#acf-field_6440e7ffa25a1-field_6440ca7d64fb4').val('');

    var data = [];
      $(acfFields).each(function() {
        var input = $(this);
        data.push({
          id: input.attr('id'),
          value: input.val()
        });
      });
      var json = JSON.stringify(data).replace(/\n/g, '\\n');


    $('#acf-field_6440e7ffa25a1-field_6440ca7d64fb4')
      .val(json)
      .prop('readonly', true);

    // Trigger a click event on the "Publish" button to save the changes
    $('#publish').trigger('click');
  }, 1000); // debounce time in milliseconds

  $(document).on('change input', acfFields, function() {
    exportDB();
  });

  $('#publish').click(function(event) {
    event.preventDefault();
    var data = $('#post').serialize();
    $.ajax({
      url: $('#post').attr('action'),
      type: 'POST',
      data: data,
      success: function(response) {
        $('#preview-frame').attr('src', $('#preview-frame').attr('src'));
      },
      error: function(jqXHR, textStatus, errorThrown) {
        // handle error
      },
    });
  });
});

////Set Exported Settings as read-only
jQuery(document).ready(function($) {
    $('#acf-field_6440e7ffa25a1-field_6440ca7d64fb4').prop('readonly', true);
  });
  

/////Export DB Default
function exportDB() {
  // Get the form element containing the ACF fields
  const form = document.querySelector('#post');

  // Create an array to store the field data
  const fieldData = [];

  // Loop through each field within the form and extract the data
  form.querySelectorAll('*[id^="acf-field_"]').forEach(function(field) {
    let fieldDataItem;

    // Extract the data based on the type of the field
    switch (field.type) {
      case 'text':
      case 'textarea':
      case 'select-one':
      case 'checkbox':
      case 'radio':
        fieldDataItem = {
          id: field.id,
          value: field.value
        };
        break;
      case 'select-multiple':
        const options = [];
        field.querySelectorAll('option:checked').forEach(function(option) {
          options.push(option.value);
        });
        fieldDataItem = {
          id: field.id,
          value: options
        };
        break;
      case 'url':
        fieldDataItem = {
          id: field.id,
          value: field.value
        };
        break;
      case 'color':
        fieldDataItem = {
          id: field.id,
          value: field.value
        };
        break;
      case 'number':
        fieldDataItem = {
          id: field.id,
          value: parseInt(field.value)
        };
        break;
      case 'email':
        fieldDataItem = {
          id: field.id,
          value: field.value
        };
        break;
      case 'password':
        fieldDataItem = {
          id: field.id,
          value: field.value
        };
        break;
      case 'title':
        fieldDataItem = {
          id: field.id,
          value: field.value
        };
        break;
    }

    // Add the field data to the array
    if (fieldDataItem) {
      fieldData.push(fieldDataItem);
    }
  });

  // Convert the array to JSON
  const jsonData = JSON.stringify(fieldData, null, 2).replace(/\n/g, '\\n');

  // Set the JSON data as the value of the acf-field_6440ca7d64fb4 textarea
  const textarea = document.getElementById('acf-field_6440ca7d64fb4');
  textarea.value = jsonData;

  // Trigger a change event on the textarea to ensure that ACF registers the change
  const event = new Event('change', { bubbles: true });
  textarea.dispatchEvent(event);

  // Export the ACF IDs as a comma-separated list
  const acfIds = fieldData.map(function(fieldDataItem) {
    return fieldDataItem.id;
  });
  const acfIdString = acfIds.join(',');

  // Output the ACF IDs to the console
  console.log(acfIdString);
}

 
  // Get all the divs that need to trigger the function
  document.querySelectorAll('.button_home,  .menu_2, .menu_3, .menu_4, .menu_5').forEach(function(div) {
    div.addEventListener('click', function() {
      const clickedClass = this.className;
  
      const classNamesToIds = {
        'button_home': ['acf-group_631eb2a8420ad'],
        'menu_2': ['acf-group_6397a05a059e5', 'acf-group_6397a1c97725f'],
        'menu_3': ['acf-group_63979f92a5a19', 'acf-group_63979f158189e', 'acf-group_6355c49be70b4'],
        'menu_4': ['acf-group_63d580c989edc'],
        'menu_5': ['acf-group_6397a0fa1244c'],
      }
  
      Object.keys(classNamesToIds).forEach(function(className) {
        const divIdsToHide = classNamesToIds[className];
        divIdsToHide.forEach(function(divId) {
          const divToHide = document.getElementById(divId);
          if (className === clickedClass) {
            if (divToHide.classList.contains('show-acf')) {
              // do nothing if the div is already visible
            } else {
              divToHide.classList.add('show-acf');
              divToHide.classList.remove('hide-acf');
            }
          } else {
            divToHide.classList.add('hide-acf');
            divToHide.classList.remove('show-acf');
          }
        });
      });
    });
  });
  
  
  ////Hide Acf Fields On Load
  const idsToHideOnLoad = ['acf-group_6397a0fa1244c','acf-group_6397a05a059e5', 'acf-group_6397a1c97725f', 'acf-group_63979f92a5a19', 'acf-group_63979f158189e', 'acf-group_6355c49be70b4', 'acf-group_63d580c989edc'];

  idsToHideOnLoad.forEach(function(id) {
    const divToHide = document.getElementById(id);
    divToHide.classList.add('hide-acf');
  });
  
  ///Add BG color To Div
  // Select all the elements with the specified classes
  const elements = document.querySelectorAll('.button_home, .text-links, .menu_2, .menu_3, .menu_4, .menu_5');

  // Loop through the selected elements
  elements.forEach(element => {
    // Add a click event listener to each element
    element.addEventListener('click', () => {
      // Remove the styles from all elements
      elements.forEach(e => {
        e.style.background = '';
        e.style.borderRadius = '';
        e.classList.remove('bounce');
      });
  
      // Add the styles to the clicked element and trigger the bounce animation
      element.style.background = '#d32a2a';
      element.style.borderRadius = '20px';
      element.classList.add('bounce');
    });
  });
  


///Change Header On Click
function updateHeadingText() {
    const heading = document.querySelector("#wpbody-content > div.wrap > h1");
    const buttonHome = document.querySelector(".button_home");
    const textLinks = document.querySelector(".text-links");
    const menu2 = document.querySelector(".menu_2");
    const menu3 = document.querySelector(".menu_3");
    const menu4 = document.querySelector(".menu_4");
    const menu5 = document.querySelector(".menu_5");
  
    
  
    buttonHome.addEventListener("click", () => {
      heading.textContent = "Dashboard";
    });
  
    textLinks.addEventListener("click", () => {
      heading.textContent = "Text Links";
    });
  
    menu2.addEventListener("click", () => {
      heading.textContent = "Text Links";
    });
  
    menu3.addEventListener("click", () => {
      heading.textContent = "Icons";
    });
  
    menu4.addEventListener("click", () => {
      heading.textContent = "Embeds";
    });
  
    menu5.addEventListener("click", () => {
      heading.textContent = "Background";
    });
  }
  
  updateHeadingText();
  
  