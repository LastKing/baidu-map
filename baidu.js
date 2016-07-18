/**
 * Created by Rain on 2016/7/7.
 */
//百度地图API功能
var map = new BMap.Map("baiduMap");

//起始坐标点
var point = new BMap.Point(116.404, 39.923);
// 坐标点，缩放等级
map.centerAndZoom(point, 17);

map.enableScrollWheelZoom();

var overlays = [];
var overlaycomplete = function (e) {
  console.log(e.overlay.ia);
  overlays.push(e.overlay);
};
//绘图样式
var styleOptions = {
  strokeColor: "red",    //边线颜色。
  fillColor: "red",      //填充颜色。当参数为空时，圆形将没有填充效果。
  strokeWeight: 3,       //边线的宽度，以像素为单位。
  strokeOpacity: 0.8,	   //边线透明度，取值范围0 - 1。
  fillOpacity: 0.6,      //填充的透明度，取值范围0 - 1。
  strokeStyle: 'solid' //边线的样式，solid或dashed。
};

//实例化鼠标绘制工具
var drawingManager = new BMapLib.DrawingManager(map, {
  isOpen: false, //是否开启绘制模式
  enableDrawingTool: true, //是否显示工具栏
  drawingToolOptions: {
    anchor: BMAP_ANCHOR_TOP_RIGHT, //位置
    offset: new BMap.Size(5, 5) //偏离值
  },
  circleOptions: styleOptions, //圆的样式
  polylineOptions: styleOptions, //线的样式
  polygonOptions: styleOptions, //多边形的样式
  rectangleOptions: styleOptions //矩形的样式
});

//添加鼠标绘制工具监听事件，用于获取绘制结果
drawingManager.addEventListener('overlaycomplete', overlaycomplete);
function clearAll() {
  for (var i = 0; i < overlays.length; i++) {
    map.removeOverlay(overlays[i]);
  }
  overlays.length = 0
}

var pts = [];
var pt1 = new BMap.Point(116.401072, 39.927281);
var pt2 = new BMap.Point(116.406372, 39.927337);
var pt3 = new BMap.Point(116.406515, 39.921305);
var pt4 = new BMap.Point(116.39967, 39.921333);

pts.push(pt1);
pts.push(pt2);
pts.push(pt3);
pts.push(pt4);
var ply = new BMap.Polygon(pts, {strokeColor: "red", fillColor: "red"});

var pt = new BMap.Point(116.400, 39.914);

//演示：将面添加到地图上
map.clearOverlays();
var mkr = new BMap.Marker(pt);
map.addOverlay(mkr);
map.addOverlay(ply);


// 监听 鼠标点击事件 获取  坐标
map.addEventListener("click", function (e) {
  console.log(e.point.lng + "," + e.point.lat);
});