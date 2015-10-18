employeeLog = [];

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

	$('#calculateSalary').on('click', function(){
		var totalSalary = compileSalaries(employeeLog);
		$("#salaryMessage").text("The monthly cost of employee salaries is: " + totalSalary + " dollars");
	});
});


function appendDom(employee){
	$("#employees").append('<div class="employee" id= "employee' + employee.idNo + '""></div>');
	var $el = $("#employees").children().last();

	$el.append("<p>" + employee.firstName + "</p>");
	$el.append("<p>" + employee.lastName + "</p>");
	$el.append("<p>" + employee.idNo + "</p>");
	$el.append("<p>" + employee.jobTitle + "</p>");
	$el.append("<p>" + employee.yearlySalary + "</p>");
}

function compileSalaries(log){
	var totalSalaries = 0;
	for(employee in log){
		var salary = parseInt(removeNonNumberic(log[employee].yearlySalary));
		totalSalaries += salary;
	}
	return Math.round(totalSalaries/12);
};

function removeNonNumberic(str){
	var numericString = str.replace(/[^0-9]/g, '');
	return numericString;
}