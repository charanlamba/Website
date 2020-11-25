const isInputValid = input => {
    return input.includes(' ') ? false : true;
}

const fixMathExpr = expr => {
    if(expr.includes('^'))
    {
        exp = expr.charAt(expr.indexOf('^') + 1);
        expr = expr.replace('^' + exp, '<sup>' + exp + '</sup>');
    }
    return expr;
}

const mathOperator = input => {
    switch(input)
    {
        case 'factor':
            return "";
        case 'derive':
            return "<sup>d</sup>&frasl;<sub>dx</sub> ";
        case 'integrate':
            return "&int; ";
        case 'tangent':
            return "";
        case 'area':
            return "";
        default:
            return "";  
    }
}

const endStr = str => {
    return (str === "integrate" ? " + C" : "");
}

const output = () =>
{
    var options = document.getElementById("inputGroupSelect").value;
    var input = document.getElementById("input").value;
    var url = "https://newton.now.sh/api/v2/" + options + "/" + input;
    if(isInputValid(input))
    {
        fetch(url)
            .then(res => {
                return res.json();
            })
            .then(json => {
                document.getElementById("output").innerHTML = mathOperator(options) + fixMathExpr(input) 
                    + " &equals; " + fixMathExpr(JSON.parse(JSON.stringify(json)).result) + endStr(options);
            });
    }
    else
    {
        document.getElementById("input").innerHTML = " ";
        alert("Input " + input + " is invalid\n" + "Try removing spaces in input");
    }
}