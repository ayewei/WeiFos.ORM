﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace WeiFos.WeChat.WXBase.WXOpen
{
    /// <summary>
    /// 使用授权码换取公众号或小程序的接口调用
    /// 凭据和授权信息
    /// @author yewei 
    /// @date 2018-04-12
    /// </summary>
    public class WXOpenAuthFun : WXErrCode
    {
        /// <summary>
        /// 授权信息
        /// </summary>
        public AuthorizationInfo authorization_info { get; set; }

    }


    public class AuthorizationInfo
    {
        /// <summary>
        /// 授权方appid
        /// </summary>
        public string authorizer_appid { get; set; }

        /// <summary>
        /// 授权方接口调用凭据（在授权的公众号或小程序具备API权限时，才有此返回值），也简称为令牌
        /// </summary>
        public string authorizer_access_token { get; set; }

        /// <summary>
        /// 有效期（在授权的公众号或小程序具备API权限时，才有此返回值）
        /// </summary>
        public long expires_in { get; set; }

        /// <summary>
        /// 接口调用凭据刷新令牌（在授权的公众号具备API权限时，才有此返回值），
        /// 刷新令牌主要用于第三方平台获取和刷新已授权用户的access_token，
        /// 只会在授权时刻提供，请妥善保存。 一旦丢失，只能让用户重新授权，才能再次拿到新的刷新令牌
        /// </summary>
        public string authorizer_refresh_token { get; set; }

        /// <summary>
        /// 权限集合
        /// </summary>
        public List<FuncInfoItem> func_info { get; set; }
    }



    /// <summary>
    /// 权限分类
    /// 授权给开发者的权限集列表，
    /// ID为1到26分别代表： 1、消息管理权限 2、用户管理权限 3、帐号服务权限 
    /// 4、网页服务权限 5、微信小店权限 6、微信多客服权限 7、群发与通知权限 
    /// 8、微信卡券权限 9、微信扫一扫权限 10、微信连WIFI权限 11、素材管理权限 
    /// 12、微信摇周边权限 13、微信门店权限 14、微信支付权限 15、自定义菜单权限 
    /// 16、获取认证状态及信息 17、帐号管理权限（小程序） 18、开发管理与数据分析权限（小程序） 
    /// 19、客服消息管理权限（小程序） 20、微信登录权限（小程序） 21、数据分析权限（小程序） 
    /// 22、城市服务接口权限 23、广告管理权限 24、开放平台帐号管理权限 25、 开放平台帐号管理权限（小程序） 
    /// 26、微信电子发票权限 请注意： 1）该字段的返回不会考虑公众号是否具备该权限集的权限（因为可能部分具备），
    /// 请根据公众号的帐号类型和认证情况，来判断公众号的接口权限。
    /// </summary>
    public class FunCscopeCatg
    {
        /// <summary>
        /// 权限ID
        /// </summary>
        public int id { get; set; }

    }


}
