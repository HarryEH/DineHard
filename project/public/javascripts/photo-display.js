var input = document.getElementById("image_uploads");
var preview = document.getElementById("preview");

input.addEventListener('change', updateImageDisplay);

var fileTypes = ['image/jpeg', 'image/pjpeg', 'image/png'];

/**
 * Updates the display to contain the previews for all images selected for upload
 */
function updateImageDisplay() {
    while(preview.firstChild) {
        preview.removeChild(preview.firstChild);
    }

    var curFiles = input.files;
    if(curFiles.length === 0) {
        var para = document.createElement('p');
        para.textContent = 'No files currently selected for upload';
        preview.appendChild(para);
    } else {
        var list = document.createElement('ol');
        preview.appendChild(list);
        for(var i = 0; i < curFiles.length; i++) {
            var listItem = document.createElement('li');
            var para = document.createElement('p');
            if(validFileType(curFiles[i])) {
                para.textContent = 'File name ' + curFiles[i].name + ', file size ' + returnFileSize(curFiles[i].size) + '.';
                var image = document.createElement('img');
                image.className = "photo-preview";
                image.src = window.URL.createObjectURL(curFiles[i]);

                listItem.appendChild(image);
                listItem.appendChild(para);
            } else {
                para.textContent = 'File name ' + curFiles[i].name + ': Not a valid file type. Update your selection.';
                listItem.appendChild(para);
            }

            list.appendChild(listItem);
        }
    }
}

/**
 * Determines whether a file is of a valid file type
 * @param file the file to be tested
 * @return boolean if file is valid or not
 */
function validFileType(file) {
    for(var i = 0; i < fileTypes.length; i++) {
        if(file.type === fileTypes[i]) {
            return true;
        }
    }
    return false;
}

/**
 * Formats the file size and returns the formatted string
 * @param number size of the file in bytes
 * @return string formatted file size
 */
function returnFileSize(number) {
    if(number < 1024) {
        return number + 'bytes';
    } else if(number >= 1024 && number < 1048576) {
        return (number/1024).toFixed(1) + 'KB';
    } else if(number >= 1048576) {
        return (number/1048576).toFixed(1) + 'MB';
    }
}