let students = [];
const nameInput = document.getElementById('nameInput');
const ageInput = document.getElementById('ageInput');
const gradeInput = document.getElementById('gradeInput');
const addBtn = document.getElementById('addBtn');
const studentList = document.getElementById('studentList');
const studentCount = document.getElementById('studentCount');

addBtn.textContent = 'Add Student'; 

addBtn.addEventListener('click', addStudent);
[nameInput, ageInput, gradeInput].forEach(input => {
    input.addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            addStudent();
        }
    });
});

studentList.addEventListener('click', function(event) {
    const li = event.target.closest('li');
    if (!li) return;
    const studentId = Number(li.dataset.studentId);
    if (event.target.classList.contains('edit-btn')) {
        editStudent(studentId, li);
    } else if (event.target.classList.contains('delete-btn')) {
        deleteStudent(studentId);
    }
});

function addStudent() {
    const name = nameInput.value.trim();
    const age = ageInput.value.trim();
    const grade = gradeInput.value.trim();
    if (name === '' || age === '' || grade === '') {
        alert('Please fill in all fields!');
        return;
    }
    const newStudent = {
        id: Date.now(),
        name,
        age,
        grade
    };
    students.push(newStudent);
    nameInput.value = '';
    ageInput.value = '';
    gradeInput.value = '';
    displayStudents();
    updateStudentCount();
}

function deleteStudent(studentId) {
    const student = students.find(student => student.id === studentId);
    if (!student) return;
    const confirmDelete = confirm(`Are you sure you want to delete ${student.name}?`);
    if (!confirmDelete) return;
    students = students.filter(student => student.id !== studentId);
    displayStudents();
    updateStudentCount();
}

function editStudent(studentId, li) {
    const student = students.find(student => student.id === studentId);
    if (!student) return;

    li.innerHTML = `
        <input type="text" class="edit-name" value="${student.name}">
        <input type="number" class="edit-age" value="${student.age}">
        <input type="text" class="edit-grade" value="${student.grade}">
        <div class="task-actions">
            <button class="save-btn">Save</button>
            <button class="delete-btn">Delete</button>
        </div>
    `;

    li.querySelector('.save-btn').addEventListener('click', function() {
        const newName = li.querySelector('.edit-name').value.trim();
        const newAge = li.querySelector('.edit-age').value.trim();
        const newGrade = li.querySelector('.edit-grade').value.trim();
        if (newName === '' || newAge === '' || newGrade === '') {
            alert('Please fill in all fields!');
            return;
        }
        student.name = newName;
        student.age = newAge;
        student.grade = newGrade;
        displayStudents();
        updateStudentCount();
    });
    li.querySelector('.delete-btn').addEventListener('click', function() {
        deleteStudent(studentId);
    });
}

function createStudentElement(student) {
    const li = document.createElement('li');
    li.className = 'task-item';
    li.dataset.studentId = student.id;
    li.innerHTML = `
        <span class="task-name"><strong>Name:</strong> ${student.name}</span>
        <span class="task-age"><strong>Age:</strong> ${student.age}</span>
        <span class="task-grade"><strong>Grade:</strong> ${student.grade}</span>
        <div class="task-actions">
            <button class="edit-btn">Edit</button>
            <button class="delete-btn">Delete</button>
        </div>
    `;
    return li;
}

function displayStudents() {
    studentList.innerHTML = '';
    if (students.length === 0) {
        const emptyMessage = document.createElement('div');
        emptyMessage.className = 'empty-state';
        emptyMessage.textContent = 'No students yet. Add a new student.';
        studentList.appendChild(emptyMessage);
        return;
    }
    students.forEach(student => {
        const studentElement = createStudentElement(student);
        studentList.appendChild(studentElement);
    });
}

function updateStudentCount() {
    const totalStudents = students.length;
    let countText = '';
    if (totalStudents === 0) {
        countText = '0 students';
    } else if (totalStudents === 1) {
        countText = '1 student added';
    } else {
        countText = `${totalStudents} students added`;
    }
    studentCount.textContent = countText;
}

displayStudents();
updateStudentCount();