var selectedRow = null

function onFormSubmit() {
    if (validate()) {
        var formData = readFormData();
        if (selectedRow == null)
            insertNewRecord(formData);
        else
            updateRecord(formData);
        resetForm();
    }
}

function readFormData() {
    var formData = {};
    formData["name"] = document.getElementById("name").value;
    formData["tweet"] = document.getElementById("tweet").value;
    // formData["salary"] = document.getElementById("salary").value;
    // formData["city"] = document.getElementById("city").value;
    return formData;
}

function insertNewRecord(data) {
    var table = document.getElementById("employeeList").getElementsByTagName('tbody')[0];
    // console.log(table)
    // var newRow = table.insertRow(table.length);
    // 上のだと最後に追加するが、つぶやきって最初の行に追加する方がいいよね。
    var newRow = table.insertRow(0);

    cell1 = newRow.insertCell(0);
    cell1.innerHTML = data.name;
    cell2 = newRow.insertCell(1);
    cell2.innerHTML = data.tweet;
    cell3 = newRow.insertCell(2);

    var today = new Date();
    const dayname = ['日', '月', '火', '水', '木', '金', '土'];
    date = today.getFullYear() + "/" + (Number(today.getMonth()) + 1) + "/" + today.getDate() + "/" + dayname[today.getDay()] + "/" + today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    cell3.innerHTML = date;
    // cell3.innerHTML = data.salary;
    // cell4 = newRow.insertCell(3);
    // cell4.innerHTML = data.city;
    // cell4 = newRow.insertCell(4);
    cell4 = newRow.insertCell(3);
    cell4.innerHTML = `<a onClick="onEdit(this)">Edit</a>
                           <a onClick="onDelete(this)">Delete</a>`;
}

function resetForm() {
    document.getElementById("name").value = "";
    document.getElementById("tweet").value = "";
    // document.getElementById("salary").value = "";
    // document.getElementById("city").value = "";
    selectedRow = null;
}

function onEdit(td) {
    selectedRow = td.parentElement.parentElement;
    // console.log(td);
    // console.log(td.parentElement);
    // console.log(selectedRow);

    document.getElementById("name").value = selectedRow.cells[0].innerHTML;
    document.getElementById("tweet").value = selectedRow.cells[1].innerHTML;
    // document.getElementById("salary").value = selectedRow.cells[2].innerHTML;
    // document.getElementById("city").value = selectedRow.cells[3].innerHTML;
}

function updateRecord(formData) {
    selectedRow.cells[0].innerHTML = formData.name;
    selectedRow.cells[1].innerHTML = formData.tweet;


    var today = new Date();
    const dayname = ['日', '月', '火', '水', '木', '金', '土'];
    date = today.getFullYear() + "/" + (Number(today.getMonth()) + 1) + "/" + today.getDate() + "/" + dayname[today.getDay()] + "/" + today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    selectedRow.cells[2].innerHTML = date;
    // selectedRow.cells[2].innerHTML = formData.salary;
    // selectedRow.cells[3].innerHTML = formData.city;
}

function onDelete(td) {
    if (confirm('Are you sure to delete this record ?')) {
        row = td.parentElement.parentElement;
        console.log(row)
        document.getElementById("employeeList").deleteRow(row.rowIndex);
        resetForm();
    }
}

function validate() {
    isValid = true;
    if (document.getElementById("name").value == "") {
        isValid = false;
        document.getElementById("nameValidationError").classList.remove("hide");
    } else {
        isValid = true;
        if (!document.getElementById("nameValidationError").classList.contains("hide"))
            document.getElementById("nameValidationError").classList.add("hide");
    }
    return isValid;
}