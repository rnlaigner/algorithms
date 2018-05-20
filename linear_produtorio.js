//problema: achar i e j, onde 1 <= i <= j <= n, que otimiza o produtorio dos elemento de i a j
//o produtorio nao otimizado pode se feito em O(n^2)
//para cada elemento, verifica a partir dele os elementos subsequentes, armazenando o maior produtorio possivel da solucao
//uma solucao otimizada e construir a solucao a cada iteracao

//var elems = [1,200,0.1,0.01,200,20];
//var elems = [1,200,0.1,0.01];

//instancia o produtorio maximo esta no centro do array
var elems = [1,200,0.1,0.01,0.1,90,90,0.1,0.01,200,20];

var max_current = elems[0];
var max_total = elems[0];
var max_current_before;
var i1, j1, i2, j2;

// act as return values
i1 = j1 = i_current = j_current = i_max = j_max = 1;

for (var k = i1 + 1; k < elems.length; k++)
{
    max_current_before = max_current;
    max_current = max_current * elems[k];
    
    if (max_current_before < max_current)
    {
        if(i_current == i_max)
        {
            i_current = k;
            max_current = elems[k];
        }
        else
        {
            if (i_current == j_max+1) //sao consecutivos
            {
                if (max_total < max_total * max_current)
                {
                    j_max = k;
                    max_total = max_total * max_current;
                }
            }
            else //nao sao consecutivos
            {
                if(max_total < max_current)
                {
                    i_max = i_current;
                    j_max = k;
                    max_total = max_current;
                }
            }
        }
        
        j_current = k;
    }
    else
    {
        j_current = k;
    }
}


alert(max_total);