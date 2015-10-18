var employeeLog = [];

function appendDom(employee){
	$("#employees").append('<div class="employee" id= "employee' + employee.idNo + '""></div>');
	var $el = $("#employees").children().last();

	var string = employee.firstName + " " + employee.lastName + ": " + employee.idNo + ", "  + employee.jobTitle + ", "  + employee.yearlySalary; //formats object into new string

	$el.append("<p>" + string + "</p>") 
	// $el.append("<p>" + employee.firstName + "</p>");
	// $el.append("<p>" + employee.lastName + "</p>");
	// $el.append("<p>" + employee.idNo + "</p>");
	// $el.append("<p>" + employee.jobTitle + "</p>");
	// $el.append("<p>" + employee.yearlySalary + "</p>");
}

function calculateNewSalary(){ //
	var totalSalary = compileSalaries(employeeLog);
	$("#salaryMessage").text("The monthly cost of employee salaries is: " + totalSalary + " dollars");
	
}

function compileSalaries(log){ //combile salaries loops through all of the employees in the array, totals the income values and returns the monthly average rounded to the nearest dollar
	var totalSalaries = 0;
	for(employee in log){
		var salary = parseInt(removeNonNumberic(log[employee].yearlySalary));
		totalSalaries += salary;
	}
	return Math.round(totalSalaries/12);
};

function removeNonNumberic(str){ //removes non numeric values from an input string
	var numericString = str.replace(/[^0-9]/g, '');
	return numericString;
}

function deleteEmployee() {
	var personID = prompt("Please enter the ID number of the employee you wish to delete");
	var deletedEmployee;
	for(employee in employeeLog){
		if(employeeLog[employee].idNo==personID){
			deletedEmployee = employeeLog[employee];
			employeeLog.splice(employee,1);
		}
	}
	// var deletedEmployee = employeeLog.pop();
	var id = deletedEmployee.idNo;
	var employee = '#employee' + id;
	$(employee).remove();
	console.log(employeeLog);
}

$(document).ready(function(){//can put entireity of code in a function
	$("#employeeInfo").submit(function(event){//callback function
		event.preventDefault();//removes default html function
		var values = {};//create object to store information from event

		$.each($("#employeeInfo").serializeArray(), /* creates an array of objects */
			function(i, field){ /* i is how we are steppign through the array, field is the information*/
				values[field.name] = field.value;
		});//grab each thing off of a form
		$("#employeeInfo").find("input[type=text]").val("");
		appendDom(values);
		employeeLog.push(values);
		console.log(values);
	});

	$('#calculateSalary').on('click', calculateNewSalary);

	$('#delete').on('click',function(){
		deleteEmployee();
		calculateNewSalary();
	})
});

