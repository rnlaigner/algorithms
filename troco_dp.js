var cedulas = [8,6,10,4,1];

var T = 11;

var n = cedulas.length;


/*
equacao de recorrencia

OPT(i,t) = 
{
    max { OPT( i - 1, t ), Wi + OPT( i - 1, t - Wi ) }  se t >= Wi
    0 caso contrario
}

*/

var matriz = matrix(n+1,T+1,0);

//https://stackoverflow.com/questions/966225/how-can-i-create-a-two-dimensional-array-in-javascript
function matrix( rows, cols, defaultValue = 0){

    var arr = [];
  
    // Creates all lines:
    for(var i=0; i < rows; i++){
  
        // Creates an empty line
        arr.push([]);
  
        // Adds cols to the empty line:
        arr[i].push( new Array(cols));
  
        for(var j=0; j < cols; j++){
          // Initializes:
          arr[i][j] = defaultValue;
        }
    }
  
  return arr;
}

function max(i,j)
{
    if (i > j)
    { 
        return i;
    }
    else
    {
        return j;
    }
}

for(var i = 0; i<=T; i++)
{
    matriz[0][i] = 0;
}

for(var i = 0; i <= n; i++)
{
    matriz[i][0] = 0;
}

var output = "";

for(var i = 1; i < n+1; i++)
{
    for(var t = 1; t < T+1; t++)
    {
        if(t >= cedulas[i-1])
        {
            matriz[i][t] = max( matriz[i-1][t], cedulas[i-1] + matriz[i-1][t-cedulas[i-1]] );
        }
        else
        {
            matriz[i][t] = matriz[i-1][t];
        }

        //output = output + " | " + matriz[i][j] + " | ";
        //console.log(output);
    }
    //output = "";
}

output = "";

for(var i = 0; i <=n; i++)
{

    for(var j = 0; j <= T; j++)
    {
        output = output + " | " + matriz[i][j] + " | ";
    }
    console.log(output);
    output = "";
}

if(matriz[n][T] != T)
{
    console.log("Nao ha cedulas viaveis para troco!");
    return;
}

//determinando as cedulas escolhidas
var total = 0;
choice = [];
var i_elem = n-1;
var i_matriz = n;
var j_matriz = T;

while (total != T)
{
    if(matriz[i_matriz][j_matriz] != matriz[i_matriz-1][j_matriz])
    {
        total = total + cedulas[i_elem];
        choice.push(cedulas[i_elem]);
        i_elem = i_elem - 1;
        i_matriz = i_matriz - 1;
    }
    else
    {
        i_matriz = i_matriz - 1;
        i_elem = i_elem - 1;
    }
}

console.log(choice);