
    //alert("Calling submitData...");
const form = document.getElementById('studentForm');
const list = document.getElementById('studentsList');

async function fetchStudentsList() {

    try{
        const response = await fetch('http://127.0.0.1:5000/api/get_students');
        const students = await response.json();


        list.innerHTML = '';

        students.forEach(student => {
            const li = document.createElement('li');
            li.textContent = student.name;
            list.appendChild(li);
        });
    }
    catch(error){
        console.log("Error fetching students:", error);
    }   
}

//Initially Fetch and display students when the page loads
// fetchStudentsList();



form.addEventListener('submit', async (event) => {
    event.preventDefault(); // Prevent default form submission

    const name = document.getElementById('name').value;
    const response = await fetch('http://127.0.0.1:5000/api/save_students', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name }),
    });

    if (response.ok) {
        alert('Student added successfully!');
    } else {
        alert('Failed to save student.');
    }
});

