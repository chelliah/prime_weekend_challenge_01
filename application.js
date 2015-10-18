//initialize an empty 
var employeeLog = []; 

//adds new employee info to the DOM
function appendDom(employee){
	$("#employees").append('<div class="employee" id= "employee' + employee.idNo + '""></div>');
	var $el = $("#employees").children().last();

	var string = employee.firstName + " " + employee.lastName + ": " + employee.idNo + ", "  + employee.jobTitle + ", "  + employee.yearlySalary; //formats object into new string

	$el.append("<p>" + string + "</p>") 
}

//calls the combile salareies method and updates this information to the DOM
function calculateNewSalary(){ //
	var totalSalary = compileSalaries(employeeLog);
	$("#salaryMessage").text("The monthly cost of employee salaries is: $" + totalSalary);
	
}

//combile salaries loops through all of the employees in the array, totals the income values and returns the monthly average rounded to the nearest dollar
function compileSalaries(log){ 
	var totalSalaries = 0;
	for(employee in log){
		var salary = parseInt(removeNonNumberic(log[employee].yearlySalary));
		totalSalaries += salary;
	}
	return (totalSalaries/12).toFixed(2); //rounds value to 2 decimal places. 
};

//removes non numeric values from an input string
function removeNonNumberic(str){ 
	var numericString = str.replace(/[^0-9]/g, '');
	return numericString;
}

//asks user to enter ID, uses this value to search through employee log for the correct employee, and then deletes that employee from the log
function deleteEmployee() {
	var personID = prompt("Please enter the ID number of the employee you wish to delete");
	var deletedEmployee;
	for(employee in employeeLog){
		if(employeeLog[employee].idNo==personID){
			deletedEmployee = employeeLog[employee];
			employeeLog.splice(employee,1); //removes that employee from the array
		}
	}
	if (deletedEmployee == undefined){
		alert("No employee has that ID Number!");
		return;
	}
	var id = deletedEmployee.idNo;
	var employee = '#employee' + id;
	$(employee).remove();
	console.log("Here is the new employee log", employeeLog);
}

$(document).ready(function(){//can put entireity of code in a function
	$("#employeeInfo").submit(function(event){//callback function
		event.preventDefault();//removes default html function
		var values = {};//create object to store information from event

		$.each($("#employeeInfo").serializeArray(), /* creates an array of objects */
			function(i, field){ /* i is how we are stepping through the array, field is the information*/
				values[field.name] = field.value;
		});//grab each thing off of a form
		$("#employeeInfo").find("input[type=text]").val("");
		appendDom(values);
		employeeLog.push(values);
		calculateNewSalary();
		console.log("Here is the new entry", values);
		console.log("Here is the new employee log", employeeLog);
	});

	$('#delete').on('click',function(){
		if(employeeLog.length==0){
			alert("Employee log is empty! Nothing to delete!");
		}else{
			deleteEmployee();
			calculateNewSalary();
		}
	})
});

