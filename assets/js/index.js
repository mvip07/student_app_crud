let globalId = null;
const table = document.querySelector(".table");
const tbody = document.querySelector(".tbody");
const modal2 = document.querySelector(".modal2");
const closeModal2 = document.querySelector("#closeModal2");

function addDataHtml() {
  const dataLoc = JSON.parse(localStorage.getItem("student"));

  if (dataLoc) {
    tbody.innerHTML = "";
    for (let i of dataLoc) {
      const tr = document.createElement("tr");

      tr.innerHTML = `
        <th>${i?.id}</th>
        <td>${i?.firstname}</td>
        <td>${i?.lastname}</td>
        <td>${i?.subject}</td>
        <td>${i?.age}</td>
        <td>
            <button class="btn btn-warning" onclick="editStudent(${i?.id})" ><i class="fa-solid fa-pen-to-square me-2"></i>Edit</button>
        </td>
        <td>
            <button class="btn btn-danger" onclick="deleteStudent(${i?.id})"><i class="fa-solid fa-trash-can me-2"></i>Delete</button>
        </td>
        `;

      tbody.append(tr);
    }
  } else localStorage.setItem("student", JSON.stringify([]));
}

function createNewStudent() {
  const data = JSON.parse(localStorage.getItem("student"));
  const datalen = data[data.length - 1];
  const formInput = document.querySelectorAll(".form-control1");
  const studentObj = { id: datalen?.id ? datalen?.id + 1 : 1 };

  for (let i of formInput) {
    studentObj[i.name] = i.value;
    i.value = "";
  }

  data.push(studentObj);
  localStorage.setItem("student", JSON.stringify(data));

  addDataHtml();
}

function editStudent(id) {
  globalId = id;
  const data = JSON.parse(localStorage.getItem("student"));
  const getDataId = data.map((i) => (i?.id === globalId ? i : ""));
  const formInput = document.querySelectorAll(".form-control2");

  for (let i of formInput) i.value = getDataId[0][i.name];

  modal2.classList.add("show", "d-block");
}

function updateStudent() {
  const data = JSON.parse(localStorage.getItem("student"));
  const getDataId = data.map((i) => (i?.id === globalId ? i : ""));
  const formInput = document.querySelectorAll(".form-control2");

  for (let i of formInput) getDataId[0][i.name] = i.value;

  for (let i of data) if (i.id === globalId) i == getDataId[0];

  localStorage.setItem("student", JSON.stringify(data));

  addDataHtml();
}

function deleteStudent(id) {
  const data = JSON.parse(localStorage.getItem("student"));

  const filterData = data.filter((i) => i?.id !== id).map((i) => i);

  localStorage.setItem("student", JSON.stringify(filterData));

  addDataHtml();
}

closeModal2.addEventListener("click", () =>
  modal2.classList.remove("show", "d-block")
);

addDataHtml();