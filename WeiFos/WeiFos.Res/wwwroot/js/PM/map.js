﻿var baidu_map = function(data){
    var self = this;
    var opt = this.option;
    var map = new BMap.Map(data.mapctr);
    var myGeo = new BMap.Geocoder();
    var currentPoint;
    var marker1;
    var marker2;
    map.enableScrollWheelZoom();

    if (data.lat != "" && data.lng != "") {
        var point = new BMap.Point(data.lng, data.lat);
        marker1 = new BMap.Marker(point);        // 创建标注
        map.addOverlay(marker1);
        var opts = {
            width: 220,     // 信息窗口宽度 220-730
            height: 60,     // 信息窗口高度 60-650
            title: ""  // 信息窗口标题
        }
        var infoWindow = new BMap.InfoWindow("当前位置 " + data.adr + " ,移动红点可修改位置", opts);  // 创建信息窗口对象
        marker1.openInfoWindow(infoWindow);      // 打开信息窗口
        doit(point);
    } else {
        var point = new BMap.Point(114.069739, 22.549891);
        doit(point);
        window.setTimeout(function () {
            auto();
        }, 100);
    }
    map.enableDragging();
    map.enableContinuousZoom();
    map.addControl(new BMap.NavigationControl());
    map.addControl(new BMap.ScaleControl());
    map.addControl(new BMap.OverviewMapControl());

    function auto() {
        var geolocation = new BMap.Geolocation();
        geolocation.getCurrentPosition(function (r) {
            if (this.getStatus() == BMAP_STATUS_SUCCESS) {
                var point = new BMap.Point(r.point.lng, r.point.lat);
                marker1 = new BMap.Marker(point);        // 创建标注
                map.addOverlay(marker1);
                var opts = {
                    width: 220,     // 信息窗口宽度 220-730
                    height: 60,     // 信息窗口高度 60-650
                    title: ""  // 信息窗口标题
                }

                var infoWindow = new BMap.InfoWindow("定位成功这是你当前的位置!,移动红点标注目标位置，你也可以搜索定位位置!", opts);  // 创建信息窗口对象
                marker1.openInfoWindow(infoWindow);      // 打开信息窗口
                doit(point);

            }
        })
    }
    function doit(point) {
        if (point) {
            document.getElementById('lat').value = point.lat;
            document.getElementById('lng').value = point.lng;
            map.setCenter(point);
            map.centerAndZoom(point, 15);
            map.panTo(point);

            var cp = map.getCenter();
            myGeo.getLocation(point, function (result) {
                if (result) {
                    document.getElementById(data.adrctr).value = result.address;
                }
            });

            marker2 = new BMap.Marker(point);        // 创建标注  
            var opts = {
                width: 220,     // 信息窗口宽度 220-730
                height: 60,     // 信息窗口高度 60-650
                title: ""  // 信息窗口标题
            }
            var infoWindow = new BMap.InfoWindow("拖拽地图或红点，在地图上用红点标注您的店铺位置。", opts);  // 创建信息窗口对象
            marker2.openInfoWindow(infoWindow);      // 打开信息窗口

            map.addOverlay(marker2);                     // 将标注添加到地图中

            marker2.enableDragging();
            marker2.addEventListener("dragend", function (e) {
                document.getElementById('lat').value = e.point.lat;
                document.getElementById('lng').value = e.point.lng;
                myGeo.getLocation(new BMap.Point(e.point.lng, e.point.lat), function (result) {
                    if (result) {
                        document.getElementById(data.adrctr).value = result.address;
                        marker2.setPoint(new BMap.Point(e.point.lng, e.point.lat));
                        map.panTo(new BMap.Point(e.point.lng, e.point.lat));
                    }
                });
            });

            map.addEventListener("dragend", function showInfo() {
                var cp = map.getCenter();
                myGeo.getLocation(new BMap.Point(cp.lng, cp.lat), function (result) {
                    if (result) {
                        document.getElementById(data.adrctr).value = result.address;
                        document.getElementById('lat').value = cp.lat;
                        document.getElementById('lng').value = cp.lng;
                        //	window.external.setaddress(result.address);//setarrea(result.address);//
                        //marker1.setPoint(new BMap.Point(cp.lng,cp.lat));        // 移动标注
                        marker2.setPoint(new BMap.Point(cp.lng, cp.lat));
                        map.panTo(new BMap.Point(cp.lng, cp.lat));
                        //window.external.setlngandlat(cp.lng,cp.lat);
                    }
                });
            });

            map.addEventListener("dragging", function showInfo() {
                var cp = map.getCenter();
                //marker1.setPoint(new BMap.Point(cp.lng,cp.lat));        // 移动标注
                marker2.setPoint(new BMap.Point(cp.lng, cp.lat));
                map.panTo(new BMap.Point(cp.lng, cp.lat));
                map.centerAndZoom(marker2.getPoint(), map.getZoom());
            });


        }
    }

    function loadmap() {
        var city = document.getElementById(data.adrctr).value;
        var myCity = new BMap.LocalCity();
        // 将结果显示在地图上，并调整地图视野  
        myGeo.getPoint(city, function (point) {
            if (point) {
                //marker1.setPoint(new BMap.Point(point.lng,point.lat));        // 移动标注
                marker2.setPoint(new BMap.Point(point.lng, point.lat));
                //window.external.setlngandlat(marker2.getPoint().lng,marker2.getPoint().lat);
                document.getElementById('lat').value = point.lat;
                document.getElementById('lng').value = point.lng;
                map.panTo(new BMap.Point(marker2.getPoint().lng, marker2.getPoint().lat));
                map.centerAndZoom(marker2.getPoint(), map.getZoom());
            }
        });
    }

    function setarrea(address, city) {
        $(data.adrctr).value = address;
        window.setTimeout(function () {
            loadmap();
        }, 2000);
    }

    function initarreawithpoint(lng, lat) {
        window.setTimeout(function () {
            marker1.setPoint(new BMap.Point(lng,lat));        // 移动标注
            marker2.setPoint(new BMap.Point(lng, lat));
            map.panTo(new BMap.Point(lng, lat));
            map.centerAndZoom(marker2.getPoint(), map.getZoom());
        }, 2000);
    }
    $("#" + data.adrctr).change(function () { loadmap(); })
    $("#" + data.adrbtnctr).click(function () { loadmap(); });
}