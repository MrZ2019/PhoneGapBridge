

         

function onmenubutton() { 

  document.addEventListener("menubutton", function() {
  
    
    var ip = prompt('请输入新IP地址', config.host);
    
    if(ip) {
      config.host = ip;
      
      localStorage['ip'] = ip;
    }
    
    return false;
  }, false); 

} 
var _win32 = navigator.platform == 'Win32'
var config = {
	host: localStorage['ip'] || (_win32 ? 'localhost' : '192.168.1.102'),
	port: 700
}

var socket;
document.addEventListener("deviceready", onmenubutton, false); 
var view, viewDoc;
$(document).ready(function() {


	connect(config.host, config.port);

	view = $('#view');

	// 重新渲染最后一次的界面
	var recentCode = localStorage.getItem('recentCode');

	if(recentCode) {
		recentCode = JSON.parse(recentCode);

		updateView(recentCode);
	}
})

function connect(host, port) {
	if(socket) {
		socket.close();
	}
	socket = io("ws://" + host + ":" + port);

	socket.on("connect", function(socket) {
		console.log('连接成功');
	})

	socket.on("disconnect", function() {
		console.log('断开连接');
	});
	socket.on("message", function(code) {
		code = JSON.parse(code);

		updateView(code);
	});
}

// 更新视图

function updateView(code) {

	// 重新创建 iframe
	view.replaceWith($('<iframe id="view">'));
	view = $('#view');
	viewDoc = view.get(0).contentWindow.document;

	var mix = '';

    mix += '<!DOCTYPE html>\n<meta charset="utf-8"/>\n';
    mix += '\n' + code.html2 + '\n';
    mix += code.html;

    mix += '\n<style>\n' + code.css2 + '\n</style>\n';
    mix += '\n<style>\n' + code.css + '\n</style>\n';
    mix += '\n<script>\n' + code.js2 + '\n</script>\n';
    mix += '\n<script>\n' + code.js + '\n</script>\n';
	viewDoc.open();

	viewDoc.write(mix);

	viewDoc.close();

	localStorage.setItem('recentCode', JSON.stringify(code));
}