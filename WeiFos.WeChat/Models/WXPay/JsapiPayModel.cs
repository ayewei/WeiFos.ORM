﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace WeiXin.Lib.Core.Models.WXPay
{
    public class JsapiPayModel
    {
        public string AppId { get; set; }
        public string Package { get; set; }
        public string Timestamp { get; set; }
        public string Noncestr { get; set; }
        public string PaySign { get; set; }
        public string SignType { get { return "MD5"; } }
    }
}
