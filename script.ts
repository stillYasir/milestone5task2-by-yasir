// for element listinig:
document.getElementById("resume-form")?.addEventListener("submit", function (event) {
    event.preventDefault();



    // type assertion 
    const profilePictureinput = document.getElementById("profilePicture") as HTMLInputElement;
    const nameElement = document.getElementById("name") as HTMLInputElement;
    const emailElement= document.getElementById("email")as HTMLInputElement;
    const phoneElement = document.getElementById("phone")as HTMLInputElement;
    const educationElement = document.getElementById("education")as HTMLTextAreaElement;
    const skillsElement = document.getElementById("skills")as HTMLTextAreaElement;
    const experienceElement = document.getElementById("experience") as HTMLTextAreaElement;
    const usernameElemnent = document.getElementById("username") as HTMLInputElement;



    if (profilePictureinput &&nameElement && emailElement && phoneElement && educationElement && skillsElement && experienceElement && usernameElemnent) {
        

        const name = nameElement.value;
        const email = emailElement.value;
        const phone = phoneElement.value;
        const education = educationElement.value;
        const skills = skillsElement.value;
        const experience = experienceElement.value;
        const username = usernameElemnent.value;
        const uniquepath = `resumes/${username.replace(/\s+/g, '_')}_cv.html`
    
        // for image 
        const profilePictureFile = profilePictureinput.files?.[0]
       const profilePictureUrl = profilePictureFile? URL.createObjectURL(profilePictureFile) :'';

    // for output:
    const resumeHTML = `
    <h2>Resume :</h2>
    ${profilePictureUrl ? `<img src="${profilePictureUrl}" alt="profile picture" class="profilePicture" ` :""}
    <p><strong>NAME :</strong> <span id="edit-name" class="editable"> ${name} </span></p>
    <p><strong>EMAIL :</strong> <span id="edit-email" class="editable"> ${email} </span> </p>
    <p><strong>NUMBER :</strong> <span id="edit-phone" class="editable"> ${phone} </span> </p>

    <h3>EDUCATION</h3>
    <p id="edit-education" class="editable">${education}</p>

    <h3>SKILLS</h3>
    <p id="edit-skills" class="editable">${skills}</p>

    <h3>EXPERIENCE</h3>
    <p id="edit-experience" class="editable">${experience}</p>
    `;




// for download:
    const downloadLink = document.createElement("a")
    downloadLink.href= 'data:text/html;charset=utf-8, '+ encodeURIComponent(resumeHTML)
    downloadLink.download= uniquepath;
    downloadLink.textContent= "Download your resume";



    // for output:
    const resumeOutputElement = document.getElementById("resumeOutput");
    if (resumeOutputElement){
        resumeOutputElement.innerHTML= resumeHTML;
        resumeOutputElement.classList.remove("hidden");

        // create buttons
        const buttonsContainer= document.createElement("div");
        buttonsContainer.id="buttonsContainer";
        resumeOutputElement.appendChild(buttonsContainer);

        // create pdf button 
        const downloadButton = document.createElement("button");
        downloadButton.textContent= "Download as PDF";
        downloadButton.addEventListener("click",  () =>{
            window.print(); //allowing the user to save pdf.
        });
        buttonsContainer.appendChild(downloadButton);


        // create sharelink button 
        const shareLinkButton = document.createElement("button");
        shareLinkButton.textContent= " Copy Shareable Link";
        shareLinkButton.addEventListener("click", async() => {
            try {
                const shareablelink = `https://yourdomain.com/resumes/${name.replace(/\s+/g, '_')}_cv.html`;

                await navigator.clipboard.writeText(shareablelink);
                alert("Shareable link copied to clipboard");
            } catch (error) {
                console.error("Error copying shareable link:", error);
                alert("failed to copy plz TRY AGAIN !");
            }
            
        });

        buttonsContainer.appendChild(shareLinkButton);
    } else {
        console.error("resume Output element not found");
    }
}else {
        console.error('Form elements are missing');
    }
});
