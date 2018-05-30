var cedulas = [10,5,2,1];

var result = troco(4,7,65);

console.log(result);

/*
equacao de recorrencia

OPT(i,l,v) = 
{
    0 se l == 1 e max{Xi} - v > 0 onde Xi<=v 

    1 se l == 1 e max{Xi} - v == 0 onde Xi<=v 

    OPT(i, l-1, vi - max{Xi}) onde Xi<=v
}

*/

function max(i,v)
{
    var max_k = -1;
    var max = 0;
    for(var k = 0; k < i; k++)
    {
        if(v - cedulas[k] >= 0)
        {
            if(cedulas[k] > max)
            {
                max_k = k;
                max = cedulas[k];
            }
        }
    }
    if (max_k < 0)
    {
        return null;
    }
    return cedulas[max_k];
}

function troco(i,l,v)
{
    var x = max(i,v);

    //
    if (x == null)
    {
        return 0;
    }

    if(l===1)
    {
        if ((v-x) != 0)
        {
            return 0;
        }
        return 1;
    }

    troco(i,l-1,v-x);
}

