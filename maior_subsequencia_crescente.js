var A = [5,2,8,6,3,6,9,7];

var M = matriz_predecessores(A);

maior_sub_crescente(A,M);

//console.log(L[max_elemento(maior_sub_crescente(A,M))]);

function max_elemento(L)
{
    var max = L[0];
    var max_pos = 0;
    for(var i = 1; i < L.length; i++)
    {
        if(L[i] > max)
        {
            max = L[i];
            max_pos = i;
        }
    }
    return max_pos;
}

function maior_sub_crescente(A,M)
{

    var L = [A.length];
    var prev = [A.length];
    
    //inicializa L
    for(var i = 0; i < A.length; i++)
    {
        L[i] = 0;
    }

    for(var i = 0; i < A.length; i++)
    {
        //var max_i = null;
        var max_value = 0;
        for(var j = 0; j < i; j++)
        {
            if(M[i][j] == true && L[j] > max_value)
            {
                //max_i = j;
                max_value = L[j];
                prev[i] = j;
            }
        }
        L[i] = 1 + max_value;
    }

    //mostra subsequencia
    mostra_subsequencia(A,L,prev);

}

function mostra_subsequencia(A,L,prev)
{
    var curr = max_elemento(L);
    var n = L[curr];
    console.log(A[curr]);
    for(var j = 1; j < n; j++)
    {
        console.log(A[prev[curr]]);
        curr = prev[curr];
    }

}

function matriz_predecessores(A)
{

    var matriz = matrix(A.length,A.length,false);

    for(var i = 0; i < A.length; i++)
    {
        for(var j = 0; j < i; j++)
        {
            if(A[j] < A[i])
            {
                matriz[i][j] = true;
            }
        }
    }

    return matriz;

}

//https://stackoverflow.com/questions/966225/how-can-i-create-a-two-dimensional-array-in-javascript
function matrix( rows, cols, defaultValue = 0)
{

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