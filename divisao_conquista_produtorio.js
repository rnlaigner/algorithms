//instancia o produtorio maximo esta no centro do array
var elems = [1,200,0.1,0.01,0.1,90,90,0.1,0.01,200,90];

var result = produtorio(elems,0,elems.length-1);

result.produtorio;

function Result (produtorio,i,j) {
    this.produtorio = produtorio;
    this.i = i;
    this.j = j;
}

function produtorio(A,start,end)
{
    if (start === end)
    {
        var result = new Result(A[start],start,end);
        return result;
    }

    var start_r;
    var end_l;
    var num_elems = end - start + 1;

    var half = parseInt(num_elems/2);
    end_l = start + half - 1;
    start_r = end_l + 1;

    var result_l = produtorio(A,start,end_l);
    var result_r = produtorio(A,start_r,end);

    var prod_max_l, prod_current, start_max_l;
    var prod_max_r, prod_current, end_max_r;

    prod_max_l = A[end_l];
    prod_current = prod_max_l;
    start_max_l = end_l;
    for (var i = end_l-1; i >= result_l.start; i--)
    {
        prod_current = prod_current * A[i];
        if(prod_current > prod_max_l)
        {
            prod_max_l = prod_current;
            start_max_l = i;
        }
    }

    prod_max_r = A[start_r];
    prod_current = prod_max_r;
    end_max_r = start_r;
    for (var i = start_r+1; i <= result_r.end; i++)
    {
        prod_current = prod_current * A[i];
        if(prod_current > prod_max_r)
        {
            prod_max_r = prod_current;
            end_max_r = i;
        }
    }

    var result_c = new Result(prod_max_l * prod_max_r,start_max_l,end_max_r);

    return max(result_l,result_r,result_c);

}

function isOdd(num) { return num % 2;}

function max(result_l,result_r,result_c)
{
    if (result_l.produtorio > result_r.produtorio)
    {
        if(result_l.produtorio >= result_c.produtorio)
        {
            return result_l;
        }
        return result_c;
    }
    else
    {
        if(result_r.produtorio >= result_c.produtorio)
        {
            return result_r;
        }
        return result_c;
    }
}