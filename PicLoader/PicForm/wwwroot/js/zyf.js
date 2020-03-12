//前台获取参数值。
function request(paras) {
    var url = location.href;
    //  alert(url);
    var paraString = url.substring(url.indexOf("?") + 1, url.length).split("&");
    var paraObj = {};
    for (i = 0; j = paraString[i]; i++) {
        paraObj[j.substring(0, j.indexOf("=")).toLowerCase()] = j.substring(j.indexOf("=") + 1, j.length);
    }
    var returnValue = paraObj[paras.toLowerCase()];
    if (typeof (returnValue) == "undefined") {
        return "";
    } else {

        return decodeURI(returnValue);
    }
}
function getQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]); return null;
}
function getCookie(cookie_name) {
    var allcookies = document.cookie;
    var cookie_pos = allcookies.indexOf(cookie_name);   //索引的长度

    // 如果找到了索引，就代表cookie存在，
    // 反之，就说明不存在。
    if (cookie_pos != -1) {
        // 把cookie_pos放在值的开始，只要给值加1即可。
        cookie_pos += cookie_name.length + 1;      //这里容易出问题，所以请大家参考的时候自己好好研究一下
        var cookie_end = allcookies.indexOf(";", cookie_pos);

        if (cookie_end == -1) {
            cookie_end = allcookies.length;
        }

        var value = unescape(allcookies.substring(cookie_pos, cookie_end));         //这里就可以得到你想要的cookie的值了。。。
    }
    return value;
}
var modalDialog = function (options) {
    //modalDialog.handler==undefined
    var opts = $.extend({
        //id: '',
        title: '&nbsp;',
        width: 800,
        height: 500,
        modal: true,
        risizable: true,
        onClose: function () {
            $(this).dialog('destroy');
        }
    }, options);
    opts.modal = true;// 强制此dialog为模式化，无视传递过来的modal参数
    // alert(options.id);
    if (options.url) {
        opts.content = '<iframe id="' + options.id + '" src="' + options.url + '" allowTransparency="true" scrolling="auto" width="100%" height="98%" frameBorder="0" name="" style="top:500px;"></iframe>';
    }
    return $('<div/>').dialog(opts);
};
function showupload(id, type) {
    modalDialog({
        url: "../quote/uploadfile.aspx?hyid=" + id + "&type=" + type + "",
        height: 450,
        width: 450,
        resizable: true,
        title: "文件上传"
    });
}

function judgejine(obj) {
    // alert(0)
    var reg = /^-?\d+\.?\d{0,1}$/;;
    var $text = $(obj).val();
    //alert($text);
    if (!reg.test($text) == true) {
        alert('只能输入整数或小数');
        $(obj).val('');
        return false
    }
}


///将金额变成带逗号的。
function formatMoney(num) {
    return (parseFloat(num).toFixed(2) + '').replace(/\d{1,3}(?=(\d{3})+(\.\d*)?$)/g, '$&,');
}
var postback = true;
//当鼠标Over和Out改变表格中行颜色
function ChangTrColor(tableName) {
    $("#" + tableName + " tr").each(function (i, j) {
        if (i > 0 && $(j).is(":visible")) {
            if (postback) {
                postback = false;
            }
            $(j).attr("class", $(j).css("backgroundColor"));
            var temp = true;
            var checkbox = $(j).children().eq(0).children().eq(0);
            if (checkbox.is(":checkbox") && !checkbox.attr("disabled")) {
                $(j).click(function () {
                    if (checkbox.attr("checked"))
                        checkbox.attr("checked", false);
                    else
                        checkbox.attr("checked", true);
                });
                if (checkbox.attr("checked"))
                    temp = false;
            }
            if (!temp)
                $(j).css("backgroundColor", "#ffffaa");
            else {
                $(j).css("backgroundColor", $(j).attr("class"));
            }
            $(j).mouseover(function () {
                $(j).css("backgroundColor", "#ffffaa");
                $(j).css("cursor", "pointer");
            });
            $(j).mouseleave(function () {
                var checked = true;
                var checkbox = $(j).children().eq(0).children().eq(0);
                if (checkbox.is(":checkbox")) {
                    if (checkbox.attr("checked"))
                        checked = false;
                }
                if (checked)
                    $(j).css("backgroundColor", $(j).attr("class"));
            })
        }
    });
}
//得以去掉空格和，号的数字值
function Get_ChangNumber(obj) {
    var number = "";
    if (typeof (obj) != "string" && typeof (obj) != "number") {
        if (typeof ($(obj).attr("value")) != "undefined") {
            number = $(obj).val();
        }
        else {
            number = $(obj).html();
        }
    }
    else
        number = obj.toString();
    if (number != null && number != "")
        number = number.replace(/[ ]/g, "").replace(/[,]/g, "").replace(/[\r\n]/g, "");
    else
        number = "0";
    return number;
}

//把money类型数字转换成带有分隔符的数字,变成千分位
var allmoney = "";
var allobj;
function getmoneytype(obj) {
    var tempmoney = Get_ChangNumber(obj);
    if (allmoney != tempmoney || allobj != obj) {
        if (isNum(obj)) {
            var xiaoshu = "";
            var fuhao = "";
            var money = tempmoney;
            if (contains(money, "-")) {
                fuhao = "-";
                money = money.replace("-", "");
            }
            if (contains(money, "+")) {
                fuhao = "+";
                money = money.replace("+", "");
            }
            if (contains(money, ".")) {
                xiaoshu = money.substring(money.indexOf("."), money.length);
                money = money.replace(xiaoshu, "");
            }
            var temp = "";
            for (var i = 0; i < money.length; i += 3) {
                var m = money.length % 3;
                if (i == 0 && m != 0) {
                    temp = temp + money.substring(0, m) + ",";
                    i = m - 3;
                }
                else {
                    temp = temp + money.substring(i, i + 3) + ",";
                }
            }
            temp = fuhao + temp.substring(0, temp.length - 1) + xiaoshu;
            if (typeof obj != "string" && typeof (obj) != "number") {
                Chang_Number(obj, temp);
            }
            else {
                return temp;
            }
            allmoney = Get_ChangNumber(obj); allobj = obj;
        }
    }
}
//将数字变成大写。
function ReturnBigNum(obj) {
    var money = obj.toString();
    var MyScale = ("元,万,亿,兆,仟").split(",");
    var MyBase = ("零,壹,贰,叁,肆,伍,陆,柒,捌,玖").split(",");
    var M = "";
    var x = 0;
    if (money.indexOf(".") > -1) { money = money.Replace("-", ""); M = "负"; }
    var xiaoshu = "0";
    if (money.indexOf(".") > -1) {
        xiaoshu = money.substring(money.indexOf(".") + 1, money.length);
        money = money.substring(0, money.indexOf("."));
    }
    if (money.length % 4 == 0) {
        x = parseInt(money.length / 4);
    }
    else {
        x = parseInt(money.length / 4 + 1);
    }
    var j = x;

    for (var i = 1; i <= x; i++) {
        var y = 0;
        if (money.length % 4 == 0) {
            y = 4;
        }
        else {
            y = money.length % 4;
        }
        var money1 = "";
        if (i == 1) {
            money1 = money.substring((i - 1) * 4, y);
        }
        else {
            money1 = money.substring(y + (i - 2) * 4, y + (i - 1) * 4);
        }
        j--;
        var qian = 0;
        var bai = 0;
        var shi = 0;
        var ge = 0;
        switch (money1.length) {
            case 1:
                ge = parseInt(money1.substring(0, 1));
                break;
            case 2:
                ge = parseInt(money1.substring(1, 2));
                shi = parseInt(money1.substring(0, 1));
                break;
            case 3:
                ge = parseInt(money1.substring(2, 3));
                shi = parseInt(money1.substring(1, 2));
                bai = parseInt(money1.substring(0, 1));
                break;
            case 4:
                ge = parseInt(money1.substring(3, 4));
                shi = parseInt(money1.substring(2, 3));
                bai = parseInt(money1.substring(1, 2));
                qian = parseInt(money1.substring(0, 1));
                break;
        }

        if (qian != 0) {
            M = M + MyBase[qian] + "仟";
        }
        if (bai != 0) {
            M = M + MyBase[bai] + "佰";
        }
        else {
            if (qian != 0) {
                M = M + "零";
            }
        }
        if (shi != 0) {
            M = M + MyBase[shi] + "拾";
        }
        else {
            if (bai != 0) {
                M = M + "零";
            }
        }
        if (ge != 0) {
            M = M + MyBase[ge];
        }

        M += MyScale[j];
    }
    if (M.length > 3) {
        if (M.substring(M.length - 2, M.length) == "零元") {
            M = M.substring(0, M.length - 2) + "元";
        }
    }
    if (xiaoshu.length == 1 && xiaoshu != "0") {
        M = M + MyBase[parseInt(xiaoshu)] + "角";
    }
    else {
        M += "整";
    }
    return M;
}
function isNum(obj) {
    var tempmoney = Get_ChangNumber(obj);
    if (tempmoney == "") Chang_Number(obj, "0");
    if (tempmoney != "-" && tempmoney != "NaN") {
        if (isNaN(tempmoney)) {
            Chang_Number(obj, "0");
            return false;
        }
    }
    else {
        if (tempmoney == "-") {
            alert("系统无法直接输入负数！\n请先输入一个正数后，再在其最前面加上“-”号;");
            Chang_Number(obj, "0");
            return false;
        }
    }
    return true;
}
/*判断字符串(str1)中是否存在指定的字符串(str2)
  存在则返回true，反之返回false;*/
function contains(str1, str2) {
    if (str1.toString().indexOf(str2) < 0) {
        return false;
    }
    return true;
}

function Chang_Number(obj, value) {
    if (typeof (obj) != "string" && typeof (obj) != "number") {
        if (typeof ($(obj).attr("value")) != "undefined") {
            $(obj).val(value);
        }
        else {
            $(obj).html(value);
        }
    } else {
        return obj;
    }
}


//改变行颜色
var postback = true;
function ChangTrColor1(tableName) {
    $("#" + tableName + " tr").each(function (i, j) {
        if (i > 0 && $(j).is(":visible")) {
            if (postback) {
                postback = false;
            }
            $(j).attr("class", $(j).css("backgroundColor"));
            var temp = true;
            var checkbox = $(j).children().eq(0).children().eq(0);
            if (checkbox.is(":checkbox") && !checkbox.attr("disabled")) {
                $(j).click(function () {
                    if (checkbox.attr("checked")) { checkbox.attr("checked", false); }
                    else {  // $("input[type='']")
                        $("input[type='checkbox']").attr("checked", false);
                        checkbox.attr("checked", true);
                    }
                });
                if (checkbox.attr("checked"))
                    temp = false;
            }
            if (!temp)
                $(j).css("backgroundColor", "#ffffaa");
            else {
                $(j).css("backgroundColor", $(j).attr("class"));
            }
            $(j).mouseover(function () {
                $(j).css("backgroundColor", "#ffffaa");
                $(j).css("cursor", "pointer");
            });
            $(j).mouseleave(function () {
                var checked = true;
                var checkbox = $(j).children().eq(0).children().eq(0);
                if (checkbox.is(":checkbox")) {
                    if (checkbox.attr("checked"))
                        checked = false;
                }
                if (checked)
                    $(j).css("backgroundColor", $(j).attr("class"));
            })
        }
    });
}



 //@param img html的img标签
 //@param ext 图片格式
 //@returns { string }

function getImageBase64(img, ext) {
    var canvas = document.createElement("canvas"); //创建canvas DOM元素，并设置其宽高和图片一样
    canvas.width = img.width;
    canvas.height = img.height;
    var ctx = canvas.getContext("2d");
    ctx.drawImage(img, 0, 0, img.width, img.height); //使用画布画图
    var dataURL = canvas.toDataURL("image/" + ext); //返回的是一串Base64编码的URL并指定格式
    canvas = null; //释放
    return dataURL;
}

/**
*
* @param url 图片路径
* @param ext 图片格式
* @param callback 结果回调
*/
function getUrlBase64(url, ext, callback) {
    var canvas = document.createElement("canvas"); //创建canvas DOM元素
    var ctx = canvas.getContext("2d");
    var img = new Image;
    img.crossOrigin = 'Anonymous';
    img.src = url;
    img.onload = function () {
        canvas.height = 60; //指定画板的高度,自定义
        canvas.width = 85; //指定画板的宽度，自定义
        ctx.drawImage(img, 0, 0, 60, 85); //参数可自定义
        var dataURL = canvas.toDataURL("image/" + ext);
        callback.call(this, dataURL); //回掉函数获取Base64编码
        canvas = null;
    };
}
function getBase64Image(img) {
    var canvas = document.createElement("canvas");
    canvas.width = img.width;
    canvas.height = img.height;
    var ctx = canvas.getContext("2d");
    ctx.drawImage(img, 0, 0, img.width, img.height);
    var ext = img.src.substring(img.src.lastIndexOf(".") + 1).toLowerCase();
    var dataURL = canvas.toDataURL("image/" + ext);
    return dataURL;
} 
