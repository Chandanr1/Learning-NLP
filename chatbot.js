document.addEventListener('DOMContentLoaded',()=>{
  const listEl=document.getElementById('convo-list');
  const newBtn=document.getElementById('new-chat');
  const win=document.getElementById('chat-window');
  const form=document.getElementById('chat-form');
  const textarea=document.getElementById('chat-text');

  let convos=loadConvos();
  let currentId = convos[0]?.id || createConvo();
  renderSidebar();
  renderChat();

  newBtn.addEventListener('click',()=>{currentId=createConvo(); renderSidebar(); renderChat();});
  form.addEventListener('submit',e=>{e.preventDefault(); const text=textarea.value.trim(); if(!text) return; textarea.value=''; sendUser(text);});

  function loadConvos(){
    try{const raw=localStorage.getItem('dw_convos'); return raw?JSON.parse(raw):[]}catch{return []}
  }
  function saveConvos(){localStorage.setItem('dw_convos',JSON.stringify(convos));}
  function createConvo(){
    const id=String(Date.now());
    convos.unshift({id,title:'New chat',messages:[{role:'bot',content:'Hello 👋 I am here to listen. How are you feeling today?'}]});
    saveConvos(); return id;
  }
  function current(){return convos.find(c=>c.id===currentId);} 
  function renderSidebar(){
    listEl.innerHTML='';
    convos.forEach(c=>{
      const li=document.createElement('li');
      li.textContent=c.title || 'Conversation';
      if(c.id===currentId) li.classList.add('active');
      li.addEventListener('click',()=>{currentId=c.id; renderSidebar(); renderChat();});
      listEl.appendChild(li);
    });
  }
  function renderChat(){
    win.innerHTML='';
    current().messages.forEach(m=>appendMsg(m.role,m.content));
    win.scrollTop=win.scrollHeight;
  }
  function appendMsg(role,content){
    const row=document.createElement('div'); row.className=`chat-msg ${role}`;
    const avatar=document.createElement('div'); avatar.className='avatar'; avatar.textContent=role==='user'?'🙂':'🤖';
    const bubble=document.createElement('div'); bubble.className='bubble'; bubble.textContent=content;
    row.appendChild(avatar); row.appendChild(bubble); win.appendChild(row);
  }
  function sendUser(text){
    const c=current();
    c.messages.push({role:'user',content:text});
    c.title=c.title==='New chat'?truncate(text,30):c.title;
    appendMsg('user',text); saveConvos();
    setTimeout(()=>respond(text),400);
  }
  function respond(text){
    const reply = ruleBasedResponse(text);
    current().messages.push({role:'bot',content:reply}); saveConvos(); appendMsg('bot',reply); win.scrollTop=win.scrollHeight;
  }
  function ruleBasedResponse(t){
    const s=t.toLowerCase();
    if(/(sad|down|unhappy|depressed)/.test(s)) return 'I am sorry you are feeling down. Want to share what happened? Sometimes writing it out can help.';
    if(/(anxious|anxiety|nervous|stress|stressed|overwhelmed)/.test(s)) return 'That sounds stressful. Try a box-breath: inhale 4s, hold 4s, exhale 4s, hold 4s. What usually helps you relax?';
    if(/(angry|frustrated|mad)/.test(s)) return 'It is okay to feel anger. Taking a quick walk or naming the feeling can reduce its intensity.';
    if(/(can you help|help me|advice)/.test(s)) return 'I can offer general tips. For urgent help, consider reaching out to a trusted adult or local support services.';
    if(/(game|play)/.test(s)) return 'Games might help you unwind. You can try Rock Paper Scissors, Memory, Tic Tac Toe, Number Guess, or a Typing test on the Games page.';
    if(/(hello|hi|hey)/.test(s)) return 'Hello! How are you feeling today?';
    return 'I hear you. Tell me more about that.';
  }
  function truncate(str,n){return str.length>n?str.slice(0,n-1)+'…':str}
});

