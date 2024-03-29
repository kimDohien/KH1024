/* 롤링 관련 이벤트 */
$(function(){
	$('.box-body-right2 .btn-next').click(function(e){
		e.preventDefault();
		moveLeft(liRight2, ulRight2, timeRight2);
	});
	
	$('.box-body-right2 .btn-prev').click(function(e){
		e.preventDefault();
		moveRight(liRight2, ulRight2, timeRight2);
	});
	
	$('.box-body-right2').hover(function(){
		clearInterval(rollingRight2);
	}, function(){
		rollingRight2 = rollingLeft(rollingObjRigh2.li, rollingObjRigh2.ul, rollingObjRigh2.time, rollingObjRigh2.duration);
	});
	
	$('.box-body-left2 .list-issue').hover(function(){
		clearInterval(rollingLeft2);
	}, function(){
		rollingLeft2 = rollingTop(rollingObjLeft2);
	});
	
	//----------------------------------


	
	
});
//페이지네이션 버튼 이벤트
$(function(){
	$('.box-shop-in .btn-prev').click(function(e){
		e.preventDefault();
		let boxShopIn = $(this).parents('.box-shop-in');
		let curPage = boxShopIn.find('.current-page').first().text();
		let maxPage = boxShopIn.find('.max-page').first().text();
		curPage = +curPage;
		curPage = --curPage == 0 ? maxPage : curPage;
		boxShopIn.find('.current-page').text(curPage);
	});
	$('.box-shop-in .btn-next').click(function(e){
		e.preventDefault();
		let boxShopIn = $(this).parents('.box-shop-in');
		let curPage = boxShopIn.find('.current-page').first().text();
		let maxPage = boxShopIn.find('.max-page').first().text();
		curPage = +curPage;
		curPage = ++curPage > maxPage ? 1 : curPage;
		boxShopIn.find('.current-page').text(curPage);
	});
});

//왼쪽 두번째 뉴스 리스트 버튼 관리
$(function(){
	//2.이전 버튼은 첫번째 list-press가 아닌 경우에만 활성화
	selectNewList($('.box-body-left2 .list-press').eq(3))

	$('.box-body-left2 .btn-prev').click(function(e){
		e.preventDefault(); //상단으로 올라가는거 막음
		let obj = $('.box-body-left2 .list-press .selected');
		if(obj.prev().length !=0){
			selectNewList(obj.prev());
		}
	});
	
	//3.다음 버튼은 마지막 llist-press가 아닌 경우에만 활성화
	$('.box-body-left2 .btn-next').click(function(e){
		e.preventDefault(); //상단으로 올라가는거 막음
		let obj = $('.box-body-left2 .list-press. selected');
		if(obj.next().length ==0 || !obj.next().hasClass('list-press')){
			return;
			selectNewList(obj.next());
		}
	});
});


function selectNewList(el){
	//1. 초기에 첫번째 list-press를 제외한 나머지 list-press안보이게 감춤
	$('.box-body-left2 .list-press').removeClass('selected').hide();
	el.show();
	el.addClass('selected')
	if(el.prev().length ==0 ){ //앞에 요소가 없으면
		$('.box-body-left2 .btn-prev').hide();
	}else{
		$('.box-body-left2 .btn-prev').show();
	}
	if(el.next().length == 0  || !el.next().hasClass('list-press')){ 
		$('.box-body-left2 .btn-next').hide();
	}else{
		$('.box-body-left2 .btn-next').show();
	}
}

//왼쪽 세번째박스 클릭했을 때 배경 바꾸기
$(function(){
	$('.box-body-left3 .box-menu .btn-menu').click(function(e){
		e.preventDefault();
		$('.box-body-left3 .box-menu .item-menu .btn-menu').attr('aria-selected',false);
		$(this).attr('aria-selected',true);
		if($(this).prev().length==0){
			$('.box-body-left3 .btn-prev').hide();
		}else{
			$('.box-body-left3 .btn-prev').show();
		}
		if($(this).parent().next().length==0){
			$('.box-body-left3 .btn-prev').hide();
		}else{
			$('.box-body-left3 .btn-prev').show();
		}
	})

	$('.box-body-left3 .box-menu .btn-prev').click(function(e){
		e.preventDefault();
		let obj =$('.box-body-left3 .box-menu .item-menu .btn-menu').filter('[aria-selected=true]')
		if(obj.parent().prev().length !=0)
			obj.parent().prev().children().click();

		if(obj.hasClass('living')){
			obj.parents('.list-menu').animate({
				marginLeft : '-185px'
			},500);
		}
	});

	$('.box-body-left3 .box-menu .btn-next').click(function(e){
		e.preventDefault();
		let obj =$('.box-body-left3 .box-menu .item-menu .btn-menu').filter('[aria-selected=true]')
		if(obj.parent().next().length !=0)
		obj.parent().next().children().click();

		if(obj.hasClass('car')){
			obj.parents('.list-menu').animate({
				marginLeft : '0px'
			},500);
		}
	})

});

//더보기란 
$(function(){
	$('.group-menu .btn-more').click(function(e){
		e.preventDefault();
		$(this).toggleClass('fold');
		$('.container-menu .container-service').toggle();
		$('	.inner-container .btn-area').toggle();
		setMenuServiceBtn(true);
	});
	//더보기란>메뉴버튼
	$('.group-menu .btn-set').click(function(e){
		e.preventDefault();
		setMenuServiceBtn();
	});
});

function setMenuServiceBtn(flag){
	$('.group-menu .btn-area .btn').removeClass('display-none');
	$('.container-service .group-service').removeClass('display-none')
	$('.container-menu .list-favority-menu').removeClass('display-none');
	$('.container-menu .list-empty-box').removeClass('display-none');
	if(flag){
		$('.group-menu .btn-area .btn-reset').addClass('display-none');
		$('.group-menu .btn-area .btn-save').addClass('display-none');
		$('.container-service .group-service').last().addClass('display-none');
		$('.container-menu .list-empty-box').addClass('display-none');
	}else{
		$('.group-menu .btn-area .btn-set').addClass('display-none');
		$('.group-menu .btn-area .btn-show-all').addClass('display-none');
		$('.container-service .group-service').first().addClass('display-none')
		$('.container-menu .list-favority-menu').addClass('display-none');
		
	}
}


let tmpArr =[];//메뉴 설정에서 선택 중인 메뉴
let arr = []; //저장을 통해 최종 확정된 선택 메뉴 list-select-menu에 넣어줌



let liRight2 = '.box-body-right2 .item-stock';
let ulRight2 = '.box-body-right2 .list-stock';
let timeRight2 = 1000;
let durationRight2 = 2000;

let rollingObjRigh2 = {
	li : '.box-body-right2 .item-stock',
 	ul : '.box-body-right2 .list-stock',
	time : 1000,
	duration : 2000
}
let rollingObjLeft2 = {
	liSelector : '.box-body-left2 .item-issue',
	ulSelector : '.box-body-left2 .list-issue',
	duration : 2000,
	animationTime : 1000
}
let rollingRight2 = rollingLeft(rollingObjRigh2.li, rollingObjRigh2.ul, rollingObjRigh2.time, rollingObjRigh2.duration);
let rollingLeft2 = rollingTop(rollingObjLeft2);

function moveLeft(liSelector, ulSelector, time){
	let width = $(liSelector).first().innerWidth();
	if(!$(liSelector).first().is(':animated')){
		$(liSelector).first().animate({
			marginLeft : `-${width}px`
		},time, function(){
			$(this).detach().appendTo(ulSelector).removeAttr('style');
		});
	}
}
function moveRight(liSelector, ulSelector, time){
	let width = $(liSelector).first().innerWidth();
	if(!$(liSelector).first().is(':animated')){
		$(liSelector)
			.last()
			.detach()
			.prependTo(ulSelector)
			.css('marginLeft',`-${width}px`)
			.animate({
				marginLeft : 0
			}, time);
	}
}
function rollingLeft(liSelector, ulSelector, animationTime, duration){
	return setInterval(moveLeft,duration,liSelector, ulSelector, animationTime);
}
function moveTop(liSelector, ulSelector, animationTime){
	let height = $(liSelector).first().innerHeight();
	if(!$(liSelector).first().is(':animated')){
		$(liSelector).first().animate({
				marginTop : `-${height}px`
			}, animationTime, function(){
				$(this).detach().appendTo(ulSelector).removeAttr('style');
			});
	}
}
function rollingTop(rollingObj){
	return setInterval(moveTop,rollingObj.duration,rollingObj.liSelector, 
		rollingObj.ulSelector, rollingObj.animationTime);
}

//---------------



