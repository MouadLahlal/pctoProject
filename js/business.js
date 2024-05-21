// request.html
function stdInfoSuccess(response, id_user, id_prj) {
    document.querySelector("#Student #nome").textContent = response[0].name + " " + response[0].surname;
    document.querySelector("#Student #studio").textContent = response[0].field_of_study;
    document.querySelector("#Student #provincia").textContent = response[0].province;
    document.querySelector("#Student #scuola").textContent = response[0].id_school;
    document.querySelector("#Student #email").textContent = response[0].email;
    document.querySelector("#Student #id_user").value = id_user;
    document.querySelector("#Student #id_project").value = id_prj;
}

document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll(".rectangle > span > a").forEach((link) => {
        link.addEventListener("click", (e) => {
            e.preventDefault();
            alert(link.id);
            document.querySelectorAll("main").forEach((frame) => {
                frame.style.display = "none";
            });
            $.ajax({
                url: 'http://localhost/pcto/includes/bsnFunc.php',
                type: 'post',
                data: { getStudentInfo: 1, id_user: link.id },
                success: (response) => {
                    let id_prj = document.getElementById(`prj-${link.id}`).value;
                    stdInfoSuccess(response, link.id, id_prj);
                }
            });
            document.getElementById("Student").style.display = "block";
        });
    });
});

// projects.html
function newPrjSuccess(response) {
    alert(response ? "Progetto aggiunto con successo" : "Aggiunta progetto fallita, riprova più tardi");
    document.getElementById("newpopup").style.display = "none";
    let mains = document.getElementsByTagName("main")
    for (const main of mains) {
        main.classList.remove("blur");
    }
}

function editPrjSuccess(response) {
    alert(response ? "Progetto modificato con successo" : "Modifica progetto fallita, riprova più tardi");
    document.getElementById("editpopup").style.display = "none";
    let mains = document.getElementsByTagName("main")
    for (const main of mains) {
        main.classList.remove("blur");
    }
}

document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("newProject").addEventListener("click", () => {
        document.getElementById("newpopup").style.display = "block";
        let mains = document.getElementsByTagName("main")
        for (const main of mains) {
            main.classList.add("blur");
        }
    });
    document.getElementById("btnNewPrj").addEventListener("click", () => {
        let titolo = document.getElementsByName("titolo")[0].value;
        let descrizione = document.getElementsByName("descrizione")[0].value;
        $.ajax({
            url: './includes/bsnFunc.php',
            type: 'post',
            data: { newProject: 1, titolo: titolo, descrizione: descrizione, id_business: localStorage.getItem("id_business") },
            success: newPrjSuccess
        });
    });
    document.querySelectorAll("#projectslist .rectangleAction").forEach((action) => {
        action.addEventListener("click", (e) => {
            let mains = document.getElementsByTagName("main")
            for (const main of mains) {
                main.classList.add("blur");
            }
            let projects = JSON.parse(localStorage.getItem("projects"));
            projects.map((project) => {
                if (project.id_project === action.id) {
                    document.querySelector("#editpopup input[name='titolo']").value = project.title;
                    document.querySelector("#editpopup textarea").value = project.description;
                    document.querySelector("#editpopup input[name='id_project']").value = project.id_project;
                }
            })
            document.getElementById("editpopup").style.display = "block";
        });
    });
    document.getElementById("btnEditPrj").addEventListener("click", () => {
        let titolo = document.getElementsByName("titolo")[1].value;
        let descrizione = document.getElementsByName("descrizione")[1].value;
        let id = document.getElementsByName("id_project")[0].value;
        $.ajax({
            url: './includes/bsnFunc.php',
            type: 'post',
            data: { editProject: 1, titolo: titolo, descrizione: descrizione, id_project: id },
            success: editPrjSuccess
        });
    });
});

// student.html
document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("btnRifiuta").addEventListener("click", () => {
        $.ajax({
            url: './includes/bsnFunc.php',
            type: 'post',
            data: { refuseRequest: 1, id_user: document.getElementById("id_user").value, id_project: document.getElementById("id_project").value, id_business: localStorage.getItem("id_business") },
            success: () => {
                alert("Richiesta rifiutata");
                document.querySelectorAll("main").forEach((frame) => {
                    frame.style.display = "none";
                });
                document.getElementById("Dashboard").style.display = "block";
            }
        });
    });
    document.getElementById("btnAccetta").addEventListener("click", () => {
        $.ajax({
            url: './includes/bsnFunc.php',
            type: 'post',
            data: { acceptRequest: 1, id_user: document.getElementById("id_user").value, id_project: document.getElementById("id_project").value, id_business: localStorage.getItem("id_business") },
            success: () => {
                alert("Richiesta accettata");
                document.querySelectorAll("main").forEach((frame) => {
                    frame.style.display = "none";
                });
                document.getElementById("Dashboard").style.display = "block";
            }
        });
    });
});