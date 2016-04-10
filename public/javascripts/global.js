import $ from 'jquery'

var userListData = []

const populateTable = () => {
  let tableContent = ''

  $.getJSON('/users/userlist', (data) => {
    $.each(data, () => {
      tableContent += '<tr>'
      tableContent += `<td><a href="#" class="linkshowuser" rel="${this.username}"> ${this.username}</a></td>`
      tableContent += `<td>${this.email}</td>`
      tableContent += `<td><a href="#" class="linkdeleteuser" rel="${this._id}">Delete</a></td>`
      tableContent += '</tr>'
    })
  })
}

$(document).ready(() => {
  populateTable()
})
