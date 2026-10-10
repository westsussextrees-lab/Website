document.querySelectorAll('.rings').forEach(function(svg,k){
  var out='';
  for(var i=1;i<=17;i++){
    var r=i*16,s=i*0.7+k*2,d='';
    for(var a=0;a<=96;a++){
      var t=a/96*Math.PI*2;
      var rr=r*(1+0.05*Math.sin(2*t+s)+0.025*Math.sin(5*t+s*1.7)+0.012*Math.sin(9*t+s*0.5));
      d+=(a?'L':'M')+(rr*Math.cos(t)*1.08).toFixed(1)+' '+(rr*Math.sin(t)).toFixed(1);
    }
    out+='<path d="'+d+'Z"/>';
  }
  svg.innerHTML=out;
});
document.querySelectorAll('.ba').forEach(function(ba){
  var btns=ba.querySelectorAll('button'),touched=false,hover=matchMedia('(hover:hover)').matches;
  function set(v){ba.dataset.state=v;btns.forEach(function(b){b.setAttribute('aria-pressed',b.dataset.s===v)})}
  btns.forEach(function(b){b.addEventListener('click',function(){touched=true;set(b.dataset.s)})});
  if(hover){
    ba.addEventListener('mouseenter',function(){set('after')});
    ba.addEventListener('mouseleave',function(){set('before')});
  }else{
    ba.addEventListener('click',function(e){if(e.target.closest('button'))return;touched=true;set(ba.dataset.state==='after'?'before':'after')});
    if('IntersectionObserver' in window){
      var io=new IntersectionObserver(function(en){if(en[0].isIntersecting){io.disconnect();setTimeout(function(){if(!touched)set('after')},1200)}},{threshold:.6});
      io.observe(ba);
    }
  }
});
(function(){
  var f=document.getElementById('enquiry');if(!f)return;
  var msg=document.getElementById('formmsg');
  function say(t,ok){msg.textContent=t;msg.className=ok?'ok':'err'}
  function val(n){return f.elements[n].value.trim()}
  function viaEmail(){
    var b='Name: '+val('name')+'\nPhone: '+val('phone')+'\nEmail: '+val('email')+'\nTown: '+val('town')+'\nService: '+val('service')+'\n\n'+val('message');
    location.href='mailto:westsussextrees@gmail.com?subject='+encodeURIComponent('Website enquiry from '+val('name'))+'&body='+encodeURIComponent(b);
  }
  f.addEventListener('submit',function(e){
    e.preventDefault();
    if(f.elements['botcheck'].checked)return;
    if(!val('name')||!val('message')){say('Please add your name and a few details about the job.',false);return}
    if(!val('phone')&&!val('email')){say('Please add a phone number or an email address so Max can reply.',false);return}
    var key=f.elements['access_key'].value;
    if(!key||key.indexOf('YOUR_')===0){say('Opening your email app so you can send this.',true);viaEmail();return}
    var btn=f.querySelector('button');btn.disabled=true;say('Sending...',true);
    fetch('https://api.web3forms.com/submit',{method:'POST',headers:{'Content-Type':'application/json','Accept':'application/json'},body:JSON.stringify(Object.fromEntries(new FormData(f)))})
      .then(function(r){return r.json()})
      .then(function(j){if(j.success){f.reset();say('Thank you, your message has been sent. Max will be in touch soon.',true)}else{throw new Error('fail')}})
      .catch(function(){say('Sorry, that did not send. Please call or WhatsApp Max on 07719 724463, or email westsussextrees@gmail.com.',false)})
      .then(function(){btn.disabled=false});
  });
})();

(function(){
  var bb=document.querySelector('.burger'),nav=document.getElementById('menu');
  if(!bb||!nav)return;
  function setOpen(o){nav.classList.toggle('open',o);bb.setAttribute('aria-expanded',o?'true':'false')}
  bb.addEventListener('click',function(){setOpen(!nav.classList.contains('open'))});
  nav.addEventListener('click',function(e){if(e.target.closest('a'))setOpen(false)});
  document.addEventListener('keydown',function(e){if(e.key==='Escape')setOpen(false)});
})();

(function(){
  var t=document.querySelector('.cal');if(!t)return;
  var m=new Date().getMonth()+1;
  t.querySelectorAll('tr').forEach(function(r){var c=r.children[m];if(c)c.classList.add('now')});
})();
