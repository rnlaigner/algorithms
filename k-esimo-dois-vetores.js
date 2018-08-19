/*

Kleinberg & Tardos - Divide and Conquer - Exercise 1

You are interested in analyzing some hard-to-obtain data from two separate databases. 

Each database contains n numerical values—so there are
2n values total—and you may assume that no two values are the same.
You’d like to determine the median of this set of 2n values, which we will
define here to be the nth smallest value.

However, the only way you can access these values is through queries
to the databases. In a single query, you can specify a value k to one of the
two databases, and the chosen database will return the kth smallest value
that it contains. Since queries are expensive, you would like to compute
the median using as few queries as possible.

Give an algorithm that finds the median value using at most O(log n)
queries.

*/

//Como o objetivo é prover o algoritmo para encontrar o k-esimo entre dois vetores, 
//vou usar dois vetores já ordenados para abstrair a operação de encontrar o k-esimo
//elemento de um vetor unitario

var INSTANCE_1a;
var INSTANCE_1b;

var INSTANCE_2a;
var INSTANCE_2b;

var INSTANCE_3a;
var INSTANCE_3b;

var INSTANCE_4a;
var INSTANCE_4b;

init();

var result_1 = calcula_mediana_dois_vetores(INSTANCE_1a,INSTANCE_1b);
var result_2 = calcula_mediana_dois_vetores(INSTANCE_2a,INSTANCE_2b);
var result_3 = calcula_mediana_dois_vetores(INSTANCE_3a,INSTANCE_3b);
var result_4 = calcula_mediana_dois_vetores(INSTANCE_4a,INSTANCE_4b);

console.log("result 1: " + result_1);
console.log("result 2: " + result_2);
console.log("result 3: " + result_3);
console.log("result 3: " + result_4);

/*
var result_aux = median(16,0,0,INSTANCE_3a,INSTANCE_3b);
console.log("result aux: " + result_aux);
*/

function init()
{
    INSTANCE_1a = [0,   1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16];
    INSTANCE_1b = [0,   17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32];

    INSTANCE_2a = [0,   1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,18];
    INSTANCE_2b = [0,   16,17,19,20,21,22,23,24,25,26,27,28,29,30,31,32];

    INSTANCE_3a = [0,   1,2,3,4,5,12,13,14,15,16,17,18,19,20,21,32];
    INSTANCE_3b = [0,   6,7,8,9,10,11,22,23,24,25,26,27,28,29,30,31];

    INSTANCE_4a = [0,   1,2,3,4,5,12,13,14,15,18,19,20,21,22,23,32];
    INSTANCE_4b = [0,   6,7,8,9,10,11,16,17,24,25,26,27,28,29,30,31];
}

function obtem_k_esimo( VETOR, k )
{
    return VETOR[k];
}

function obtem_prox_pos( vetor_length, current_pos, number_of_queries )
{
    var next_pos = Math.pow(2,number_of_queries) / 2;
    return current_pos + next_pos;
}

function min( val1, val2 )
{
    if (val1 < val2)
    {
        return val1;
    }
    return val2;
}

function calcula_mediana_dois_vetores( VETOR_1, VETOR_2 )
{
    var vetor_1_pos = 1;
    var vetor_2_pos = 1;

    var number_of_queries = Math.sqrt( VETOR_1.length - 1 );

    while (  number_of_queries > 0 ) 
    {
        

        var k_a = obtem_k_esimo( VETOR_1, vetor_1_pos );
        var k_b = obtem_k_esimo( VETOR_2, vetor_2_pos );

        if ( k_a > k_b )
        {
            vetor_2_pos = obtem_prox_pos(VETOR_2.length, vetor_2_pos, number_of_queries);
        } 
        else
        {
            vetor_1_pos = obtem_prox_pos(VETOR_1.length, vetor_1_pos, number_of_queries);
        }
        number_of_queries = number_of_queries - 1;
    }

    return min(VETOR_1[vetor_1_pos],VETOR_2[vetor_2_pos]);
}

function median(n,a,b,VETOR_1,VETOR_2)
{
    if(n == 1){
        return min( VETOR_1[a+n], VETOR_2[b+n] );
    }

    var k = Math.ceil(n/2);

    if(VETOR_1[a+k] < VETOR_2[b+k]){
        console.log("k: "+k+" a: "+ parseInt( a+Math.floor(n/2) ) + " b: "+b);
        return median(k,a+Math.floor(n/2),b,VETOR_1,VETOR_2);
    }
    console.log("k: "+k+" a: "+ a + " b: " + parseInt( b+Math.floor(n/2)));
    return median(k,a,b+Math.floor(n/2),VETOR_1,VETOR_2);
}