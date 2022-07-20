function sumSalary(salaries) {

  let sumVal = 0; 
  salariesValArray = Object.values(salaries);

  if(salariesValArray.length  > 0){
    sumVal = salariesValArray.reduce((sum,val)=> sum + ( isFinite(val) && !isNaN(val) ? val : 0),0 )
  }

  return sumVal

}
