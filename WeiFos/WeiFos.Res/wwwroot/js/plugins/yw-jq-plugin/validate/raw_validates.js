﻿
/// <summary>
/// 验证对象
/// @author             叶委  
/// @date               2013-05-23         
/// </summary>
var validateType = {

    /// <summary>
    /// 没有验证 
    /// @returns boolean
    /// </summary>
    normal: function () {
        return true;
    },
    /// <summary>
    /// 匹配任意字符
    /// @returns boolean
    /// </summary>
    anyCharacter: function (str) {
        return $.trim(str).length >= 1;
    },
    /// <summary>
    /// 编号验证
    /// @param price
    /// @returns boolean
    /// </summary>s
    isSerialNumber: function (serialNumber) {
        return /^[a-zA-Z0-9_-]{1,100}$/.test(serialNumber);
    },
    /// <summary>
    /// 英文名称验证
    /// @param englishName
    /// @returns boolean
    /// </summary>s
    isEnglishName: function (englishName) {
        return /^[a-zA-Z_-]{1,100}$/.test(englishName);
    },
    /// <summary>
    /// 货币英文简写验证
    /// @param abbreviation
    /// @returns boolean
    /// </summary>s
    isEnglishAbbreviation: function (abbreviation) {
        return /^[A-Z]{3}$/.test(abbreviation);
    },
    /// <summary>
    /// 价格格式验证，验证小数点后2位
    /// @param price
    /// @returns boolean
    /// </summary>
    isPrice: function (price) {
        return /(^[1-9]\d*(\.\d{1,2})?$)|(^[-+]?[0]{1}(\.\d{1,2})?$)/.test(price);
    },
    /// <summary>
    /// 价格格式验证，验证小数点后2位
    /// @param price
    /// @returns boolean
    /// </summary>
    isLGZeroPrice: function (price) {
        return /(^[-+]?[1-9]\d*(\.\d{1,2})?$)|(^[-+]?[0]{1}(\.\d{1,2})?$)/.test(price) && price > 0;
    },
    /// <summary>
    /// 金额格式验证，小数点后位不做验证
    /// @param validateDate 
    /// @returns boolean
    /// </summary>
    isAmount: function (amount) {
        return /^-?\d+\.{0,}\d{0,}$/.test(amount);
    }
    ,
    /// <summary>
    /// 金额格式 验证大于等于0，验证小数点后2位
    /// @param validateDate 
    /// @returns boolean
    /// </summary>
    isShipments: function (amount) {
        // return /^\d+\.{0,}\d{0,}$/.test(amount);
        return /^\d+\.*(\.\d{1,2})?$/.test(amount);
    }
    ,
    /// <summary>
    /// 金额格式验证，小数点后位不做验证
    /// @param validateDate 
    /// @returns boolean
    /// </summary>
    isProfitRatio: function (amount) {
        var profit = /(^[-+]?[1-9]\d*(\.\d{1,2})?$)|(^[-+]?[0]{1}(\.\d{1,2})?$)/.test(amount);
        //数字
        if (profit) {
            if (amount < 0) {
                return false;
            }
            if (amount.indexOf('.') > -1) {
                //alert(amount.substring(0, amount.indexOf('.')).length)
                if (amount.substring(0, amount.indexOf('.')).length > 2) {
                    return false;
                }
                if (amount.length > 5) {
                    return false;
                }
            }
            else {
                if (amount.length > 2) {
                    if (amount == 100) {

                    }
                    else {
                        return false;
                    }
                }
            }
            return true;
        }
        return false;
    },
    /// <summary>
    /// 大于0金额格式验证 
    /// @param validateDate 
    /// @returns boolean
    /// </summary>
    isLGZeroAmount: function (amount) {
        return /^-?\d+\.{0,}\d{0,}$/.test(amount) && amount > 0;
    },
    /// <summary>
    /// 邮箱格式验证
    /// @param email
    /// @returns boolean
    /// </summary>
    isEmail: function (email) {
        return /^\s*\w+(?:\.{0,1}[\w-]+)*@[a-zA-Z0-9]+(?:[-.][a-zA-Z0-9]+)*\.[a-zA-Z]+\s*$/i.test(email);
    },
    /// <summary>
    /// QQ号码格式验证
    /// @param email
    /// @returns boolean
    /// </summary>
    isQQNumber: function (qq) {
        return /^[1-9]\d{4,10}$/.test(qq);
    },
    /// <summary>
    /// 登录名格式验证
    /// @param loginName
    /// @returns boolean
    /// </summary>
    isLoginName: function (loginName) {
        // return /^[a-zA-Z0-9_-]{6,16}$/.test(loginName);
        return /^[a-zA-Z0-9-_\u4e00-\u9fa5]{6,16}$/.test(loginName);
    },
    /// <summary>
    /// 密码格式验证 验证用户密码(正确格式为：长度在6~16 之间，任意字符)  
    /// @param psw 
    /// @returns boolean
    /// </summary>
    isPassword: function (psw) {
        return /^.{6,16}/.test(psw);
    },
    /// <summary>
    /// 手机号码格式验证  
    /// @param mobile 
    /// @returns boolean
    /// </summary>
    isMoblie: function (mobile) {
        return /^1[345678]\d{9}$/.test(mobile);
    },
    /// <summary>
    /// 电话号码格式验证  
    /// @param phone 
    /// @returns boolean
    /// </summary>
    isPhone: function (phone) {
        return /(^[0-9]{3,4}\-[0-9]{7,8}$)|(^[0-9]{7,8}$)|(^\([0-9]{3,4}\)[0-9]{3,8}$)|(^0{0,1}1[3578]\d{9}$)/.test(phone);
    },
    /// <summary>
    /// 邮编格式验证  
    /// @param postCode 
    /// @returns boolean
    /// </summary>
    isPostCode: function (postCode) {
        return /^[0-9]{6}$/.test(postCode);
    },
    /// <summary>
    /// 验证码基本格式验证  
    /// @param validateCode 
    /// @returns boolean
    /// </summary>
    validateCode: function (validateCode) {
        return /^[a-zA-Z0-9]{4,4}$/.test(validateCode);
    },
    /// <summary>
    /// 验证汉字数字字母 
    /// @param validateUserName 
    /// @returns boolean
    /// </summary>
    isNumberlatterCcter: function (userName) {
        return /^[\u0391-\uFFE5A-Za-z0-9]+$/.test(userName);
    },

    /// <summary>
    /// 验证汉字逗号 
    /// @param validateUserName 
    /// @returns boolean
    /// </summary>
    isHanZiDouHao: function (economyCity) {
        return /^[\u4e00-\u9fff,]+$/.test(economyCity);
    },
    /// <summary>
    /// 日期格式验证 
    /// @param validateDate 
    /// @returns boolean
    /// </summary>
    isDate: function (date) {
        return /^((((1[6-9]|[2-9]\d)\d{2})-(0?[13578]|1[02])-(0?[1-9]|[12]\d|3[01]))|(((1[6-9]|[2-9]\d)\d{2})-(0?[13456789]|1[012])-(0?[1-9]|[12]\d|30))|(((1[6-9]|[2-9]\d)\d{2})-0?2-(0?[1-9]|1\d|2[0-8]))|(((1[6-9]|[2-9]\d)(0[48]|[2468][048]|[13579][26])|((16|[2468][048]|[3579][26])00))-0?2-29-))(\s(([01]\d{1})|(2[0123])):([0-5]\d):([0-5]\d))?$/.test(date);
    },
    /// <summary>
    /// 网络地址验证 
    /// @param url 
    /// @returns boolean
    /// </summary>
    isUrl: function (url) {
        return /^((http|https|ftp):\/\/)?(\w(\:\w)?@)?([0-9a-z_-]+\.)*?([a-z0-9-]+\.[a-z]{2,6}(\.[a-z]{2})?(\:[0-9]{2,6})?)((\/[^?#<>\/\\*":]*)+(\?[^#]*)?(#.*)?)?$/i.test(url);
    },
    /// <summary>
    /// 正整数格式验证 
    /// @param validateDate 
    /// @returns boolean
    /// </summary>
    isNumber: function (number) {
        return /^\d+$/g.test(number);
    },

    /// <summary>
    /// 大于0的正整数格式验证 
    /// @param no
    /// @returns boolean
    /// </summary>
    isLGZeroNumber: function (number) {
        return /^([1-9]\d{0,3}|1000)$/g.test(number);
    },

    /// <summary>
    /// 是否是身份证号码  
    /// @param idCard 
    /// @returns boolean
    /// </summary>
    isIdCard: function (idCard) {
        idCard = $.trim(idCard);
        if (idCard.length == 15) {
            return validateType.isValidityBrithBy15IdCard(idCard);
        } else if (idCard.length == 18) {
            var a_idCard = idCard.split("");// 得到身份证数组   
            if (validateType.isValidityBrithBy18IdCard(idCard) && validateType.isTrueValidateCodeBy18IdCard(a_idCard)) {
                return true;
            } else {
                return false;
            }
        } else {
            return false;
        }
    },
    /// <summary>
    /// 验证15位数身份证号码中的生日是否是有效生日   
    /// @param idCard 
    /// @returns boolean
    /// </summary>
    isValidityBrithBy15IdCard: function (idCard) {
        var year = idCard15.substring(6, 8);
        var month = idCard15.substring(8, 10);
        var day = idCard15.substring(10, 12);
        var temp_date = new Date(year, parseFloat(month) - 1, parseFloat(day));
        // 对于老身份证中的你年龄则不需考虑千年虫问题而使用getYear()方法   
        if (temp_date.getYear() != parseFloat(year)
                || temp_date.getMonth() != parseFloat(month) - 1
                || temp_date.getDate() != parseFloat(day)) {
            return false;
        } else {
            return true;
        }
    },
    /// <summary>
    /// 验证18位数身份证号码中的生日是否是有效生日   
    /// @param idCard 18位书身份证字符串 
    /// @returns boolean
    /// </summary>
    isValidityBrithBy18IdCard: function (idCard18) {
        var year = idCard18.substring(6, 10);
        var month = idCard18.substring(10, 12);
        var day = idCard18.substring(12, 14);
        var temp_date = new Date(year, parseFloat(month) - 1, parseFloat(day));
        // 这里用getFullYear()获取年份，避免千年虫问题   
        if (temp_date.getFullYear() != parseFloat(year)
            || temp_date.getMonth() != parseFloat(month) - 1
            || temp_date.getDate() != parseFloat(day)) {
            return false;
        } else {
            return true;
        }
    },
    /// <summary>
    /// 判断身份证号码为18位时最后的验证位是否正确   
    /// @param a_idCard 身份证号码数组   
    /// @returns boolean
    /// </summary>
    isTrueValidateCodeBy18IdCard: function (a_idCard) {
        var Wi = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2, 1];
        // 身份证验证位值.10代表X
        var ValideCode = [1, 0, 10, 9, 8, 7, 6, 5, 4, 3, 2];
        // 声明加权求和变量   
        var sum = 0;
        if (a_idCard[17].toLowerCase() == 'x') {
            a_idCard[17] = 10;// 将最后位为x的验证码替换为10方便后续操作   
        }
        for (var i = 0; i < 17; i++) {
            sum += Wi[i] * a_idCard[i];// 加权求和   
        }
        var valCodePosition = sum % 11;// 得到验证码所位置   
        if (a_idCard[17] == ValideCode[valCodePosition]) {
            return true;
        } else {
            return false;
        }
    },
    /// <summary>
    /// 银行卡号验证 
    /// @param a_idCard 身份证号码数组   
    /// @returns boolean
    /// </summary>
    isBankCardNo: function (bankno) {
        var lastNum = bankno.substr(bankno.length - 1, 1);//取出最后一位（与luhm进行比较）

        var first15Num = bankno.substr(0, bankno.length - 1);//前15或18位
        var newArr = new Array();
        for (var i = first15Num.length - 1; i > -1; i--) {    //前15或18位倒序存进数组
            newArr.push(first15Num.substr(i, 1));
        }
        var arrJiShu = new Array();  //奇数位*2的积 <9
        var arrJiShu2 = new Array(); //奇数位*2的积 >9

        var arrOuShu = new Array();  //偶数位数组
        for (var j = 0; j < newArr.length; j++) {
            if ((j + 1) % 2 == 1) {//奇数位
                if (parseInt(newArr[j]) * 2 < 9)
                    arrJiShu.push(parseInt(newArr[j]) * 2);
                else
                    arrJiShu2.push(parseInt(newArr[j]) * 2);
            }
            else //偶数位
                arrOuShu.push(newArr[j]);
        }

        var jishu_child1 = new Array();//奇数位*2 >9 的分割之后的数组个位数
        var jishu_child2 = new Array();//奇数位*2 >9 的分割之后的数组十位数
        for (var h = 0; h < arrJiShu2.length; h++) {
            jishu_child1.push(parseInt(arrJiShu2[h]) % 10);
            jishu_child2.push(parseInt(arrJiShu2[h]) / 10);
        }

        var sumJiShu = 0; //奇数位*2 < 9 的数组之和
        var sumOuShu = 0; //偶数位数组之和
        var sumJiShuChild1 = 0; //奇数位*2 >9 的分割之后的数组个位数之和
        var sumJiShuChild2 = 0; //奇数位*2 >9 的分割之后的数组十位数之和
        var sumTotal = 0;
        for (var m = 0; m < arrJiShu.length; m++) {
            sumJiShu = sumJiShu + parseInt(arrJiShu[m]);
        }

        for (var n = 0; n < arrOuShu.length; n++) {
            sumOuShu = sumOuShu + parseInt(arrOuShu[n]);
        }

        for (var p = 0; p < jishu_child1.length; p++) {
            sumJiShuChild1 = sumJiShuChild1 + parseInt(jishu_child1[p]);
            sumJiShuChild2 = sumJiShuChild2 + parseInt(jishu_child2[p]);
        }
        //计算总和
        sumTotal = parseInt(sumJiShu) + parseInt(sumOuShu) + parseInt(sumJiShuChild1) + parseInt(sumJiShuChild2);

        //计算Luhm值
        var k = parseInt(sumTotal) % 10 == 0 ? 10 : parseInt(sumTotal) % 10;
        var luhm = 10 - k;

        if (lastNum == luhm) {
            //$("#banknoInfo").html("Luhm验证通过");
            return true;
        }
        else {
            //$("#banknoInfo").html("银行卡号必须符合Luhm校验");
            return false;
        }
    },
    /// <summary>
    /// 验证营业执照是否合法 
    /// @param busCode 营业执照号码   
    /// @returns boolean
    /// </summary>
    isBusinessLicense: function (busCode) {
        var ret = false;
        if (busCode.length == 15) {
            var sum = 0;
            var s = [], p = [], a = [], m = 10;
            p[0] = m;
            for (var i = 0; i < busCode.length; i++) {
                a[i] = parseInt(busCode.substring(i, i + 1), m);
                s[i] = (p[i] % (m + 1)) + a[i];
                if (0 == s[i] % m) {
                    p[i + 1] = 10 * 2;
                } else {
                    p[i + 1] = (s[i] % m) * 2;
                }
            }
            if (1 == (s[14] % m)) {
                ret = true;
            } else {
                ret = false;
            }
        } else {
            ret = false;
        }
        return ret;
    },
    /// <summary>
    /// 数据库重复验证  
    /// </summary>
    isRegister: function (params) {
        var bdata = true;
        $.ajax({
            type: "get",
            url: params.url.indexOf("?") == -1 ? params.url + "?m=" + Math.random() : params.url + "&m=" + Math.random(),
            data: params.data,
            async: false,
            dataType: "json",
            success: function (backdata) {
                bdata = backdata
            }
        });
        return bdata;
    }
};

//初始化次数
yw.valid.initcount = 0;

//触发提交验证
yw.valid.submitelements = [];

//全局配置
yw.valid.config = function (options) {
    if (App_G.Util.isArray(options.submitelements)) {
        $.each(options.submitelements, function (i, o) {
            if ($(o).length) {
                yw.valid.submitelements.push($(o));
            }
        });
    } else if (App_G.Util.isJQuery(options.submitelements)) {
        yw.valid.submitelements.push(options.submitelements);
    } else if (App_G.Util.isString(options.submitelements)) {
        yw.valid.submitelements.push($(options.submitelements));
    }

    //全局提交绑定事件
    $.each(yw.valid.submitelements, function (i, o) {
        $(o).click(function () {
            if (yw.valid.validates(-1)) {
                options.vsuccess();
                return true;
            } else {
                return false;
            }
        });
    });
};

/// <summary>
/// validate v1.0
/// @author             叶委  
/// @create date        2013-05-23 
/// @update date v1.0   2015-08-25
/// @groupid            验证组ID
/// </summary>
yw.valid.getValidate = function (options) {

    //验证对象
    var opt = {};

    yw.valid.initcount++;

    //局部页面提交元素
    opt.submitelements = [];

    if (options == undefined) options = {};

    if (App_G.Util.isArray(options.submitelements)) {
        $.each(options.submitelements, function (i, o) {
            if ($(o).length) opt.submitelements.push($(o));
        });
    } else if (App_G.Util.isJQuery(options.submitelements)) {
        opt.submitelements.push(options.submitelements);
    } else if (App_G.Util.isString(options.submitelements)) {
        opt.submitelements.push($(options.submitelements));
    }

    //局部提交绑定事件
    $.each(opt.submitelements, function (i, o) {
        $(o).click(function () {
            if (yw.valid.validates(opt.groupId)) {
                options.vsuccess();
                return true;
            } else {
                return false;
            }
        });
    });


    /// <summary>
    /// @vtype              验证类型
    /// @focusmsg           得到焦点信息
    /// @errormsg           错误提示信息
    /// @afterelementId     指定在某个页面元素后面提示信息
    /// @groupelementId     页面元素使用同一组提示信息元素
    /// @selectvalidate     选中验证，不填不验证，反之验证
    /// @repeatvalidate     重复验证，该记录是否存在
    /// @isrepeatelement    页面重复元素验证
    /// @othermsg           其他验证信息
    /// @submitelements     触发提交表单元素(组)
    /// @vsuccess           验证成功触发事件
    /// @selector           选择器上下文
    /// @tabindex           验证错误提示选项卡
    /// </summary>
    opt.valid = function (elementId, options) {

        var _options = {};
        _options["vtype"] = options.vtype;
        _options["focusmsg"] = options.focusmsg;
        _options["errormsg"] = options.errormsg;
        _options["afterelementId"] = options.afterelementId;
        _options["groupelementId"] = options.groupelementId;
        _options["selectvalidate"] = options.selectvalidate;
        _options["repeatvalidate"] = options.repeatvalidate;
        _options["isrepeatelement"] = options.isrepeatelement;
        _options["othermsg"] = options.othermsg;
        _options["submitelements"] = options.submitelements;
        _options["vsuccess"] = options.vsuccess;
        _options["tabindex"] = options.tabindex;
        _options["optionsId"] = elementId;
        _options["selector"] = options.selector;
        _options["groupId"] = opt.groupId;

        // 浅层复制（只复制顶层的非 object 元素）
        //var newObject = jQuery.extend({}, oldObject);
        // 深层复制（一层一层往下复制直到最底层）
        //var newObject = jQuery.extend(true, {}, oldObject);

        var current;
        if (undefined == _options.selector) {
            current = $(document);
        } else {
            current = $(_options.selector);
        }

        //查找当前元素
        var $this = current.find(elementId);
        if (undefined == $this || $this.length == 0) {
            $this = $(elementId);
        }

        if ($this.length) {

            $.each($this, function (i, o) {

                //设置ID
                if (undefined == $(o).attr("id")) {
                    $(o).attr("id", new Date().getTime());
                }

                _options.optionsId = $(o).attr("id");

                //克隆参数，处理统一对象共享传递
                var tmp_options = $.extend(true, {}, _options);
                tmp_options.optionsId = $(o).attr("id");
                if (yw.valid.ves.indexOf(_options) == -1) {
                    yw.valid.ves.insertItems(tmp_options);
                } else {
                    yw.valid.ves.deleteItem(_options.optionsId);
                    yw.valid.ves.insertItems(tmp_options);
                }

                switch ($(o).prop("type")) {
                    //文本输入框
                    case "text":
                        //该元素得到焦点事件
                        $(o).focus(function () {
                            yw.valid.msg.focus($(o), _options);
                        });
                        //失去焦点事件
                        $(o).blur(function () {
                            yw.valid.validate($(o), _options);
                        });
                        break;
                        //密码框
                    case "password":
                        //该元素得到焦点事件
                        $(o).focus(function () {
                            yw.valid.msg.focus($(o), _options);
                        });
                        //失去焦点事件
                        $(o).blur(function () {
                            yw.valid.validate($(o), _options);
                        });
                        break;
                    case "textarea":
                        //该元素得到焦点事件
                        $(o).focus(function () {
                            yw.valid.msg.focus($(o), _options);
                        });
                        //失去焦点事件
                        $(o).blur(function () {
                            yw.valid.validate($(o), _options);
                        });
                        break;
                        //下拉选择框
                    case "select-one":
                        //选择改变事件
                        $(o).change(function () {
                            yw.valid.validate($(o), _options);
                        });
                        break;
                        //复选框
                    case "checkbox":
                        //单击事件
                        $(o).click(function () {
                            if ($(o).is(':checked')) {
                                yw.valid.msg.success($(o), _options);
                            } else {
                                yw.valid.msg.error($(o), _options);
                            }
                        });
                        break;
                    default:
                        break;
                }
            });

        }
    }

    //验证需要验证的项
    yw.valid.validates = function (groupId) {
        var ispass = true;
        $.each(yw.valid.ves.elementItems, function (i, o) {
            if (o.groupId == groupId || groupId == -1) {
                if (!yw.valid.validate($("#" + o.optionsId), o) && ispass) {
                    var tbindex = $(o.tabindex);
                    if (undefined != tbindex && tbindex.length > 0 && tbindex.is(":hidden")) {
                        $("a[href=" + o.tabindex + "]").parent().addClass("active").siblings().removeClass("active");
                        tbindex.addClass("active").siblings().removeClass("active");
                    }
                    ispass = false;
                }
            }
        });
        return ispass;
    }

    //验证对象
    yw.valid.validate = function (obj, options) {

        if (!obj.length) return true;

        //验证类型通过
        if (options.vtype($.trim(obj.val()))) {

            //重复验证
            if (options.isrepeatelement) {
                if (!yw.valid.ves.validateRepeat(obj)) {
                    return yw.valid.msg.other(obj, options);
                }
            }

            //如果异步验证
            if (options.repeatvalidate != null && options.repeatvalidate != undefined) {

                yw.valid.msg.detect(obj, { focusmsg: "检测中...", afterelementId: options.afterelementId });

                //将获取到的参数赋值
                options.repeatvalidate.data = {};
                options.repeatvalidate.data[obj.attr("id")] = obj.val();

                //自定义参数
                if ((typeof options.repeatvalidate.customData == 'function') && options.repeatvalidate.customData.constructor == Function) {
                    var cdata = options.repeatvalidate.customData();
                    for (var attr in cdata) {
                        options.repeatvalidate.data[attr] = cdata[attr];
                    }
                }

                //异步验证，数据库存在该记录
                var msg = validateType.isRegister(options.repeatvalidate);

                //返回为对象则为 自定义信息
                if ((typeof msg == 'object')) {
                    if (msg.status == "1") {
                        return yw.valid.msg.custom(obj, options, msg.message);
                    }
                } else {
                    if (msg == "1") {
                        return yw.valid.msg.other(obj, options);
                    }
                }
            }

            return yw.valid.msg.success(obj, options);
        } else {
            if (options.selectvalidate) {
                if ($.trim(obj.val()).length == 0) {
                    return yw.valid.msg.normal(obj, options);
                }
            }
            if (!$.trim(obj.val()).length > 0) {
                return yw.valid.msg.error(obj, { errormsg: "不能为空", afterelementId: options.afterelementId });
            }
            return yw.valid.msg.error(obj, options);
        }
    }

    yw.valid.msg = {
        custom: function (obj, options, msg) {
            this._message(obj, options, msg);
            obj.parent().attr("class", "control-group error");
            return false;
        },
        other: function (obj, options) {
            this._message(obj, options, options.othermsg);
            obj.parent().attr("class", "control-group error");
            return false;
        },
        error: function (obj, options) {
            this._message(obj, options, options.errormsg);
            obj.parent().attr("class", "control-group error");
            return false;
        },
        success: function (obj, options) {
            this._message(obj, options, "");
            obj.parent().attr("class", "control-group success");
            return true;
        },
        focus: function (obj, options) {
            this._message(obj, options, options.focusmsg);
            obj.parent().attr("class", "control-group warning");
            return true;
        },
        detect: function (obj, options) {
            this._message(obj, options, options.focusmsg);
            obj.parent().attr("class", "control-group detect");
            return true;
        },
        normal: function (obj) {
            $("#" + obj.prop("id") + "_span").remove();
            //obj.removeClass();
            return true;
        },
        _message: function (obj, options, message) {

            if (options.groupelementId != null && options.groupelementId != undefined) {
                $("#" + options.groupelementId + "_span").remove();
                var span = $(this.spanmessage.replace("{0}", message)).prop("id", options.groupelementId + "_span");
                span.insertAfter($("#" + options.afterelementId));
            } else {
                if (options.afterelementId != null && options.afterelementId != undefined) {
                    $("#" + obj.prop("id") + "_span").remove();
                    var span = $(this.spanmessage.replace("{0}", message)).prop("id", obj.prop("id") + "_span");
                    span.insertAfter($("#" + options.afterelementId));
                }
                else {
                    //console.log("===>" + yw.valid.ves.elementItems.length);
                    $("#" + obj.prop("id") + "_span").remove();
                    var span = $(this.spanmessage.replace("{0}", message)).prop("id", obj.prop("id") + "_span");
                    span.insertAfter(obj);
                }
            }
        },
        //提示span
        spanmessage: "<span class='help-inline'>&nbsp;{0}</span>"
    }

    /// <summary>
    /// 指定验证项数组
    /// </summary>
    yw.valid.ves = {
        elementItems: new Array(),
        relementItems: new Array(),
        indexOf: function (item) {
            for (var i = 0; i < this.elementItems.length; i++) {
                if (this.elementItems[i] == item) {
                    console.log("存在的ID" + this.elementItems[i].optionsId + "传入的ID" + item.optionsId);
                    return i;
                }
            }
            return -1;
        },
        deleteItem: function (Id) {
            var item = null;
            $.each(this.elementItems, function (i, o) {
                if (o.optionsId == Id) {
                    item = o;
                    return;
                }
            });

            if (item != null && this.indexOf(item) != -1) {
                this.elementItems.splice(this.indexOf(item), 1);
            }
        },
        insertItems: function (item) {
            if (item.isrepeatelement) {
                this.relementItems.push(item);
            }

            this.elementItems.push(item);
        },
        validateRepeat: function (obj) {
            if (this.relementItems.length > 1) {
                for (var i = 0; i < this.relementItems.length; i++) {
                    if (obj.prop("id") != this.relementItems[i].optionsId && $("#" + this.relementItems[i].optionsId).val() != "" && obj.val() != $("#" + this.relementItems[i].optionsId).val()) {
                        return false;
                    }
                }
            }
            return true;
        },
        validateSelect: function (val) {
            for (var i = 0; i < this.elementItems.length; i++) {
                if (this.elementItems[i].selectvalidate && $("#" + this.elementItems[i].optionsId).val().length > 0) {
                    return false;
                }
            }
            return true;
        },
        validateItems: function (item) {
            for (var i = 0 ; i < this.elementItems.length; i++) {
                if (this.elementItems[i] == item)
                    return true;
            }
            return false;
        },
        appointvalidate: false
    }

    //设置组ID
    opt.groupId = "group_" + yw.valid.initcount;

    return opt;
};


