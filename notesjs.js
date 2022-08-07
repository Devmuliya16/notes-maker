// reload button
function reload(){
    location.reload();
}

let arr = [];
arr = JSON.parse(localStorage.getItem('notes'));
if(arr==null)
arr=[];


function object(title,note,id){
    this.title=title;
    this.note=note;
    this.id=id;
}
function getid(){
    return arr.length;
}

//onload
function loadnotes(){
    let n = arr.length;
    for(i=0;i<n;i++){
        if(arr[i]!=null){
            create_element(arr[i]);
        }
    }
}
loadnotes();

//create element function
function create_element(obj){
    let newele = document.createElement('div');
    newele.className='elements';
    newele.id=obj.id;
    newele.innerHTML=`
    <b><h4 class="note-title">${obj.title}</h4></b>
    <p>${obj.note}</p>
    <button onclick="deletenote(${obj.id})">delete</button>
    <button onclick="editnote(${obj.id})">edit</button>
    `;

    document.getElementById('subcontainer2').appendChild(newele);
}

//create button
let create = document.getElementById('create');

create.addEventListener('click',function(){


    let notetitle = document.getElementById('title').value;
    let notetext = document.getElementById('text').value;

    if(notetitle!="" && notetext!=""){
        let obj = new object(notetitle,notetext,getid());
    
        arr.push(obj);
        create_element(obj);
        localStorage.setItem('notes',JSON.stringify(arr));
    }
    else if(notetitle==''){
        alert('please enter title');
    }
    else{
        alert('please enter note');
    }
});


function deletenote(id){
    let elem = document.getElementById(id);
    elem.remove();
    arr[id]=null;
    
    localStorage.setItem('notes',JSON.stringify(arr));
}



//for search
function search(){

    let strcnt = document.getElementById('searchcontent').value;
    if(strcnt==""){
        return;
    }
    let searchtitle ='';
    let searchcontent ='';
    let count=0;
    let container = document.getElementById('found');
    
    
    
    for(i=0;i<arr.length;i++){
        if(arr[i]!=null)
        {
            searchtitle=arr[i].title;
            searchcontent=arr[i].note;
            
            if(searchtitle.includes(strcnt) || searchcontent.includes(strcnt))
            {   
                count++;
                container.appendChild(document.getElementById(`${arr[i].id}`));
            }
        }
    }
    if(count>0){
        let getsearch = document.getElementById('searchcontainer');
        getsearch.style.display='block';
        getsearch.append=`found ${count} in notes`;
        count=0;
    }
    else{
        let getsearch = document.getElementById('searchcontainer');
        getsearch.style.display='block';
        
    }
}

function hide(){
    document.getElementById('searchcontainer').style.display='none';
    location.reload();
    document.getElementById('found').innerHTML='';
}


let click=0;
function editnote(id){
    let elements = document.getElementById(`${id}`);
    click++;

    if(click==1){
        elements.children[0].children[0].setAttribute('contentEditable','true');
        elements.children[1].setAttribute('contentEditable','true');
        
        elements.children[0].children[0].style.outline='none';
        elements.children[1].style.outline='none';
        
        elements.children[3].innerHTML='save';
    }

    if(click==2){
        let editedtitle =  elements.children[0].children[0].innerHTML;
        let editednote =  elements.children[1].innerHTML;
        
        elements.children[3].innerHTML='edit';

        if(editednote!='' && editedtitle !=''){
            arr[id].title=editedtitle;
            arr[id].note=editednote;
            localStorage.setItem('notes',JSON.stringify(arr));
        }
        else{
            alert('please provide title and note both')
        }
        elements.children[0].children[0].setAttribute('contentEditable','false');
        elements.children[1].setAttribute('contentEditable','false');
        click=0;

        console.log(elements);
        
    }
}

function clearnotes(){
    arr=[];
    localStorage.clear();
    location.reload();
}
