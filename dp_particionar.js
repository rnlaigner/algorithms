/*

A(i,t) = SIM se existe um subconjunto de {a1,...,ai} cuja soma dos elementos eh igual a t

correlato ao problema do troco

equacao de recorrencia

OPT(i,t) = 
{
    max { OPT( i - 1, t ), Wi + OPT( i - 1, t - Wi ) }  se t >= Wi
    0 caso contrario
}

*/

var A = [2,8,3,4,1];

var T = 9;

var M = monta_matriz_soma(A,T);

/*

segunda parte do problema eh determinar se eh possivel particionar o conjunto A em duas
listas X e Y tal que a soma dos elementos de X seja igual a soma dos elementos de Y

*/

var result = eh_particionavel(A,T,M);

console.log(result);

function eh_particionavel(A,T,M)
{

    if(M[A.length][T] != T)
    {
        console.log("Nao ha subsequencia com soma " + T);
        return false;
    }

    var elems_escolhidos = elementos_escolhidos(A,T,M);

    var elems_nao_escolhidos = retira_elementos(A,elems_escolhidos);

    var M_ = monta_matriz_soma(elems_nao_escolhidos,T);

    if(M_[elems_nao_escolhidos.length][T] != T)
    {
        console.log("Nao eh particionavel");
        return false;
    }

    return true;

}

function retira_elementos(A,elems)
{
    var novo_A = [];
    var insere;

    for(var i = 0; i < A.length; i++)
    {
        insere = true;
        for(var j = 0; j < A.length; j++)
        {
            if(A[i] == elems[j]){
                insere = false;
            }
        }
        if (insere)
        {
            novo_A.push(A[i]);
        }
        
    }
    return novo_A;
}

function monta_matriz_soma(A,T)
{
    var M = matrix(A.length+1,T+1,0);

    for(var i = 1; i < A.length+1; i++)
    {
        for(var t = 1; t < T+1; t++)
        {
            if(t >= A[i-1])
            {
                M[i][t] = max( M[i-1][t], A[i-1] + M[i-1][t-A[i-1]] );
            }
            else
            {
                M[i][t] = M[i-1][t];
            }
        }
    }


    var output = "";
    for(var i = 0; i <=A.length; i++)
    {

        for(var j = 0; j <= T; j++)
        {
            output = output + " | " + M[i][j] + " | ";
        }
        console.log(output);
        output = "";
    }

    return M;

}

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

//pega elementos escolhidos
function elementos_escolhidos(A,T,matriz)
{
    //determinando as cedulas escolhidas
    var total = 0;
    var choice = [];
    var i_elem = A.length-1;
    var i_matriz = A.length;
    var j_matriz = T;

    while (total != T)
    {
        if(matriz[i_matriz][j_matriz] != matriz[i_matriz-1][j_matriz])
        {
            total = total + A[i_elem];
            choice.push(A[i_elem]);
            j_matriz = j_matriz - A[i_elem];
            i_elem = i_elem - 1;
            i_matriz = i_matriz - 1;
        }
        else
        {
            i_matriz = i_matriz - 1;
            i_elem = i_elem - 1;
        }
    }

    return choice;
}