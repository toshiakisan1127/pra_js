var selectedRow = null

let storage = localStorage;

// storage.setItem(1, "りんご");
window.onload = function () {
    let datas = {};
    for (let i = 0; i < storage.length; i++) {
        let k = storage.key(i);
        datas[k] = storage[k];
    };
    console.log(datas);
    storage.clear()
    // console.log(Object.keys(datas).length);
    for (let k in datas) {
        console.log(datas[k]);
        // console.log(k);
        insertNewRecord(JSON.parse(datas[k]));
    }
    console.log(storage.length);


};


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


    // var table = document.getElementById("employeeList").getElementsByTagName('tbody')[0];
    // console.log(table)
    // var newRow = table.insertRow(table.length);
    // 上のだと最後に追加するが、つぶやきって最初の行に追加する方がいいよね。

    // formData["salary"] = document.getElementById("salary").value;
    // formData["city"] = document.getElementById("city").value;
    return formData;
}


function save(data, tweet_number) {
    // localStorageに保存するでー

    // リロードしたら時間全部一緒になっちゃう問題。解決してない。
    let today = new Date();

    const dayname = ['日', '月', '火', '水', '木', '金', '土'];
    date = today.getFullYear() + "/" + (Number(today.getMonth()) + 1) + "/" + today.getDate() + "/" + dayname[today.getDay()] + "/" + today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();


    storage[tweet_number] = JSON.stringify({ "name": data["name"], "tweet": data["tweet"], "date": date });
    return 0;
}


function insertNewRecord(data) {
    var table = document.getElementById("employeeList").getElementsByTagName('tbody')[0];
    // console.log(table)
    // var newRow = table.insertRow(table.rows.length);
    // 上のだと最後に追加するが、つぶやきって最初の行に追加する方がいいよね。
    var newRow = table.insertRow(0);
    // console.log(table.rows.length)
    save(data, table.rows.length);
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

function insertNewRecord_update(data) {
    var table = document.getElementById("employeeList").getElementsByTagName('tbody')[0];
    // console.log(table)
    // var newRow = table.insertRow(table.rows.length);
    // 上のだと最後に追加するが、つぶやきって最初の行に追加する方がいいよね。
    var newRow = table.insertRow(0);
    // console.log(table.rows.length)
    save(data, table.rows.length);
    cell1 = newRow.insertCell(0);
    cell1.innerHTML = data.name;
    cell2 = newRow.insertCell(1);
    cell2.innerHTML = data.tweet;
    cell3 = newRow.insertCell(2);
    cell3.innerHTML = data.date;

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

    //selectedRow.rowIndexで下のことは実現できる。
    // ストレージも変更させるために、自分が親ノードの何番目の子ノードなのかを検索する。それをキーとする。
    // console.log(selectedRow.rowIndex);

    // parentNode = selectedRow.parentElement;
    // selectedRow_number = -1;
    // for (let i = 0; i < parentNode.rows.length; i++) {
    //     if (parentNode.children[parentNode.rows.length - i - 1] === selectedRow) {
    //         selectedRow_number = i + 1;
    //         console.log(`今選んだのは${i + 1}番目の子要素`);
    //         break;
    //     }

    //     if (selectedRow_number === -1) console.log("うまく保存できません");
    // }

    // console.log(typeof selectedRow);
    // 最初にキーを１と決めたら動かさないためにこうやってる。
    // どこかの行をデリートしたら勝手に付け替えてくれるように実装しないとな。
    save(formData, selectedRow.parentElement.rows.length - selectedRow.rowIndex + 1);
}

function onDelete(td) {
    if (confirm('Are you sure to delete this record ?')) {
        row = td.parentElement.parentElement;
        // console.log()
        // console.log(row.rowIndex - row.rows.length + 1)

        // 選択した行に対応するストレージを消さないとな。
        storage.removeItem(row.parentElement.rows.length - row.rowIndex + 1);

        document.getElementById("employeeList").deleteRow(row.rowIndex);
        // console.log(row.parentElement.rows.length);
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