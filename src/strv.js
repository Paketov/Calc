/*||||||||||||||||||||||||||||||||||||||||||||||||||||||||||
|||||||||Создал: Солодов А.Н (MS>PAKETOVS) 2011.3|||||||||||
||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||
Программа вычисления в строке получает строку возврвщает ответ
*/
if (typeof window.widget == 'undefined') {
    window.widget = (function ()
    {
        var maximized;
        function isMaximized() { return window.innerWidth == window.outerWidth && window.innerHeight == window.outerHeight; }
        function init()
        {
            maximized = isMaximized();
            window.addEventListener('focus', function ()
            {
                window.widget.onFocus();
            }, false);
            window.addEventListener('resize', function ()
            {
                if (maximized && !isMaximized()) {
                    maximized = false;
                    window.widget.onRestore();
                }
                else if (!maximized && isMaximized()) {
                    maximized = true;
                    window.widget.onMaximize();
                }
            }, false);
        }
        return {
            onFocus: function ()
            {
            },
            onMaximize: function ()
            {
            },
            onRestore: function ()
            {
            },
            onWakeup: function () { },
            openURL: function (url)
            {
                document.location = url;
            }
        }
    })();
};
if (typeof widget.setPreferenceForKey == "undefined") {
    widget.preferenceForKey = function (key)
    {
        try { return window.localStorage.getItem(key); } catch (e) { return 0; }
    };
    widget.setPreferenceForKey = function (preference, key)
    {
        try { return window.localStorage.setItem(key, preference); } catch (e) { return 0; };
    };
};

Math.Fact = function (N)
{
    if (N > 0) {
        if ((N % 1) != 0)
            return Math.pow(N / Math.E, N) * Math.sqrt(2 * Math.PI * N) * (1 + 1 / (12 * N) + 1 / (288 * N * N));
        var R;
        for (R = N, N--; N != 0; N--)
            R *= N;
        return R;
    }
    return 1;
}

Math.Integ = function(func,a,b,eps)
{
        var Ret = 0;
        for(var Step = a + eps / 2;Step < b; Step += eps)
           Ret += func(Step) * eps;
        return Ret;    
}

//================================================================================================

Number.prototype.ToRational = function (eps)
{   /*Переводит число в рациональную дробь с точностью eps если такое получается.*/
    var O, Z, i;
    O = Z = this % 1;
    if (O == 0) return [this, 0, 1];
    eps = [eps ? eps : 0, eps ? (0.1 / eps) : 0xffff];
    for (var i = 1; (i < eps[1]) && (Math.abs(Z - Math.round(Z)) > eps[0]); i++)
        Z = i / O;
    return [parseInt(this), i - 1, Math.round(Z)];
}

String.prototype.ReplaceOllWord = function (ss, news, g, pos)
{/*Замена слова в строке.*/
    var ins = this;
    pos = (pos != null) ? pos : 0;
    while ((pos = ins.indexOf(ss, pos)) != -1)
        if (((pos == 0) || (/[^a-zа-я0-9_]/i.test(ins.charAt(pos - 1)))) && ((pos == (ins.length - ss.length)) || (/[^a-zа-я0-9_]/i.test(ins.charAt(pos + ss.length))))) {
            ins = ins.substring(0, pos) + news + ins.substr(pos + ss.length);
            pos += ss.length;
            if (!g) break;
        } else { pos++; }
    return ins;
}

String.prototype.SearchOllWord = function (ss, pos)
{/*Поиск только слова.*/
    var ins = this;
    pos = (pos != null) ? pos : -1;
    while ((pos = ins.indexOf(ss, pos + 1)) != -1)
        if (((pos == 0) || (/[^a-zа-я0-9_]/i.test(ins.charAt(pos - 1)))) && ((pos == (ins.length - ss.length)) || (/[^a-zа-я0-9_]/i.test(ins.charAt(pos + ss.length)))))
            return pos;
    return -1;
}

function ConvertToRational(str, eps)
{/*Функция переводит все числа в строке в рациональные дроби.*/
    var ind = 0, vstr;
    while ((NUM = cif(str, ind, false, Select1.value == "Hex", true))[0]) {
        if (NUM.type == 0) { /////Если число
            Ration = ToFloat(NUM[0]).ToRational(eps);
            if (Ration[2] != 1) {
                vstr = ((Ration[0] != 0) ? (ToSysSel(Ration[0], 1) + '+') : '') + ToSysSel(Ration[1], 1) + '/' + ToSysSel(Ration[2], 1);
                str = str.substr(0, NUM[1] - NUM[0].length) + vstr + str.substr(NUM[1]);
                ind = NUM[1] + vstr.length - NUM[0].length;
            } else { ind = NUM[1]; }
        } else { ind = NUM.index - NUM[0].length + 1 }
    }
    return str;
}

window.pre = (function ()
{/*Универсальный перевод чисел в разные системы счисления.*/
    function FA(num, a, b)
    {
        //Метод может работать только с десятичной системой счисления
        if (a == 10) return parseFloat(num).toString(b);
        var O = num.substring(num.indexOf('.') + 1);
        var R = parseInt(num, a);
        for (var i = 1; i <= O.length; i++)
            R += parseInt(O.substr(i - 1, 1), a) * Math.pow(a, -i);
        return R.toString();
    }

    function FC(O, a, b)
    {
        //Метод преобразования дробных чисел в другие системы счисления
        var si = '';
        if (O.substr(0, 1) == '-') {
            O = O.substring(1);
            si = '-';
        }
        if ((a == 10) || (b == 10))
            return si + FA(O, a, b);
        return si + FA(FA(O, a, 10), 10, b);
    }

    function ScNo(Ob, a, b)
    {
        if (typeof Ob == "number") return Ob.toString(b);
        if (isNaN(parseInt(Ob, a)) || (a == b)) return Ob;
        if (((a > 10) && (Ob.indexOf(".") != -1)) || ((a <= 10) && ((parseFloat(Ob) % 1) != 0)) || ((a == 10) && (Ob.indexOf("e+") != -1)))
            return FC(Ob, a, b);
        return parseInt(Ob, a).toString(b);
    }
    return ScNo;
})();

document.onkeydown = function (event)
{
    if ((event != null) && (event.keyCode == 13)) {
        if (Page1.style.display != 'none') Button5_onclick();
        if (Page2.style.display != 'none') fun_ravno();
        if (Page3.style.display != 'none') Text1.value += (' = ' + Calculate(Text1.value));
    }
}
var PastExec;

function GetArg(str, S, BR, BR2)
{ /* Считывание аргументов функций.
   *Возвращает массив аргументов или -1 в случае отсутствия аргументов.
   */
    if ((BR == null) || (BR == 0)) BR = ['[', ']'];
    if (S == null) S = 0;
    if ((S = str.indexOf(BR[0], S)) == -1) return -1;
    var IS2, S2, otv = [], IS;
    try {
        while (true) {
            IS = scobki(str, S, BR, true);
            if (IS[1] == S) break;
            str = str.substr(0, IS[1]) + String.fromCharCode(2) + IS[0].replace(/,/g, '¤') + String.fromCharCode(3) + str.substr(IS[2] + 1);
        }
        if (BR2 != null)
            for (var w = 0; w < BR2.length; w++, S2 = 0)
                while ((IS2 = GetArg(IS[0], S2, BR2[w])) != -1) {
                    IS[0] = IS[0].replace(BR2[w][0] + IS2[0].join(',') + BR2[w][1], BR2[w][0] + IS2[0].join('¤').replace(/,/g, '¤') + BR2[w][1]);
                    S2 = IS2[1];
                }
        otv = (IS[0]).split(',');
    } catch (e) { return -1; }
    for (var i = 0; i < otv.length; i++)
        otv[i] = (otv[i].replace(/¤/g, ',').replace(/\x03/g, BR[1])).replace(/\x02/g, BR[0]);
    return [otv, IS[2], S];
}

function Calculate(str)
{
    /*Функция вычисления выражений в строке */
    var VS, T = false, OP = str.match(/set|if|rnd|rou|for|rix|scmp|whi|rxm/i);
    if (OP != null) return CalcOperator(str, OP);
    while ((VS = scobki(str)) != -1) {
        VSC = "(" + VS + ")";
        while (CalEx(VS, true) && (T != VS))
            VS = CalEx(T = VS);
        str = str.split(VSC).join(VS);
    }
    while (CalEx(str, true) && (T != str))
        str = CalEx(T = str);
    return str;
}

function CalcOperator(str, OPER)
{
    /*Функции обработки выражений*/
    var param = GetArg(str, OPER.index, 0, [['{', '}'], ['(', ')']]);
    if (param == -1) return Calculate(str.replace(OPER[0], ''));
    switch (OPER[0].toLowerCase()) {
        case 'for':
            //Если найден цикл
            param[0][1] = ToFloat(param[0][1]); param[0][2] = ToFloat(param[0][2]);
            str = str.replace(str.substring(OPER.index, param[1] + 1), '');
            var vre = str;
            for (var i = param[0][1], k = 0; (i < param[0][2]) && (k < 0x1fff); k++) {
                vre += (" f(" + i.toString(opr(Select1.value)) + ")=" + Calculate(str.split(param[0][0]).join(i.toString(opr(Select1.value)).replace('-', 'm'))));
                i = (param[0][3] != null) ? ToFloat(param[0][3].split(param[0][0]).join(ToSysSel(i, true))) : i + 1;
            }
            return vre;
        case 'whi':
            //Если найден цикл выражения до истиности
            if (param[0].length < 2) return Calculate(str.replace(str.substring(OPER.index, param[1] + 1), ''));
            var Counter, insideCounter, FinishCounter;
            Counter = (param[0][3] != null) ? ToFloat(param[0][3]) : 0;
            FinishCounter = (param[0][4] != null) ? ToFloat(param[0][4]) : null;
            for (insideCounter = 0; insideCounter < 0xffff; insideCounter++) {
                if (parseInt(ToFloat(param[0][0].split(param[0][1]).join(ToSysSel(Counter, true))))) {
                    str = str.replace(str.substring(OPER.index, param[1] + 1), ToSysSel(Counter, true));
                    return Calculate(str);
                }
                if (param[0][2] != null)
                    Counter = ToFloat(param[0][2].split(param[0][1]).join(ToSysSel(Counter, true)));
                else
                    Counter++;
                if ((FinishCounter != null) && (FinishCounter < Counter)) break;
            }
            //Если ничего не получилось
            str = str.replace(str.substring(OPER.index, param[1] + 1), '');
            return Calculate(str);
        case 'if':
            //Если найдено условие
            if (param[0].length < 2) return Calculate(str.replace(str.substring(OPER.index, param[1] + 1), ''));
            str = str.replace(str.substring(OPER.index, param[1] + 1), (ToFloat(param[0][0])) ? param[0][1] : ((param[0][2]) ? param[0][2] : ''));
            return Calculate(str);
        case 'rnd':
            //Если найдено генерирование случайного числа
            if (param[0][0] == '') { param[0][0] = '0'; param[0][1] = '1'; }
            if (param[0][1] == null) { param[0][1] = param[0][0]; param[0][0] = '0'; }
            param[0][0] = ToFloat(param[0][0]); param[0][1] = ToFloat(param[0][1]);
            var num = ToSysSel((Math.random() * (param[0][1] - param[0][0])) + param[0][0]);
            str = str.replace(str.substring(OPER.index, param[1] + 1), num.replace(/[-]/g, 'm'));
            return Calculate(str);
        case 'rou':
            //Округление
            if (param[0].length < 1) return Calculate(str.replace(str.substring(OPER.index, param[1] + 1), ''));
            param[0][1] = (param[0][1]) ? Math.abs(ToFloat(param[0][1])) : 0;
            if (Select1.value == 'Dec') {
                param[0][0] = ToFloat(param[0][0]);
                chisl = (isNaN(param[0][0])) ? param[0][0] : ToSysSel(param[0][0].toFixed(param[0][1]), true);
            } else {
                chisl = param[0][0].substr(0, param[0][0].indexOf('.')) + '.' + param[0][0].substr(param[0][0].indexOf('.') + 1, param[0][1]);
            }
            str = str.replace(str.substring(OPER.index, param[1] + 1), chisl);
            return Calculate(str);
        case 'rix':
            //перевод в выбраннную систему счисления
            if (param[0].length < 3) return Calculate(str.replace(str.substring(OPER.index, param[1] + 1), ''));
            param[0][0] = Calculate(param[0][0]); param[0][1] = Math.abs(parseInt(Calculate(param[0][1]).replace('m', '-'))); param[0][2] = Math.abs(parseInt(Calculate(param[0][2]).replace('m', '-')));
            chisl = pre(param[0][0].replace(/m+/, (param[0][0].match(/m*/)[0].length & 1) ? '-' : '').replace("e—", "e-").replace("e†", "e+"), param[0][1], param[0][2]).replace("e-", "e—").replace("e+", "e†").replace('-', 'm');
            str = str.replace(str.substring(OPER.index, param[1] + 1), chisl.toString());
            return Calculate(str);
        case 'set':
            //Если найдено присвоение значения переменной
            if (param[0].length < 2) return Calculate(str.replace(str.substring(OPER.index, param[1] + 1), ''));
            VS = vscob2(str, OPER.index);
            str = str.substring(0, VS[0]) + str.substring(VS[0], OPER.index).split(filt_p(param[0][0])).join((param[0][1]) ? param[0][1] : '') + str.substring(param[1] + 1, VS[1]).split(filt_p(param[0][0])).join((param[0][1]) ? param[0][1] : '') + str.substr(VS[1]);
            return Calculate(str);
        case 'scmp':
            //Сравнение строк
            if (param[0].length < 2) return Calculate(str.replace(str.substring(OPER.index, param[1] + 1), ''));
            if (param[0][2] && (param[0][2] != '0')) { param[0][0] = param[0][0].toLowerCase(); param[0][1] = param[0][1].toLowerCase(); }
            str = str.replace(str.substring(OPER.index, param[1] + 1), (filt_p(Calculate(param[0][0])) == filt_p(Calculate(param[0][1]))) ? '1' : '0');
            return Calculate(str);
        case 'rxm':
            if ((param[0][2] != null) && (param[0][2].indexOf('#') != -1))
                Retn = (ToFloat(param[0][3])) ? Matrix.RegExpMatr(param[0][0], param[0][1], param[0][2], true) : Matrix.RegExpMatr(param[0][0], param[0][1], param[0][2]);
            else
                Retn = (ToFloat(param[0][3])) ? Matrix.RegExpMatr(param[0][0], param[0][1], false, true) : Matrix.RegExpMatr(param[0][0], param[0][1]);
            str = str.replace(str.substring(OPER.index, param[1] + 1), Retn);
            return Calculate(str);
    }
}


function CalEx(str, T)
{
    /*Обобщающая функция вычисления может вычислять только одно действие*/
    var de = SearAct(str, 0);
    if (de[1] == -1) return (/\>=|\<=|\!=|\==|\<|\>/.test(str)) ? srawnenie(str) : false;
    if (T) return true;
    var NUM2 = cif(str, de[1] + de[0].length - 1, 0, Select1.value == "Hex" || de[0] == "hex");
    var ZS, NUM1 = 0;
    if (/sin|cos|tg|atg|asin|acos|ln|bin|hex|dec|oct|cor|abs|fac|pi|\!|[~]/.test(de[0])) {
        if (de[0] == "pi")
            ZS = str.substring(de[1] - 1, de[1] + 1);
        else if (NUM2.type == 0)
            ZS = str.substring(de[1] - 1, NUM2[1]);
        else if (NUM2.type == 1) //////////Если матрица
            return Matrix.Calculate(str, de, 0, NUM2);
        else if (NUM2.type == 2)//////////Если Множество
            return Multiplicity.Calculate(str, de, 0, NUM2);
        else if (NUM2.type == 3)//////////Если вектор
            return Vector.Calculate(str, de, 0, NUM2);
    } else {
        NUM1 = cif(str, de[1], 1, Select1.value == "Hex");
        if ((NUM2.type == 0) && (NUM1.type == 0))
            ZS = str.substring(NUM1[1], NUM2[1]);
        else if ((NUM2.type == 1) || (NUM1.type == 1)) //////////Если матрица
            return Matrix.Calculate(str, de, NUM1, NUM2);
        else if ((NUM2.type == 2) || (NUM1.type == 2)) //////////Если множество
            return Multiplicity.Calculate(str, de, NUM1, NUM2);
        else if ((NUM2.type == 3) || (NUM1.type == 3)) //////////Если вектор
            return Vector.Calculate(str, de, NUM1, NUM2);
    }
    var RET = (/bin|hex|dec|oct/.test(de[0])) ? vichislenie(NUM1[0], de[0], NUM2[0]) : ToSysSel(vichislenie(ToFloat(NUM1[0]), de[0], ToFloat(NUM2[0])), true);
    return str.replace(ZS, RET);
}

function cif(str, STR, NK, HX, t)
{
    /*Функция поиска цифр и матриц в строке возврощает найденные цифры и матрицы .*/
    var RE;
    if (NK) {
        str = str.substr(0, STR).toLowerCase();
        RE = str.match(HX ? /(m*[0-9a-f]+(?:\.[0-9a-f]+)?|m*infinity|nan|#\[[^\]]*\]|(?:\$|@)\{[^\}]*\})(?:[^0-9a-f\]]*$)/ : /(m*\d+(?:\.\d+)?(?:(?:e—\d+|e†\d+)\d+)?|m*infinity|nan|#\[[^\]]*\]|(?:\$|@)\{[^\}]*\})(?:[^0-9\]]*$)/);
        if (RE == null) return { 0: (t ? false : "0"), 1: (STR - 1), type: 0 };
        RE[0] = RE[1];
    } else {
        str = str.substring(STR).toLowerCase();
        RE = str.match(HX ? /m*[0-9a-f]+(?:\.[0-9a-f]+)?|m*infinity|nan|#\[[^\]]*\]|(?:\$|@)\{[^\}]*\}/ : /m*\d+(?:\.\d+)?(?:(?:e—\d+|e†\d+)\d+)?|m*infinity|nan|#\[[^\]]*\]|(?:\$|@)\{[^\}]*\}/);
        if (RE == null) return { 0: (t ? false : "0"), 1: STR, type: 0 };
        RE.index += (STR + RE[0].length);
    }
    if (RE[0].indexOf('#[') != -1)
        return { 0: RE[0], index: RE.index, type: 1 };
    else if (RE[0].indexOf('${') != -1)
        return { 0: RE[0], index: RE.index, type: 2 };
    else if (RE[0].indexOf('@{') != -1)
        return { 0: RE[0], index: RE.index, type: 3 };
    return { 0: RE[0].replace(/m+/, (RE[0].match(/m*/)[0].length & 1) ? 'm' : '').replace('in', 'In'), 1: RE.index, type: 0 };
}

function SearAct(str)
{
    /*Функция поиска знака вычисления*/
    str = str.toLowerCase();
    R = [/pi/, /bin|dec|oct|hex/, /asin|acos|atg|sin|cos|tg/, /abs|\^|ln|log|fac|sco|cor/, /\!(?!\=)|<<|>>/, /[|]|[&]|[%]|[~]|[\\]/, /[*]|[\/]/, /[-]|[+]/];
    for (var i = 0; i < R.length; i++)
        if ((N = str.match(R[i])) != null) return [N[0], N.index + 1];
    return [null, -1];
}

function scobki(str, ST, S, T)
{
    /*Функция извлечения скобок из строки*/
    var ZS, OS, RS;
    if (S == null) S = ['(', ')'];
    if (ST == null) ST = 0;
    if ((ZS = str.indexOf(S[1], ST)) == -1) return -1;
    if ((OS = str.lastIndexOf(S[0], ZS)) == -1) return -1;
    RS = str.substring(OS + 1, ZS);
    return (T) ? [RS, OS, ZS] : RS;
}

function vscob2(str, ST)
{/*Нахождение внешних скобок в строке.*/
    var FA = { index: -1 }, SA = { index: ST - 1 };
    for (var N = 0; N >= 0; ) {
        FA = str.substr(ST += (FA.index + 1)).match(/\(|\)/);
        if (FA == null)
            break;
        else if (FA[0] == "(")
            N++;
        else
            N--;
    }
    for (var N = 0; N >= 0; ) {
        SA = str.substr(0, SA.index).match(/(\(|\))[^\(\)]*$/);
        if (SA == null)
            break;
        else if (SA[1] == ")")
            N++;
        else
            N--;
    }
    return ((SA == null) || (FA == null)) ? [0, str.length] : [SA.index + 1, ST + FA.index];
}

function vichislenie(nu1, znak, nu2)
{
    switch (znak) {
        case "/": return nu1 / nu2;
        case "*": return nu1 * nu2;
        case "+": return nu1 + nu2;
        case "-": return nu1 - nu2;
        case "|": return nu1 | nu2;
        case "&": return nu1 & nu2;
        case "%": return nu1 % nu2;
        case "~": return ~nu2;
        case "\\": return nu1 ^ nu2;
        case "<<": return nu1 << nu2;
        case ">>": return nu1 >> nu2;
        case "!": return (nu2) ? 0 : 1;
        case "<": return nu1 < nu2;
        case ">": return nu1 > nu2;
        case "!=": return nu1 != nu2;
        case "==": return nu1 == nu2;
        case ">=": return nu1 >= nu2;
        case "<=": return nu1 <= nu2;
        case "^": return Math.pow(nu1, nu2);
        case "cor": return Math.sqrt(nu2);
        case "sco": return Math.pow(nu2, 1 / nu1);
        case "pi": return TransAngle(Math.PI, 'r', Select2.value);
        case "sin": return Math.sin(TransAngle(nu2, Select2.value, 'r'));
        case "cos": return Math.cos(TransAngle(nu2, Select2.value, 'r'));
        case "tg": return Math.tan(TransAngle(nu2, Select2.value, 'r'));
        case "asin": return TransAngle(Math.asin(nu2), 'r', Select2.value);
        case "acos": return TransAngle(Math.acos(nu2), 'r', Select2.value); ;
        case "atg": return TransAngle(Math.atan(nu2), 'r', Select2.value); ;
        case "ln": return Math.log(nu2);
        case "log": return Math.log(nu2) / Math.log(nu1);
        case "bin": return pre(nu2, 2, opr(Select1.value));
        case "oct": return pre(nu2, 8, opr(Select1.value));
        case "hex": return pre(nu2, 16, opr(Select1.value));
        case "dec": return pre(nu2, 10, opr(Select1.value));
        case "abs": return Math.abs(nu2);
        case "fac": return Math.Fact(nu2);
    }
}

function srawnenie(str)
{
    /*Функция сравнения чисел в ответе*/
    var otv = true, xod = 0, X, Y;
    srm = str.match(/\>=|\<=|\!=|\==|\<|\>/g);
    for (var xodm = 0; xodm < srm.length; xodm++) {
        xod = str.indexOf(srm[xodm], xod);
        X = cif(str, xod, 1, Select1.value == "Hex");
        Y = cif(str, xod, 0, Select1.value == "Hex");
        if ((X.type == 0) && (Y.type == 0))
            otv = vichislenie(ToFloat(X[0]), srm[xodm], ToFloat(Y[0]));
        else if ((X.type == 1) || (Y.type == 1))
            otv = Matrix.Calculate(str, [srm[xodm]], X, Y);
        else if ((X.type == 2) || (Y.type == 2))
            otv = Multiplicity.Calculate(str, [srm[xodm]], X, Y);
        else if ((X.type == 3) || (Y.type == 3))
            otv = Vector.Calculate(str, [srm[xodm]], X, Y);
        if (!otv) break; xod++;
    }
    return (otv) ? '1' : '0';
}
function ToFloat(O)
{
    if (typeof O != "string") return O;
    O = pre(Calculate(O).replace("e—", "e-").replace("e†", "e+").replace(/m+/, (O.match(/m*/)[0].length & 1) ? '-' : ''), opr(Select1.value), 10);
    return (isNaN(O)) ? O : parseFloat(O);
}
function ToSysSel(O, p)
{
    if (typeof O == "string") return O;
    return (p) ? pre(O, 10, opr(Select1.value)).replace("e-", "e—").replace("e+", "e†").replace("-", "m") : pre(O, 10, opr(Select1.value));
}

//Глобальные переменные
var st, se2;
//Выбор угла
function AngleGet__() { se2 = Select2.value; }
function AngleRun__() { if (Text1.value != '') Text1.value = TransAngle(parseFloat(Text1.value), se2, Select2.value); }
function filt_p(str) { return str.replace(/ /g, ""); }

function OprGet__() { st = opr(Select1.value); }
function OprRun__() { if (pre(Text1.value.replace(/m/i, '-'), st, opr(Select1.value)) != 'NaN') Text1.value = pre(Text1.value.replace('m', '-'), st, opr(Select1.value)).replace("-", "m"); }
function TransAngle(num, sys1, sys2)
{
    switch (sys1) {
        case sys2: return num;
        case "gr": if (sys2 == "r") return (num / 180.0) * Math.PI; else return num / 0.9;
        case "r": if (sys2 == "g") return (num * 200.0) / Math.PI; else return (num * 180.0) / Math.PI;
        case "g": if (sys2 == "r") return (num / 200.0) * Math.PI; else return num * 0.9;
    }
}
//Определение записи
function opr(str)
{
    switch (str.toLowerCase()) {
        case "oct": return 8;
        case "dec": return 10;
        case "bin": return 2;
        case "hex": return 16;
        default: return 10;
    }
}

///////////////////////////////////////////////////////////////////
////Всё что относится к странице 3
var FUNCTION = new String(), _X, _Y, _Z;

function fun_ravno()
{
    //Функция вычисления математической функции
    if ((FUNCTION == '') || (Text1.value != '')) { Start_exec(Sel.InsertFunction(Text1.value)); return; }
    var str_vich = new String(FUNCTION);
    if (str_vich.search('hex') != -1) str_vich = str_vich.replace(/hex/g, 'hew'); str_vich = Sel.InsertFunction(str_vich);

    if (str_vich.search(/[xX]+/gi) != -1) { if (_X != null) { str_vich = str_vich.replace(/[Xx]+/g, _X); } else { alert("X not found !"); return; } }
    if (str_vich.search(/[yY]+/gi) != -1) { if (_Y != null) { str_vich = str_vich.replace(/[Yy]+/g, _Y); } else { alert("Y not found !"); return; } }
    if (str_vich.search(/[zZ]+/gi) != -1) { if (_Z != null) { str_vich = str_vich.replace(/[Zz]+/g, _Z); } else { alert("Z not found !"); return; } }
    if (str_vich.search('hew') != -1) str_vich = str_vich.replace(/hew/g, 'hex'); Text1.value = Calculate(str_vich);
}
function func_save() { if (Text1.value != "") { FUNCTION = Text1.value; Text1.value = ""; } else { if (FUNCTION != null) Text1.value = FUNCTION; } }
function save_X() { if (Text1.value != "") { _X = Text1.value; Text1.value = ""; } else { if (_X != null) Text1.value = _X; } }
function save_Y() { if (Text1.value != "") { _Y = Text1.value; Text1.value = ""; } else { if (_Y != null) Text1.value = _Y; } }
function save_Z() { save_sel(); if (Text1.value != "") { _Z = Text1.value; Text1.value = ""; } else { if (_Z != null) Text1.value = _Z; } }
///////////////////////////////////////Списки переменных и функций
window.Sel = new Object();
Sel.AddItem = function (objSel)
{
    /*Добавление элемента в список*/
    if (Text1.value == '') return;
    s = Text1.value;
    if (s.length > 22) s = s.substring(0, 19) + '...';
    objSel.options[objSel.options.length] = new Option(s, Text1.value);
}
Sel.PrintItem = function (objSel) { /*Вывод элемента из списка*/Text1.value = objSel.value; }
Sel.DelItem = function (objSel) { /*Удаление элемента из списка*/if (objSel.length != 0) objSel.remove(objSel.selectedIndex); }
Sel.Save = function (spisok, save_key)
{
    /*Сохранение списка в памяти*/
    if (window.widget) {
        var sel_array = '';
        for (var i = 0; i < spisok.options.length; i++)
            sel_array += spisok.options[i].value + '‼';
        widget.setPreferenceForKey(sel_array, save_key);
    }
}

Sel.Load = function (spisok, save_key, CountChar)
{
    /*Загрузка из памяти функций и переменных*/
    if (window.widget) {
        if (CountChar == null) CountChar = 22;
        var sel_array = new String(widget.preferenceForKey(save_key));
        var arr_func = sel_array.split('‼'), s;
        for (var i = 0; i < (arr_func.length - 1); i++) {
            s = arr_func[i];
            if (s.length > CountChar) s = s.substring(0, CountChar - 3) + '...';
            spisok.options[spisok.options.length] = new Option(s, arr_func[i]);
        }
    }
}

Sel.AddFuntion = function (objSel)
{
    /*Добавление переменных в список*/
    var SA, TV, VA = (Text1.value).split(/\n/);
    for (var p = 0; p < VA.length; p++) {
        if (((TV = filt_p(VA[p]).match(/([^(=]*)([^=]*)=([\s\S]*)/)) == null) || ((TV[2].indexOf(TV[1]) == -1) && (TV[3].indexOf(TV[1]) != -1))) continue;
        for (var i = 0; i < objSel.options.length; i++)
            if ((objSel.options[i].value).match(/[^(=]*/)[0] == TV[1]) {
                objSel.remove(i);
                break;
            }
        objSel.options[objSel.options.length] = new Option((TV.input.length > 11) ? TV.input.substring(0, 8) + '...' : TV.input, TV.input);
    }
}

Sel.InsertFunction = function (str)
{
    /*Импортирование функции из списка в текст*/
    for (sh = 0; sh < 3; sh++)
        for (i = 0; i < Select2p3.options.length; i++) 
        {
            A = Select2p3.options[i].value.match(/([^=]*)=([\s\S]*)/);
            if ((Z = GetArg(A[1], 0, ['(', ')'])) != -1) 
            {
                R = A[1].substring(0, Z[2]);
                if (str.SearchOllWord(R) == -1) 
                     continue;
                while ((D = str.SearchOllWord(R)) != -1) 
                {
                    var TempTemplateFunc = A[2];
                    if (((str.indexOf('(', D) - (D + R.length)) < 2) && ((P = GetArg(str, D, ['(', ')'], [['[', ']'], ['{', '}']])) != -1)) 
                    {
                        str = str.substring(0, P[2]) + ' ' + str.substr(P[1] + 1);
                        for (j = 0; (j < P[0].length) && (j < Z[0].length); j++)
                            TempTemplateFunc = TempTemplateFunc.ReplaceOllWord(Z[0][j], P[0][j], true);
                    }
                    str = str.ReplaceOllWord(R, TempTemplateFunc);
                }
            } else 
            {
             str = str.ReplaceOllWord(A[1], A[2], true); 
            }
        }
    return str;
}

///////////////////////////////////////////////////////////////////
//Всё что относится к первой странице
var mem, te1, ty = null;

function SetOnePage(D)
{
    ty = D;
    te1 = ToFloat(Text1.value);
    Text1.value = "";
}
function CalcOnePage(D)
{
    if (Text1.value != '') {
        Text1.value = ToSysSel(vichislenie(te1, ty ? ty : D, ToFloat(Text1.value)), true);
        ty = false;
    }
}
function Button5_onclick()
{
    st = opr(Select1.value);
    if (ty) CalcOnePage();
    else
        Start_exec(Text1.value);
}
function MemAdd() { mem = Text1.value; }
function MemShow() { if (mem != null) Text1.value = mem; else alert("Memory nothing!"); }
function MemNull() { mem = null; }
function GoToPage(PageStart, PageGo, TextHeight, SelectTop)
{
    PageStart.style.display = 'none';
    PageGo.style.display = 'block';
    Text1.style.height = TextHeight;
    Select1.style.top = SelectTop;
    Select2.style.top = SelectTop;
}
function Start_exec(str)
{
    if (str != '') {
        //Проверка на вывод в рациональном виде чисел
        rati = str.search(/rational/i);
        str = str.replace(/rational/i, '');
        var teststr = Calculate((PastExec != null) ? str.replace(PastExec, '') : str);
        if (teststr != '') {
            Text1.value += (' = ' + ((rati == -1) ? teststr : ConvertToRational(teststr, 0.0000001)));
            PastExec = Text1.value;
        }
    }
}

//========================================================================================================


//////////Матрицы
window.Matrix = new Object();

Matrix.det = function (p)
{
    /*Детерминант матрицы*/
    if (p.stroc == 1)
        return p[0][0];
    var i, h, x, y, d = 0;
    var add = Matrix.New(p.stroc - 1);
    for (i = 0; i < p.stroc; ++i) {
        for (y = 1; y < p.stroc; y++)
            for (x = 0; x < p.stroc; x++) {
                if (x == i) continue;
                if (x < i)
                    add[x][y - 1] = p[x][y];
                else
                    add[x - 1][y - 1] = p[x][y];
            }
        if (i % 2) p[i][0] = -p[i][0];
        d += p[i][0] * Matrix.det(add);
    }
    return d;
};

Matrix.T = function (A)
{
    /*Транспонирование матрицы*/
    var B = Matrix.New(A.stolb, A.stroc);
    for (var i = 0; i < A.stroc; i++)
        for (var j = 0; j < A.stolb; j++)
            B[j][i] = A[i][j];
    return B;
}

Matrix.New = function (n, b, c)
{   /*Создание новой матрицы.
    *Если i число то создаем матрицу с i на главной диагонали.
    */
    var A = [];
    A.stolb = (b == null) ? n : b;
    A.stroc = n;
    for (var i = 0; i < n; ++i) {
        A[i] = [];
        for (var j = 0; (typeof c == 'number') && (j < A.stolb); ++j)
            A[i][j] = (i == j) ? c : 0;
    }
    return A;
}

Matrix.Calculate = function (str, deistv, matrix1, matrix2)
{
    if ((matrix1.type == 1) && (matrix2.type == 1)) {
        //Если два аргумента матрицы
        var mat_1 = str.parseMatrix(false, false, matrix1.index);
        var mat_2 = str.parseMatrix(false, false, matrix2.index - matrix2[0].length);
        var retnMatr;
        switch (deistv[0]) {
            case '+':
                retnMatr = Matrix.Add(mat_1, mat_2);
                break;
            case '-':
                retnMatr = Matrix.Sub(mat_1, mat_2);
                break;
            case '*':
                retnMatr = Matrix.Mul(mat_1, mat_2);
                break;
            case '/': //Деление матриц невозможно но у нас всё возможно
                retnMatr = Matrix.Mul(mat_1, Matrix.invers(mat_2));
                break;
            case '>>':
                mat_2 = str.parseMatrix(true, false, matrix2.index - matrix2[0].length);
                retnMatr = Matrix.New(mat_2[2] - mat_2[0], mat_2[3] - mat_2[1]);
                for (var i = mat_2[0], Ri = 0; (i < mat_2[2]) && (i < mat_1.stroc); i++, Ri++)
                    for (var j = mat_2[1], Rj = 0; (j < mat_2[3]) && (i < mat_1.stolb); j++, Rj++)
                        retnMatr[Ri][Rj] = mat_1[i][j];
                break;
            case '<<':
                mat_1 = str.parseMatrix(true, false, matrix1.index);
                if ((mat_1[0] == 0) || (mat_1[0] == 1))
                    retnMatr = Matrix.SwapStroc(mat_2, mat_1[1] - 1, mat_1[2] - 1, mat_1[0] == 0);
                else if ((mat_1[0] == 2) || (mat_1[0] == 3))
                    retnMatr = Matrix.SwapStolb(mat_2, mat_1[1] - 1, mat_1[2] - 1, mat_1[0] == 2);
                else retnMatr = mat_2;
                break;
            case '==': case '!=': case '<=': case '>=': case '<': case '>':
                ret = true;
                if (deistv[0] == '==')
                    ret = (mat_1.stroc == mat_2.stroc) && (mat_1.stolb == mat_2.stolb);
                for (var g = 0; (g < mat_1.stroc) && (g < mat_2.stroc) && ret; g++)
                    for (var f = 0; (f < mat_1.stolb) && (f < mat_2.stolb) && ret; f++)
                        ret = vichislenie(mat_1[g][f], deistv[0], mat_2[g][f]);
                return ret;
            default: return Matrix.Calculate(str, deistv, 0, matrix2);
        }
        /////////////
        str = str.replace(str.substring(mat_1.index, mat_2.lind), (typeof retnMatr == "object") ? retnMatr.MatrixToString() : retnMatr);
    } else if (matrix1.type == 1) {
        //Если первый аргумент матрица
        var mat_1 = str.parseMatrix(false, false, matrix1.index);
        matrix2[0] = ToFloat(matrix2[0]);
        switch (deistv[0]) {
            case '*':
                retnMatr = Matrix.Mul(matrix2[0], mat_1);
                break;
            case '+':
                retnMatr = Matrix.Add(matrix2[0], mat_1);
                break;
            case '-':
                retnMatr = Matrix.Sub(mat_1, matrix2[0]);
                break;
            case '^':
                retnMatr = Matrix.Pow(mat_1, matrix2[0]);
                break;
            case '/':
                retnMatr = Matrix.Div(mat_1, matrix2[0]);
                break;
            case '==': case '!=': case '<=': case '>=': case '<': case '>':
                return Matrix.Calculate(str, deistv, matrix2, matrix1);
            case '>>':
                matrix2[0]--;
                retnMatr = ToSysSel((matrix2[0] == -1) ? mat_1.stroc : mat_1[parseInt(matrix2[0] / mat_1.stolb)][matrix2[0] % mat_1.stolb], true);
                return str.replace(str.substring(matrix1.index, matrix2[1]), retnMatr);
            default: return str.replace(deistv[0], '');
        }
        str = str.replace(str.substring(mat_1.index, matrix2[1]), (typeof retnMatr == "object") ? retnMatr.MatrixToString() : retnMatr);
    } else {
        var mat_1 = str.parseMatrix(false, false, matrix2.index - matrix2[0].length);
        matrix1[0] = ToFloat(matrix1[0]);
        retnMatr = [];
        switch (deistv[0]) {
            case '~': //Транспонирование
                retnMatr = Matrix.T(mat_1).MatrixToString();
                return str.replace(str.substring(deistv[1] - 1, mat_1.lind), retnMatr);
            case '!': //Нахождение обратной
                retnMatr = Matrix.invers(mat_1).MatrixToString();
                return str.replace(str.substring(deistv[1] - 1, mat_1.lind), retnMatr);
            case '%': //Нахождение детерминанта
                retnMatr = ToSysSel(Matrix.det(mat_1), true);
                return str.replace(str.substring(deistv[1] - 1, mat_1.lind), retnMatr);
            case '^': //Нахождение триугольной матрицы
                retnMatr = Matrix.Triangle(mat_1).MatrixToString();
                return str.replace(str.substring(deistv[1] - 1, mat_1.lind), retnMatr);
            case '&': //Нахождение прирощения
                retnMatr = Matrix.invers(mat_1, true).MatrixToString();
                return str.replace(str.substring(deistv[1] - 1, mat_1.lind), retnMatr);
            case '|': //Получение ранга матрицы
                retnMatr = ToSysSel(Matrix.Rang(mat_1), true);
                return str.replace(str.substring(deistv[1] - 1, mat_1.lind), retnMatr);
            case '\\': //Получение суммы главной диагонали
                retnMatr = ToSysSel(Matrix.Tr(mat_1), true);
                return str.replace(str.substring(deistv[1] - 1, mat_1.lind), retnMatr);
            case 'cor': //Получение корня матрицы
                retnMatr = Matrix.Pow(mat_1, 0.5);
                matrix1 = [matrix1, deistv[1] - 1];
                break;
            case '-':
                retnMatr = Matrix.Sub(matrix1[0], mat_1);
                break;
            case '+':
                retnMatr = Matrix.Add(mat_1, matrix1[0]);
                break;
            case '*':
                retnMatr = Matrix.Mul(mat_1, matrix1[0]);
                break;
            case '/':
                retnMatr = Matrix.Div(matrix1[0], mat_1);
                break;
            case '>>':
                mat_1.stroc = matrix1[0];
                retnMatr = mat_1;
                break;
            case "hex": case "dec": case "bin": case "oct":
                mat_1 = GetArg(str, matrix2.index - matrix2[0].length, 0, [['(', ')']])[0];
                for (f = 0; f < mat_1.length; f++)
                    retnMatr[f] = pre(mat_1[f].replace('m', '-'), opr(deistv[0]), opr(Select1.value)).replace('-', 'm');
                return str.replace(str.substring(deistv[1] - 1, mat_1.lind), "#[" + retnMatr.join(',') + "]");
                break;
            case '==': case '!=': case '<=': case '>=': case '<': case '>':
                ret = true;
                for (var g = 0; (g < mat_1.stroc) && ret; g++)
                    for (var f = 0; (f < mat_1.stolb) && ret; f++)
                        ret = vichislenie(matrix1[0], deistv[0], mat_1[g][f]);
                return ret;
            default:
                return str.replace(deistv[0], '');
        }
        str = str.replace(str.substring(matrix1[1], (mat_1.lind < matrix1[1]) ? matrix2.index : mat_1.lind), (typeof retnMatr == "object") ? retnMatr.MatrixToString() : retnMatr);
    }
    return str;
}

String.prototype.parseMatrix = function (t, s, i)
{
    //Переведение строки в матрицу в зависимости от параметров
    //Если t не null и не false то превращаем в одномерный массив
    //Если s не null и не false то массив не парсим в float а оставляем в String
    var A = GetArg(this, i ? i : 0, 0, [['(', ')'], ['{', '}']]);
    var ret = [0];
    if (A == -1) {
        ret.stroc = ret.stolb = 1;
        ret.lind = ret.index = 0;
        return ret;
    }
    ret.lind = A[1] + 1;
    ret.index = A[2] - 1;
    if (t) {
        for (u = 0; u < A[0].length; u++)
            ret[u] = (A[0][u] == null) ? 0 : ((s) ? A[0][u] : ToFloat(A[0][u]));
        return ret;
    }
    //Столбец и строки
    ret.stroc = ToFloat(A[0][0]);
    ret.stolb = ((A[0].length - 1) / ret.stroc);
    if ((ret.stolb % 1) != 0)
        ret.stolb = parseInt(ret.stolb) + 1;
    for (var i = 0, k = 1; i < ret.stroc; i++) {
        ret[i] = [];
        for (var j = 0; j < ret.stolb; j++, k++)
            ret[i][j] = (A[0][k] == null) ? 0 : ((s) ? A[0][k] : ToFloat(A[0][k]));
    }
    return ret;
};


Matrix.SwapStroc = function (A, i1, i2, S)
{
    /* поменять местами две строки*/
    if (i1 < 0 || i2 < 0 || i1 >= A.stroc || i2 >= A.stroc)
        return A;
    var Te;
    for (var i = 0; i < A.stolb; ++i) {
        Te = A[i1][i];
        A[i1][i] = A[i2][i];
        A[i2][i] = (S) ? -Te : Te;
    }
    return A;
}

Matrix.SwapStolb = function (A, i1, i2, S)
{   /* поменять местами два столбца*/
    if (i1 < 0 || i2 < 0 || i1 >= A.stolb || i2 >= A.stolb)
        return A;
    var Te;
    for (var i = 0; i < A.stroc; ++i) {
        Te = A[i][i1];
        A[i][i1] = A[i][i2];
        A[i][i2] = (S) ? -Te : Te;
    }
    return A;
}

Matrix.Div = function (A, B)
{/*Деление матриц.*/
    if (A.stroc == null) {
        for (var i = 0; i < B.stroc; i++)
            for (var j = 0; j < B.stolb; j++)
                B[i][j] = A / B[i][j];
        return B;
    } else {
        for (var i = 0; i < A.stroc; i++)
            for (var j = 0; j < A.stolb; j++)
                A[i][j] /= B;
        return A;
    }
}

Matrix.Pow = function (A, n)
{/*Возведение в степень матриц.*/
    var B;
    if (n < 0)
        A = B = Matrix.invers(A);
    else if (n == 0)
        return Matrix.New(A.stroc, A.stolb, 1);
    else if (n % 1)
    {
        var d = Matrix.det(A);
        return (d < 0) ? NaN : Matrix.New(A.stroc, A.stolb, Math.pow(d, n * (1 / A.stroc)));
    } else
        B = A;
    for (var r = 0; r < (Math.abs(n) - 1); r++)
        B = Matrix.Mul(A, B);
    return B;
}

Matrix.Sub = function (A, B)
{/*Вычитание матриц*/
    if (B.stroc == null)
        return Matrix.Sub(A, Matrix.New(A.stroc, A.stolb, B));
    else if (A.stroc == null)
        return Matrix.Sub(Matrix.New(B.stroc, B.stolb, A), B);
    else
        for (var i = 0; (i < A.stroc) && ((B.stroc == null) || (i < B.stroc)); i++)
            for (var j = 0; j < A.stolb; j++)
                A[i][j] -= (B[i][j] == null) ? 0 : B[i][j];
    return A;
}

Array.prototype.MatrixToString = function ()
{/*Из матрицы в строку.*/
    var str = '#[' + ToSysSel(this.stroc, true) + ',';
    for (var i = 0; i < this.length; i++)
        for (var j = 0; (j < this[i].length); j++)
            str += (((typeof this[i][j] == "string") ? this[i][j] : ToSysSel(this[i][j], true)) + ',');
    str = str.substring(0, str.length - 1) + ']';
    return str;
};

Matrix.Mul = function (A, B)
{/*Умножение матриц.*/
    if ((A.stroc != null) && (B.stroc != null)) {
        if (A.stolb != B.stroc) return A;
        var temp = Matrix.New(A.stroc, B.stolb, 0);
        for (var i = 0; i < temp.stroc; i++)
            for (var j = 0; j < temp.stolb; j++) {
                for (var C = 0; C < A.stolb; C++)
                    temp[i][j] += A[i][C] * B[C][j];
            }
        return temp;
    } else if (A.stroc != null) {
        for (var i = 0; i < A.stroc; i++)
            for (var j = 0; j < A.stolb; j++)
                A[i][j] *= B;
        return A;
    } else {
        for (var i = 0; i < B.stroc; i++)
            for (var j = 0; j < B.stolb; j++)
                B[i][j] *= A;
        return B;
    }
}

Matrix.Add = function (A, B)
{   /*Сложение матриц*/
    if (B.stroc == null)
        return Matrix.Add(Matrix.New(A.stroc, A.stolb, B), A);
    else if (A.stroc == null)
        return Matrix.Add(Matrix.New(B.stroc, B.stolb, A), B);
    else
        for (var i = 0; (i < A.stroc) && ((B.stroc == null) || (i < B.stroc)); i++)
            for (var j = 0; j < A.stolb; j++)
                A[i][j] += (B[i][j] == null) ? 0 : B[i][j];
    return A;
}

Matrix.Rang = function (A)
{
    /*Ранг матрицы*/
    var R = 0, C;
    A = Matrix.Triangle(A);
    for (var i = 0; i < A.stroc; i++) {
        for (var C = 0; (C < A.stolb) && (A[i][C] == 0); C++);
        if ((A.stolb - C) != 0) R++;
    }
    return R;
}
Matrix.Tr = function (A)
{
    /*Сумма элементов диагонали*/
    var s = 0;
    for (var i = 0; (i < A.stroc) && (i < A.stolb); i++)
        s += A[i][i];
    return s;
}

Matrix.invers = function (C, P)
{
    /*Обратная матрица*/
    if ((C.stroc == 1) && (C.stolb == 1))
        return Matrix.Div(1, C);
    var i, j, _i, _j, __i, __j, D;
    var temp_1 = Matrix.New(C.stroc, C.stolb, 0);
    for (var l = 0; l < temp_1.stroc; l++)
        for (var k = 0; k < temp_1.stolb; k++)
            temp_1[l][k] = C[l][k];
    D = Matrix.det(temp_1);
    if ((C.stolb != C.stroc) || (D == 0)) {
        alert("Not get inversion matrix !");
        return Matrix.New(1, 1, 0);
    }
    var temp_2 = Matrix.New(C.stroc - 1, C.stolb - 1);
    //Создаём матрицу
    for (var i = 0; i < C.stroc; i++) {
        for (var j = 0; j < C.stolb; j++) {
            __i = 0;
            for (_i = 0; _i < C.stroc; _i++) {
                if (_i == i) continue;
                __j = 0;
                for (_j = 0; _j < C.stolb; _j++) {
                    if (_j == j) continue;
                    temp_2[__i][__j] = C[_i][_j];
                    __j++;
                }
                __i++;
            }
            temp_1[i][j] = (((i + j) % 2) ? -1 : 1) * Matrix.det(temp_2);
        }
    }
    if (P) return temp_1;
    temp_1 = Matrix.T(temp_1);
    return Matrix.Mul(temp_1, (1 / D));
}

Matrix.Triangle = function (A)
{
    /*Приведение матрицы к треугольному виду*/
    var colnull, MinNull = [A.stolb, 0], v;
    //Упорядычиваем по нулям вниз
    for (var k = 0; k < (A.stroc - 1); k++) {
        for (v = k, MinNull[0] = A.stolb; v < A.stroc; v++) {
            for (colnull = 0; (colnull < A.stolb) && (A[v][colnull] == 0); colnull++);
            if (colnull < MinNull[0])
                MinNull = [colnull, v];
        }
        if (k != MinNull[1]) A = Matrix.SwapStroc(A, k, MinNull[1], true);
    }
    if (A[0][0] == 0) return A;
    var M;
    for (var j = 0; j < A.stolb; j++)
        for (var u = (j + 1); u < A.stroc; u++) {
            if (A[u][j] == 0) continue;
            M = -(A[u][j] / A[j][j]);
            for (k = 0; k < A.stolb; k++)
                A[u][k] += (A[j][k] * M);
        }
    return A;
}

Matrix.RegExpMatr = function (P, A, B, M)
{
    //Соединение матриц по шаблону
    //Если 0 то первая матрица(A) если 1 то вторая (B)
    //Если M == true то матрицы накладываем не друг на друга 
    var Pattern = P.parseMatrix(false, true);
    A = A.parseMatrix(false, true);
    if (B)
        B = B.parseMatrix(false, true);
    else
        B = [];
    for (var s = 0; (s < Pattern.stroc) || (s < A.stroc) || (s < B.stroc); s++)
        for (var j = 0; (j < Pattern.stolb) || (j < A.stolb) || (j < B.stolb); j++) {
            if ((s in Pattern) && (j in Pattern[s])) Pattern[s][j] = filt_p(Calculate(Pattern[s][j]));
            if ((s in A) && (j in A[s])) A[s][j] = Calculate(A[s][j]);
            if ((s in B) && (j in B[s])) B[s][j] = Calculate(B[s][j]);
        }

    if (M) {
        var At = false, Bt = false;
        for (var i = 0, Ai = 0, Bi = 0; i < Pattern.stroc; i++) {
            for (var j = 0, Aj = 0, Bj = 0, At = false, Bt = false; j < Pattern.stolb; j++) {
                if ((Pattern[i][j].toLowerCase() == 'a') && (Ai in A) && (Aj in A[Ai])) {
                    Pattern[i][j] = A[Ai][Aj++];
                    At = true;
                } else if ((Pattern[i][j].toLowerCase() == 'b') && (Bi in B) && (Bj in B[Bi])) {
                    Pattern[i][j] = B[Bi][Bj++];
                    Bt = true;
                }
            }
            if (At) Ai++;
            if (Bt) Bi++;
        }
    } else {
        for (var i = 0; i < Pattern.stroc; i++)
            for (var j = 0; j < Pattern.stolb; j++) {
                if ((Pattern[i][j].toLowerCase() == 'a') && (i in A) && (j in A[i])) {
                    Pattern[i][j] = A[i][j];
                } else if ((Pattern[i][j].toLowerCase() == 'b') && (i in B) && (j in B[i])) {
                    Pattern[i][j] = B[i][j];
                }
            }
    }
    return Pattern.MatrixToString();
}

//////Множества
window.Multiplicity = new Object();

Multiplicity.Calculate = function (str, action, Arg1, Arg2)
{
    if ((Arg1.type == 2) && (Arg2.type == 2)) {
        //Если два первых аргумента множества
        var Multip1 = str.parseMultiplicity(false, Arg1.index);
        var Multip2 = str.parseMultiplicity(false, Arg2.index - Arg2[0].length);
        retnMult = [];
        switch (action[0]) {
            case "|":
                retnMult = Multiplicity.Clear(Multip1);
                for (t = retnMult.length, h = 0, j = (retnMult.length + Multip2.length); t < j; t++, h++)
                    if (Multiplicity.TestElem(Multip2[h], Multip1) == -1) retnMult[t] = Multip2[h];
                break;
            case "&":
                Multip1 = Multiplicity.Clear(Multip1);
                for (t = 0; t < Multip1.length; t++)
                    if (Multiplicity.TestElem(Multip1[t], Multip2) != -1) retnMult[t] = Multip1[t];
                break;
            case "\\":
                Multip1 = Multiplicity.Clear(Multip1);
                for (t = 0; t < Multip1.length; t++)
                    if (Multiplicity.TestElem(Multip1[t], Multip2) == -1) retnMult[t] = Multip1[t];
                break;
            case "==":
                Multip1 = Multiplicity.Clear(Multip1);
                Multip2 = Multiplicity.Clear(Multip2);
                retnMult = (Multip1.length == Multip2.length);
                for (t = 0; retnMult && (t < Multip1.length); t++)
                    retnMult = Multiplicity.TestElem(Multip1[t], Multip2) != -1;
                return retnMult;
            case ">":
                Multip1 = Multiplicity.Clear(Multip1);
                Multip2 = Multiplicity.Clear(Multip2);
                retnMult = (Multip1.length > Multip2.length);
                for (var t = 0; retnMult && (t < Multip2.length); t++)
                    retnMult = Multiplicity.TestElem(Multip2[t], Multip1) != -1;
                return retnMult;
            case "<":
                Multip1 = Multiplicity.Clear(Multip1);
                Multip2 = Multiplicity.Clear(Multip2);
                retnMult = (Multip1.length < Multip2.length);
                for (var t = 0; retnMult && (t < Multip1.length); t++)
                    retnMult = Multiplicity.TestElem(Multip1[t], Multip2) != -1;
                return retnMult;
            case "<=":
                Multip1 = Multiplicity.Clear(Multip1);
                Multip2 = Multiplicity.Clear(Multip2);
                retnMult = (Multip1.length <= Multip2.length);
                for (var t = 0; retnMult && (t < Multip1.length); t++)
                    retnMult = Multiplicity.TestElem(Multip1[t], Multip2) != -1;
                return retnMult;
            case ">=":
                Multip1 = Multiplicity.Clear(Multip1);
                Multip2 = Multiplicity.Clear(Multip2);
                retnMult = (Multip1.length >= Multip2.length);
                for (var t = 0; retnMult && (t < Multip2.length); t++)
                    retnMult = Multiplicity.TestElem(Multip2[t], Multip1) != -1;
                return retnMult;
            case "!=":
                Multip1 = Multiplicity.Clear(Multip1);
                Multip2 = Multiplicity.Clear(Multip2);
                retnMult = (Multip1.length != Multip2.length);
                for (var t = 0; !retnMult && (t < Multip2.length); t++)
                    retnMult = Multiplicity.TestElem(Multip2[t], Multip1) == -1;
                return retnMult;
            case "%":
                Multip1 = Multiplicity.Clear(Multip1);
                Multip2 = Multiplicity.Clear(Multip2);
                var h;
                for (var n = 0; (n < Multip1.length) && (n < Multip2.length); n++) {
                    h = Multiplicity.TestElem(Multip1[n], Multip2);
                    if (h != -1) { Multip1.splice(n--, 1); Multip2.splice(h, 1); }
                }
                retnMult = Multip1.concat(Multip2);
                break;
            default: return Multiplicity.Calculate(str, action, 0, Arg2);
        }
        str = str.replace(str.substring(Multip1.index, Multip2.lind), (typeof retnMult == "object") ? retnMult.MultiplicityToString() : retnMult);
    } else if (Arg1.type == 2) {
        //если аргумент 1 множество
        var Multip1 = str.parseMultiplicity(false, Arg1.index);
        Arg2[0] = ToFloat(Arg2[0]);
        retnMult = [];
        switch (action[0]) {
            case "|":
                retnMult = Multiplicity.Clear(Multip1);
                if (Multiplicity.TestElem(Arg2[0], retnMult) == -1) retnMult[retnMult.length] = Arg2[0];
                break;
            case "&":
                if (Multiplicity.TestElem(Arg2[0], Multip1) != -1) retnMult = "${" + ToSysSel(Arg2[0], true) + "}";
                else retnMult = "${}";
                break;
            case "\\":
                retnMult = Multiplicity.Clear(Multip1);
                var H;
                if ((H = Multiplicity.TestElem(Arg2[0], retnMult)) != -1) delete retnMult[H];
                break;
            case "==":
                return (Multiplicity.TestElem(Arg2[0], Multip1) != -1);
            case "!=":
                return (Multiplicity.TestElem(Arg2[0], Multip1) == -1);
            case ">":
                var T = false;
                for (var H = 0; !T && (H < Multip1.length); H++)
                    T = ToFloat(Multip1[H]) > Arg2[0];
                return T;
            case "<":
                var T = false;
                for (var H = 0; !T && (H < Multip1.length); H++)
                    T = ToFloat(Multip1[H]) < Arg2[0];
                return T;
            case "<=":
                var T = false;
                for (var H = 0; !T && (H < Multip1.length); H++)
                    T = ToFloat(Multip1[H]) <= Arg2[0];
                return T;
            case ">=":
                var T = false;
                for (var H = 0; !T && (H < Multip1.length); H++)
                    T = ToFloat(Multip1[H]) >= Arg2[0];
                return T;
            default: return str.replace(action[0], '');
        }
        str = str.replace(str.substring(Arg1.index, Arg2[1]), (typeof retnMult == "object") ? retnMult.MultiplicityToString() : retnMult);
    } else {
        var Multip2 = str.parseMultiplicity(false, Arg2.index - Arg2[0].length);
        Arg1[0] = ToFloat(Arg1[0]);
        retnMult = [];
        switch (action[0]) {
            case "|": case "&": case "\\": case "!=": case "==":
                retnMult = Multiplicity.Calculate(Arg2[0], action, { index: 0, type: 2 }, { 0: Arg1[0], 1: Arg2[0].length, type: 0 });
                break;
            case "hex": case "dec": case "bin": case "oct":
                Multip2 = GetArg(str, Arg2.index - Arg2[0].length, ['{', '}'], [['[', ']']])[0];
                for (f = 0; f < Multip2.length; f++)
                    retnMult[f] = pre(Multip2[f].replace('m', '-'), opr(action[0]), opr(Select1.value)).replace('-', 'm');
                return str.replace(str.substring(action[1] - 1, Arg2.index), retnMult.MultiplicityToString());
            case ">": case "<":
                return Multiplicity.Calculate(str, [(action[0] == "<") ? ">" : "<", action[1]], Arg2, Arg1);
            case ">=": case "<=":
                return Multiplicity.Calculate(str, [(action[0] == "<=") ? ">=" : "<=", action[1]], Arg2, Arg1);
            default: return str.replace(action[0], '');
        }
        str = str.replace(str.substring(Arg1[1], Arg2.index), (typeof retnMult == "object") ? retnMult.MultiplicityToString() : retnMult);
    }
    return str;
}

String.prototype.parseMultiplicity = function (s, i)
{
    //Переведение строки в множество
    //Если s не null и не false то массив не парсим в float а оставляем в String
    var A = GetArg(this, i ? i : 0, ['{', '}'], [['(', ')'], ['[', ']']]);
    var ret = [];
    if (A == -1) {
        ret.lind = 0;
        ret.index = 0;
        return ret;
    }   
    ret.lind = A[1] + 1;
    ret.index = A[2] - 1;
    for (var u = 0; u < A[0].length; u++)
        ret[u] = (s) ? A[0][u] : filt_p(Calculate(A[0][u]));
    return ret;
};

Array.prototype.MultiplicityToString = function ()
{
    //Переведение множества в строку
    var str = '${';
    for (var i = 0; i < this.length; i++)
        if (i in this) str += (((typeof this[i] == "string") ? this[i] : ToSysSel(this[i], true)) + ',');
    str = str.substring(0, str.length - ((str.length > 2) ? 1 : 0)) + '}';
    return str;
};

Multiplicity.TestElem = function (elem, B)
{
    //Если элемент elem есть в B то возвращаем true
    if (typeof elem != typeof B[0])
        if (typeof elem == "string") elem = ToFloat(elem);
        else elem = ToSysSel(elem, true);
    if (B.indexOf)
        return B.indexOf(elem);

    for (var i = 0; i < B.length; i++)
        if (B[i] === elem) return i;
    return -1;
}

Multiplicity.Clear = function (A)
{
    for (var g = 0; g < A.length; g++)
        for (var f = (g + 1); f < A.length; f++)
            if (A[g] == A[f]) A.splice(f--, 1); 
    return A;
}

///////Вектора
window.Vector = new Object();

String.prototype.parseVector =
function (i)
{
    //Переведение строки в вектор
    //Если s не null и не false то массив не парсим в float а оставляем в String
    var A = GetArg(this, i ? i : 0, ['{', '}'], [['[', ']'], ['(', ')']]);
    var ret = [0, 0];
    if (A == -1) {
        ret.lind = 0;
        ret.index = 0;
        return ret;
    }
    ret.lind = A[1] + 1;
    ret.index = A[2] - 1;
    for (var u = 0; ((u < A[0].length) || (u < 2)) && (u < 3); u++)
        ret[u] = (A[0][u] == null) ? 0 : ToFloat(A[0][u]);
    return ret;
};

Array.prototype.VectorToString = function ()
{
    //Переведение вектора в строку
    var str = '@{';
    for (var i = 0; i < this.length; i++)
        if (i in this) str += (((typeof this[i] == "string") ? this[i] : ToSysSel(this[i], true)) + ',');
    str = str.substring(0, str.length - 1) + '}';
    return str;
};

Vector.Calculate = function (str, action, Arg1, Arg2)
{
    if ((Arg1.type == 3) && (Arg2.type == 3)) {
        var Vect1 = str.parseVector(Arg1.index);
        var Vect2 = str.parseVector(Arg2.index - Arg2[0].length);
        retnVect = [];
        switch (action[0]) {
            case "+":
                retnVect = Vector.Add(Vect1, Vect2);
                break;
            case "-":
                retnVect = Vector.Sub(Vect1, Vect2);
                break;
            case "|":
                for (var j = 0; (j < Vect1.length) || (j < Vect2.length); j++)
                    retnVect[j] = ((Vect2[j] == null) || (Vect1[j] == null)) ? ((Vect2[j] == null) ? 0 - Vect1[j] : Vect2[j]) : (Vect2[j] - Vect1[j]);
                break;
            case "*":
                retnVect = ToSysSel(Vector.sMul(Vect1, Vect2),true);
                break;
            case "/":
                for (var j = 0; (j < Vect1.length) || (j < Vect2.length); j++)
                    retnVect[j] = ((Vect2[j] == null) || (Vect1[j] == null)) ? ((Vect2[j] == null) ? 0 / Vect1[j] : Vect2[j]) : (Vect2[j] / Vect1[j]);
                break;
            case "&":
                retnVect = Vector.vMul(Vect1, Vect2);
                break;
            case "==": case "!=":
                retnVect = true;
                if (!(2 in Vect1)) Vect1[2] = 0;
                if (!(2 in Vect2)) Vect2[2] = 0;
                for (t = 0; retnVect && (t < 3); t++)
                    retnVect = (Vect1[t] == Vect2[t]);
                return (action[0] == "==") ? retnVect : !retnVect;
            case "<":
                return Vector.Abs(Vect1) < Vector.Abs(Vect2);
            case ">":
                return Vector.Abs(Vect1) > Vector.Abs(Vect2);
            case ">=":
                return (Vector.Cos([4, 0], Arg1) == Vector.Cos([4, 0, 0], Arg2)) || (Vector.Abs(Vect1) > Vector.Abs(Vect2));
            case "<=":
                return (Vector.Cos([4, 0], Arg1) == Vector.Cos([4, 0, 0], Arg2)) || (Vector.Abs(Vect1) < Vector.Abs(Vect2));
            case ">>":
                if ((Vect1[0] != null) && (Vect1[1] != null) && (Vect2[Vect1[0]] != null))
                    Vect2[Vect1[0]] = Vect1[1];
                return str.replace(str.substring(Arg1.index, Arg2.index));
            default: return Vector.Calculate(str, action, 0, Arg2);
        }
        str = str.replace(str.substring(Vect1.index, Vect2.lind), (typeof retnVect == "object") ? retnVect.VectorToString() : retnVect);
    } else if (Arg1.type == 3) {
        var Vect1 = str.parseVector(Arg1.index);
        Arg2[0] = ToFloat(Arg2[0]);
        retnVect = [];
        switch (action[0]) {
            case "+":
                retnVect = Vector.Add(Vect1, Arg2[0]);
                break;
            case "-":
                retnVect = Vector.Sub(Vect1, Arg2[0]);
                break;
            case "*":
                retnVect = Vector.vMul(Vect1, Arg2[0]);
                break;
            case "/":
                retnVect = Vector.Div(Vect1, Arg2[0]);
                break;
            case ">>":
                retnVect = ((Arg2[0] >= Vect1.length) || (Arg2[0] < 0)) ? 0 : ToSysSel(Vect1[Arg2[0]], true);
                break;
            default: return str.replace(action[0], '');
        }
        str = str.replace(str.substring(Arg1.index, Arg2[1]), (typeof retnVect == "object") ? retnVect.VectorToString() : retnVect);
    } else {
        var Vect2 = str.parseVector(Arg2.index - Arg2[0].length);
        Arg1[0] = ToFloat(Arg1[0]);
        retnVect = [];
        switch (action[0]) {
            case "abs":
                retnVect = ToSysSel(Vector.Abs(Vect2), true);
                break;
            case "cos": case "sin": case "tg": case "ctg":
                Arg1 = cif(str, action[1], 1, Select1.value == "Hex");
                if (Arg1.type != 3) {
                    Vect1 = [4, 0, 0];
                    Arg1[1] = action[1] - 1;
                } else {
                    Vect1 = Arg1[0].parseVector();
                }
                if (action[0] == "cos")
                    retnVect = ToSysSel(Vector.Cos(Vect1, Vect2), true);
                else if (action[0] == "sin")
                    retnVect = ToSysSel(Vector.Sin(Vect1, Vect2), true);
                else if (action[0] == "tg")
                    retnVect = ToSysSel(Vector.Sin(Vect1, Vect2) / Vector.Cos(Vect1, Vect2), true);
                else
                    retnVect = ToSysSel(Vector.Cos(Vect1, Vect2) / Vector.Sin(Vect1, Vect2), true);
                break;
            case "hex": case "dec": case "bin": case "oct":
                Vect2 = GetArg(str, Arg2.index - Arg2[0].length, ['{', '}'], [['[', ']']])[0];
                for (var f = 0; f < Vect2.length; f++)
                    retnVect[f] = pre(Vect2[f].replace('m', '-'), opr(action[0]), opr(Select1.value)).replace('-', 'm');
                return str.replace(str.substring(action[1] - 1, Arg2.index), retnVect.VectorToString());
            case "+":
                retnVect = Vector.Add(Arg1[0], Vect2);
                break;
            case "-":
                retnVect = Vector.Sub(Arg1[0], Vect2);
                break;
            case "!":
                return str.replace(str.substring(action[1] - 1, Vect2.lind), Vector.Not(Vect2).VectorToString());
            case "*":
                retnVect = Vector.vMul(Arg1[0], Vect2);
                break;
            case "/":
                retnVect = Vector.Div(Arg1[0], Vect2);
                break;
            default: return str.replace(action[0], '');
        }
        str = str.replace(str.substring(Arg1[1], Arg2.index), (typeof retnVect == "object") ? retnVect.VectorToString() : retnVect);
    }
    return str;
}

Vector.sMul = function (A, B)
{
    var C = 0;
    for (var j = 0; (j < A.length) && (j < B.length); j++)
        C += A[j] * B[j];
    return C;
}

Vector.vMul = function (A, B)
{
    var C = [];
    if ((A.lind != null) && (B.lind != null)) {
        if (A.length == 2) A[2] = 0;
        if (B.length == 2) B[2] = 0;
        C[0] = (A[1] * B[2]) - (A[2] * B[1]);
        C[1] = -((A[0] * B[2]) - (A[2] * B[0]));
        C[2] = (A[0] * B[1]) - (A[1] * B[0]);
    } else if (A.lind != null) {
        for (var i = 0; i < A.length; i++)
            C[i] = ((A[i] == null) ? 0 : A[i]) * B;
    } else {
        for (var i = 0; i < B.length; i++)
            C[i] = ((B[i] == null) ? 0 : B[i]) * A;
    }
    return C;
}

Vector.Div = function (A, B)
{
    if (A.lind != null)
        return Vector.vMul(A, 1 / B);
    else
        for (var i = 0; i < B.length; i++)
            B[i] = A / B[i];
    return B;
}

Vector.Add = function (A, B)
{
    if ((A.lind != null) && (B.lind != null)) {
        for (var j = 0; (j < A.length) && (j < B.length); j++)
            A[j] = ((A[j] == null) ? 0 : A[j]) + ((B[j] == null) ? 0 : B[j]);
        return A;
    } else if (A.lind != null) {
        for (var j = 0; j < A.length; j++)
            A[j] = ((A[j] == null) ? 0 : A[j]) + B;
        return A;
    } else {
        for (var j = 0; j < B.length; j++)
            B[j] = ((B[j] == null) ? 0 : B[j]) + A;
        return B;
    }
}

Vector.Sub = function (A, B)
{
    return Vector.Add(A,Vector.Not(B));
}

Vector.Abs = function (A)
{
    var C = 0;
    for (var j = 0; j < A.length; j++)
        C += Math.pow(A[j], 2);
    return Math.sqrt(C);
}

Vector.Not = function (A)
{
    if (typeof A == 'number') return -A;
    for (var j = 0; j < A.length; j++)
        A[j] = -A[j];
    return A;
}

Vector.Cos = function (A, B)
{
    var C = Vector.sMul(A, B) / (Vector.Abs(A) * Vector.Abs(B));
    return (isNaN(C)) ? 0 : C;
}

Vector.Sin = function (A, B)
{
    return Math.sqrt(Math.abs(1 - Math.pow(Vector.Cos(A, B), 2)));
}
