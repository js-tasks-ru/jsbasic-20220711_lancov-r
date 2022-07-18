function truncate(str, maxlength) {
  let result = str;
  if(str.length>maxlength-1){
    result = str.slice(0,maxlength-1) + '…';
  }
  return result
}
