﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace WeiFos.WeChat.WXBase
{
    /// <summary>
    /// 微信群发 上传图文消息回调
    /// </summary>
    [Serializable]
    public class WXUploadMedia
    {
        /// <summary>
        /// 媒体文件类型，分别有图片（image）、语音（voice）、视频（video）
        /// 和缩略图（thumb，主要用于视频与音乐格式的缩略图） 
        /// </summary>
        public string type { get; set; }

        /// <summary>
        /// 媒体文件上传后，获取时的唯一标识 
        /// </summary>
        public string media_id { get; set; }

        /// <summary>
        /// 媒体文件上传时间戳 
        /// </summary>
        public string created_at { get; set; }

        /// <summary>
        /// 错误码
        /// </summary>
        public string errcode { get; set; }

        /// <summary>
        /// 错误信息
        /// </summary>
        public string errmsg { get; set; }

    }

}
