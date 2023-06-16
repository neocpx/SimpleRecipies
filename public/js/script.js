 document.addEventListener('DOMContentLoaded',()=>{
    const srchBtn=document.querySelectorAll('.searchBtn');
    const srchBar=document.querySelector('.searchBar');
    const srchInput=document.getElementById('searchInput');
    const srchClose=document.getElementById('searchClose');

    for (var i=0; i<srchBtn.length; i++){
        srchBtn[i].addEventListener('click',()=>{
            srchBar.style.visibility='visible';
            srchBar.classList.add('open');
            this.setAttribute('aria-expanded','true');
            srchInput.focus();

        });
    }

    srchClose.addEventListener('click',()=>{
    srchBar.style.visibility='hidden';
    srchBar.classList.add('open');
    this.setAttribute('aria-expanded','false');
    });

 });