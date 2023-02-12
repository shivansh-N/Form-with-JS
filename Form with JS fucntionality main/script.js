// modal js

  document.getElementById("add-button").addEventListener("click", 
  function () {
      document.getElementById("add-modal").style.display = "block";
     
    });

  var count = 1
  var id = Math.random().toFixed(1)*314
  let l  // variable created for pagination and used in numpages() function
  

  // random id
  // count is for sr no.
  document.getElementById("submit-form").addEventListener("click", 
  function () {
      count++
      id = Math.random().toFixed(1)*314
      l = document.getElementById("location_list").rows.length;
      document.getElementById("add-modal").style.display = "none";
  });

  // My search function
  function mySearchFunction() {

    var input, filter, table, tr, td,td2, i, txtValue,txtValue2;
    input = document.getElementById("search-field");
    filter = input.value.toUpperCase();
    table = document.getElementById("location_list");
    tr = table.getElementsByTagName("tr");


    for (i = 0; i < tr.length; i++) {
      td = tr[i].getElementsByTagName("td")[2];
      td2 = tr[i].getElementsByTagName("td")[3];
      if (td2) {
        txtValue = td.textContent || td.innerText;
         txtValue2 = td2.textContent || td2.innerText;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
          tr[i].style.display = "";
        } 
        else if (txtValue2.toUpperCase().indexOf(filter) > -1){
          tr[i].style.display = "";
        } 
        else {
          tr[i].style.display = "none";
        }
      }       
    }
  }
  
  // Reset Table
  function resetTable(){
    let resetButton = document.getElementById("reset-button");
    var input, filter, table, tr, td, i, txtValue;
    input = document.getElementById("search-field");
    filter = input.value.toUpperCase();
    table = document.getElementById("location_list");
    tr = table.getElementsByTagName("tr");

    for (i = 0; i < tr.length; i++) {
      td = tr[i].getElementsByTagName("td")[2];
          tr[i].style.display = "";
    }
  }

  // filter status function
  function statuschecker(){
    let activeCheck = document.getElementById("activeCheck").checked ? "Active" : "Inactive";
    let inActivecheck = document.getElementById("inActiveCheck").checked ? "Active" : "Inactive";


    // variable creation
    var input, filter, table, tr, td, i, txtValue;
    input = document.getElementById("search-field"); //storing search field value
    filter = input.value.toUpperCase(); 
    table = document.getElementById("location_list"); // storing table
    tr = table.getElementsByTagName("tr"); // storing all tr
    
    // checking if radio  button is on active
    if(activeCheck == "Active"){ 
      for (i = 0; i < tr.length; i++) {
        td = tr[i].getElementsByTagName("td")[4]; // storing action field values
        if (td) {     // if active/inactive
          txtValue = td.textContent || td.innerText; // txtvalue = text content or innter text
          if (txtValue == "Active") { // if txt value is active 
            tr[i].style.display = "";  // if yes then only active values will shown
          } 
          else {
            tr[i].style.display = "none";  // if not inactive values will be hidden
          }
        }       
      }
    }
    else if(inActivecheck == "Active"){
      for (i = 0; i < tr.length; i++) {
        td = tr[i].getElementsByTagName("td")[4];
        if (td) {
          txtValue = td.textContent || td.innerText;
          if (txtValue == "Inactive") {  //if txtvalue is inactive
            tr[i].style.display = ""; // only inactive values will be shown
          } 
          else {
            tr[i].style.display = "none";  // active values will be hidden
          }
        }       
      }
    }
  }

  // myAddFucntion
  function myAddFunction(){

    // view button
    var myView = document.createElement("button")
    myView.id = id.toString()
    myView.className = "btn btn-outline-primary"
    myView.addEventListener('click',function() {onView(this.parentElement.parentElement.parentElement.childNodes)})

    myView.innerHTML = "<i class='fa fa-eye' aria-hidden='true'>View</i>"
    
    // edit button
    var myEdit = document.createElement("button")
    myEdit.className = "btn btn-outline-primary"
    myEdit.addEventListener('click',function() {onEdit(this.parentElement.parentElement.parentElement.childNodes)})
    myEdit.innerHTML = "<i class='fa fa-pencil' aria-hidden='true'>Edit</i>"
    
    // Delete button
    var myDelete = document.createElement("button")
    myDelete.id = id.toString()
    myDelete.className = "btn btn-outline-danger"
    myDelete.addEventListener('click',function() {onDelete(this)})  // this = myDelete 
    myDelete.innerHTML = "<i class='fa fa-trash' aria-hidden='true' >Delete</i>"

    // appending buttons in div
    var myDiv = document.createElement("div");
    myDiv.appendChild(myView);
    myDiv.appendChild(myEdit);
    myDiv.appendChild(myDelete);


    // insert table rows/cells
    tbl = document.getElementById("location-list");
    row = tbl.insertRow();
    srno = row.insertCell()   // serial number
    idcell = row.insertCell() // id number
    cell1 = row.insertCell(); //location name
    cell2 = row.insertCell(); // location description
    locStatus = row.insertCell(); // Location status check
    actionButtons = row.insertCell(); // action buttons
    
    // set data
    srno.innerHTML = count //inserting serial number
    idcell.innerHTML = id   // inserting id number 
    cell1.innerHTML = document.getElementById('loc_name').value;  // stores input field values of location name
    cell2.innerHTML = document.getElementById('loc_add').value;   // stores input field value of location description
    locStatus.innerHTML = document.getElementById('add_activeCheck').checked ? "Active" : "Inactive"
    actionButtons.appendChild(myDiv); //  stores div element full of action buttons
    

    // deleting record on click of delete button
    function onDelete(td) {

      bootbox.dialog({
        title:"Confirm Delete",
        message:'Are you sure to delete this record ?',
        backdrop:true,
        size: 'small',
        buttons: {
        Yes: {
            label: 'Yes',
            className: 'btn-primary',
            callback: function(){
              row = td.parentNode.parentNode.parentNode.remove();
              // removes entire row on clicking of yes
            }
        },
        No: {
            label: 'No',
            className: 'btn-info',
            callback: function(){
                return
            }
        },
        
    }})
      
    }
    
    // Edit Function
    function onEdit(td) {

        // bootboxhtml =  edit form in html will be replaced with bootfoxform
        var bootboxHtml = $('#editfields').html().replace('editForm', 'js-bootboxForm');
        
        bootbox.dialog({
          title:"Confirm Edit",
          message: bootboxHtml,
          backdrop:true,
          size: 'small',
          buttons: {
          Yes: {
              label: 'Yes',
              className: 'btn-primary',
              callback: function(){
                td[2].innerText = $('#Loc_Name', '.js-bootboxForm').val()
                td[3].innerText = $('#Loc_Desc', '.js-bootboxForm').val()
              }
          },
          No: {
              label: 'No',
              className: 'btn-info',
              callback: function(){
                  return
              }
          },
        }    
        })
    }
    
    // view function
    function onView(td) {
      document.getElementById("view-modal").style.display = "block";
      document.getElementById("viewLocName").value = td[2].innerText // td[2] is location name
      
      document.getElementById("viewLocDesc").textContent = td[3].innerText //td[3] is location description

    }

  }  
 
  // pagination
  var current_page = 1;
  var records_per_page = 10;
  // pagination fucntion starts

  // previous button
  function prevPage()
{

    if (current_page > 1) {
        current_page--;
        changePage(current_page);
    }
}

// next button
function nextPage()
{
    if (current_page < numPages()) {
        current_page++;
        changePage(current_page);
    }
}
    
function changePage(page)
{
    var btn_next = document.getElementById("btn_next");
    var btn_prev = document.getElementById("btn_prev");
    var listing_table = document.getElementById("location_list");
    var page_span = document.getElementById("page");
 
    // Validate page
    if (page < 1) page = 1;                     // if page index number less then 1 it will change it to 1
    if (page > numPages()) page = numPages();   

    [...listing_table.getElementsByTagName('tr')].forEach((tr)=>{
        tr.style.display='none'; // more than 10 rows will not be displayed
    });
    listing_table.rows[0].style.display = ""; // display the title row

    for (var i = (page-1) * records_per_page + 1; i < (page * records_per_page) + 1; i++) {
        if (listing_table.rows[i]) {
            listing_table.rows[i].style.display = ""
        } else {
            continue;
        }
    }
    

    // pagination numbers
    page_span.innerHTML = page + "/" + numPages();

    if (page == 1) {
        btn_prev.style.visibility = "hidden";
    } else {
        btn_prev.style.visibility = "visible";
    }

    if (page == numPages()) {
        btn_next.style.visibility = "hidden";
    } else {
        btn_next.style.visibility = "visible";
    }
}

function numPages()
{
    
    return Math.ceil((l - 1) / records_per_page);
}

window.onload = function() {
    changePage(current_page);
};
