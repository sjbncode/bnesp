///
///
Vue.component('todo-item',{
	props:['todo'],
	template:'<li>{{todo.text}}</li>'
});
var app2=new Vue({
	el:'#app2',
	data:{
		config:{hl:6.12,lr:0.7,kyf:20},
		baseInfo:{dsfs:'空运',yf:2000,c:undefined,k:undefined,g:undefined,slmx:undefined,zlmx:undefined,sl:undefined,dj:undefined,zyf:0},
		items:[{dsfs:'空运',yf:2000,c:undefined,k:undefined,g:undefined,slmx:undefined,zlmx:undefined,sl:undefined,dj:undefined,zyf:0}]
	},
	methods:{
		createItem:function(){
			var newItem=Object.assign({},this.baseInfo);
			this.items.push(newItem);
		},deleteItem:function(index){
			console.log(index);
			this.items.splice(index,1)
		},getTJZ:function(){
			return this.baseInfo.c*this.baseInfo.k*this.baseInfo.g/5000.00
		},getLFS:function(item){
			var xs=item.sl/this.baseInfo.slmx;
			var intxs=parseInt(xs);
			if(xs>intxs){
				intxs+=1;
			}
			return (this.baseInfo.c * this.baseInfo.k * this.baseInfo.g / 1000000) * intxs;
		},getCB:function(item){
			var cb;
			if(item.dsfs=='空运'){
				var tjz=this.getTJZ();
				t=this.baseInfo.zlmx;
				if(tjz>this.baseInfo.zlmx){
					t=tjz;
				}
				cb=(item.dj+this.config.kyf*t/this.baseInfo.slmx)/this.config.hl
			}else{
				cb=(item.dj/this.config.hl+item.zyf/item.sl)
			}
			return cb.toFixed(5);
		},getBJ:function(item){
			return (this.getCB(item)/this.config.lr).toFixed(5);
		}

	}
});

