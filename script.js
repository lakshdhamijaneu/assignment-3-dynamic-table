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

  alert(`Student ${num} Record added successfully`);
}
