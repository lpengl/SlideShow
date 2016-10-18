 
(function(){
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
	
})();