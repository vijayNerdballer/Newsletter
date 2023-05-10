document.querySelector("#dark").addEventListener("click",()=>{
  $("body").css("background-color","#111");
  $("body").css("color","white");
  $("body .form-floating").css("color","black");
  $("p").css("color","white");
});
document.querySelector("#light").addEventListener("click",()=>{
  $("body").css("background-color","white");
  $("body").css("color","black");
});