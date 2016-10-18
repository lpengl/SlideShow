(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){

module.exports = {
	sayHello: function(){
		console.log("Hello from base.");
	}
};
},{}],2:[function(require,module,exports){
var $ = require("./base.js");

var SlideShow = function(id){
	this.init(id);
	this.autoSlide();
};

SlideShow.prototype.init = function(id){
	var self = this;
	this.wrapper = document.getElementById(id);
	this.viewWidth = this.wrapper.clientWidth;
	this.imgList = this.wrapper.getElementsByClassName("img-list")[0];
	this.navigateList = this.wrapper.getElementsByClassName("navigate-list")[0];
	this.navigateListItems = Array.prototype.slice.call(this.navigateList.getElementsByTagName("li"));
	this.currentPicIndex = 0;
	this.currentMarginLeft = 0;
	this.sliding = false;
	
	this.imgList.addEventListener("mouseover", function(){
		$.sayHello();
		self.pause();
	});
	
	this.imgList.addEventListener("mouseout", function(){
		self.autoSlide();
	});
};

SlideShow.prototype.autoSlide = function(){
	this.paused = false;
	var self = this;
	
	if(!this.sliding){
		this.timer = setTimeout(function(){
			self.slideTo(self.currentPicIndex + 1);
		}, 3000);
	}
};

SlideShow.prototype.slideTo = function(destPicIndex){		
	destPicIndex = destPicIndex % 6;
	this.setNavigateClass(destPicIndex);
	this.sliding = true;
	var finalMarginLeft = this.currentMarginLeft + (this.currentPicIndex - destPicIndex) * this.viewWidth;
	slideCore(this, destPicIndex, finalMarginLeft);
};

SlideShow.prototype.pause = function(){
	this.paused = true;
	clearTimeout(this.timer);
};

SlideShow.prototype.setNavigateClass = function(destPicIndex){
	this.navigateListItems[this.currentPicIndex].className = "";
	this.navigateListItems[destPicIndex].className = "active";
};

function slideCore(context, destPicIndex, finalMarginLeft){
	
	if(finalMarginLeft == context.currentMarginLeft) {
		context.sliding = false;
		context.currentPicIndex = destPicIndex;
		if(!context.paused){
			context.timer = setTimeout(function(){
				context.slideTo(context.currentPicIndex + 1);
			}, 3000);
		}
		
		return;
	}
	
	var delta = finalMarginLeft - context.currentMarginLeft,
		step;

	if(delta > 0){
		step = Math.ceil(delta / 10);
		context.currentMarginLeft = context.currentMarginLeft + step > finalMarginLeft ? 
								 finalMarginLeft : 
								 context.currentMarginLeft + step;
	}else{
		step = Math.floor(delta / 10);
		context.currentMarginLeft = context.currentMarginLeft + step < finalMarginLeft ? 
								 finalMarginLeft : 
								 context.currentMarginLeft + step;
	}
	
	context.imgList.style.marginLeft = context.currentMarginLeft + "px";
	
	setTimeout(function(){
		slideCore(context, destPicIndex, finalMarginLeft);
	}, 20);
}

new SlideShow("slideShow");
},{"./base.js":1}]},{},[2]);
