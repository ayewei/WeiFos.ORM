﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Newtonsoft.Json.Linq;
using Newtonsoft.Json;

namespace WeiFos.Core.JsonHelper
{
    /// <summary>
    /// JSON对象名称排序  
    /// </summary>
    public class JsonSort
    {

        public static string SortJson(JToken jobj, JToken obj)
        {
            if (obj == null)
            {
                obj = new JObject();
            }

            List<JToken> list = jobj.ToList<JToken>();
            if (jobj.Type == JTokenType.Object)//非数组
            {
                List<string> listsort = new List<string>();
                foreach (var item in list)
                {
                    string name = JProperty.Load(item.CreateReader()).Name;
                    listsort.Add(name);
                }
                listsort.Sort();
                List<JToken> listTemp = new List<JToken>();
                foreach (var item in listsort)
                {
                    listTemp.Add(list.Where(p => JProperty.Load(p.CreateReader()).Name == item).FirstOrDefault());
                }
                list = listTemp;
                //list.Sort((p1, p2) => JProperty.Load(p1.CreateReader()).Name.GetAnsi() - JProperty.Load(p2.CreateReader()).Name.GetAnsi());

                foreach (var item in list)
                {
                    JProperty jp = JProperty.Load(item.CreateReader());
                    if (item.First.Type == JTokenType.Object)
                    {
                        JObject sub = new JObject();
                        (obj as JObject).Add(jp.Name, sub);
                        SortJson(item.First, sub);
                    }
                    else if (item.First.Type == JTokenType.Array)
                    {
                        JArray arr = new JArray();
                        if (obj.Type == JTokenType.Object)
                        {
                            (obj as JObject).Add(jp.Name, arr);
                        }
                        else if (obj.Type == JTokenType.Array)
                        {
                            (obj as JArray).Add(arr);
                        }
                        SortJson(item.First, arr);
                    }
                    else if (item.First.Type != JTokenType.Object && item.First.Type != JTokenType.Array)
                    {
                        (obj as JObject).Add(jp.Name, item.First);
                    }
                }
            }
            else if (jobj.Type == JTokenType.Array)//数组
            {
                foreach (var item in list)
                {
                    List<JToken> listToken = item.ToList<JToken>();
                    List<string> listsort = new List<string>();
                    foreach (var im in listToken)
                    {
                        if (im.Type == JTokenType.Object)
                        {

                            JObject sub = new JObject();
                            (obj as JArray).Add(sub);
                            SortJson(im, sub);


                        }
                        else {
                            string name = JProperty.Load(im.CreateReader()).Name;
                            listsort.Add(name);
                        }


                    }
                    listsort.Sort();
                    List<JToken> listTemp = new List<JToken>();
                    foreach (var im2 in listsort)
                    {
                        listTemp.Add(listToken.Where(p => JProperty.Load(p.CreateReader()).Name == im2).FirstOrDefault());
                    }
                    list = listTemp;

                    listToken = list;
                    // listToken.Sort((p1, p2) => JProperty.Load(p1.CreateReader()).Name.GetAnsi() - JProperty.Load(p2.CreateReader()).Name.GetAnsi());
                    JObject item_obj = new JObject();
                    foreach (var token in listToken)
                    {
                        //JProperty jp = JProperty.Load(token.CreateReader());
                        //if (token.First.Type == JTokenType.Object)
                        //{
                        //    JObject sub = new JObject();
                        //    (obj as JObject).Add(jp.Name, sub);
                        //    SortJson(token.First, sub);
                        //}
                        //else if (token.First.Type == JTokenType.Array)
                        //{
                        //    JArray arr = new JArray();
                        //    if (obj.Type == JTokenType.Object)
                        //    {
                        //        (obj as JObject).Add(jp.Name, arr);
                        //    }
                        //    else if (obj.Type == JTokenType.Array)
                        //    {
                        //        (obj as JArray).Add(arr);
                        //    }
                        //    SortJson(token.First, arr);
                        //}
                        //else if (item.First.Type != JTokenType.Object && item.First.Type != JTokenType.Array)
                        //{
                        //    if (obj.Type == JTokenType.Object)
                        //    {
                        //        (obj as JObject).Add(jp.Name, token.First);
                        //    }
                        //    else if (obj.Type == JTokenType.Array)
                        //    {
                        //        item_obj.Add(jp.Name, token.First);
                        //    }
                        //}

                        JProperty jp = JProperty.Load(token.CreateReader());

                        if (item.First.Type != JTokenType.Object && item.First.Type != JTokenType.Array)
                        {
                            if (obj.Type == JTokenType.Object)
                            {
                                (obj as JObject).Add(jp.Name, token.First);
                            }
                            else if (obj.Type == JTokenType.Array)
                            {
                                item_obj.Add(jp.Name, token.First);
                            }
                        }
                        else if (token.First.Type == JTokenType.Object)
                        {
                            JObject sub = new JObject();
                            (obj as JObject).Add(jp.Name, sub);
                            SortJson(token.First, sub);
                        }
                        else if (token.First.Type == JTokenType.Array)
                        {
                            JArray arr = new JArray();
                            if (obj.Type == JTokenType.Object)
                            {
                                (obj as JObject).Add(jp.Name, arr);
                            }
                            else if (obj.Type == JTokenType.Array)
                            {
                                (obj as JArray).Add(arr);
                            }
                            SortJson(token.First, arr);
                        }
                    }
                    if (obj.Type == JTokenType.Array)
                    {
                        (obj as JArray).Add(item_obj);
                    }

                }
            }

            string ret = obj.ToString(Formatting.None);
            return ret;
        }
    }


    /// <summary>
    /// 扩展方法类
    /// </summary>
    public static class MethodEx
    {
        /// <summary>
        /// 取字符Ansi
        /// </summary>
        /// <param name="str"></param>
        /// <returns></returns>
        public static int GetAnsi(this string str)
        {
            if (str == null || str.Length == 0)
            {
                return 0;
            }
            return str[0];
        }
    }


}
