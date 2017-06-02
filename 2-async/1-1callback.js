//callback simple
function willCallback(callback) {
    callback();
}

//on passe alors une fonction en parametre qui ne prend pas d'argument
willCallback(()=>console.log('callbacked'));

//callback qui passe un argument
function willCallbackWithArg(callback){
    callback('some data');
}

//dans ce cas, on une reference vers une fonction qui prend un argument
willCallbackWithArg(data=> console.log(data));
//on peut donc ecrire car console.log match
willCallbackWithArg(console.log);


//mais finalement tout ca était inutile en mode synchrone car on aurait pu ecrire les fonctions a la suite.
//les callback prennent leurs sens si on introduit la programmation asynchrone

function willCallbackWithTimeout(callback){
    setTimeout(function(){
        callback('the async data');
    }, 1000);
    console.log('immediatly executed')
}

willCallbackWithTimeout((data)=> console.log(`${data} will print after 1 sec`));




