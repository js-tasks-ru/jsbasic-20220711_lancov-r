function getMinMax(str) {
  return str.split(' ').reduce((obj,val)=>{

    val = Number(val);
    if( isNaN(val) ) return obj
 
    obj.min = obj.min < val ? obj.min : val;
    obj.max = obj.max > val ? obj.max : val;
    
    return obj;

  },
  {min: Infinity, max: -Infinity})
}