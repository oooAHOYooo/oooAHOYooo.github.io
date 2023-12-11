let todoList = [];

function addFeature() {
    let versionInput = document.getElementById('versionInput');
    let featureInput = document.getElementById('featureInput');
    let emotionSelect = document.getElementById('emotionSelect');
    let featureListElement = document.getElementById('featureList');
    let timestamp = new Date().toLocaleString();

    let newFeature = {
        version: versionInput.value,
        feature: featureInput.value,
        emotion: emotionSelect.value,
        timestamp: timestamp,
        completed: false
    };
    todoList.push(newFeature);

    let listItem = document.createElement('li');
    listItem.textContent = `Version: ${newFeature.version} - Feature: ${newFeature.feature} - Emotion: ${newFeature.emotion} - Added on: ${newFeature.timestamp}`;
    let checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.onchange = function() {
        newFeature.completed = this.checked;
    };
    listItem.prepend(checkbox);
    featureListElement.appendChild(listItem);

    versionInput.value = '';
    featureInput.value = '';
}

function saveTodoList() {
    if (todoList.length === 0) {
        alert("No features to save");
        return;
    }
    let latestFeature = todoList[todoList.length - 1];
    let filename = `TodoList_Version_${latestFeature.version}_Timestamp_${latestFeature.timestamp.replace(/[\W_]+/g, "_")}.json`;
    let blob = new Blob([JSON.stringify(todoList)], {type: "text/plain;charset=utf-8"});
    saveAs(blob, filename);
}

function loadTodoList() {
    const fileInput = document.getElementById('fileInput');
    if (fileInput.files.length > 0) {
        const reader = new FileReader();
        reader.onload = function(event) {
            try {
                todoList = JSON.parse(event.target.result);
                updateFeatureList();
            } catch (e) {
                alert("Failed to load file");
            }
        };
        reader.readAsText(fileInput.files[0]);
    }
}

function updateFeatureList() {
    const featureListElement = document.getElementById('featureList');
    featureListElement.innerHTML = ''; // Clear existing list
    todoList.forEach((feature) => {
        let listItem = document.createElement('li');
        listItem.textContent = `Version: ${feature.version} - Feature: ${feature.feature} - Emotion: ${feature.emotion} - Added on: ${feature.timestamp}`;
        let checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.checked = feature.completed;
        checkbox.onchange = function() {
            feature.completed = this.checked;
        };
        listItem.prepend(checkbox);
        featureListElement.appendChild(listItem);
    });
}
