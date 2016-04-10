var $ = require('jquery')

var userListData = []

var populateTable = function () {
  var tableContent = ''

  $.getJSON('/users/userlist', function(data) {
    $.each(data, function() {
      tableContent += '<tr>'
      tableContent += '<td><a href="#" class="linkshowuser" rel=' + this.username + '> ${this.username}</a></td>'
      tableContent += '</tr>'
    })
  })
}

$(document).ready(function() {
  populateTable()
})
