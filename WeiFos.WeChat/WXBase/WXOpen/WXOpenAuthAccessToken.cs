﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace WeiFos.WeChat.WXBase
{

    /// <summary>
    /// 微信OAuth2.0授权登录
    /// 接口调用凭证
    /// @author yewei
    /// @date 2018-04-11
    /// </summary>
    public class WXOpenAuthAccessToken : WXErrCode
    {

        /// <summary>
        /// 接口调用凭证
        /// </summary>
        public string access_token { get; set; }


        /// <summary>
        /// access_token接口调用凭证超时时间，单位（秒）
        /// </summary>
        public int expires_in { get; set; }


        /// <summary>
        /// 用户刷新access_token
        /// </summary>
        public string refresh_token { get; set; }


        /// <summary>
        /// openid 授权用户唯一标识
        /// </summary>
        public string openid { get; set; }


        /// <summary>
        /// 用户授权的作用域，使用逗号（,）分隔
        /// </summary>
        public string scope { get; set; }


        /// <summary>
        /// 当且仅当该网站应用已获得该用户的userinfo授权时，
        /// 才会出现该字段。
        /// </summary>
        public string unionid { get; set; }

    }
}
