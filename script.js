// Submit button starts disabled
const submitBtn = document.getElementById("submitBtn");
submitBtn.disabled = true;

// Reference to table body
const tbody = document.querySelector("#studentTable tbody");

// Track student count
let studentCount = 0;

// Event: Add Student
document.getElementById("addStudentBtn").addEventListener("click", () => {
  studentCount++;
  addStudentRow(studentCount);
});

// Function: Add student row
function addStudentRow(num) {
  const row = document.createElement("tr");

  row.innerHTML = `
    <td><input type="checkbox" class="rowCheck"></td>
    <td>Student ${num}</td>
    <td>Teacher ${num}</td>
    <td><img src="green-arrow.png" alt="expand" class="expandIcon" width="20"></td>
    <td class="deleteCell"></td>
    <td class="editCell"></td>
  `;

  tbody.appendChild(row);

  const checkbox = row.querySelector(".rowCheck");
  checkbox.addEventListener("change", () => {
    handleCheckboxChange(checkbox, row, num);
  });

  alert(`Student ${num} Record added successfully`);
}

function renumberStudents() {
  const rows = tbody.querySelectorAll("tr");
  studentCount = rows.length;
  rows.forEach((row, index) => {
    row.cells[1].innerText = `Student ${index + 1}`;
    row.cells[2].innerText = `Teacher ${index + 1}`;
  });
}


// Handle checkbox changes
function handleCheckboxChange(checkbox, row, studentNum) {
  if (checkbox.checked) {
    // Highlight row
    row.classList.add("highlight");

    // Enable submit button
    submitBtn.disabled = false;

    // Add Delete button
    const deleteCell = row.querySelector(".deleteCell");
    if (!deleteCell.querySelector("button")) {
      const delBtn = document.createElement("button");
      delBtn.innerText = "Delete";
      delBtn.addEventListener("click", () => {
        row.remove();
        alert(`Student ${studentNum} Record deleted successfully`);
        renumberStudents();
        checkAnySelected(); // re-check if submit should disable
      });
      deleteCell.appendChild(delBtn);
    }

    // Add Edit button
    const editCell = row.querySelector(".editCell");
    if (!editCell.querySelector("button")) {
      const editBtn = document.createElement("button");
      editBtn.innerText = "Edit";
      editBtn.addEventListener("click", () => {
        const newValue = prompt(`Edit details of Student ${studentNum}:`, "");
        if (newValue && newValue.trim() !== "") {
          alert(`Student ${studentNum} data updated successfully`);
        }
      });
      editCell.appendChild(editBtn);
    }
  } else {
    // Unchecked
    row.classList.remove("highlight");
    row.querySelector(".deleteCell").innerHTML = "";
    row.querySelector(".editCell").innerHTML = "";

    // Disable submit if no rows selected
    checkAnySelected();
  }
}

// Utility: Check if any checkbox selected
function checkAnySelected() {
  const anyChecked = document.querySelectorAll(".rowCheck:checked").length > 0;
  submitBtn.disabled = !anyChecked;
}
