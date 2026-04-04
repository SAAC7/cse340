const form = document.querySelector("#updateForm")
    form.addEventListener("change", function () {
      const updateBtn = document.querySelector("button")
      updateBtn.removeAttribute("disabled")
    })

    
const passwordForm = document.querySelector("#passwordForm")

passwordForm.addEventListener("submit", function (e) {
  const password = document.querySelector("#new_password").value
  const confirm = document.querySelector("#confirm_password").value

  if (password !== confirm) {
    e.preventDefault()
    alert("Passwords do not match.")
  }
})


    